import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AdminProfile } from "@/types/auth";
import { AdminSidebar } from "./AdminSidebar";

interface AdminMobileNavProps {
  admin: AdminProfile;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export function AdminMobileNav({ admin, isLoggingOut, onLogout }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-border bg-white text-mineral transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest lg:hidden"
          aria-label="Open admin navigation"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[min(21rem,88vw)] border-r-0 bg-mineral p-0 [&>button]:right-5 [&>button]:top-5 [&>button]:text-white [&>button]:focus:ring-lime"
      >
        <SheetTitle className="sr-only">Admin navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate the AIAIAC administration workspace.
        </SheetDescription>
        <AdminSidebar
          admin={admin}
          isLoggingOut={isLoggingOut}
          onLogout={onLogout}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
