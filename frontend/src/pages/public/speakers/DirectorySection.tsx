import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { CircularPersonProfile } from "@/components/common/CircularPersonProfile";
import { SpeakerDetailModal } from "@/components/speakers/SpeakerDetailModal";
import {
  unifiedSpeakersRoster,
  type RosterPerson,
  type SpeakerCategory,
} from "@/data/speakersRoster";

const CATEGORIES: SpeakerCategory[] = [
  "All",
  "Keynote",
  "Featured",
  "Featured Speakers",
  "Advisory Board",
  "Asset Integrity",
  "Artificial Intelligence",
  "Automation & Cybersecurity",
  "Organising Committee",
];

export function DirectorySection() {
  const [selectedCategory, setSelectedCategory] = useState<SpeakerCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalSpeaker, setActiveModalSpeaker] = useState<RosterPerson | null>(null);

  const filteredSpeakers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return unifiedSpeakersRoster.filter((person) => {
      // 1. Category check
      const matchesCategory =
        selectedCategory === "All" ||
        person.categories.includes(selectedCategory) ||
        (selectedCategory === "Featured Speakers" &&
          (person.categories.includes("Featured") ||
            person.categories.includes("Featured Speakers")));
      if (!matchesCategory) return false;

      // 2. Search query check
      if (!query) return true;
      return (
        person.name.toLowerCase().includes(query) ||
        person.role.toLowerCase().includes(query) ||
        person.organisation.toLowerCase().includes(query) ||
        person.categories.some((c) => c.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="bg-[#F6F4EC] py-16 sm:py-20 lg:py-28" aria-label="Speaker directory">
      <div className="shell">
        {/* Controls Bar: Search + Category Pills */}
        <div className="space-y-6 border-b border-[#214A36]/15 pb-8">
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[#496158]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or organisation"
              className="w-full rounded-full border border-[#214A36]/25 bg-white py-3 pl-11 pr-10 text-sm font-medium text-[#092117] placeholder:text-[#496158]/70 focus:border-[#214A36] focus:outline-none focus:ring-2 focus:ring-[#214A36]/20 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#496158] hover:bg-[#E5EBE5]"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214A36] ${
                    isActive
                      ? "bg-[#071C13] text-[#CFEA3B] shadow-sm"
                      : "border border-[#214A36]/20 bg-white/80 text-[#092117] hover:bg-[#E5EBE5]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-[#496158]">
            <span>
              Showing{" "}
              <strong className="font-bold text-[#092117]">{filteredSpeakers.length}</strong>{" "}
              {filteredSpeakers.length === 1 ? "speaker" : "speakers"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </span>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-[#214A36] underline hover:text-[#092117]"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid (4-5 cols desktop, 3 cols tablet, 1-2 cols mobile) */}
        {filteredSpeakers.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredSpeakers.map((person, index) => (
              <AnimatedSection as="li" key={person.id} delay={(index % 5) * 0.04}>
                <CircularPersonProfile
                  name={person.name}
                  role={person.role}
                  organisation={person.organisation}
                  organisationKey={person.organisationKey}
                  countryCode={person.countryCode}
                  image={person.image}
                  tone="light"
                  size="standard"
                  onClick={() => setActiveModalSpeaker(person)}
                  className="mx-auto"
                />
              </AnimatedSection>
            ))}
          </ul>
        ) : (
          <div className="mt-16 rounded-2xl border border-[#214A36]/20 bg-white p-12 text-center">
            <h3 className="font-display text-lg font-bold text-[#092117]">No speakers found</h3>
            <p className="mt-2 text-sm text-[#496158]">
              No speaker matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try resetting
              your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 rounded-full bg-[#071C13] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#CFEA3B]"
            >
              Show All Speakers
            </button>
          </div>
        )}
      </div>

      {/* Speaker Detail Modal */}
      <SpeakerDetailModal
        speaker={activeModalSpeaker}
        open={Boolean(activeModalSpeaker)}
        onOpenChange={(open) => {
          if (!open) setActiveModalSpeaker(null);
        }}
      />
    </section>
  );
}
