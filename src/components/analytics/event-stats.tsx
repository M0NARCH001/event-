"use client"

import * as React from "react"
import { Bar, BarChart, Label, Pie, PieChart, RadialBar, RadialBarChart, XAxis, YAxis, PolarAngleAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// --- Chart 1: Registered Participants ---
const registeredData = [
  { category: "total", registered: 375, available: 25 },
]

const registeredConfig = {
  registered: {
    label: "Registered",
    color: "hsl(230, 60%, 65%)", // Approximate blue-purple
  },
  available: {
    label: "Available",
    color: "hsl(100, 70%, 65%)", // Approximate light green
  },
} satisfies ChartConfig

// --- Chart 2: Demographics ---
const demographicsData = [
  { type: "Male", visitors: 50, fill: "hsl(210, 90%, 75%)" }, // Light Blue
  { type: "Female", visitors: 30, fill: "hsl(340, 80%, 75%)" }, // Pink
  { type: "Other", visitors: 10, fill: "hsl(0, 0%, 75%)" },    // Grey
]

const demographicsConfig = {
  visitors: {
    label: "Visitors",
  },
  Male: {
    label: "Male",
    color: "hsl(210, 90%, 75%)",
  },
  Female: {
    label: "Female",
    color: "hsl(340, 80%, 75%)",
  },
  Other: {
    label: "Other",
    color: "hsl(0, 0%, 75%)",
  },
} satisfies ChartConfig

// --- Chart 3: Cancelled Tickets ---
const cancelledData = [
  { name: "cancelled", value: 12, fill: "hsl(0, 80%, 65%)" }, // Reddish
]

const cancelledConfig = {
  cancelled: {
    label: "Cancelled",
    color: "hsl(0, 80%, 65%)",
  },
} satisfies ChartConfig

export function EventStats() {
  return (
    <div className="grid gap-4 p-8 pt-0 md:grid-cols-3">
      {/* Card 1: Registered Participants */}
      <Card className="flex flex-col">
        <CardHeader className="items-start pb-2">
          <CardTitle className="text-lg font-medium">Registered Participants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-center">
          <div className="mb-4 flex justify-between px-2 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-semibold uppercase">Registered</span>
              <span className="text-2xl font-bold">375</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-muted-foreground text-xs font-semibold uppercase">Available</span>
              <span className="text-2xl font-bold">25</span>
            </div>
          </div>
          {/* Custom Bar Display using ChartContainer for consistent tooltip/theme if needed, but styling manually for split pill look */}
          <ChartContainer config={registeredConfig} className="h-[50px] w-full">
            <BarChart
              accessibilityLayer
              data={registeredData}
              layout="vertical"
              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              barSize={32}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="category" hide />
              <ChartTooltip content={<ChartTooltipContent accessibilityLayer={false} />} />
              <Bar
                dataKey="registered"
                stackId="a"
                fill="var(--color-registered)"
                radius={[20, 0, 0, 20]}
              />
              <Bar
                dataKey="available"
                stackId="a"
                fill="var(--color-available)"
                radius={[0, 20, 20, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Card 2: Demographics */}
      <Card className="flex flex-col">
        <CardHeader className="items-start pb-0">
          <CardTitle className="text-lg font-medium">Demographics (M/F/O)</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={demographicsConfig} className="mx-auto aspect-square max-h-[140px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel accessibilityLayer={false} />} />
              <Pie
                data={demographicsData}
                dataKey="visitors"
                nameKey="type"
                innerRadius={30}
                outerRadius={60}
                strokeWidth={5}
              />
            </PieChart>
          </ChartContainer>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[hsl(210,90%,75%)]"></div>
              <span className="text-sm">Male</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[hsl(340,80%,75%)]"></div>
              <span className="text-sm">Female</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[hsl(0,0%,75%)]"></div>
              <span className="text-sm">Other</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Cancelled Tickets */}
      <Card className="flex flex-col">
        <CardHeader className="items-start pb-2">
          <CardTitle className="text-lg font-medium">Cancelled Tickets</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <div className="flex w-full items-center justify-between px-4">
            <span className="text-5xl font-medium tracking-tight">{cancelledData[0].value.toString().padStart(2, '0')}</span>
            <ChartContainer
              config={cancelledConfig}
              className="mx-auto aspect-square max-h-[100px] w-full max-w-[120px]"
            >
              <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <radialGradient id="cancelGradient">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                  </radialGradient>
                </defs>
                {/* Background Track */}
                <Pie
                  data={[{ value: 100 }]}
                  dataKey="value"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={30}
                  outerRadius={44}
                  stroke="none"
                  fill="#e5e7eb"
                  cornerRadius={8}
                />
                {/* Value Segment */}
                <Pie
                  data={[
                    { value: cancelledData[0].value, fill: "url(#cancelGradient)" },
                    { value: 100 - cancelledData[0].value, fill: "transparent" },
                  ]}
                  dataKey="value"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={30}
                  outerRadius={44}
                  stroke="none"
                  cornerRadius={8}
                />
              </PieChart>
            </ChartContainer>
            <span className="text-sm font-medium whitespace-nowrap">{cancelledData[0].value}% Cancelled</span>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
