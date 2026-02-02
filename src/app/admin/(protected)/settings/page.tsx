"use client"

import { useState, useEffect } from "react"
import { useSiteSettings } from "@/lib/site-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2 } from "lucide-react"

// Local Label component to avoid dependency issues
function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>
}

export default function SettingsPage() {
    const { settings, updateSettings, loading: initialLoading } = useSiteSettings()
    const [formData, setFormData] = useState(settings)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Sync state when settings load
    useEffect(() => {
        setFormData(settings)
    }, [settings])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id.startsWith('socials.')) {
            const socialKey = id.split('.')[1]
            setFormData(prev => ({
                ...prev,
                socials: {
                    ...prev.socials,
                    [socialKey]: value
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)
        try {
            await updateSettings(formData)
            setMessage({ type: 'success', text: "Settings saved successfully!" })
            // Clear success message after 3 seconds
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to save settings." })
        } finally {
            setSaving(false)
        }
    }

    if (initialLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading settings...</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
                <p className="text-muted-foreground">Manage your website's core information.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Basic details about the school.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="schoolName">School Name</Label>
                                <Input id="schoolName" value={formData.schoolName} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="shortName">Short Name (Acronym)</Label>
                                    <Input id="shortName" value={formData.shortName} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="logo">Logo URL</Label>
                                    <Input id="logo" value={formData.logo} onChange={handleChange} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                            <CardDescription>Visible in the footer and contact page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" value={formData.phone} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={formData.address} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>Links to your social profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="socials.facebook">Facebook</Label>
                                <Input id="socials.facebook" value={formData.socials.facebook} onChange={handleChange} placeholder="https://facebook.com/..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="socials.instagram">Instagram</Label>
                                <Input id="socials.instagram" value={formData.socials.instagram} onChange={handleChange} placeholder="https://instagram.com/..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="socials.youtube">YouTube</Label>
                                <Input id="socials.youtube" value={formData.socials.youtube} onChange={handleChange} placeholder="https://youtube.com/..." />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-4 sticky bottom-6 bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm z-10">
                        <Button type="submit" disabled={saving} className="w-full md:w-auto">
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        {message && (
                            <span className={message.type === 'success' ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                {message.text}
                            </span>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}
