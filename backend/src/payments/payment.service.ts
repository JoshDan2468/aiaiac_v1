/** Provider-neutral payment gateway boundary. */

import type {
  InitializeProviderPaymentInput,
  InitializedProviderPayment,
  PaymentProvider,
  VerifiedProviderPayment,
} from "./payment.types";

export class PaymentProviderUnavailableError extends Error {
  constructor() {
    super("Payment provider is not configured");
    this.name = "PaymentProviderUnavailableError";
  }
}

export class PaymentService {
  constructor(private readonly provider: PaymentProvider | null) {}

  initialize(
    input: InitializeProviderPaymentInput,
  ): Promise<InitializedProviderPayment> {
    if (!this.provider) throw new PaymentProviderUnavailableError();
    return this.provider.initialize(input);
  }

  verify(reference: string): Promise<VerifiedProviderPayment> {
    if (!this.provider) throw new PaymentProviderUnavailableError();
    return this.provider.verify(reference);
  }
}
