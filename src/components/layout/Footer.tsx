"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, Youtube } from "lucide-react"
import { useSiteSettings } from "@/lib/site-settings"

export function Footer() {
    const { settings } = useSiteSettings()

    return (
        <footer className="bg-white pt-12 md:pt-16 pb-8 border-t border-red-100 relative overflow-hidden">
            {/* Decorative top gradient border */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-primary" />
            <div className="absolute inset-0 bg-mesh-orange opacity-30 pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-primary/5 p-1 border border-primary/10">
                                <img src={settings.logo || "/images/logo.jpg"} alt="YDPPS Logo" className="w-full h-full object-cover rounded" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">{settings.shortName || "YDP Public School"}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering students with knowledge, character, and skills to succeed in a global world. Join us in shaping the leaders of tomorrow.
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold text-lg mb-6 border-b-2 border-primary/20 pb-2 inline-block text-foreground">Quick Links</h4>
                    <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary hover:translate-x-1 transition-all inline-block">About Us</Link></li>
                        <li><Link href="/academics" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Academics</Link></li>
                        <li><Link href="/admissions" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Admissions</Link></li>
                        <li><Link href="/notices" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Notice Board</Link></li>
                        <li><Link href="/gallery" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Gallery</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-bold text-lg mb-6 border-b-2 border-primary/20 pb-2 inline-block text-foreground">Contact Us</h4>
                    <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                            <span className="opacity-90 whitespace-pre-line">{settings.address || "Kharagpur - Asarganj Rd, Kharagpur, Singhpur, Bihar 811213"}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 shrink-0 text-primary" />
                            <a href={`tel:${settings.phone || "+910000000000"}`} className="opacity-90 hover:text-primary transition-colors">
                                {settings.phone || "N/A"}
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 shrink-0 text-primary" />
                            <span className="opacity-90">{settings.email || "info@ydpps.com"}</span>
                        </li>
                    </ul>
                </div>

                {/* Connect */}
                <div>
                    <h4 className="font-bold text-lg mb-6 border-b-2 border-primary/20 pb-2 inline-block text-foreground">Stay Connected</h4>
                    <p className="text-sm opacity-80 mb-4 text-muted-foreground">Follow us on social media for updates and highlights.</p>
                    <div className="flex gap-4">
                        <a
                            href={settings.socials.instagram || "https://instagram.com/ydp.publicschool"}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 ring-1 ring-primary/10"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>

                        <a
                            href={settings.socials.youtube || "https://youtube.com/@ydppublicschool"}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 ring-1 ring-primary/10"
                        >
                            <Youtube className="h-5 w-5" />
                        </a>

                        {settings.socials.facebook && (
                            <a href={settings.socials.facebook} target="_blank" rel="noreferrer" className="p-3 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 ring-1 ring-primary/10"><span className="font-bold font-serif px-1">f</span></a>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-100">
                <div className="rounded-xl overflow-hidden shadow-lg h-60 bg-gray-200 relative mb-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.2880823671558!2d86.55974267437423!3d25.125949534584834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1963fd102f25b%3A0x9911865cab4ea2cc!2sYashoda%20Devi%20Paramount%20Public%20School!5e0!3m2!1sen!2sin!4v1769941441496!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 grayscale hover:grayscale-0 transition-all"
                    />
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Yashoda Devi Paramount Public School. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
