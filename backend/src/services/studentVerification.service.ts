import { createDelegateReference } from "./delegate.service";
import type { StudentVerificationRepository } from "../repositories/studentVerification.repository";
import type {
  StudentApplicationInput,
  StudentVerificationListFilters,
} from "../types/studentVerification";
import {
  createStudentContinuationToken,
  hashStudentContinuationToken,
} from "./studentEvidence.service";

export class StudentVerificationService {
  constructor(
    private readonly repository: StudentVerificationRepository,
    private readonly nextReference: () => string = createDelegateReference,
    private readonly tokenTtlHours = 24,
    private readonly now: () => Date = () => new Date(),
    private readonly createContinuationToken: () => string = createStudentContinuationToken,
  ) {}

  async createApplication(input: StudentApplicationInput) {
    const continuationToken = this.createContinuationToken();
    const continuationTokenExpiresAt = new Date(
      this.now().getTime() + this.tokenTtlHours * 60 * 60 * 1000,
    );
    const application = await this.repository.createApplication(
      input,
      this.nextReference,
      {
        tokenHash: hashStudentContinuationToken(continuationToken),
        expiresAt: continuationTokenExpiresAt,
      },
    );
    return { ...application, continuationToken, continuationTokenExpiresAt };
  }

  list(filters: StudentVerificationListFilters) {
    return this.repository.list(filters);
  }
}
