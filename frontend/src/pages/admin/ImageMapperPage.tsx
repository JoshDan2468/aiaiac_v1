import { useState } from "react";
import { CheckCircle2, Image as ImageIcon, Copy, RefreshCw } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { technicalCommittees } from "@/data/committee";

interface UnmappedImage {
  filename: string;
  path: string;
}

interface CommitteeMapperData {
  id: string;
  name: string;
  slug: string;
  folderPath: string;
  publicUrlPrefix: string;
  images: UnmappedImage[];
  members: { id: string; name: string; role: string; organisation: string }[];
}

const mapperCommittees: CommitteeMapperData[] = [
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    folderPath: "frontend/public/assets/aiaiac-2027/technical-committees/artificial-intelligence",
    publicUrlPrefix: "/assets/aiaiac-2027/technical-committees/artificial-intelligence",
    images: [
      {
        filename: "ChatGPT Image Sep 5, 2026, 07_57_16 AM (2)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/artificial-intelligence/ChatGPT Image Sep 5, 2026, 07_57_16 AM (2)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 07_57_18 AM (8)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/artificial-intelligence/ChatGPT Image Sep 5, 2026, 07_57_18 AM (8)-720.webp",
      },
      {
        filename: "WhatsApp_Image_2026-09-05_at_19.06.06-removebg-preview-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/artificial-intelligence/WhatsApp_Image_2026-09-05_at_19.06.06-removebg-preview-720.webp",
      },
    ],
    members: technicalCommittees.find((c) => c.id === "artificial-intelligence")?.members ?? [],
  },
  {
    id: "automation-cybersecurity",
    name: "Automation & Cybersecurity",
    slug: "automation-cybersecurity",
    folderPath: "frontend/public/assets/aiaiac-2027/technical-committees/automation-cybersecurity",
    publicUrlPrefix: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity",
    images: [
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (1)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (1)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (10)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (10)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (2)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (2)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (3)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (3)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (4)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (4)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (5)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (5)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (6)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (6)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (8)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (8)-720.webp",
      },
      {
        filename: "ChatGPT Image Sep 5, 2026, 08_33_10 AM (9)-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/ChatGPT Image Sep 5, 2026, 08_33_10 AM (9)-720.webp",
      },
      {
        filename: "WhatsApp_Image_2026-09-08_at_02.34.09-removebg-preview-720.webp",
        path: "/assets/aiaiac-2027/technical-committees/automation-cybersecurity/WhatsApp_Image_2026-09-08_at_02.34.09-removebg-preview-720.webp",
      },
    ],
    members: technicalCommittees.find((c) => c.id === "automation-cybersecurity")?.members ?? [],
  },
];

