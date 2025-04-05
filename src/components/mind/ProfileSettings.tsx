"use client"

import { useState } from "react"
import { ArrowLeft, Bell, ChevronRight, Key, LogOut, Moon, Shield, UserIcon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Link, Router } from "react-router-dom"

export default function ProfileSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: UserIcon,
          label: "Personal Information",
          description: "Update your personal details",
          to: "#personal-info",
        },
        {
          icon: Key,
          label: "Password & Security",
          description: "Manage your password and 2FA",
          to: "#security",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Configure your notification settings",
          to: "#notifications",
          toggle: true,
          toggled: true,
        },
        {
          icon: Moon,
          label: "Dark Mode",
          description: "Toggle dark mode on or off",
          to: "#appearance",
          toggle: true,
          toggled: false,
        },
      ],
    },
    {
      title: "Privacy",
      items: [
        {
          icon: Shield,
          label: "Privacy Settings",
          description: "Manage your data and privacy",
          to: "#privacy",
        },
      ],
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:flex hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Profile Settings</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">March 27, 2025</span>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Profile header */}
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
                <p className="mt-2 text-sm">Member since March 2025</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Button size="sm">Edit Profile</Button>
                  <Button size="sm" variant="outline">
                    Change Photo
                  </Button>
                </div>
              </div>
            </div>

            {/* Settings sections */}
            {settingsSections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-full p-2">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.label}</h4>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      {/* {item.toggle ? (
                        <Switch checked={item.toggled} />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Logout button */}
            <div className="mt-8">
              <Button variant="destructive" className="w-full sm:w-auto flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile navigation */}
      {!isDesktop && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-3 z-40">
          <Link to="/">
            <Button variant="ghost" size="icon" className="flex flex-col items-center text-xs">
              <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path d="M9 22V12h6v10" />
              </svg>
              <span>Home</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="flex flex-col items-center text-xs">
            <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Progress</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center text-xs">
            <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <span>Add</span>
          </Button>
          <Link to="/profile">
            <Button variant="secondary" size="icon" className="flex flex-col items-center text-xs">
              <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Profile</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="flex flex-col items-center text-xs">
            <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            <span>Settings</span>
          </Button>
        </div>
      )}
    </div>
  )
}

