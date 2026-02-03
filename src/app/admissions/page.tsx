"use client"

import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import Link from "next/link"

function AdmissionForm() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        studentName: "",
        parentName: "",
        grade: "",
        phone: "",
        email: "",
        address: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleValueChange = (value: string, id: string) => {
        setFormData({ ...formData, [id]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await addDoc(collection(db, "admissions"), {
                ...formData,
                status: "pending",
                createdAt: serverTimestamp()
            })

            toast({
                title: "Application Submitted",
                description: "We have received your admission inquiry. We will contact you soon.",
            })

            // Reset form
            setFormData({
                studentName: "",
                parentName: "",
                grade: "",
                phone: "",
                email: "",
                address: "",
                message: ""
            })
        } catch (error) {
            console.error("Error submitting admission form:", error)
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your application. Please try again.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 md:p-12 rounded-2xl max-w-4xl mx-auto shadow-xl border border-primary/10">
            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold font-serif text-primary mb-4">Online Admission Inquiry</h3>
                <p className="text-muted-foreground">
                    Fill out the form below to enquire about admissions for the academic year 2026-27.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="studentName">Student Name <span className="text-red-500">*</span></Label>
                        <Input id="studentName" required value={formData.studentName} onChange={handleChange} placeholder="Enter student's full name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="parentName">Parent/Guardian Name <span className="text-red-500">*</span></Label>
                        <Input id="parentName" required value={formData.parentName} onChange={handleChange} placeholder="Enter parent's full name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="grade">Class Applying For <span className="text-red-500">*</span></Label>
                        <Select onValueChange={(val) => handleValueChange(val, "grade")} value={formData.grade} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Nursery">Nursery</SelectItem>
                                <SelectItem value="LKG">LKG</SelectItem>
                                <SelectItem value="UKG">UKG</SelectItem>
                                {[...Array(9)].map((_, i) => (
                                    <SelectItem key={i} value={`Class ${i + 1}`}>Class {i + 1}</SelectItem>
                                ))}
                                <SelectItem value="Navodaya Vidyalaya">Navodaya Vidyalaya</SelectItem>
                                <SelectItem value="Simultala Vidyalaya">Simultala Vidyalaya</SelectItem>
                                <SelectItem value="Sainik School">Sainik School</SelectItem>
                                <SelectItem value="Ramkrishna Mission">Ramkrishna Mission</SelectItem>
                                <SelectItem value="Rashtriya Military School">Rashtriya Military School</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                        <Input id="phone" required value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" type="tel" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <Input id="email" required value={formData.email} onChange={handleChange} placeholder="parent@example.com" type="email" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Residential Address</Label>
                        <Input id="address" value={formData.address} onChange={handleChange} placeholder="Full address" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="message">Message / Queries</Label>
                        <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Any specific questions regarding admission?" />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="w-full md:w-auto px-12 h-12 text-lg font-bold bg-gradient-primary hover:opacity-90 transition-opacity" disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export const metadata = {
    title: "Admissions",
    description: "Apply for admission at Yashoda Devi Paramount Public School for the academic year 2026-27. Check eligibility criteria and documents required.",
};

export default function AdmissionsPage() {
    return (
        <div>
            <PageHeader
                title="Admissions"
                subtitle="Begin your journey with Yashoda Devi Paramount Public School."
                backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-serif text-primary mb-12 text-center">Admission Process</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { step: 1, title: "Online Registration", desc: "Fill out the online application form below or visit the school office." },
                            { step: 2, title: "Document Submission", desc: "Submit necessary documents (Birth Certificate, Address Proof, etc.)" },
                            { step: 3, title: "Interaction / Test", desc: "Attend a brief interaction or entrance test (for higher classes)." },
                        ].map((item) => (
                            <Card key={item.step} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-8">
                                    <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Eligibility Criteria */}
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-primary mb-6">Age Eligibility Criteria</h3>
                            <p className="text-muted-foreground mb-4">Minimum age as of 31st March of the academic session:</p>
                            <div className="overflow-hidden rounded-lg border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-3 font-bold">Class</th>
                                            <th className="px-4 py-3 font-bold">Minimum Age</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr><td className="px-4 py-3">Nursery</td><td className="px-4 py-3">3+ Years</td></tr>
                                        <tr><td className="px-4 py-3">LKG</td><td className="px-4 py-3">4+ Years</td></tr>
                                        <tr><td className="px-4 py-3">UKG</td><td className="px-4 py-3">5+ Years</td></tr>
                                        <tr><td className="px-4 py-3">Class 1</td><td className="px-4 py-3">6+ Years</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Documents Required */}
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-primary mb-6">Documents Required</h3>
                            <ul className="space-y-3">
                                {[
                                    "Birth Certificate (Original for verification + 1 Photocopy)",
                                    "Passport size photographs of student (4 copies)",
                                    "Passport size photographs of parents (2 copies each)",
                                    "Aadhar Card of student and parents",
                                    "Transfer Certificate (for Class 2 onwards)",
                                    "Report Card of previous class",
                                    "Blood Group Report"
                                ].map((doc, i) => (
                                    <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border shadow-sm">
                                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                                        <span className="text-sm text-muted-foreground">{doc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div id="apply">
                        <AdmissionForm />
                    </div>

                    <div className="mt-12 text-center">
                        <Button variant="outline" asChild>
                            <Link href="/contact">Contact Admission Office</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
