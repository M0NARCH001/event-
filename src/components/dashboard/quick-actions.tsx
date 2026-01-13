import { Button } from "@/components/ui/button"
import { CalendarPlus, FileText, MessageCircle } from "lucide-react"

export function QuickActions() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-20 border-2 border-gray-300 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 rounded-xl"
        >
          <CalendarPlus className="h-5 w-5 text-[#0c1b33]" />
          <span className="text-base font-medium text-[#0c1b33]">Create event</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 border-2 border-gray-300 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 rounded-xl"
        >
          <FileText className="h-5 w-5 text-[#0c1b33]" />
          <span className="text-base font-medium text-[#0c1b33]">Export Reports</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 border-2 border-gray-300 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 rounded-xl"
        >
          <MessageCircle className="h-5 w-5 text-[#0c1b33]" />
          <span className="text-base font-medium text-[#0c1b33]">Feedback</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 border-2 border-gray-300 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 rounded-xl"
        >
          <MessageCircle className="h-5 w-5 text-[#0c1b33]" />
          <span className="text-base font-medium text-[#0c1b33]">Feedback</span>
        </Button>
      </div>
    </div>
  )
}
