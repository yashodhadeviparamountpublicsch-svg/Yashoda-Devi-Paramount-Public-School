"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, doc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2, Mail, Search, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ContactMessage {
    id: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    createdAt: any
}

export default function MessagesAdminPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

    useEffect(() => {
        const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ContactMessage[]
            setMessages(data)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            try {
                await deleteDoc(doc(db, "contact_messages", id))
                if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null)
            } catch (error) {
                console.error("Error deleting message:", error)
            }
        }
    }

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                    <p className="text-muted-foreground">Inbox for contact form submissions.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search sender, subject..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredMessages.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium">No messages found</p>
                        <p className="text-sm">Messages from the contact form will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredMessages.map((msg) => (
                        <Card key={msg.id} className="group hover:shadow-md transition-shadow">
                            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold truncate">{msg.name}</h3>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                            {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                        </span>
                                    </div>
                                    <p className="font-medium text-sm text-primary mb-1 truncate">{msg.subject}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => setSelectedMessage(msg)}>
                                                Read
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>{msg.subject}</DialogTitle>
                                                <DialogDescription>From: {msg.name} ({msg.email})</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap leading-relaxed">
                                                    {msg.message}
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t pt-4">
                                                    <div>
                                                        <span className="font-bold block mb-1">Phone</span>
                                                        {msg.phone || "N/A"}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold block mb-1">Date</span>
                                                        {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(msg.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
