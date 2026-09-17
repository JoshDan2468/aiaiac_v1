import { initialQuickReplies } from "@/data/conferenceAssistant";

export function QuickReplies({
  onSelectTopic,
}: {
  onSelectTopic: (topicId: string, label: string) => void;
}) {
  return (
    <div className="my-3 flex flex-wrap gap-2" aria-label="Suggested quick actions">
      {initialQuickReplies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          onClick={() => onSelectTopic(reply.topicId, reply.label)}
          className="flex min-h-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/95 transition-all duration-200 hover:border-lime hover:bg-lime/15 hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime active:scale-95"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
