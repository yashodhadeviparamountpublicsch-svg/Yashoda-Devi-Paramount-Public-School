"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2, Edit2, X, User } from "lucide-react"
import ImageUpload from "@/components/ui/image-upload"

interface FacultyMember {
    id: string
    name: string
    role: string
    qualification: string
    image: string
    order: number
}

export default function FacultyAdminPage() {
    const [faculty, setFaculty] = useState<FacultyMember[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        qualification: "",
        image: ""
    })

    useEffect(() => {
        fetchFaculty()
    }, [])

    const fetchFaculty = async () => {
        try {
            const q = query(collection(db, "faculty"), orderBy("createdAt", "desc"))
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as FacultyMember[]
            setFaculty(data)
        } catch (error) {
            console.error("Error fetching faculty:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUploading(true)

        try {
            if (editingId) {
                await updateDoc(doc(db, "faculty", editingId), {
                    name: formData.name,
                    role: formData.role,
                    qualification: formData.qualification,
                    image: formData.image
                })
            } else {
                await addDoc(collection(db, "faculty"), {
                    name: formData.name,
                    role: formData.role,
                    qualification: formData.qualification,
                    image: formData.image,
                    createdAt: new Date()
                })
            }

            setFormData({ name: "", role: "", qualification: "", image: "" })
            setEditingId(null)
            setShowForm(false)
            fetchFaculty()
        } catch (error) {
            console.error("Error saving faculty:", error)
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (member: FacultyMember) => {
        setFormData({
            name: member.name,
            role: member.role,
            qualification: member.qualification,
            image: member.image
        })
        setEditingId(member.id)
        setShowForm(true)
    }

    const handleDelete = async (member: FacultyMember) => {
        if (confirm("Delete this faculty member?")) {
            try {
                await deleteDoc(doc(db, "faculty", member.id))
                fetchFaculty()
            } catch (error) {
                console.error("Error deleting member:", error)
            }
        }
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Faculty Management</h1>
                    <p className="text-muted-foreground">Manage your teaching staff.</p>
                </div>
                <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", role: "", qualification: "", image: "" }) }}>
                    {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                    {showForm ? "Cancel" : "Add Faculty"}
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Faculty" : "Add New Faculty"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g. Dr. R.K. Sharma" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Role / Designation</label>
                                    <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required placeholder="e.g. Senior Math Faculty" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Qualification</label>
                                <Input value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} required placeholder="e.g. Ph.D. in Mathematics" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Profile Image</label>
                                    <div className="flex gap-2 items-center mt-2">
                                        <ImageUpload
                                            value={formData.image ? [formData.image] : []}
                                            disabled={uploading}
                                            onChange={(url) => setFormData({ ...formData, image: url })}
                                            onRemove={() => setFormData({ ...formData, image: "" })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" disabled={uploading}>
                                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update Member" : "Add Member"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
                        No faculty members found. Add your first one!
                    </div>
                ) : (
                    faculty.map((member) => (
                        <Card key={member.id} className="overflow-hidden">
                            <div className="aspect-[4/3] relative bg-slate-100">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        <User className="h-12 w-12" />
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                                <p className="text-muted-foreground text-xs">{member.qualification}</p>

                                <div className="flex gap-2 mt-4">
                                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(member)}>
                                        <Edit2 className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                    <Button size="sm" className="flex-1 bg-red-100 text-red-600 hover:bg-red-200 border-none shadow-none" onClick={() => handleDelete(member)}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div >
    )
}
