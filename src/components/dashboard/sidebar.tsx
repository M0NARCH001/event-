"use client"
import Image from "next/image"

import { Home, Calendar, Network, TrendingUp, HelpCircle, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 z-50 w-60 transform transition-transform duration-300 ${
        collapsed ? "-translate-x-full" : "translate-x-0"
      } flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <span className={`font-serif italic text-xl text-gray-800 ${collapsed ? "hidden md:inline" : "inline"}`}>baatasari</span>
        </div>
        {/* close button visible when sidebar is open */}
        {!collapsed && (
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 rounded bg-gray-100" onClick={onToggle}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="flex flex-col space-y-1">
          <Button variant="ghost" className={`w-full justify-start gap-3 h-10 bg-gray-100 ${collapsed ? "px-2" : ""}`}>
            <Home className="h-5 w-5 flex-shrink-0" />
            <span className={`${collapsed ? "hidden" : "inline"}`}>Home</span>
          </Button>
          <Button variant="ghost" className={`w-full justify-start gap-3 h-10 ${collapsed ? "px-2" : ""}`}>
            <Calendar className="h-5 w-5 flex-shrink-0" />
            <span className={`${collapsed ? "hidden" : "inline"}`}>Create Events</span>
          </Button>
          <Button variant="ghost" className={`w-full justify-start gap-3 h-10 ${collapsed ? "px-2" : ""}`}>
            <Network className="h-5 w-5 flex-shrink-0" />
            <span className={`${collapsed ? "hidden" : "inline"}`}>Manage Events</span>
          </Button>
          <Button variant="ghost" className={`w-full justify-start gap-3 h-10 ${collapsed ? "px-2" : ""}`}>
            <TrendingUp className="h-5 w-5 flex-shrink-0" />
            <span className={`${collapsed ? "hidden" : "inline"}`}>Analytics</span>
          </Button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <Button variant="ghost" className={`w-full justify-start gap-3 h-10 ${collapsed ? "px-2" : ""}`}>
          <HelpCircle className="h-5 w-5 flex-shrink-0" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>Help</span>
        </Button>
        <Button variant="ghost" className={`w-full justify-start gap-3 h-10 ${collapsed ? "px-2" : ""}`}>
          <MessageSquare className="h-5 w-5 flex-shrink-0" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>Feedback</span>
        </Button>
      </div>
    </aside>
  )
}
