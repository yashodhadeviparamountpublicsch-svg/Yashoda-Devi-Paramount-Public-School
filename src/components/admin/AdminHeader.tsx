"use client"

import { usePathname } from "next/navigation"
import { Bell, Search, Settings } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { AdminSidebarContent } from "@/components/admin/AdminSidebar"
import { useState } from "react"

export function AdminHeader() {
    const pathname = usePathname()
    const { user, signOut } = useAuth()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const getPageTitle = (path: string) => {
        if (path === "/admin") return "Dashboard"
        if (path.includes("/admin/hero")) return "Hero Slider"
        if (path.includes("/admin/notices")) return "Notices"
        if (path.includes("/admin/gallery")) return "Gallery"
        if (path.includes("/admin/admissions")) return "Admissions"
        if (path.includes("/admin/faculty")) return "Faculty"
        if (path.includes("/admin/settings")) return "Settings"
        if (path.includes("/admin/pages")) return "Pages & Content"
        return "Admin Panel"
    }

    return (
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 h-16 px-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 w-72">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <AdminSidebarContent onItemClick={() => setIsMobileOpen(false)} />
                    </SheetContent>
                </Sheet>
                <h2 className="text-xl font-bold font-serif text-slate-800 tracking-tight">
                    {getPageTitle(pathname)}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 h-9 w-64 rounded-md border border-input bg-slate-50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>

                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-800">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </Button>

                <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 opacity-80 rounded-full hover:opacity-100">
                            <Avatar className="h-9 w-9 border border-slate-200">
                                <AvatarImage src={user?.photoURL || ""} alt="Admin" />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Admin User</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()} className="text-red-600 focus:text-red-600">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
