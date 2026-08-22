import type { QueryResultRow } from "pg";
import { getDatabasePool } from "../config/database";
import type { AdminRecord, AdminRole } from "../types/admin";

interface AdminRow extends QueryResultRow {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: AdminRole;
  is_active: boolean;
  last_login_at: Date | null;
}

export interface CreateAdminInput {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly role: AdminRole;
}

export interface AdminRepository {
  findByEmail(email: string): Promise<AdminRecord | null>;
  findById(id: string): Promise<AdminRecord | null>;
  updateLastLogin(id: string, loggedInAt: Date): Promise<void>;
  create(input: CreateAdminInput): Promise<AdminRecord>;
}

export class DuplicateAdminEmailError extends Error {
  constructor() {
    super("An admin with this email already exists");
    this.name = "DuplicateAdminEmailError";
  }
}

function mapAdmin(row: AdminRow): AdminRecord {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    isActive: row.is_active,
    lastLoginAt: row.last_login_at,
  };
}

function requireDatabasePool() {
  const pool = getDatabasePool();
  if (!pool) throw new Error("Database is not configured");
  return pool;
}

const adminSelection = `
  SELECT id, full_name, email, password_hash, role, is_active, last_login_at
  FROM admins
`;

export const postgresAdminRepository: AdminRepository = {
  async findByEmail(email) {
    const result = await requireDatabasePool().query<AdminRow>(
      `${adminSelection} WHERE email = $1 LIMIT 1`,
      [email],
    );
    const row = result.rows[0];
    return row ? mapAdmin(row) : null;
  },

  async findById(id) {
    const result = await requireDatabasePool().query<AdminRow>(
      `${adminSelection} WHERE id = $1 LIMIT 1`,
      [id],
    );
    const row = result.rows[0];
    return row ? mapAdmin(row) : null;
  },

  async updateLastLogin(id, loggedInAt) {
    await requireDatabasePool().query(
      `UPDATE admins
       SET last_login_at = $2, updated_at = $2
       WHERE id = $1`,
      [id, loggedInAt],
    );
  },

  async create(input) {
    try {
      const result = await requireDatabasePool().query<AdminRow>(
        `INSERT INTO admins (id, full_name, email, password_hash, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, full_name, email, password_hash, role, is_active, last_login_at`,
        [input.id, input.fullName, input.email, input.passwordHash, input.role],
      );
      const row = result.rows[0];
      if (!row) throw new Error("Admin creation returned no record");
      return mapAdmin(row);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505" &&
        "constraint" in error &&
        error.constraint === "admins_email_key"
      ) {
        throw new DuplicateAdminEmailError();
      }
      throw error;
    }
  },
};
