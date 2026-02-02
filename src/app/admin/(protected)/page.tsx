"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Bell, Image as ImageIcon, ArrowUpRight, Loader2 } from "lucide-react"
import { collection, getCountFromServer, query, where, getDocs, limit, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        applications: 0,
        notices: 0,
        gallery: 0,
        enquiries: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch counts in parallel
                const [noticesSnap, gallerySnap, enquiriesSnap, admissionsSnap] = await Promise.all([
                    getCountFromServer(collection(db, "notices")),
                    getCountFromServer(collection(db, "gallery")),
                    getCountFromServer(collection(db, "enquiries")),
                    getCountFromServer(collection(db, "admissions"))
                ])

                setStats({
                    notices: noticesSnap.data().count,
                    gallery: gallerySnap.data().count,
                    enquiries: enquiriesSnap.data().count,
                    applications: admissionsSnap.data().count
                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const statCards = [
        { title: "Total Applications", value: stats.applications, icon: Users, link: "/admin/admissions" },
        { title: "Active Notices", value: stats.notices, icon: Bell, link: "/admin/notices" },
        { title: "Gallery Images", value: stats.gallery, icon: ImageIcon, link: "/admin/gallery" },
        { title: "New Enquiries", value: stats.enquiries, icon: FileText, link: "/admin/enquiries" },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of school administration.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {/* Trend logic requires historical data, keeping simple for now */}
                            <p className="text-xs text-muted-foreground mt-1">
                                <Link href={stat.link} className="hover:text-primary hover:underline flex items-center gap-1">
                                    View Details <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            <p>Real-time activity feed coming soon.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <Link href="/admin/notices" className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium group">
                            <span className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Create New Notice</span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        <Link href="/admin/gallery" className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium group">
                            <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary" /> Upload Gallery Photos</span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        <Link href="/admin/hero" className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium group">
                            <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary" /> Manage Hero Slider</span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

