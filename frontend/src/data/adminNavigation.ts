import {
  BookOpenText,
  CircleGauge,
  CreditCard,
  FileCheck2,
  FileText,
  GraduationCap,
  Image,
  Inbox,
  Megaphone,
  Settings,
  TicketCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Permission } from "@/types/auth";

export interface AdminNavigationItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  permission?: Permission;
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
      {
        label: "Delegates",
        icon: TicketCheck,
        href: "/admin/delegates",
        permission: "delegates.read",
      },
      {
        label: "Payments",
        icon: CreditCard,
        href: "/admin/payments",
        permission: "payments.read",
      },
      {
        label: "Student verification",
        icon: GraduationCap,
        href: "/admin/student-verifications",
        permission: "student_verifications.read",
      },
      { label: "Abstract submissions", icon: FileCheck2, permission: "registrations.read" },
      { label: "Enquiries", icon: Inbox, permission: "registrations.read" },
      { label: "Conference content", icon: BookOpenText, permission: "settings.manage" },
      { label: "Communications", icon: Megaphone, permission: "communications.read" },
      { label: "Reports", icon: FileText, permission: "reports.export" },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Users & roles",
        icon: UsersRound,
        href: "/admin/users",
        permission: "users.read",
      },
      {
        label: "Image mapper",
        icon: Image,
        href: "/admin/image-mapper",
        permission: "settings.manage",
      },
      { label: "System settings", icon: Settings, permission: "settings.manage" },
    ],
  },
];
