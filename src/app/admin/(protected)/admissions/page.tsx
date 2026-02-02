"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash2, CheckCircle, XCircle, Eye, Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface AdmissionApplication {
    id: string
    studentName: string
    parentName: string
    grade: string
    email: string
    phone: string
    status: 'pending' | 'approved' | 'rejected' | 'under_review'
    createdAt: any // Firestore Timestamp
    submittedAt?: string // Formatted date string if pre-processed, or we process it here
    address?: string
    message?: string
}

export default function AdmissionsAdminPage() {
    const [applications, setApplications] = useState<AdmissionApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null)

    useEffect(() => {
        // Real-time listener for applications
        const q = query(collection(db, "admissions"), orderBy("createdAt", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as AdmissionApplication[]
            setApplications(data)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const handleStatusUpdate = async (id: string, newStatus: AdmissionApplication['status']) => {
        try {
            await updateDoc(doc(db, "admissions", id), {
                status: newStatus,
                updatedAt: new Date()
            })

            // Send email notification on approval
            if (newStatus === 'approved') {
                const app = applications.find(a => a.id === id)
                if (app && app.email) {
                    try {
                        await fetch('/api/send-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                to: app.email,
                                subject: 'Admission Approved - Yashoda Devi Paramount Public School',
                                html: `
                                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                                        <h2 style="color: #ea580c;">Congratulations!</h2>
                                        <p>Dear ${app.studentName},</p>
                                        <p>We are pleased to inform you that your admission application for <strong>${app.grade}</strong> at Yashoda Devi Paramount Public School has been approved.</p>
                                        <p>Please visit the school office to complete the remaining formalities.</p>
                                        <br/>
                                        <p>Best Regards,</p>
                                        <p><strong>YDPPS Administration</strong></p>
                                    </div>
                                `
                            })
                        })
                        console.log("Email notification sent.")
                    } catch (emailError) {
                        console.error("Failed to call email API", emailError)
                    }
                }
            }
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this application? This cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "admissions", id))
                if (selectedApp && selectedApp.id === id) setSelectedApp(null)
            } catch (error) {
                console.error("Error deleting application:", error)
            }
        }
    }

    const filteredApps = applications.filter(app =>
        app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-700 hover:bg-green-200'
            case 'rejected': return 'bg-red-100 text-red-700 hover:bg-red-200'
            case 'under_review': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            default: return 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admissions Manager</h1>
                    <p className="text-muted-foreground">Review and manage student applications.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search student, email..."
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
            ) : filteredApps.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <FileText className="h-12 w-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium">No applications found</p>
                        <p className="text-sm">New applications submitted from the website will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredApps.map((app) => (
                        <Card key={app.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-6">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg">{app.studentName}</h3>
                                            <Badge variant="outline" className={getStatusColor(app.status)}>
                                                {app.status.replace('_', ' ').toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
                                            <p><span className="font-medium text-foreground">Class:</span> {app.grade}</p>
                                            <p><span className="font-medium text-foreground">Parent:</span> {app.parentName}</p>
                                            <p><span className="font-medium text-foreground">Contact:</span> {app.phone}</p>
                                            <p><span className="font-medium text-foreground">Email:</span> {app.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                                                    <Eye className="h-4 w-4 mr-2" /> View Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Application Details</DialogTitle>
                                                    <DialogDescription>Student: {app.studentName}</DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs font-medium text-muted-foreground">Student Name</label>
                                                            <p className="text-sm font-medium">{app.studentName}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-muted-foreground">Applying For</label>
                                                            <p className="text-sm font-medium">{app.grade}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-muted-foreground">Parent/Guardian</label>
                                                            <p className="text-sm font-medium">{app.parentName}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-muted-foreground">Phone</label>
                                                            <p className="text-sm font-medium">{app.phone}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="text-xs font-medium text-muted-foreground">Email</label>
                                                            <p className="text-sm font-medium">{app.email}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="text-xs font-medium text-muted-foreground">Address</label>
                                                            <p className="text-sm font-medium">{app.address || "N/A"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <div className="flex gap-2">
                                            {app.status === 'pending' && (
                                                <>
                                                    <Button size="icon" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" title="Approve" onClick={() => handleStatusUpdate(app.id, 'approved')}>
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" title="Reject" onClick={() => handleStatusUpdate(app.id, 'rejected')}>
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-red-600" title="Delete" onClick={() => handleDelete(app.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
