"use client"

import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PageHeader } from "@/components/common/PageHeader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await addDoc(collection(db, "contact_messages"), {
                ...formData,
                status: "unread",
                createdAt: serverTimestamp()
            })

            toast({
                title: "Message Sent",
                description: "Thank you for contacting us. We will get back to you shortly.",
            })

            // Reset form
            setFormData({
                name: "",
                phone: "",
                email: "",
                subject: "",
                message: ""
            })
        } catch (error) {
            console.error("Error sending message:", error)
            toast({
                title: "Failed to Send",
                description: "There was an error sending your message. Please try again.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <PageHeader
                title="Contact Us"
                subtitle="We'd love to hear from you."
                backgroundImage="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold font-serif text-primary mb-6">Get in Touch</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Have questions about admissions, academics, or campus life? Reach out to us using the form or the details below.
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="tex-xl font-bold font-serif text-primary mb-4">Important Contacts</h3>
                                <div className="overflow-hidden rounded-lg border">
                                    <table className="w-full text-sm">
                                        <tbody className="divide-y">
                                            <tr className="bg-muted/50"><td className="p-3 font-medium">Reception / General Enquiry</td><td className="p-3"><a href="tel:+916205878510" className="hover:text-primary transition-colors">+91 62058 78510</a></td></tr>
                                            <tr><td className="p-3 font-medium">Admission Office</td><td className="p-3"><a href="tel:+916205878510" className="hover:text-primary transition-colors">+91 62058 78510</a></td></tr>
                                            <tr className="bg-muted/50"><td className="p-3 font-medium">Transport In-charge</td><td className="p-3"><a href="tel:+919931648439" className="hover:text-primary transition-colors">+91 99316 48439</a></td></tr>
                                            <tr><td className="p-3 font-medium">Accounts Department</td><td className="p-3"><a href="tel:+919934290786" className="hover:text-primary transition-colors">+91 99342 90786</a></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-secondary shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold mb-1">Visit Us</h3>
                                            <p className="text-muted-foreground">Kharagpur - Asarganj Rd, Kharagpur, Singhpur, Bihar 811213</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <Phone className="h-6 w-6 text-secondary shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold mb-1">Call Us</h3>
                                            <p className="text-muted-foreground"><a href="tel:+916205878510" className="hover:text-primary transition-colors">+91 62058 78510</a></p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <Mail className="h-6 w-6 text-secondary shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold mb-1">Email Us</h3>
                                            <p className="text-muted-foreground break-all">yashodhadeviparamountpublicsch@gmail.com</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <Clock className="h-6 w-6 text-secondary shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold mb-1">School Hours</h3>
                                            <p className="text-muted-foreground">Mon - Sat: 8:00 AM - 2:00 PM</p>
                                            <p className="text-muted-foreground">Office: 9:00 AM - 4:00 PM</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-muted/30 p-8 rounded-2xl border border-muted h-fit">
                            <h3 className="text-2xl font-bold font-serif text-primary mb-6">Send a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <Input id="name" required value={formData.name} onChange={handleChange} placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                        <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                    <Input id="subject" required value={formData.subject} onChange={handleChange} placeholder="Inquiry about..." />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea id="message" required value={formData.message} onChange={handleChange} placeholder="How can we help you?" />
                                </div>
                                <Button type="submit" className="w-full text-lg h-12" disabled={loading}>
                                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Map Integration */}
                    <div className="mt-16 rounded-2xl overflow-hidden shadow-lg h-80 bg-gray-200 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.2880823671558!2d86.55974267437423!3d25.125949534584834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1963fd102f25b%3A0x9911865cab4ea2cc!2sYashoda%20Devi%20Paramount%20Public%20School!5e0!3m2!1sen!2sin!4v1769941441496!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 grayscale hover:grayscale-0 transition-all"
                        />
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/10">
                            {/* Overlay to ensure map is visible but matches theme slightly */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
