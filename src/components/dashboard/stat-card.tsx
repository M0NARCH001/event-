import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  iconBgColor: string
  iconColor: string
  value: string
  label: string
  trend: {
    direction: "up" | "down"
    percentage: string
    comparisonText: string
  }
}

export function StatCard({ icon: Icon, iconBgColor, iconColor, value, label, trend }: StatCardProps) {
  const TrendIcon = trend.direction === "up" ? ArrowUp : ArrowDown
  const trendColor = trend.direction === "up" ? "text-green-600" : "text-red-600"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`${iconBgColor} p-3 rounded-lg`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon className={`h-3 w-3 ${trendColor}`} />
              <span className={`text-xs ${trendColor} font-medium`}>{trend.percentage}</span>
              <span className="text-xs text-gray-500">{trend.comparisonText}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
