"use client"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { UpcomingEventsSection } from "@/components/manage-events/upcoming-events-section"
import { AllEventsSection } from "@/components/manage-events/all-events-section"

export default function ManageEventsPage() {
    return (
        <DashboardLayout>
            <div className="px-6 sm:px-6 lg:px-10 py-6 max-w-[1600px] mx-auto">
                <UpcomingEventsSection />
                <AllEventsSection />
            </div>
        </DashboardLayout>
    )
}
