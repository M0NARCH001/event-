"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, ChevronDown, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"

export function AllEventsSection() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)

    const eventsPage1 = [
        { date: "May 3, 2025", name: "Elyzium Band Live", category: "Entertainment", status: "Ongoing", action: "Edit" },
        { date: "May 14–16, 2025", name: "Bharat Marine Systems 2025", category: "Defense", status: "Upcoming", action: "Edit" },
        { date: "May 14–16, 2025", name: "GeoSpace Bharat 2025", category: "Technology", status: "Upcoming", action: "Edit" },
        { date: "May 14–16, 2025", name: "SwaRaksha Mahotsav 2025", category: "Public Safety", status: "Upcoming", action: "Edit" },
        { date: "May 14–16, 2025", name: "Drone Shaurya Global Summit & Expo", category: "Technology", status: "Upcoming", action: "Edit" },
    ]

    const eventsPage2 = [
        { date: "March 21, 2025", name: "MARITZA CORREA Vizag", category: "Music Concert", status: "Past", action: "Repeat" },
        { date: "March 21, 2025", name: "MARITZA CORREA Vizag", category: "Music Concert", status: "Past", action: "Repeat" },
        { date: "March 21, 2025", name: "MARITZA CORREA Vizag", category: "Music Concert", status: "Past", action: "Repeat" },
    ]

    const events = currentPage === 1 ? eventsPage1 : eventsPage2

    const handleAction = (event: any, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row click

        // Construct partial form data from the list item
        const formData = {
            eventName: event.name,
            category: event.category,
            // Basic mapping since we only have limited data here. 
            // In a real app, you'd fetch the full event details by ID.
            description: `Description for ${event.name}`,
            date: event.date,
            // Initialize other required fields with defaults to avoid validation errors immediately
            time: "",
            endTime: "",
            venue: "",
            googleMapsUrl: "",
            personnel: "",
            tagline: "",
            contactInfo: { mobile: "", email: "", website: "", additionalLinks: "" },
            // Add any other defaults needed for a valid start
        };

        if (event.action === "Repeat") {
            // Clear date/time fields for repeat action
            formData.date = "";
            formData.time = "";
            formData.endTime = "";
        }

        // Save to localStorage so EventPage can pick it up
        localStorage.setItem("eventFormData", JSON.stringify(formData));

        // Navigate to create event page
        // startDirectly=true ensures the form opens immediately
        router.push("/create-event?startDirectly=true");
    };

    const handleRowClick = (event: any) => {
        // Save minimal event data for analytics page to consume
        const analyticsData = {
            eventName: event.name,
            date: event.date,
            category: event.category,
            status: event.status
        };
        localStorage.setItem("analyticsEventData", JSON.stringify(analyticsData));
        router.push("/analytics");
    };

    return (
        <section className="bg-white rounded-xl border overflow-hidden">
            {/* Header */}
            <div className="bg-[#3b5f8f] px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-white font-medium text-lg">
                    All Events
                </h3>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="relative w-full sm:w-auto">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                        />
                        <Input
                            placeholder="Search Events"
                            className="pl-9 h-10 w-full sm:w-56 bg-[#3b5f8f] text-white placeholder:text-white/70 border border-white/40"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="bg-white text-[#3b5f8f] h-10">
                            <Calendar size={16} className="mr-2" />
                            Calendar
                        </Button>

                        <button className="h-10 w-10 bg-white rounded flex items-center justify-center">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    Date
                                    <ChevronDown size={16} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    Category
                                    <ChevronDown size={16} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action required</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => handleRowClick(event)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">{event.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{event.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{event.category}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`${event.status === "Ongoing" ? "text-green-600" :
                                        event.status === "Upcoming" ? "text-blue-600" :
                                            "text-gray-500"
                                        }`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <Button
                                        size="sm"
                                        onClick={(e) => handleAction(event, e)}
                                        className={`${event.action === "Repeat" ? "bg-blue-900 hover:bg-blue-800" : "bg-gray-900 hover:bg-gray-800"} text-white px-6 rounded-full`}
                                    >
                                        {event.action}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft size={16} />
                    Previous
                </Button>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={`px-3 py-1 rounded border text-sm font-medium ${currentPage === 1 ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => setCurrentPage(2)}
                        className={`px-3 py-1 rounded border text-sm font-medium ${currentPage === 2 ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
                    >
                        2
                    </button>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
                    disabled={currentPage === 2}
                    className="flex items-center gap-2"
                >
                    Next
                    <ChevronRight size={16} />
                </Button>
            </div>
        </section>
    )
}
