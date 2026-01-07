import { Users, CalendarDays, IndianRupee, Star } from "lucide-react"
import { StatCard } from "./stat-card"

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Users}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-600"
        value="2,420"
        label="Total Participants"
        trend={{
          direction: "up",
          percentage: "40%",
          comparisonText: "vs last month",
        }}
      />
      <StatCard
        icon={CalendarDays}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
        value="85"
        label="Total events"
        trend={{
          direction: "down",
          percentage: "10%",
          comparisonText: "vs last month",
        }}
      />
      <StatCard
        icon={IndianRupee}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        value="₹4,75,000"
        label="Total Revenue"
        trend={{
          direction: "up",
          percentage: "20%",
          comparisonText: "vs last year",
        }}
      />
      <StatCard
        icon={Star}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        value="4.8"
        label="Average Rating"
        trend={{
          direction: "up",
          percentage: "25%",
          comparisonText: "vs last month",
        }}
      />
    </div>
  )
}
