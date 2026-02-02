"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Calendar, ChevronRight, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function NoticesPreview() {
    const [notices, setNotices] = useState<any[]>([])
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                // Fetch Notices
                const qNotices = query(collection(db, "notices"), orderBy("date", "desc"), limit(4))
                const snapshotNotices = await getDocs(qNotices)
                const noticesData = snapshotNotices.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    isNew: isNoticeNew(doc.data().date)
                }))
                setNotices(noticesData)

                // Fetch Events
                const qEvents = query(collection(db, "events"), orderBy("date", "asc"), limit(3))
                const snapshotEvents = await getDocs(qEvents)
                // Filter for current/future events only (optional, but good practice per user request implicit "Upcoming")
                const today = new Date().toISOString().split('T')[0]
                const eventsData = snapshotEvents.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter((e: any) => e.date >= today) // conceptual filter, though query might be better if indexed
                // Since we didn't add complex indexing, client side filtering for now or just show whatever recent

                setEvents(snapshotEvents.docs.map(doc => ({ id: doc.id, ...doc.data() })))

            } catch (error) {
                console.error("Failed to fetch data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchNotices()
    }, [])

    const isNoticeNew = (dateString: string) => {
        const noticeDate = new Date(dateString)
        const diffTime = Math.abs(new Date().getTime() - noticeDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Subtle Decorative Mesh */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Latest Notices */}
                    <div className="w-full lg:w-2/3">
                        <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
                            <h2 className="text-3xl font-bold font-serif text-foreground flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Bell className="h-6 w-6 text-primary fill-primary animate-pulse" />
                                </div>
                                Latest <span className="text-gradient-primary">Notices</span>
                            </h2>
                            <Button variant="ghost" className="text-primary hover:text-primary/80 group" asChild>
                                <Link href="/notices">
                                    View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-10 text-muted-foreground">Loading notices...</div>
                            ) : notices.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground bg-primary/5 rounded-lg border border-dashed border-primary/20">
                                    No notices at the moment.
                                </div>
                            ) : (
                                notices.map((notice) => (
                                    <Card key={notice.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary group cursor-pointer glass-card border-none bg-white/50">
                                        <CardContent className="p-5 flex items-start gap-4">
                                            <div className="bg-white p-3 rounded-xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{formatDate(notice.date)}</span>
                                                    {notice.isNew && <span className="bg-secondary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">New</span>}
                                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{notice.category}</span>
                                                </div>
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg leading-tight">
                                                    <Link href={`/notices`} className="before:absolute before:inset-0">{notice.title}</Link>
                                                </h3>
                                            </div>
                                            {/* Download button */}
                                            {notice.fileUrl && (
                                                <Button variant="outline" size="sm" className="mt-3 gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors h-8 text-xs font-medium" asChild>
                                                    <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer">
                                                        <Download className="h-3 w-3" />
                                                        {notice.fileName || "Download Attachment"}
                                                    </a>
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Events / Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
                            <h2 className="text-3xl font-bold font-serif text-foreground">Upcoming <span className="text-gradient-primary">Events</span></h2>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                                <Link href="/gallery">Gallery</Link>
                            </Button>
                        </div>
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm">
                            <div className="space-y-8">
                                <div className="space-y-8">
                                    {events.length === 0 ? (
                                        <div className="text-center py-6 text-muted-foreground bg-primary/5 rounded-lg border border-dashed border-primary/20">
                                            No upcoming events scheduled.
                                        </div>
                                    ) : (
                                        events.map((event) => (
                                            <div key={event.id} className="flex gap-5 items-center group">
                                                <div className="bg-white p-3 text-center rounded-xl shadow-md min-w-[70px] border border-primary/10 group-hover:border-primary/30 transition-colors">
                                                    <span className="block text-xs font-bold text-secondary uppercase tracking-widest">
                                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                                    </span>
                                                    <span className="block text-3xl font-bold text-primary font-serif">
                                                        {new Date(event.date).getDate()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg hover:text-primary transition-colors cursor-pointer text-foreground">
                                                        {event.title}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {event.location} • {event.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-primary/10">
                                <h5 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    Campus Life <ArrowRight className="h-4 w-4" />
                                </h5>
                                <div className="relative group overflow-hidden rounded-xl shadow-md">
                                    <img
                                        src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop"
                                        alt="Gallery Preview"
                                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link href="/gallery" className="text-white font-medium text-sm hover:underline">View Full Gallery</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
