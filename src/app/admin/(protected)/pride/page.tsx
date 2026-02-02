"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2, Edit2, X, Trophy } from "lucide-react"
import ImageUpload from "@/components/ui/image-upload"

interface PrideStudent {
    id: string
    name: string
    achievement: string
    class: string
    year: string
    image: string
    description?: string
    order: number
}

export default function PrideAdminPage() {
    const [students, setStudents] = useState<PrideStudent[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        achievement: "",
        class: "",
        year: new Date().getFullYear().toString(),
        image: "",
        description: ""
    })

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        try {
            const q = query(collection(db, "pride_students"), orderBy("createdAt", "desc"))
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as PrideStudent[]
            setStudents(data)
        } catch (error) {
            console.error("Error fetching students:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUploading(true)

        try {
            if (editingId) {
                await updateDoc(doc(db, "pride_students", editingId), {
                    name: formData.name,
                    achievement: formData.achievement,
                    class: formData.class,
                    year: formData.year,
                    image: formData.image,
                    description: formData.description
                })
            } else {
                await addDoc(collection(db, "pride_students"), {
                    name: formData.name,
                    achievement: formData.achievement,
                    class: formData.class,
                    year: formData.year,
                    image: formData.image,
                    description: formData.description,
                    order: students.length,
                    createdAt: new Date()
                })
            }

            setFormData({ name: "", achievement: "", class: "", year: new Date().getFullYear().toString(), image: "", description: "" })
            setEditingId(null)
            setShowForm(false)
            fetchStudents()
        } catch (error) {
            console.error("Error saving student:", error)
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (student: PrideStudent) => {
        setFormData({
            name: student.name,
            achievement: student.achievement,
            class: student.class,
            year: student.year,
            image: student.image,
            description: student.description || ""
        })
        setEditingId(student.id)
        setShowForm(true)
    }

    const handleDelete = async (student: PrideStudent) => {
        if (confirm("Delete this student?")) {
            try {
                await deleteDoc(doc(db, "pride_students", student.id))
                fetchStudents()
            } catch (error) {
                console.error("Error deleting student:", error)
            }
        }
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Our Pride - Top Students</h1>
                    <p className="text-muted-foreground">Showcase your school's achievers and toppers.</p>
                </div>
                <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", achievement: "", class: "", year: new Date().getFullYear().toString(), image: "", description: "" }) }}>
                    {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                    {showForm ? "Cancel" : "Add Student"}
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Student" : "Add New Student"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Student Name</label>
                                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g. Rahul Sharma" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Achievement</label>
                                    <Input value={formData.achievement} onChange={e => setFormData({ ...formData, achievement: e.target.value })} required placeholder="e.g. 1st Rank in Class 10 CBSE" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Class</label>
                                    <Input value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })} required placeholder="e.g. Class 10" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Year</label>
                                    <Input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required placeholder="e.g. 2024" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description (Optional)</label>
                                <Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Additional details about the achievement" />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Student Photo</label>
                                <ImageUpload
                                    value={formData.image ? [formData.image] : []}
                                    disabled={uploading}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                    onRemove={() => setFormData({ ...formData, image: "" })}
                                />
                            </div>

                            <Button type="submit" disabled={uploading || !formData.image}>
                                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update Student" : "Add Student"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
                        No students added yet. Add your first achiever!
                    </div>
                ) : (
                    students.map((student) => (
                        <Card key={student.id} className="overflow-hidden">
                            <div className="aspect-[4/5] relative bg-slate-100">
                                {student.image ? (
                                    <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        <Trophy className="h-12 w-12" />
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg">{student.name}</h3>
                                <p className="text-primary text-sm font-medium mb-1">{student.achievement}</p>
                                <p className="text-muted-foreground text-xs mb-2">{student.class} • {student.year}</p>
                                {student.description && (
                                    <p className="text-sm text-muted-foreground italic mb-3">{student.description}</p>
                                )}

                                <div className="flex gap-2 mt-4">
                                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(student)}>
                                        <Edit2 className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                    <Button size="sm" className="flex-1 bg-red-100 text-red-600 hover:bg-red-200 border-none shadow-none" onClick={() => handleDelete(student)}>
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
