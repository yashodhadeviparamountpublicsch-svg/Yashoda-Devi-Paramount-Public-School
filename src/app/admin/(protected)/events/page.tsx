"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, Edit2, X, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface Event {
    id: string
    title: string
    date: string
    time: string
    location: string
    description?: string
    createdAt: any
}

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        location: "School Campus",
        description: ""
    })

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const q = query(collection(db, "events"), orderBy("date", "asc"))
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Event[]

            // Filter out past events from the admin view if desired, or keep them to allow history management
            // For now, let's keep all but sort by date upcoming
            setEvents(data)
        } catch (error) {
            console.error("Error fetching events:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            if (editingId) {
                await updateDoc(doc(db, "events", editingId), {
                    ...formData,
                    updatedAt: new Date()
                })
            } else {
                await addDoc(collection(db, "events"), {
                    ...formData,
                    createdAt: new Date()
                })
            }

            setFormData({
                title: "",
                date: new Date().toISOString().split('T')[0],
                time: "09:00",
                location: "School Campus",
                description: ""
            })
            setEditingId(null)
            setShowForm(false)
            fetchEvents()
        } catch (error) {
            console.error("Error saving event:", error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleEdit = (event: Event) => {
        setFormData({
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description || ""
        })
        setEditingId(event.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteDoc(doc(db, "events", id))
                fetchEvents()
            } catch (error) {
                console.error("Error deleting event:", error)
            }
        }
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Event Manager</h1>
                    <p className="text-muted-foreground">Manage upcoming school events and activities.</p>
                </div>
                <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: "", date: new Date().toISOString().split('T')[0], time: "09:00", location: "School Campus", description: "" }) }}>
                    {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                    {showForm ? "Cancel" : "Add Event"}
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8 border-primary/20 bg-slate-50/50">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Event" : "Create New Event"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Event Title</label>
                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Annual Sports Day" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-sm font-medium">Date</label>
                                        <Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Time</label>
                                        <Input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Location</label>
                                <Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required placeholder="e.g. School Auditorium" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Description (Optional)</label>
                                <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Brief details about the event..." />
                            </div>

                            <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update Event" : "Publish Event"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {events.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
                        No upcoming events found. Create one to display on the homepage.
                    </div>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-lg text-center min-w-[60px]">
                                    <span className="block text-xs font-bold uppercase">{format(new Date(event.date), 'MMM')}</span>
                                    <span className="block text-xl font-bold">{format(new Date(event.date), 'dd')}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{event.title}</h3>
                                    <div className="text-sm text-muted-foreground flex gap-3">
                                        <span>{event.time}</span>
                                        <span>•</span>
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(event)}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(event.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
