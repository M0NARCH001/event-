"use client"

import DashboardLayout from "@/components/layout/DashboardLayout"
import { ArtistRequestsCarousel } from "@/components/artist-request/artist-requests-carousel"

export default function ArtistRequestsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto p-3 md:p-6 space-y-6">
                <h1 className="text-2xl font-bold text-[#0c1b33]">Artists  Requests in Baatasari</h1>
                <ArtistRequestsCarousel />
            </div>
        </DashboardLayout>
    )
}
