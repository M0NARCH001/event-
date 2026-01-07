"use client"

import * as React from "react"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- Chart 1: Registered ---
const registeredData = [{ category: "total", registered: 375, available: 25 }]
const registeredConfig = { registered: { label: "Registered", color: "hsl(230, 60%, 65%)" }, available: { label: "Available", color: "hsl(100, 70%, 65%)" } } satisfies ChartConfig

// --- Chart 2: Demographics ---
const demographicsData = [
  { type: "Male", visitors: 50, fill: "hsl(210, 90%, 75%)" },
  { type: "Female", visitors: 30, fill: "hsl(340, 80%, 75%)" },
  { type: "Other", visitors: 10, fill: "hsl(0, 0%, 75%)" },
]
const demographicsConfig = { visitors: { label: "Visitors" } } satisfies ChartConfig

// --- Chart 3: Cancelled (percent value must match arc) ---
const cancelledValue = 8
const cancelledConfig = { Cancelled: { label: "Cancelled" } } satisfies ChartConfig

// --- Gauge Arc (Left fill only) ---
function CancelledGauge({ value }: { value: number }) {
  const percent = Math.max(0, Math.min(100, value))
  const radius = 50
  const startX = 10
  const endX = 110
  const y = 55
  const halfCircle = Math.PI * radius
  const arcLength = (percent / 100) * halfCircle
  const arcPath = `M${startX} ${y} A${radius} ${radius} 0 0 1 ${endX} ${y}`

  return (
    <svg width="100%" height="100%" viewBox="0 0 120 60" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="cancelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff7f7f" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>

      {/* Grey track */}
      <path d={arcPath} fill="none" stroke="#e5e7eb" strokeWidth={8} strokeLinecap="round" />

      {/* Red growing arc (left only) */}
      <path
        d={arcPath}
        fill="none"
        stroke="url(#cancelGradient)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${halfCircle}`}
        strokeDashoffset={0}
      />
    </svg>
  )
}

export function EventStats() {
  return (
    <div className="w-full">

      {/* Desktop = 3 columns, Mobile = 1 centered column */}
      <div
        className="grid gap-6 w-full max-w-5xl mx-auto
                   md:grid-cols-3
                   grid-cols-1
                   md:justify-stretch justify-center"
      >

        {/* When stacked (mobile 1 col), force equal widths */}
        <style>{`
          @media (max-width: 768px) {
            .grid-cols-1 > * {
              width: 100%;
              max-width: 400px; /* <-- This makes top 3 match Revenue card mobile width */
            }
          }
        `}</style>

        {/* Card 1 */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2 text-center">
            <CardTitle className="text-lg font-medium">Registered Participants</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center">
            <div className="mb-4 flex justify-between w-full px-4 text-sm">
              <div><span className="text-xs font-semibold uppercase">Registered</span><div className="text-2xl font-bold">375</div></div>
              <div className="text-right"><span className="text-xs font-semibold uppercase">Available</span><div className="text-2xl font-bold">25</div></div>
            </div>

            <ChartContainer config={registeredConfig} className="h-[50px] w-full">
              <BarChart data={registeredData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }} barSize={32}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="registered" stackId="a" fill="var(--color-registered)" radius={[20, 0, 0, 20]} />
                <Bar dataKey="available" stackId="a" fill="var(--color-available)" radius={[0, 20, 20, 0]} />
              </BarChart>
            </ChartContainer>

          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2 text-center">
            <CardTitle className="text-lg font-medium">Demographics (M/F/O)</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center">
            <ChartContainer config={demographicsConfig} className="mx-auto max-h-[140px] w-full">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={demographicsData} dataKey="visitors" nameKey="type" innerRadius={30} outerRadius={60} strokeWidth={5} />
              </PieChart>
            </ChartContainer>

            <div className="flex justify-center gap-4 pt-4 text-sm font-medium">
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-[hsl(210,90%,75%)]"></span> Male</div>
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-[hsl(340,80%,75%)]"></span> Female</div>
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-[hsl(0,0%,75%)]"></span> Other</div>
            </div>

          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2 text-center">
            <CardTitle className="text-lg font-medium">Cancelled Tickets</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 items-center justify-center gap-5 text-center">
            <span className="text-4xl font-medium">{cancelledValue.toString().padStart(2, "0")}</span>

            {/* Gauge resized slightly larger but balanced */}
            <div className="flex h-[75px] w-[150px] sm:h-[85px] sm:w-[170px] md:h-[80px] md:w-[160px] justify-center items-center">
              <CancelledGauge value={cancelledValue} />
            </div>

            <span className="text-sm font-semibold whitespace-nowrap">{cancelledValue}% Cancelled</span>
          </CardContent>

        </Card>

      </div>
    </div>
  )
}
