"use client"

import { Suspense } from "react";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { UpcomingEventHighlights } from "@/components/dashboard/upcoming-event-highlights";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hello Maggi!</h1>
          <p className="text-gray-600 mt-1">
            Track, update, and grow your events the smart way.
          </p>
        </div>

        <StatsGrid />
        <UpcomingEventHighlights />

        {/* Suspense boundary + valid size container prevents build crash & -1 dimension warning */}
        <Suspense fallback={null}>
          <div className="w-full min-w-[1px] aspect-video">
            <AnalyticsChart />
          </div>
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
