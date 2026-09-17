import { AssistantAvatar } from "./AssistantAvatar";

export function AssistantTypingIndicator() {
  return (
    <div className="mb-3 flex items-start gap-2.5 animate-in fade-in duration-200">
      <AssistantAvatar size="sm" className="mt-1 shrink-0" />
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/12 bg-[#0B2B20] px-4 py-3 text-lime shadow-md">
        <span className="size-1.5 animate-bounce rounded-full bg-lime [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-lime [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-lime" />
        <span className="ml-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-lime/70">
          AIAIAC Assistant is typing...
        </span>
      </div>
    </div>
  );
}
