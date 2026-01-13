"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const GradientCursor = ({ points, height }: any) => {
  if (!points || !points.length) return null

  const x = points[0].x

  // 🔧 Control size here
  const BAR_WIDTH = 36      // ⬅ increase breadth
  const BAR_HEIGHT = 120    // ⬅ reduce length
  const BAR_RADIUS = 14

  // Position bar vertically near bottom
  const y = height - BAR_HEIGHT - 12

  return (
    <g>
      <defs>
        {/* 🔁 Inverted gradient (strong bottom → fade top) */}
        <linearGradient id="hoverGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#0f172a" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x={x - BAR_WIDTH / 2}
        y={y}
        width={BAR_WIDTH}
        height={BAR_HEIGHT}
        rx={BAR_RADIUS}
        fill="url(#hoverGradient)"
      />
    </g>
  )
}

/* Mock Data for Different Periods */
const monthlyData = [
  { label: "Jan", revenue: 10, tickets: 150 },
  { label: "Feb", revenue: 15, tickets: 220 },
  { label: "Mar", revenue: 40, tickets: 450 },
  { label: "Apr", revenue: 45, tickets: 500 },
  { label: "May", revenue: 35, tickets: 380 },
  { label: "Jun", revenue: 30, tickets: 320 },
  { label: "Jul", revenue: 60, tickets: 650 },
  { label: "Aug", revenue: 55, tickets: 590 },
  { label: "Sep", revenue: 50, tickets: 540 },
  { label: "Oct", revenue: 65, tickets: 700 },
  { label: "Nov", revenue: 70, tickets: 750 },
  { label: "Dec", revenue: 80, tickets: 850 },
]

const weeklyData = [
  { label: "Mon", revenue: 5, tickets: 50 },
  { label: "Tue", revenue: 8, tickets: 80 },
  { label: "Wed", revenue: 12, tickets: 120 },
  { label: "Thu", revenue: 10, tickets: 100 },
  { label: "Fri", revenue: 20, tickets: 200 },
  { label: "Sat", revenue: 35, tickets: 350 },
  { label: "Sun", revenue: 30, tickets: 300 },
]

const yearlyData = [
  { label: "2021", revenue: 150, tickets: 1500 },
  { label: "2022", revenue: 200, tickets: 2200 },
  { label: "2023", revenue: 350, tickets: 3800 },
  { label: "2024", revenue: 450, tickets: 4900 },
  { label: "2025", revenue: 500, tickets: 5500 },
]

export function AnalyticsChart() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const metric = searchParams.get("metric") || "revenue"
  const period = searchParams.get("period") || "monthly"

  const updateRoute = (newMetric?: string, newPeriod?: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newMetric) params.set("metric", newMetric)
    if (newPeriod) params.set("period", newPeriod)

    router.push(`?${params.toString()}`, { scroll: false })
  }

  // Determine which data to use based on period
  const getChartData = () => {
    switch (period) {
      case "weekly": return weeklyData;
      case "yearly": return yearlyData;
      default: return monthlyData;
    }
  }

  const data = getChartData();
  const dataKey = metric === "tickets" ? "tickets" : "revenue";
  const labelKey = "label"; // X-axis key

  // Scroll visibility logic: monthly and yearly usually need scroll if many items, weekly fits. 
  // Let's keep scroll for safety but maybe adjust min-width for shorter datasets
  const minWidth = period === "yearly" ? "300px" : "600px";

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
          <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
            Insights & Analytics
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Tickets */}
            <Button
              variant={metric === "tickets" ? "default" : "outline"}
              size="sm"
              className={`h-8 px-4 rounded-full transition-colors ${metric === "tickets"
                ? "bg-[#0c1b33] text-white hover:bg-[#0c1b33]/90"
                : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                }`}
              onClick={() => updateRoute("tickets")}
            >
              Tickets
            </Button>

            {/* Revenue */}
            <Button
              variant={metric === "revenue" ? "default" : "outline"}
              size="sm"
              className={`h-8 px-4 rounded-full transition-colors ${metric === "revenue"
                ? "bg-[#0c1b33] text-white hover:bg-[#0c1b33]/90"
                : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                }`}
              onClick={() => updateRoute("revenue")}
            >
              Revenue
            </Button>

            {/* Period Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 border-transparent bg-gray-100 text-gray-700 capitalize rounded-full hover:bg-gray-200 hover:text-gray-900"
                >
                  {period} <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-gray-100 border-gray-200">
                {["weekly", "monthly", "yearly"].map((p) => (
                  <DropdownMenuItem
                    key={p}
                    onClick={() => updateRoute(undefined, p)}
                    className="capitalize text-gray-900 focus:text-gray-900 focus:bg-gray-200 cursor-pointer"
                  >
                    {p}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Chart with horizontal scroll */}
        <div className="overflow-x-auto overflow-y-visible pb-4 scrollbar-hide">
          <div className={`h-80`} style={{ minWidth: minWidth }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
                <XAxis
                  dataKey={labelKey}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  tick={{ fill: "#93a3b8", fontSize: 12 }}
                  dy={10}
                />

                <YAxis hide />

                <Tooltip
                  cursor={<GradientCursor />}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const val = payload[0].value as number;
                      const displayVal = metric === "revenue" ? `₹${val * 1000}` : val.toString();
                      return (
                        <div
                          className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200 will-change-transform will-change-opacity"
                          style={{
                            animation: "tooltipFade 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        >
                          <p className="text-xs text-[#0c1b33] mb-1">
                            {label}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {displayVal}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />


                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#2563eb",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  isAnimationActive
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
