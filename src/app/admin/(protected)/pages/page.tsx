"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, Upload, ImageIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

// Local Label to be safe if component issues persist, though we fixed it previously
function LocalLabel({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>
}

interface AboutPageData {
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    historyTitle: string
    historyContent: string
    historyImage: string
    visionTitle: string
    visionContent: string
    missionTitle: string
    missionContent: string
}

export default function PagesAdminPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("about")

    // About Page State
    const [aboutData, setAboutData] = useState<AboutPageData>({
        heroTitle: "About Us",
        heroSubtitle: "Dedicated to fostering holistic development and academic excellence.",
        heroImage: "",
        historyTitle: "Our History",
        historyContent: "Yashoda Devi Paramount Public School was founded with a vision...",
        historyImage: "",
        visionTitle: "Our Vision",
        visionContent: "To be a center of excellence in education...",
        missionTitle: "Our Mission",
        missionContent: "To provide a stimulating learning environment..."
    })

    useEffect(() => {
        const fetchData = async () => {
            if (activeTab === "about") {
                try {
                    const docRef = doc(db, "pages_content", "about")
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        setAboutData(prev => ({ ...prev, ...docSnap.data() } as AboutPageData))
                    }
                } catch (error) {
                    console.error("Error fetching page data:", error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchData()
    }, [activeTab])

    const handleUpload = async (file: File, path: string): Promise<string> => {
        const storageRef = ref(storage, `pages/${path}/${Date.now()}_${file.name}`)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof AboutPageData) => {
        if (e.target.files && e.target.files[0]) {
            setSaving(true) // Show loading state during upload
            try {
                const url = await handleUpload(e.target.files[0], "about")
                setAboutData(prev => ({ ...prev, [field]: url }))
            } catch (error) {
                console.error("Error uploading file:", error)
                alert("Upload failed")
            } finally {
                setSaving(false)
            }
        }
    }

    const handleSaveAbout = async () => {
        setSaving(true)
        try {
            await setDoc(doc(db, "pages_content", "about"), aboutData)
            alert("Changes saved successfully!")
        } catch (error) {
            console.error("Error saving content:", error)
            alert("Failed to save changes.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Page Content Manager</h1>
                <p className="text-muted-foreground">Edit the content of your static pages.</p>
            </div>

            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="about">About Us</TabsTrigger>
                    {/* Future: Add more pages like 'Admissions Info', 'Contact Info' here */}
                </TabsList>

                <TabsContent value="about" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Page Content</CardTitle>
                            <CardDescription>Manage text and images for the About Us page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Hero Section */}
                            <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Hero Section</h3>
                                <div className="grid gap-2">
                                    <LocalLabel>Page Title</LocalLabel>
                                    <Input value={aboutData.heroTitle} onChange={(e) => setAboutData({ ...aboutData, heroTitle: e.target.value })} />
                                </div>
                                <div className="grid gap-2">
                                    <LocalLabel>Subtitle</LocalLabel>
                                    <Input value={aboutData.heroSubtitle} onChange={(e) => setAboutData({ ...aboutData, heroSubtitle: e.target.value })} />
                                </div>
                                <div className="grid gap-2">
                                    <LocalLabel>Header Background Image</LocalLabel>
                                    <div className="flex gap-4 items-center">
                                        {aboutData.heroImage && <img src={aboutData.heroImage} alt="Hero" className="h-16 w-24 object-cover rounded bg-slate-200" />}
                                        <Input type="file" onChange={(e) => handleFileChange(e, 'heroImage')} />
                                    </div>
                                </div>
                            </div>

                            {/* History Section */}
                            <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                                <h3 className="font-semibold text-lg">History Section</h3>
                                <div className="grid gap-2">
                                    <LocalLabel>History Title</LocalLabel>
                                    <Input value={aboutData.historyTitle} onChange={(e) => setAboutData({ ...aboutData, historyTitle: e.target.value })} />
                                </div>
                                <div className="grid gap-2">
                                    <LocalLabel>History Content</LocalLabel>
                                    <Textarea rows={6} value={aboutData.historyContent} onChange={(e) => setAboutData({ ...aboutData, historyContent: e.target.value })} />
                                </div>
                                <div className="grid gap-2">
                                    <LocalLabel>History Side Image</LocalLabel>
                                    <div className="flex gap-4 items-center">
                                        {aboutData.historyImage && <img src={aboutData.historyImage} alt="History" className="h-16 w-24 object-cover rounded bg-slate-200" />}
                                        <Input type="file" onChange={(e) => handleFileChange(e, 'historyImage')} />
                                    </div>
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                                    <h3 className="font-semibold text-lg">Vision</h3>
                                    <div className="grid gap-2">
                                        <LocalLabel>Title</LocalLabel>
                                        <Input value={aboutData.visionTitle} onChange={(e) => setAboutData({ ...aboutData, visionTitle: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <LocalLabel>Content</LocalLabel>
                                        <Textarea rows={4} value={aboutData.visionContent} onChange={(e) => setAboutData({ ...aboutData, visionContent: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                                    <h3 className="font-semibold text-lg">Mission</h3>
                                    <div className="grid gap-2">
                                        <LocalLabel>Title</LocalLabel>
                                        <Input value={aboutData.missionTitle} onChange={(e) => setAboutData({ ...aboutData, missionTitle: e.target.value })} />
                                    </div>
                                    <div className="grid gap-2">
                                        <LocalLabel>Content</LocalLabel>
                                        <Textarea rows={4} value={aboutData.missionContent} onChange={(e) => setAboutData({ ...aboutData, missionContent: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleSaveAbout} disabled={saving} className="w-full">
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {saving ? "Saving..." : "Save Content Changes"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
