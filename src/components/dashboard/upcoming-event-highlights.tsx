"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function UpcomingEventHighlights() {
  return (
    <Card>
      <CardContent className="p-6 pb-2">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Upcoming Event Highlights
        </h2>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_auto] gap-6 items-start overflow-hidden">

          {/* Event Poster */}
          <div className="bg-gray-300 rounded-lg aspect-[2/3] w-full max-w-[280px] mx-auto lg:mx-0" />

          {/* Event Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                MARITZA CORREA Vizag
              </h3>
              <p className="text-base text-gray-700 mt-1">
                Wednesday, 28 May 2025
              </p>
            </div>

            <div className="space-y-1 text-sm text-gray-700">
              <p>Time: 4:15 - 8:30 PM</p>
              <p>Type: Music Concert</p>
              <p>Venue: Qubaa (Vizag)</p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-[#1e3a8a] mb-2">
                About The Event
              </h4>
              <p className="text-sm text-gray-700">
                Get ready for an electrifying musical transformation as we dive
                into the world of heavyweight music!
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-[#1e3a8a] mb-2">
                Event Highlights
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    One of the sensational USA maestros @djmaritzacorrea who has
                    set hearts racing with her mind-blowing performance.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* STATS GRID (FIXED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:min-w-[400px]">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-1">
                  Event Registrations
                </p>
                <p className="text-3xl font-bold text-gray-900">375</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹10,00,000
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-1">Ad Ons</p>
                <p className="text-3xl font-bold text-gray-900">20</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-1">Date Change</p>
                <p className="text-3xl font-bold text-gray-900">45</p>
              </CardContent>
            </Card>

            {/* ACTION BUTTONS - inside stats grid */}
            <div className="col-span-1 sm:col-span-2 flex flex-wrap gap-3 mt-4 justify-center">
              <Button
                variant="outline"
                className="border-2 border-red-500 text-red-600 bg-white hover:bg-red-50 px-4 sm:px-6 h-10 sm:h-12 rounded-full font-medium text-sm"
                onClick={() => alert('Cancel Event functionality needs to be implemented')}
              >
                Cancel
              </Button>

              <Button
                variant="outline"
                className="border-2 border-gray-800 bg-white hover:bg-gray-50 text-gray-900 px-4 sm:px-6 h-10 sm:h-12 rounded-full font-medium text-sm"
                onClick={() => alert('Reschedule Event functionality needs to be implemented')}
              >
                Reschedule
              </Button>

              <Button
                className="bg-[#0c1b33] hover:bg-[#0c1b33]/90 text-white px-4 sm:px-6 h-10 sm:h-12 rounded-full font-medium text-sm shadow-md transition-transform active:scale-95"
                onClick={() => alert('Viewing Event Details...')}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
