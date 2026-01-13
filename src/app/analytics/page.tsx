"use client"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { EventOverview } from "@/components/analytics/event-overview"
import { EventStats } from "@/components/analytics/event-stats"
import { RevenueStats } from "@/components/analytics/revenue-stats"
import { DateReviewsSection } from "@/components/analytics/date-reviews"
import { EventDetailsDescription } from "@/components/analytics/event-details-description"
import { ApprovedStallsSection } from "@/components/analytics/approved-stalls"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="w-full px-0 sm:px-6 lg:px-8 py-6 space-y-6">
        <EventOverview />
        <EventStats />
        <RevenueStats />
        <ApprovedStallsSection />
        <DateReviewsSection />
        <EventDetailsDescription />
      </div>
    </DashboardLayout>
  );
}
