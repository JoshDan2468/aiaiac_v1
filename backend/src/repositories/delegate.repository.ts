import { randomUUID } from "node:crypto";
import type { PoolClient, QueryResultRow } from "pg";
import { getDatabasePool } from "../config/database";
import type {
  CreatedDelegateRegistration,
  DelegateListFilters,
  DelegateListItem,
  DelegateListResult,
  DelegatePackage,
  DelegateRegistrationDetail,
  DelegateRegistrationInput,
  DelegateType,
  PaymentStatus,
  RegistrationStatus,
} from "../types/delegate";

export class DelegatePackageUnavailableError extends Error {
  constructor() {
    super("Selected delegate package is unavailable");
    this.name = "DelegatePackageUnavailableError";
  }
}

export class DuplicateDelegateRegistrationError extends Error {
  constructor() {
    super("A registration already exists for this email and package");
    this.name = "DuplicateDelegateRegistrationError";
  }
}

export class DelegateReferenceCollisionError extends Error {
  constructor() {
    super("Unable to allocate a registration reference");
    this.name = "DelegateReferenceCollisionError";
  }
}

export interface DelegateRepository {
  listPublicPackages(now: Date): Promise<DelegatePackage[]>;
  createRegistration(
    input: DelegateRegistrationInput,
    nextReference: () => string,
  ): Promise<CreatedDelegateRegistration>;
  listRegistrations(filters: DelegateListFilters): Promise<DelegateListResult>;
  findRegistrationById(id: string): Promise<DelegateRegistrationDetail | null>;
}

interface PackageRow extends QueryResultRow {
  id: string;
  slug: string;
  name: string;
  delegate_type: DelegateType;
  description: string;
  benefits: string[];
  currency: string;
  price_minor: number;
}

interface CreatedRegistrationRow extends QueryResultRow {
  id: string;
  reference: string;
  registration_status: "SUBMITTED";
  payment_status: "PENDING";
  submitted_at: Date;
}

interface ListRow extends QueryResultRow {
  id: string;
  reference: string;
  first_name: string;
  last_name: string;
  company_name: string;
  package_name: string;
  country: string;
  registration_status: RegistrationStatus;
  payment_status: PaymentStatus;
  submitted_at: Date;
}

interface DetailRow extends ListRow {
  email: string;
  mobile: string;
  telephone: string | null;
  job_title: string;
  primary_activity: string;
  main_objective: string;
  heard_about_source: string;
  privacy_consent: boolean;
  data_sharing_consent: boolean;
  package_id: string;
  package_type: DelegateType;
  package_description: string;
  package_benefits: string[];
  currency: string;
  price_minor: number;
  created_at: Date;
  updated_at: Date;
}

function requireDatabasePool() {
  const pool = getDatabasePool();
  if (!pool) throw new Error("Database is not configured");
  return pool;
}

function mapPackage(row: PackageRow): DelegatePackage {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    delegateType: row.delegate_type,
    description: row.description,
    benefits: row.benefits,
    currency: row.currency,
    priceMinor: row.price_minor,
  };
}

function mapListItem(row: ListRow): DelegateListItem {
  return {
    id: row.id,
    reference: row.reference,
    firstName: row.first_name,
    lastName: row.last_name,
    companyName: row.company_name,
    packageName: row.package_name,
    country: row.country,
    registrationStatus: row.registration_status,
    paymentStatus: row.payment_status,
    submittedAt: row.submitted_at,
  };
}

