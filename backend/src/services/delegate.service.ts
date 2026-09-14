import { randomBytes } from "node:crypto";
import type {
  CreatedDelegateRegistration,
  DelegateListFilters,
  DelegateListResult,
  DelegatePackage,
  DelegateRegistrationDetail,
  DelegateRegistrationInput,
} from "../types/delegate";
import type { DelegateRepository } from "../repositories/delegate.repository";

const referenceAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function createDelegateReference(): string {
  const bytes = randomBytes(8);
  const suffix = Array.from(
    bytes,
    (value) => referenceAlphabet[value % referenceAlphabet.length],
  ).join("");
  return `AIAIAC-DEL-${suffix}`;
}

export class DelegateService {
  constructor(
    private readonly delegates: DelegateRepository,
    private readonly nextReference: () => string = createDelegateReference,
  ) {}

  listPublicPackages(now = new Date()): Promise<DelegatePackage[]> {
    return this.delegates.listPublicPackages(now);
  }

  createRegistration(
    input: DelegateRegistrationInput,
  ): Promise<CreatedDelegateRegistration> {
    return this.delegates.createRegistration(input, this.nextReference);
  }

  listRegistrations(filters: DelegateListFilters): Promise<DelegateListResult> {
    return this.delegates.listRegistrations(filters);
  }

  findRegistrationById(id: string): Promise<DelegateRegistrationDetail | null> {
    return this.delegates.findRegistrationById(id);
  }
}
