import {
  BookOpenText,
  CircleGauge,
  CreditCard,
  FileCheck2,
  FileText,
  Inbox,
  Settings,
  TicketCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { AdminRole } from "@/types/auth";

export interface AdminNavigationItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  roles?: AdminRole[];
}

export interface AdminNavigationGroup {
  label: string;
  items: AdminNavigationItem[];
}

export const adminNavigation: AdminNavigationGroup[] = [
  {
    label: "Workspace",
    items: [{ label: "Overview", icon: CircleGauge, href: "/admin/dashboard" }],
  },
  {
    label: "Operations",
    items: [
      { label: "Registrations", icon: TicketCheck },
      { label: "Payments", icon: CreditCard },
      { label: "Abstract submissions", icon: FileCheck2 },
      { label: "Enquiries", icon: Inbox },
      { label: "Conference content", icon: BookOpenText },
      { label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Users & roles", icon: UsersRound, roles: ["SUPER_ADMIN"] },
      { label: "System settings", icon: Settings, roles: ["SUPER_ADMIN"] },
    ],
  },
];
