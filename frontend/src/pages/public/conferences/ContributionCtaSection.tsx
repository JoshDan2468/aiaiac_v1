import { CTASection } from "@/components/common/CTASection";

export function ContributionCtaSection() {
  return (
    <CTASection
      title="Interested in contributing to the 2027 exchange?"
      primaryLabel="Contact the team"
      primaryTo="/contact"
      secondaryLabel="Registration options"
      secondaryTo="/registration"
    />
  );
}
