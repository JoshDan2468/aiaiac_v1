import {
  Building2,
  CircleGauge,
  CreditCard,
  FileCheck2,
  FileText,
  Mail,
  Send,
  LayoutTemplate,
  ListChecks,
  GraduationCap,
  Inbox,
  Store,
  TicketCheck,
  UserPlus,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Permission } from "@/types/auth";

export interface AdminNavigationItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  permission?: Permission;
  ariaLabel?: string;
}

export interface AdminNavigationGroup {
  label: string;
  items: AdminNavigationItem[];
}

export const adminNavigation: AdminNavigationGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        ariaLabel: "Overview",
        icon: CircleGauge,
        href: "/admin/dashboard",
        permission: "registrations.read",
      },
    ],
  },
  {
    label: "Registration",
    items: [
      {
        label: "Delegates",
        icon: TicketCheck,
        href: "/admin/delegates",
        permission: "delegates.read",
      },
      {
        label: "Student Verification",
        icon: GraduationCap,
        href: "/admin/student-verifications",
        permission: "student_verifications.read",
      },
    ],
  },
  {
    label: "Commercial",
    items: [
      {
        label: "Sponsors",
        icon: Building2,
        href: "/admin/sponsor-applications",
        permission: "sponsors.read",
      },
      {
        label: "Exhibitors",
        icon: Store,
        href: "/admin/exhibitor-applications",
        permission: "exhibitors.read",
      },
    ],
  },
  {
    label: "Programme",
    items: [
      {
        label: "Abstracts",
        icon: FileCheck2,
        href: "/admin/abstract-submissions",
        permission: "abstracts.read",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        label: "Enquiries",
        icon: Inbox,
        href: "/admin/enquiries",
        permission: "enquiries.read",
      },
    ],
  },
  {
    label: "Communications",
    items: [
      {
        label: "Email Centre",
        icon: Mail,
        href: "/admin/communications",
        permission: "communications.read",
      },
      {
        label: "Campaigns",
        icon: Send,
        href: "/admin/communications/campaigns",
        permission: "communications.read",
      },
      {
        label: "Templates",
        icon: LayoutTemplate,
        href: "/admin/communications/templates",
        permission: "communications.read",
      },
      {
        label: "Delivery Activity",
        icon: ListChecks,
        href: "/admin/communications/deliveries",
        permission: "communications.read",
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        label: "Payments",
        icon: CreditCard,
        href: "/admin/payments",
        permission: "payments.read",
      },
    ],
  },
  {
    label: "Reporting",
    items: [
      {
        label: "Reports & Exports",
        icon: FileText,
        href: "/admin/reports",
        permission: "reports.read",
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Users & roles",
        ariaLabel: "Users & roles",
        icon: UsersRound,
        href: "/admin/users",
        permission: "users.read",
      },
      {
        label: "Invitations",
        icon: UserPlus,
        href: "/admin/users/invitations",
        permission: "users.read",
      },
    ],
  },
];

export function getAdminHomePath(permissions: readonly Permission[]): string {
  return (
    adminNavigation
      .flatMap((group) => group.items)
      .find((item) => item.href && (!item.permission || permissions.includes(item.permission)))
      ?.href ?? "/admin/login"
  );
}
