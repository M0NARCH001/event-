"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Label, Pie, PieChart, Cell } from "recharts"
import { ArrowUp, ShoppingBag, Users, Clock, BookmarkCheck } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const revenueData = [
  { day: "Mon", revenue: 1500 },
  { day: "Tue", revenue: 2300 },
  { day: "Wed", revenue: 3200 }, // Peak 1
  { day: "Thu", revenue: 1600 },
  { day: "Fri", revenue: 2500 }, // Peak 2
  { day: "Sat", revenue: 1200 },
  { day: "Sun", revenue: 4000 }, // Peak 3
  { day: "Mon2", revenue: 2800 },
  { day: "Tue2", revenue: 3800 },
  { day: "Wed2", revenue: 2000 },
  { day: "Thu2", revenue: 3500 },
  { day: "Fri2", revenue: 2300 },
  { day: "Sat2", revenue: 3000 },
  { day: "Sun2", revenue: 1000 },
]

// Adjust data to look more like the wave in the image
const waveData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 1000 },
  { name: "Wed", value: 800 },
  { name: "Thu", value: 2500 },
  { name: "Fri", value: 1200 },
  { name: "Sat", value: 2000 },
  { name: "Sun", value: 800 },
  { name: "Mon2", value: 2200 },
  { name: "Tue2", value: 1100 },
  { name: "Wed2", value: 2600 },
  { name: "Thu2", value: 1700 },
  { name: "Fri2", value: 2400 },
  { name: "Sat2", value: 1600 },
  { name: "Sun2", value: 400 },
  { name: "Mon3", value: 0 },
].map((item, index) => ({
  ...item,
  // Smooth out the curve? Recharts 'natural' curve does this well.
  value: item.value + 500
}));


const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(215, 60%, 45%)", // Dark blueish
  },
} satisfies ChartConfig

const radialData = [
  { name: "Booked", value: 79, fill: "hsl(215, 60%, 50%)" },
  { name: "Remaining", value: 21, fill: "transparent" }
]

// Client-only wrapper to prevent hydration mismatch from Recharts dynamic IDs
function ClientOnlyPieChart({ radialData }: { radialData: { name: string; value: number; fill: string }[] }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[100px] h-[100px]" /> // Placeholder with same dimensions
  }

  return (
    <PieChart width={100} height={100}>
      <Pie
        data={radialData}
        cx="50%"
        cy="50%"
        innerRadius={35}
        outerRadius={45}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        stroke="none"
      >
        <Cell key="cell-0" fill="#3b82f6" />
        <Cell key="cell-1" fill="#334155" />
      </Pie>
    </PieChart>
  )
}

export function RevenueStats() {
  return (
    <div className="p-8 pt-0">
      <Card className="col-span-3"> {/* col-span-3 if used in grid, but here it's full width */}
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-semibold mb-4">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vip" className="w-full">
            <TabsList className="w-full h-auto justify-start rounded-none border-b bg-transparent p-0 mb-6">
              <TabsTrigger
                value="vip"
                className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-2 sm:px-4 pb-3 pt-2 text-xs sm:text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                VIP
              </TabsTrigger>
              <TabsTrigger
                value="regular"
                className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-2 sm:px-4 pb-3 pt-2 text-xs sm:text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Regular
              </TabsTrigger>
              <TabsTrigger
                value="child"
                className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-2 sm:px-4 pb-3 pt-2 text-xs sm:text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Child
              </TabsTrigger>
              <TabsTrigger
                value="family"
                className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-2 sm:px-4 pb-3 pt-2 text-xs sm:text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Family
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vip" className="space-y-6">

              {/* Chart Area - with invisible scroll for mobile */}
              <div className="overflow-x-auto scrollbar-hide pb-2">
                <div className="relative h-[320px] w-full min-w-[500px] rounded-2xl bg-muted/10 p-4 border border-border/50">
                  <div className="absolute top-6 left-6 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">₹10,800.80</span>
                      <div className="rounded-full border border-blue-200 bg-white p-0.5">
                        <ArrowUp className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Total Earning</p>
                  </div>

                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <AreaChart
                      accessibilityLayer
                      data={waveData}
                      margin={{
                        left: 0,
                        right: 0,
                        top: 40,
                        bottom: 10,
                      }}
                    >
                      <defs>
                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={4}
                        interval={3} // Show fewer labels
                        hide // Hide labels to match image style mostly or show simplified
                      />
                      {/* 
                       Replicating the vertical lines in the image would require CartesianGrid with vertical=true and horizontal=false, 
                       but standard Recharts Grid might not match purely. 
                       Let's add a light vertical grid.
                     */}
                      <CartesianGrid vertical={true} horizontal={false} strokeOpacity={0.2} strokeDasharray="4 4" />

                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                      <Area
                        dataKey="value"
                        type="natural"
                        fill="url(#fillRevenue)"
                        fillOpacity={0.4}
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                  {/* Custom X Axis labels at bottom if needed, simpler to just use Recharts XAxis or simulated */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                {/* Card 1: 79% Booked (Dark) */}
                <Card className="bg-zinc-950 text-white border-none flex flex-col items-center justify-center p-4 shadow-lg">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    {/* Simple Pie Chart for Circular Progress - rendered client-side only */}
                    <ClientOnlyPieChart radialData={radialData} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">79%</span>
                      <span className="text-[10px] text-zinc-400">Booked</span>
                    </div>
                  </div>
                </Card>

                {/* Card 2: 43 Add-Ons */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-zinc-50/50">
                  <ShoppingBag className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-2xl font-bold">43</span>
                  <span className="text-xs font-semibold text-muted-foreground">Add-Ons</span>
                </Card>

                {/* Card 3: 4 Sponsors */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-zinc-50/50">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-2xl font-bold">4</span>
                  <span className="text-xs font-semibold text-muted-foreground">Sponsors</span>
                </Card>

                {/* Card 4: 234 Last-Minute tickets */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-zinc-50/50">
                  <Clock className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-2xl font-bold">234</span>
                  <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Last-Minute tickets</span>
                </Card>

                {/* Card 5: 75% Early Birds */}
                <Card className="flex flex-col items-center justify-center p-4 border-none shadow-sm bg-zinc-50/50">
                  <BookmarkCheck className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-2xl font-bold">75%</span>
                  <span className="text-xs font-semibold text-muted-foreground">Early Birds</span>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="regular" className="h-[200px] flex items-center justify-center text-muted-foreground">
              No data for Regular
            </TabsContent>
            <TabsContent value="child" className="h-[200px] flex items-center justify-center text-muted-foreground">
              No data for Child
            </TabsContent>
            <TabsContent value="family" className="h-[200px] flex items-center justify-center text-muted-foreground">
              No data for Family
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