export function ImageMapperPage() {
  const [activeTab, setActiveTab] = useState<string>("artificial-intelligence");
  const [mappings, setMappings] = useState<Record<string, Record<string, string>>>({
    "artificial-intelligence": {},
    "automation-cybersecurity": {},
  });
  const [isCopied, setIsCopied] = useState(false);

  const activeCommittee = mapperCommittees.find((c) => c.id === activeTab) ?? mapperCommittees[0]!;
  const currentCommitteeMappings = mappings[activeCommittee.id] || {};

  const assignedMemberIds = new Set(Object.values(currentCommitteeMappings).filter(Boolean));
  const mappedCount = Object.values(currentCommitteeMappings).filter(Boolean).length;
  const unassignedMembers = activeCommittee.members.filter((m) => !assignedMemberIds.has(m.id));

  const handleSelectMember = (filename: string, memberId: string) => {
    setMappings((prev) => ({
      ...prev,
      [activeCommittee.id]: {
        ...(prev[activeCommittee.id] || {}),
        [filename]: memberId,
      },
    }));
  };

  const generateMappingJSON = () => {
    const result: Record<string, Record<string, string>> = {};
    for (const c of mapperCommittees) {
      const committeeMap = mappings[c.id] || {};
      const committeeResult: Record<string, string> = {};
      for (const [filename, memberId] of Object.entries(committeeMap)) {
        if (memberId) {
          committeeResult[filename] = `${memberId}.webp`;
        }
      }
      result[c.id] = committeeResult;
    }
    return JSON.stringify(result, null, 2);
  };

  const copyConfig = async () => {
    await navigator.clipboard.writeText(generateMappingJSON());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Development Tools / Asset Management"
        title="Technical Committee Image Mapper"
        description="Visually map unrenamed committee portraits to their approved member slugs inside their existing directories."
        actions={
          <button
            type="button"
            onClick={() => void copyConfig()}
            className="flex items-center gap-2 rounded-lg bg-mineral px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-forest transition-colors"
          >
            {isCopied ? <CheckCircle2 className="size-4 text-lime" /> : <Copy className="size-4" />}
            {isCopied ? "Copied JSON!" : "Copy Mapping JSON"}
          </button>
        }
      />

      {/* Committee Tabs */}
      <div className="flex border-b border-slate-200">
        {mapperCommittees.map((c) => {
          const map = mappings[c.id] || {};
          const count = Object.values(map).filter(Boolean).length;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveTab(c.id)}
              className={`flex items-center gap-2.5 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${
                activeTab === c.id
                  ? "border-forest text-forest bg-emerald-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>{c.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.62rem] font-bold text-slate-700">
                {count} / {c.images.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress & Unassigned Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
              Mapping Progress: {mappedCount} of {activeCommittee.images.length} images mapped
            </p>
            <div className="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-forest transition-all duration-300"
                style={{
                  width: `${(mappedCount / activeCommittee.images.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700">
              {unassignedMembers.length} Unassigned Members
            </span>
          </div>
        </div>

        {unassignedMembers.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">
              Unassigned Members ({unassignedMembers.length}):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {unassignedMembers.map((m) => (
                <span
                  key={m.id}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activeCommittee.images.map((img) => {
          const selectedMemberId = currentCommitteeMappings[img.filename] ?? "";
          const selectedMember = activeCommittee.members.find((m) => m.id === selectedMemberId);

          return (
            <div
              key={img.filename}
              className={`flex flex-col justify-between rounded-xl border bg-white p-4 shadow-xs transition-all ${
                selectedMemberId
                  ? "border-emerald-300 ring-2 ring-emerald-500/10"
                  : "border-slate-200"
              }`}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-900">
                  <img
                    src={img.path}
                    alt={img.filename}
                    className="h-full w-full object-cover object-top"
                  />
                  {selectedMemberId && (
                    <div className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                      <CheckCircle2 className="size-4.5" />
                    </div>
                  )}
                </div>

                {/* Filename & Info */}
                <div className="mt-3">
                  <p
                    className="truncate text-[0.68rem] font-semibold text-slate-500"
                    title={img.filename}
                  >
                    {img.filename}
                  </p>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-forest mt-0.5">
                    {activeCommittee.name}
                  </p>
                </div>
              </div>

              {/* Member Selector Dropdown */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <label className="block text-[0.64rem] font-bold uppercase tracking-[0.1em] text-slate-600 mb-1.5">
                  Select Committee Member:
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => handleSelectMember(img.filename, e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-xs outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
                >
                  <option value="">-- Unassigned --</option>
                  {activeCommittee.members.map((member) => {
                    const isTaken =
                      assignedMemberIds.has(member.id) && member.id !== selectedMemberId;
                    return (
                      <option value={member.id} key={member.id} disabled={isTaken}>
                        {member.name} {isTaken ? "(Mapped)" : ""}
                      </option>
                    );
                  })}
                </select>

                {selectedMember && (
                  <div className="mt-2 rounded-lg bg-emerald-50 p-2.5 text-[0.7rem] text-emerald-900">
                    <p className="font-bold">{selectedMember.name}</p>
                    <p className="text-emerald-700">{selectedMember.role}</p>
                    <p className="text-emerald-600 font-semibold">{selectedMember.organisation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Command / Code Instruction box */}
      <div className="rounded-xl border border-slate-200/80 bg-slate-900 p-6 text-white shadow-lg">
        <div className="flex items-center gap-2.5 font-display text-base font-bold text-lime">
          <ImageIcon className="size-5" />
          <span>Apply Mappings CLI Command</span>
        </div>
        <p className="mt-2 text-xs text-white/70">
          Run the following script to execute file copies in the existing directories and update{" "}
          <code className="text-lime">committee.ts</code>:
        </p>
        <pre className="mt-3 rounded-lg bg-black/50 p-4 text-xs font-mono text-lime select-all overflow-x-auto">
          npm run map:committee-images
        </pre>
      </div>
    </div>
  );
}
