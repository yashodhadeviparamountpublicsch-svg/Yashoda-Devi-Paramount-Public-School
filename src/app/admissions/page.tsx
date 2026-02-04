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

import { AdmissionForm } from "@/components/admissions/AdmissionForm"

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
