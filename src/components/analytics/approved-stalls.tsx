"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Duplicated for now to avoid circular dependency or import issues
// Ideally this should be in a lib/constants.ts file
const STALLS_DATA = [
    {
        title: "Twinkle Tales",
        category: "Accessories",
        image: "/jewelry-and-accessories-shop.jpg",
    },
    {
        title: "Taste Town",
        category: "Food",
        image: "/delicious-street-food-stall.jpg",
    },
    {
        title: "Handmade Haven",
        category: "Crafts",
        image: "/handmade-crafts-and-plushies.jpg",
    },
    {
        title: "Melody Makers",
        category: "Live Music",
        image: "/band-on-stage.png",
    },
    {
        title: "Fun Zone",
        category: "Gaming",
        image: "/colorful-board-game-or-carnival-game.jpg",
    },
    {
        title: "LEGENDS of hip-Hop",
        category: "Music",
        image: "/hip-hop-concert-poster.jpg",
    },
]

export function ApprovedStallsSection() {
    const [approvedStalls, setApprovedStalls] = useState<string[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const stored = localStorage.getItem("approvedStalls")
        if (stored) {
            try {
                setApprovedStalls(JSON.parse(stored))
            } catch (e) {
                console.error("Failed to parse approved stalls", e)
            }
        }
    }, [])

    if (!mounted) return null // Prevent hydration mismatch

    if (approvedStalls.length === 0) return null // Don't show if no stalls approved

    const stallsToShow = STALLS_DATA.filter(stall => approvedStalls.includes(stall.title))

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Approved Stalls</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stallsToShow.map((stall) => (
                        <div
                            key={stall.title}
                            className="bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col group"
                        >
                            <div className="relative aspect-[16/9] w-full">
                                <Image
                                    src={stall.image || "/placeholder.svg"}
                                    alt={stall.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                    Approved
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-lg text-slate-900 leading-tight font-albert mb-1">{stall.title}</h3>
                                <p className="text-slate-500 text-xs font-poppins">{stall.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