function mapDetail(row: DetailRow): DelegateRegistrationDetail {
  return {
    ...mapListItem(row),
    email: row.email,
    mobile: row.mobile,
    telephone: row.telephone,
    jobTitle: row.job_title,
    primaryActivity: row.primary_activity,
    mainObjective: row.main_objective,
    heardAboutSource: row.heard_about_source,
    privacyConsent: row.privacy_consent,
    dataSharingConsent: row.data_sharing_consent,
    packageId: row.package_id,
    packageType: row.package_type,
    packageDescription: row.package_description,
    packageBenefits: row.package_benefits,
    currency: row.currency,
    priceMinor: row.price_minor,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function isUniqueViolation(error: unknown, constraint: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505" &&
    "constraint" in error &&
    error.constraint === constraint
  );
}

async function findAvailablePackage(
  client: PoolClient,
  id: string,
  now: Date,
): Promise<PackageRow | null> {
  const result = await client.query<PackageRow>(
    `SELECT dp.id, dp.slug, dp.name, dp.delegate_type, dp.description, dp.benefits,
            dpp.currency, dpp.amount_minor AS price_minor
     FROM delegate_packages dp
     JOIN delegate_package_prices dpp
       ON dpp.package_id = dp.id AND dpp.currency = dp.currency AND dpp.is_active = true
     WHERE dp.id = $1
       AND dp.is_active = true
       AND (dp.sales_start_at IS NULL OR dp.sales_start_at <= $2)
       AND (dp.sales_end_at IS NULL OR dp.sales_end_at >= $2)
     FOR SHARE OF dp, dpp`,
    [id, now],
  );
  return result.rows[0] ?? null;
}

function buildListWhere(filters: DelegateListFilters) {
  const clauses: string[] = [];
  const values: unknown[] = [];
  const add = (sql: string, value: unknown) => {
    values.push(value);
    clauses.push(sql.replace("?", `$${values.length}`));
  };

  if (filters.search) {
    values.push(`%${filters.search}%`);
    const placeholder = `$${values.length}`;
    clauses.push(
      `(reference ILIKE ${placeholder} OR first_name ILIKE ${placeholder} OR last_name ILIKE ${placeholder} OR company_name ILIKE ${placeholder})`,
    );
  }
  if (filters.packageId) add("package_id = ?", filters.packageId);
  if (filters.registrationStatus)
    add("registration_status = ?", filters.registrationStatus);
  if (filters.paymentStatus) add("payment_status = ?", filters.paymentStatus);
  if (filters.country) add("country ILIKE ?", filters.country);
  if (filters.submittedFrom) add("submitted_at >= ?", filters.submittedFrom);
  if (filters.submittedTo) {
    const endExclusive = new Date(filters.submittedTo);
    endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
    add("submitted_at < ?", endExclusive);
  }
  return {
    where: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "",
    values,
  };
}

const sortSql = {
  submitted_desc: "submitted_at DESC, id DESC",
  submitted_asc: "submitted_at ASC, id ASC",
  name_asc: "last_name ASC, first_name ASC, id ASC",
  name_desc: "last_name DESC, first_name DESC, id DESC",
} as const;

export const postgresDelegateRepository: DelegateRepository = {
  async listPublicPackages(now) {
    const result = await requireDatabasePool().query<PackageRow>(
      `SELECT dp.id, dp.slug, dp.name, dp.delegate_type, dp.description, dp.benefits,
              dpp.currency, dpp.amount_minor AS price_minor
       FROM delegate_packages dp
       JOIN delegate_package_prices dpp
         ON dpp.package_id = dp.id AND dpp.currency = dp.currency AND dpp.is_active = true
       WHERE dp.is_active = true
         AND (dp.sales_start_at IS NULL OR dp.sales_start_at <= $1)
         AND (dp.sales_end_at IS NULL OR dp.sales_end_at >= $1)
       ORDER BY dpp.amount_minor ASC, dp.name ASC`,
      [now],
    );
    return result.rows.map(mapPackage);
  },

  async createRegistration(input, nextReference) {
    const pool = requireDatabasePool();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const submittedAt = new Date();
        const packageRow = await findAvailablePackage(
          client,
          input.packageId,
          submittedAt,
        );
        if (!packageRow) throw new DelegatePackageUnavailableError();

        const duplicate = await client.query(
          "SELECT 1 FROM delegate_registrations WHERE package_id = $1 AND email = $2 LIMIT 1",
          [input.packageId, input.email],
        );
        if (duplicate.rowCount) throw new DuplicateDelegateRegistrationError();

        const reference = nextReference();
        const result = await client.query<CreatedRegistrationRow>(
          `INSERT INTO delegate_registrations (
            id, reference, package_id, first_name, last_name, email, mobile, telephone,
            job_title, company_name, country, primary_activity, main_objective, heard_about_source,
            privacy_consent, data_sharing_consent, registration_status, payment_status,
            package_name_snapshot, package_type_snapshot, package_description_snapshot,
            package_benefits_snapshot, currency_snapshot, price_minor_snapshot, submitted_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
            true, $15, 'SUBMITTED', 'PENDING', $16, $17, $18, $19, $20, $21, $22
          ) RETURNING id, reference, registration_status, payment_status, submitted_at`,
          [
            randomUUID(),
            reference,
            input.packageId,
            input.firstName,
            input.lastName,
            input.email,
            input.mobile,
            input.telephone ?? null,
            input.jobTitle,
            input.companyName,
            input.country,
            input.primaryActivity,
            input.mainObjective,
            input.heardAboutSource,
            input.dataSharingConsent,
            packageRow.name,
            packageRow.delegate_type,
            packageRow.description,
            packageRow.benefits,
            packageRow.currency,
            packageRow.price_minor,
            submittedAt,
          ],
        );
        await client.query("COMMIT");
        const row = result.rows[0];
        if (!row)
          throw new Error("Delegate registration creation returned no record");
        return {
          id: row.id,
          reference: row.reference,
          registrationStatus: row.registration_status,
          paymentStatus: row.payment_status,
          submittedAt: row.submitted_at,
        };
      } catch (error) {
        await client.query("ROLLBACK").catch(() => undefined);
        if (
          isUniqueViolation(
            error,
            "delegate_registrations_package_email_unique",
          )
        ) {
          throw new DuplicateDelegateRegistrationError();
        }
        if (isUniqueViolation(error, "delegate_registrations_reference_key"))
          continue;
        throw error;
      } finally {
        client.release();
      }
    }
    throw new DelegateReferenceCollisionError();
  },

  async listRegistrations(filters) {
    const { where, values } = buildListWhere(filters);
    const pool = requireDatabasePool();
    const countResult = await pool.query<{ count: string }>(
      `SELECT count(*)::text AS count FROM delegate_registrations ${where}`,
      values,
    );
    const paginationValues = [
      ...values,
      filters.limit,
      (filters.page - 1) * filters.limit,
    ];
    const rows = await pool.query<ListRow>(
      `SELECT id, reference, first_name, last_name, company_name,
              package_name_snapshot AS package_name, country, registration_status,
              payment_status, submitted_at
       FROM delegate_registrations
       ${where}
       ORDER BY ${sortSql[filters.sort]}
       LIMIT $${paginationValues.length - 1} OFFSET $${paginationValues.length}`,
      paginationValues,
    );
    return {
      items: rows.rows.map(mapListItem),
      total: Number(countResult.rows[0]?.count ?? 0),
      page: filters.page,
      limit: filters.limit,
    };
  },

  async findRegistrationById(id) {
    const result = await requireDatabasePool().query<DetailRow>(
      `SELECT id, reference, first_name, last_name, email, mobile, telephone, job_title,
              company_name, country, primary_activity, main_objective, heard_about_source,
              privacy_consent, data_sharing_consent, package_id,
              package_name_snapshot AS package_name, package_type_snapshot AS package_type,
              package_description_snapshot AS package_description,
              package_benefits_snapshot AS package_benefits,
              currency_snapshot AS currency, price_minor_snapshot AS price_minor,
              registration_status, payment_status, submitted_at, created_at, updated_at
       FROM delegate_registrations
       WHERE id = $1`,
      [id],
    );
    const row = result.rows[0];
    return row ? mapDetail(row) : null;
  },
};
