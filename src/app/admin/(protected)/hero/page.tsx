"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, writeBatch } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Trash2, Edit2, ImageIcon, MoveUp, MoveDown } from "lucide-react"
import ImageUpload from "@/components/ui/image-upload"

// Local Label component to avoid dependency issues
function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>
}

interface HeroSlide {
    id: string
    title: string
    subtitle: string
    image: string
    ctaText: string
    ctaLink: string
    order: number
}

export default function HeroAdminPage() {
    const [slides, setSlides] = useState<HeroSlide[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState(false)
    const [saving, setSaving] = useState(false)

    // Form State
    const [formData, setFormData] = useState<Omit<HeroSlide, 'id'>>({
        title: "",
        subtitle: "",
        image: "",
        ctaText: "Learn More",
        ctaLink: "/about",
        order: 0
    })

    useEffect(() => {
        const q = query(collection(db, "hero_slides"), orderBy("order", "asc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const slidesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as HeroSlide[]
            setSlides(slidesData)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const resetForm = () => {
        setFormData({
            title: "",
            subtitle: "",
            image: "",
            ctaText: "Learn More",
            ctaLink: "/about",
            order: slides.length
        })
        setIsAdding(false)
        setIsEditing(null)
    }

    const handleEdit = (slide: HeroSlide) => {
        setFormData(slide)
        setIsEditing(slide.id)
        setIsAdding(true)
    }

    const handleDelete = async (slide: HeroSlide) => {
        if (!confirm("Are you sure you want to delete this slide?")) return
        try {
            await deleteDoc(doc(db, "hero_slides", slide.id))
        } catch (error) {
            console.error("Error deleting slide:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (isEditing) {
                await updateDoc(doc(db, "hero_slides", isEditing), {
                    ...formData
                })
            } else {
                await addDoc(collection(db, "hero_slides"), {
                    ...formData,
                    order: slides.length
                })
            }
            resetForm()
        } catch (error) {
            console.error("Error saving slide:", error)
            alert("Failed to save slide. Check console.")
        } finally {
            setSaving(false)
        }
    }

    const moveSlide = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return
        if (direction === 'down' && index === slides.length - 1) return

        const newSlides = [...slides]
        const targetIndex = direction === 'up' ? index - 1 : index + 1

        const temp = newSlides[index]
        newSlides[index] = newSlides[targetIndex]
        newSlides[targetIndex] = temp

        try {
            const batch = writeBatch(db)

            newSlides.forEach((slide, idx) => {
                const slideRef = doc(db, "hero_slides", slide.id)
                batch.update(slideRef, { order: idx })
            })

            await batch.commit()
        } catch (error) {
            console.error("Error reordering slides:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Hero Slider</h1>
                    <p className="text-muted-foreground">Manage the main slides on the homepage.</p>
                </div>
                {!isAdding && (
                    <Button onClick={() => { resetForm(); setIsAdding(true) }}>
                        <Plus className="mr-2 h-4 w-4" /> Add New Slide
                    </Button>
                )}
            </div>

            {isAdding && (
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle>{isEditing ? "Edit Slide" : "Add New Slide"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Welcome to YDPPS"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <Input
                                        value={formData.subtitle}
                                        onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                        placeholder="Brief description"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label>Slide Image</Label>
                                    <ImageUpload
                                        value={formData.image ? [formData.image] : []}
                                        disabled={saving}
                                        onChange={(url) => setFormData({ ...formData, image: url })}
                                        onRemove={() => setFormData({ ...formData, image: "" })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>CTA Text</Label>
                                    <Input
                                        value={formData.ctaText}
                                        onChange={e => setFormData({ ...formData, ctaText: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>CTA Link</Label>
                                    <Input
                                        value={formData.ctaLink}
                                        onChange={e => setFormData({ ...formData, ctaLink: e.target.value })}
                                        placeholder="e.g. /about or https://google.com"
                                    />
                                    <p className="text-xs text-muted-foreground">Use <code>/page-name</code> for internal pages or <code>https://...</code> for external links.</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
                                <Button type="submit" disabled={saving || !formData.image}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isEditing ? "Update Slide" : "Create Slide"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-10">Loading slides...</div>
                ) : slides.length === 0 ? (
                    <div className="text-center py-10 bg-muted/50 rounded-lg border border-dashed">
                        <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">No slides found. Create one to get started!</p>
                    </div>
                ) : (
                    slides.map((slide, index) => (
                        <Card key={slide.id} className="overflow-hidden group">
                            <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
                                <div className="flex flex-col gap-1 pr-2 border-r mr-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        disabled={index === 0}
                                        onClick={() => moveSlide(index, 'up')}
                                    >
                                        <MoveUp className="h-4 w-4" />
                                    </Button>
                                    <span className="text-xs text-center font-mono opacity-50">{index + 1}</span>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        disabled={index === slides.length - 1}
                                        onClick={() => moveSlide(index, 'down')}
                                    >
                                        <MoveDown className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="relative h-32 w-full md:w-48 shrink-0 rounded-md overflow-hidden bg-slate-100">
                                    {slide.image ? (
                                        <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-1 text-center md:text-left">
                                    <h3 className="font-bold text-lg">{slide.title}</h3>
                                    <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                                            Button: {slide.ctaText} -&gt; {slide.ctaLink}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="outline" onClick={() => handleEdit(slide)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" className="bg-red-500 hover:bg-red-600 text-white shadow-sm" onClick={() => handleDelete(slide)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
