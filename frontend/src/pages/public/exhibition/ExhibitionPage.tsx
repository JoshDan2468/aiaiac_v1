import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { createBreadcrumbSchema } from "@/components/common/SEO";
import { EnquiryCtaSection } from "./EnquiryCtaSection";
import { ExhibitionPackagesSection } from "./ExhibitionPackagesSection";
import { ExhibitionSectorsSection } from "./ExhibitionSectorsSection";
import { HeroSection } from "./HeroSection";
import { OpportunitySection } from "./OpportunitySection";
import { WhyExhibitSection } from "./WhyExhibitSection";

export function ExhibitionPage() {
  return (
    <PublicPageLayout
      title="Exhibit at AIAIAC Africa 2027 | Showcase Industrial Solutions"
      description="Book your exhibition booth at AIAIAC Africa 2027 in Lagos, Nigeria. Showcase products and network with energy operators, EPCs, and procurement directors."
      canonical="/exhibition"
      schema={createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Exhibition", item: "/exhibition" },
      ])}
    >
      <HeroSection />
      <WhyExhibitSection />
      <ExhibitionSectorsSection />
      <OpportunitySection />
      <ExhibitionPackagesSection />
      <EnquiryCtaSection />
    </PublicPageLayout>
  );
}
