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
import type { DelegateRegistrationAcknowledgementService } from "./delegateRegistrationAcknowledgement.service";

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
    private readonly acknowledgement?: Pick<DelegateRegistrationAcknowledgementService, "send">,
  ) {}

  listPublicPackages(now = new Date()): Promise<DelegatePackage[]> {
    return this.delegates.listPublicPackages(now);
  }

  async createRegistration(
    input: DelegateRegistrationInput,
  ): Promise<CreatedDelegateRegistration> {
    const registration = await this.delegates.createRegistration(input, this.nextReference);
    await this.acknowledgement?.send(registration.id);
    return registration;
  }

  listRegistrations(filters: DelegateListFilters): Promise<DelegateListResult> {
    return this.delegates.listRegistrations(filters);
  }

  findRegistrationById(id: string): Promise<DelegateRegistrationDetail | null> {
    return this.delegates.findRegistrationById(id);
  }
}
