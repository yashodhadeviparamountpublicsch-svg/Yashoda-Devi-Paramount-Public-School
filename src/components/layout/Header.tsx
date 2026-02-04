"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useSiteSettings } from "@/lib/site-settings"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Faculty", href: "/faculty" },
    { name: "Our Pride", href: "/pride" },
    { name: "N.K. Coaching", href: "/coaching" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Notices", href: "/notices" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
]

export function Header() {
    const { settings } = useSiteSettings()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    const isHome = pathname === "/"

    // Don't show public header on admin routes
    if (pathname?.startsWith("/admin")) return null

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const headerClass = cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-2 border-b border-primary/10"
            : (isHome ? "bg-transparent py-4" : "bg-white/80 backdrop-blur-md shadow-sm py-2 border-b border-primary/10")
    )

    // Text colors: On Home (unscrolled) -> White. Otherwise -> Orange/Red dark theme.
    const isTransparent = isHome && !isScrolled
    const logoContainerClass = isTransparent ? "bg-white/20 backdrop-blur-sm" : "bg-primary/5"

    return (
        <header className={headerClass}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className={cn("h-10 w-10 md:h-12 md:w-12 relative rounded-full overflow-hidden p-0.5 transition-colors", logoContainerClass)}>
                        <img src={settings.logo || "/images/logo.jpg"} alt={`${settings.shortName} Logo`} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn("font-serif font-bold text-sm md:text-xl leading-tight transition-colors", isTransparent ? "text-white" : "text-primary")}>
                            {settings.schoolName}
                        </span>
                        {/* Removed the split logic to show full name always, adjusted text size for mobile */}

                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative group py-1",
                                isTransparent ? "text-white hover:text-white" : "text-muted-foreground hover:text-primary",
                                pathname === link.href && (isTransparent ? "text-white font-bold" : "text-primary font-bold")
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                                isTransparent ? "bg-white" : "bg-primary",
                                pathname === link.href && "w-full"
                            )} />
                        </Link>
                    ))}
                    <Button
                        variant={isTransparent ? "secondary" : "default"}
                        size="sm"
                        className={cn("rounded-full px-6 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105", isTransparent ? "bg-white text-primary hover:bg-white/90" : "bg-gradient-primary text-white hover:opacity-90")}
                        asChild
                    >
                        <Link href="/admissions">Apply Now</Link>
                    </Button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={cn("md:hidden p-2 rounded-md transition-colors", isTransparent ? "text-white hover:bg-white/10" : "text-primary hover:bg-primary/5")}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl md:hidden overflow-hidden"
                        >
                            <nav className="flex flex-col p-4 gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "p-3 rounded-lg text-sm font-medium transition-colors",
                                            pathname === link.href
                                                ? "bg-primary/5 text-primary"
                                                : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button className="mt-2 w-full bg-gradient-primary" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/admissions">Apply Now</Link>
                                </Button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
