"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function UpcomingEventsSection() {
    const router = useRouter()

    const handleEventClick = () => {
        // Save mock data for the upcoming event
        const analyticsData = {
            eventName: "MARITZA CORREA Vizag",
            date: "Wednesday, 28 May 2025",
            category: "Music Concert",
            status: "Upcoming"
        };
        localStorage.setItem("analyticsEventData", JSON.stringify(analyticsData));
        router.push("/analytics");
    };

    const handleReschedule = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Just navigate to create event for now, similar to 'Edit'
        const formData = {
            eventName: "MARITZA CORREA Vizag",
            category: "Music Concert",
            description: "Music Concert Description",
            date: "2025-05-28",
            time: "16:15",
            endTime: "20:30",
            venue: "Qubaa (Vizag)"
        };
        localStorage.setItem("eventFormData", JSON.stringify(formData));
        router.push("/create-event?startDirectly=true");
    };

    return (
        <section className="bg-white rounded-xl border p-4 sm:p-6 mb-8 hover:shadow-md transition-shadow cursor-pointer" onClick={handleEventClick}>
            <h2 className="text-xl font-semibold text-[#284878] mb-5">
                Upcoming Events
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0">
                    <Image
                        src="/event-img.svg"
                        alt="Event poster"
                        width={180}
                        height={260}
                        className="rounded-lg object-cover mx-auto lg:mx-0"
                    />
                    <p className="text-center text-sm font-medium text-gray-700 mt-3">MARITZA CORREA Vizag</p>
                </div>

                {/* Details */}
                <div className="flex-1 text-sm space-y-2">
                    <p className="font-semibold text-[#203D69]">
                        Wednesday, 28 May 2025
                    </p>


                    <p><b>Time:</b> 4:15 – 8:30 PM</p>
                    <p><b>Type:</b> Music Concert</p>
                    <p><b>Venue:</b> <span className="text-blue-600 font-medium">Qubaa (Vizag)</span></p>

                    {/* About */}
                    <div className="pt-3">
                        <p className="font-semibold text-[#284878] mb-1">
                            About The Event
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Get ready for an electrifying musical transformation as we dive
                            into the world of heavyweight mutati
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2">
                        <p className="font-semibold text-[#284878] mb-1">
                            Event Highlights
                        </p>
                        <ul className="list-disc ml-4 text-gray-600 text-sm">
                            <li>
                                one of the sensational USA maestros
                                <br />
                                <span className="ml-0">@djmaritzacorrea who has set hearts racing with her mind-blowing</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Stats */}
                <div className="w-full lg:w-[300px]">
                    <div className="grid grid-cols-2 gap-4">
                        <Stat title="Event Registrations" value="375" />
                        <Stat title="Total Revenue" value="₹10,00,000" />
                        <Stat title="Ad Ons" value="20" />
                        <Stat title="Date Change" value="45" />
                    </div>
                    {/* Buttons - separate container below stats */}
                    <div className="flex flex-wrap gap-3 mt-6 justify-center">
                        <Button
                            variant="outline"
                            className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 text-xs sm:text-sm px-4 py-2"
                            onClick={(e) => { e.stopPropagation(); /* Handle cancel logic */ }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full border-gray-800 text-gray-900 hover:bg-gray-50 text-xs sm:text-sm px-4 py-2"
                            onClick={handleReschedule}
                        >
                            Reschedule
                        </Button>
                        <Button
                            className="rounded-full bg-[#0c1d37] text-white text-xs sm:text-sm px-4 py-2"
                            onClick={(e) => { e.stopPropagation(); handleEventClick(); }}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Stat({ title, value }: { title: string; value: string }) {
    return (
        <div className="border rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">{title}</p>
            <p className="text-lg font-bold">{value}</p>
        </div>
    )
}
