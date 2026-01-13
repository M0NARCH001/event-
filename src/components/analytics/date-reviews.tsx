"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, subMonths, format, setMonth as setDateMonth, setYear as setDateYear } from "date-fns"

// --- Mock Data ---

// Custom modifiers for the calendar
// We highlight specific dates with different colors and values
const highlightedDates = [
    { date: new Date(2025, 0, 10), count: 20, color: "pink" },
    { date: new Date(2025, 0, 13), count: 100, color: "green" },
    { date: new Date(2025, 0, 14), count: 52, color: "yellow" },
    { date: new Date(2025, 0, 15), count: 17, color: "pink" },
    { date: new Date(2025, 0, 19), count: 31, color: "pink" },
    { date: new Date(2025, 0, 20), count: 83, color: "yellow" },
    { date: new Date(2025, 0, 27), count: 145, color: "green" },
]

const reviews = [
    {
        id: 1,
        name: "Riya Mehta",
        avatar: "/avatars/01.png", // fallback initials RM
        rating: 5,
        text: "An unforgettable evening! The organization was flawless — from entry to exit, everything ran smoothly. The sound and lights were just WOW!",
        time: "18 minutes ago"
    },
    {
        id: 2,
        name: "Rahul Deshmukh",
        avatar: "/avatars/02.png", // fallback RD
        rating: 5,
        text: "Enjoyed every bit of the music and lights. Slight delays in the schedule, but overall, a fantastic night",
        time: "18 minutes ago"
    },
    {
        id: 3,
        name: "Sanya Kapoor",
        avatar: "/avatars/03.png",
        rating: 4,
        text: "Great vibes and amazing performances. The crowd management could have been better though.",
        time: "2 hours ago"
    },
    {
        id: 4,
        name: "Amit Patel",
        avatar: "/avatars/04.png",
        rating: 5,
        text: "Absolutely loved it! Can't wait for the next event.",
        time: "1 day ago"
    }
]

export function DateReviewsSection() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 0, 10))
    const [month, setMonth] = React.useState<Date>(new Date(2025, 0, 1)) // Control the view month

    // Helper to get custom data for a date
    const getCustomData = (day: Date) => {
        return highlightedDates.find(d =>
            d.date.getDate() === day.getDate() &&
            d.date.getMonth() === day.getMonth() &&
            d.date.getFullYear() === day.getFullYear()
        )
    }



    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[400px_1fr] lg:grid-cols-[350px_1fr] md:p-8 p-4">
            {/* Left Card: Date Change */}
            {/* Left Card: Date Change */}
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-[#0c1b33]">Date Change</h2>


                {/* Inner Card Container */}
                <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-white shadow-sm flex flex-col">
                    {/* Calendar Navigation */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-transparent"
                            onClick={() => setMonth(prev => subMonths(prev, 1))}
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                        </Button>
                        <span className="text-lg text-gray-700 font-normal">
                            {format(month, "yyyy, d MMMM")}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-transparent"
                            onClick={() => setMonth(prev => addMonths(prev, 1))}
                        >
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                        </Button>
                    </div>

                    {/* Calendar Grid */}
                    <Calendar
                        mode="single"
                        month={month}
                        onMonthChange={setMonth}
                        selected={date}
                        onSelect={setDate}
                        className="p-0 w-full [&_.rdp-month]:w-full"
                        classNames={{
                            months: "w-full",
                            month: "w-full",
                            caption: "hidden",
                            nav: "hidden",
                            table: "w-full border-collapse",
                            head_row: "",
                            head_cell: "text-muted-foreground font-normal text-sm p-2 text-center",
                            row: "",
                            cell: "p-1 text-center relative",
                            day: "p-0 font-normal",
                            day_selected: "bg-transparent text-foreground",
                            day_today: "bg-gray-50 rounded-xl",
                            day_outside: "text-muted-foreground opacity-50",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_hidden: "invisible",
                        }}
                        components={{
                            DayButton: (props) => {
                                const { day, modifiers, className, ...buttonProps } = props;
                                const dateObj = day.date;

                                // Find custom data
                                const data = highlightedDates.find(d =>
                                    d.date.getDate() === dateObj.getDate() &&
                                    d.date.getMonth() === dateObj.getMonth() &&
                                    d.date.getFullYear() === dateObj.getFullYear()
                                )

                                let wrapperClass = "bg-gray-50 text-gray-700 hover:bg-gray-100" // Default
                                let countColor = ""

                                if (data) {
                                    if (data.color === "pink") wrapperClass = "bg-red-50 text-red-600 hover:bg-red-100"
                                    if (data.color === "green") wrapperClass = "bg-green-50 text-green-600 hover:bg-green-100"
                                    if (data.color === "yellow") wrapperClass = "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"

                                    if (data.color === "pink") countColor = "text-red-500"
                                    if (data.color === "green") countColor = "text-green-500"
                                    if (data.color === "yellow") countColor = "text-yellow-500"
                                }

                                // Handle selection styling
                                if (modifiers.selected) {
                                    if (!data) wrapperClass = "bg-[#0c1b33] text-white hover:bg-[#0c1b33]/90"
                                }

                                return (
                                    <button
                                        {...buttonProps}
                                        className={`w-10 h-12 sm:w-12 sm:h-14 flex flex-col items-center justify-center rounded-xl transition-all ${wrapperClass}`}
                                    >
                                        <span className="text-sm font-medium">{dateObj.getDate()}</span>
                                        {data && (
                                            <span className={`text-[10px] font-bold leading-none mt-0.5 ${countColor}`}>
                                                {data.count}
                                            </span>
                                        )}
                                    </button>
                                )
                            }
                        }}
                    />

                </div>
            </div>

            {/* Right Card: Customer Reviews */}
            <Card className="flex flex-col h-[600px]"> {/* Fixed height or as needed */}
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold">Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full overflow-hidden gap-6">
                    {/* Summary */}
                    <div className="flex items-center gap-6">
                        <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-2">
                                    <span className="text-xs w-6 text-muted-foreground">{star}.0</span>
                                    <Progress
                                        value={star === 5 ? 60 : star === 4 ? 50 : star === 3 ? 15 : star === 2 ? 30 : 40}
                                        className="h-2 [&>div]:bg-yellow-400"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center min-w-[100px]">
                            <span className="text-5xl font-bold">4.0</span>
                            <div className="flex gap-0.5 my-1">
                                <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
                                <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
                                <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
                                <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
                                <Star className="text-muted-foreground h-4 w-4" />
                            </div>
                            <span className="text-xs text-muted-foreground">500 reviews</span>
                        </div>
                    </div>

                    {/* Scrollable Reviews List */}
                    <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="rounded-lg border p-4 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={review.avatar} />
                                            <AvatarFallback>{review.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-sm">{review.name}</span>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {review.text}
                                </p>
                                <p className="text-xs text-muted-foreground">{review.time}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
