"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const requests = [
    {
        title: "Art and Music Collaboration at beach",
        interest: 110,
        tag: "Fest and Gathering",
        image: "/party.svg",
        month: "June",
        location: "Novotel",
        about:
            "Get ready for an electrifying night filled with powerful performances and soul-stirring melodies. From heart-thumping beats to soothing harmonies, this concert promises a musical journey like no other.",
    },
    {
        title: "Beach Music Night",
        interest: 220,
        tag: "Popular",
        image: "/party.svg",
        month: "July",
        location: "Beach Arena",
        about: "An open-air music celebration featuring live bands and DJs.",
    },
    {
        title: "Art Expo 2025",
        interest: 90,
        tag: "Trending",
        image: "/party.svg",
        month: "August",
        location: "Vizag",
        about:
            "A creative gathering of artists and performers from across the country.",
    },
]

export function ArtistRequestsCarousel() {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    const totalCards = requests.length

    const getPosition = (index: number): number => {
        let diff = index - activeIndex
        if (diff > totalCards / 2) diff -= totalCards
        if (diff < -totalCards / 2) diff += totalCards
        return diff
    }

    const handleHostEvent = (e: React.MouseEvent, item: typeof requests[0]) => {
        e.stopPropagation();

        // Construct partial form data from the artist request
        const formData = {
            eventName: item.title,
            category: "Entertainment", // Defaulting based on context
            description: item.about,
            venue: item.location,
            date: "", // To be filled by user
            time: "",
            endTime: "",
            // Additional defaults
            googleMapsUrl: "",
            personnel: "",
            tagline: "",
            contactInfo: { mobile: "", email: "", website: "", additionalLinks: "" },
        };

        localStorage.setItem("eventFormData", JSON.stringify(formData));
        router.push("/create-event?startDirectly=true");
    }

    const navigate = (direction: "left" | "right") => {
        if (isAnimating) return
        setIsAnimating(true)
        setHovered(false)

        setTimeout(() => {
            if (direction === "right") {
                setActiveIndex((prev) => (prev + 1) % totalCards)
            } else {
                setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)
            }
            setIsAnimating(false)
        }, 100)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current
        const minSwipeDistance = 50

        if (Math.abs(diff) > minSwipeDistance) {
            diff > 0 ? navigate("right") : navigate("left")
        }
    }

    const handleCardClick = (index: number) => {
        if (index === activeIndex || isAnimating) return
        getPosition(index) > 0 ? navigate("right") : navigate("left")
    }

    return (
        <div className="w-full">
            {/* ================= CARDS ================= */}
            <div className="max-w-[1440px] mx-auto py-4 px-6 lg:py-12">

                {/* ================= MOBILE ================= */}
                <div
                    className="block lg:hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {requests.map((item, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-2">
                                    <div className="rounded-2xl bg-white border-2 border-[#0C1D37] shadow-2xl">
                                        <div className="p-4">
                                            {/* Image */}
                                            <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>

                                            {/* Info section */}
                                            <div className="mt-4">
                                                <div className="border rounded-lg p-3 mb-3">
                                                    <h2 className="text-lg font-semibold mb-1">Musical Concert</h2>
                                                    <p className="text-sm"><b>Month:</b> {item.month}</p>
                                                    <p className="text-sm"><b>Location:</b> {item.location}</p>
                                                </div>

                                                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-4 text-center mb-4">
                                                    <p className="text-3xl font-bold text-[#1f4fd8]">{item.interest}</p>
                                                    <p className="text-sm text-gray-600">Interest So Far</p>
                                                </div>

                                                <Button
                                                    className="w-full rounded-full bg-[#0c1d37] h-11"
                                                    onClick={(e) => handleHostEvent(e, item)}
                                                >
                                                    Host the Event
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {requests.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "bg-[#0c1d37] w-6" : "bg-gray-300 w-1.5"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden lg:block">
                    <div className="relative h-[580px] flex items-center justify-center">
                        {requests.map((item, index) => {
                            const position = getPosition(index)
                            const isActive = position === 0
                            const isExpanded = isActive && hovered
                            if (Math.abs(position) > 1) return null

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(index)}
                                    onMouseEnter={() => isActive && setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    style={{
                                        transform: `translateX(${position * 400}px) scale(${isActive ? 1 : 0.85})`,
                                        zIndex: isActive ? 30 : 20,
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                    className={`
                     absolute
                     grid
                     rounded-2xl
                     bg-white
                     overflow-hidden
                     cursor-pointer
                     transition-[width,transform,opacity,box-shadow]
                     duration-700
                     ease-out
 
                     ${isExpanded
                                            ? "w-[720px] min-h-[520px] grid-cols-[360px_1fr] grid-rows-[1fr_auto]"
                                            : "w-[360px] h-[520px] grid-cols-1"
                                        }
 
                     ${isActive
                                            ? "border-2 border-[#0C1D37] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                                            : "border border-gray-200 shadow-xl hover:shadow-2xl hover:opacity-80"
                                        }
                   `}
                                >
                                    {/* LEFT IMAGE + BASIC INFO */}
                                    <div className="p-4">
                                        <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-gray-50">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className={`
                           object-cover transition-transform duration-1000 ease-out
                           ${isActive && hovered ? "scale-110" : "scale-100"}
                         `}
                                            />
                                        </div>

                                        {!isExpanded && (
                                            <div>
                                                <h3 className="mt-4 font-semibold text-lg leading-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium text-[#1f4fd8]">{item.interest}</span> People show interest
                                                </p>
                                                <span
                                                    className={`
                             inline-block mt-3 text-xs px-4 py-1.5 rounded-full 
                             ${item.tag === "Popular"
                                                            ? "bg-green-100 text-green-700"
                                                            : item.tag === "Trending"
                                                                ? "bg-orange-100 text-orange-700"
                                                                : "bg-[#eee9ff] text-[#6b5ce7]"
                                                        }
                           `}
                                                >
                                                    {item.tag}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* RIGHT INFO PANEL - only render when expanded */}
                                    {isExpanded && (
                                        <div className="p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="border rounded-xl p-4 mb-4 hover:border-[#1f4fd8] hover:shadow-md transition-colors">
                                                    <h2 className="text-2xl font-semibold mb-2">
                                                        Musical Concert
                                                    </h2>
                                                    <p className="text-sm">
                                                        <b>Month:</b> {item.month}
                                                    </p>
                                                    <p className="text-sm">
                                                        <b>Location:</b> {item.location}
                                                    </p>
                                                </div>

                                                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 text-center mb-6 hover:shadow-lg transition-shadow">
                                                    <p className="text-4xl font-bold text-[#1f4fd8]">
                                                        {item.interest}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Interest So Far
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                className="rounded-full bg-[#0c1d37] h-12 hover:bg-[#1a2e4a] hover:shadow-xl transition-all"
                                                onClick={(e) => handleHostEvent(e, item)}
                                            >
                                                Host the Event
                                            </Button>
                                        </div>
                                    )}

                                    {/* ABOUT SECTION - only render when expanded */}
                                    {isExpanded && (
                                        <div className="col-span-2 px-6 pb-6">
                                            <h4 className="font-semibold text-lg mb-1">
                                                About the Event
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {item.about}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>


                </div>
            </div>
        </div>
    )
}
