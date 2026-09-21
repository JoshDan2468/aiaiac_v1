export interface AdminOverviewMetrics {
  readonly totalRegistrations: number;
  readonly paidRegistrations: number;
  readonly pendingPayments: number;
  readonly confirmedRevenue: {
    readonly NGN: number;
    readonly USD: number;
  };
  readonly sponsorEnquiries: 0;
  readonly exhibitorEnquiries: 0;
  readonly abstractSubmissions: 0;
}

export interface AdminRecentActivity {
  readonly type: string;
  readonly summary: string;
  readonly occurredAt: Date;
}

export interface AdminOverview {
  readonly metrics: AdminOverviewMetrics;
  readonly recentActivity: AdminRecentActivity[];
}
