"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, Image as ImageIcon, Users, Settings, LogOut, Presentation, Trophy, MessageSquare, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Hero Slider", href: "/admin/hero", icon: Presentation },
    { name: "Notices", href: "/admin/notices", icon: FileText },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Faculty", href: "/admin/faculty", icon: Users },
    { name: "Our Pride", href: "/admin/pride", icon: Trophy },
    { name: "Admissions", href: "/admin/admissions", icon: Users },
    { name: "Pages", href: "/admin/pages", icon: FileText },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebarContent({ onItemClick }: { onItemClick?: () => void }) {
    const pathname = usePathname()
    const router = useRouter()
    const { user, signOut } = useAuth()

    const handleSignOut = async () => {
        await signOut()
        router.push("/admin/login")
    }

    return (
        <div className="flex flex-col h-full text-white">
            <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold font-serif tracking-wide">YDPPS Admin</h2>
                <p className="text-xs text-slate-500 mt-1">Management Console</p>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onItemClick}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                                isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">AD</div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">Admin User</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email || "admin@ydpps.com"}</p>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg w-full transition-colors text-sm"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export function AdminSidebar() {
    return (
        <div className="w-64 bg-slate-900 min-h-screen hidden md:flex shrink-0">
            <AdminSidebarContent />
        </div>
    )
}
