import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AssistantAvatar } from "./AssistantAvatar";

interface AssistantLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AssistantLauncher({ isOpen, onToggle }: AssistantLauncherProps) {
  const [showNudge, setShowNudge] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    // Check if nudge was shown/dismissed in this browser session
    const dismissed = sessionStorage.getItem("aiaiac_assistant_nudge_dismissed");
    if (!dismissed && !isOpen) {
      setFirstVisit(true);
      const showTimer = setTimeout(() => setShowNudge(true), 2500);
      const autoHideTimer = setTimeout(() => setShowNudge(false), 9500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(autoHideTimer);
      };
    }
    return undefined;
  }, [isOpen]);

  const dismissNudge = () => {
    setShowNudge(false);
    sessionStorage.setItem("aiaiac_assistant_nudge_dismissed", "true");
  };

  const handleLaunchClick = () => {
    dismissNudge();
    onToggle();
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end sm:bottom-32 sm:right-8 mb-[env(safe-area-inset-bottom,0px)]">
      {/* First-Visit Session Welcome Nudge Bubble */}
      {showNudge && !isOpen && (
        <div className="mb-3 flex max-w-xs items-center gap-2.5 rounded-2xl border border-lime/40 bg-[#072417] px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300">
          <AssistantAvatar size="sm" className="shrink-0" />
          <span className="font-sans text-xs leading-tight font-medium text-white/95">
            Hi! Need help with AIAIAC Africa 2027?
          </span>
          <button
            type="button"
            onClick={dismissNudge}
            aria-label="Dismiss message"
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Main Avatar Assistant Launcher Button */}
      <button
        type="button"
        onClick={handleLaunchClick}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close AIAIAC Assistant" : "Open AIAIAC Assistant"}
        className={cn(
          "group relative flex min-h-14 min-w-14 items-center gap-3 rounded-full border border-lime/50 bg-[#05190F] p-2 text-white shadow-2xl transition-all duration-300 hover:border-lime hover:bg-[#072417] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime active:scale-95",
          isOpen && "border-lime bg-[#072417] ring-2 ring-lime/40",
        )}
      >
        <AssistantAvatar
          size="lg"
          showPulse={firstVisit && !isOpen}
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Desktop Label Expansion */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-xs font-bold uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:pr-3 group-hover:opacity-100 group-focus-visible:max-w-xs group-focus-visible:pr-3 group-focus-visible:opacity-100">
          {isOpen ? "Close Assistant" : "Ask AIAIAC"}
        </span>
      </button>
    </div>
  );
}
