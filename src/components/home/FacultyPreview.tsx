"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function FacultyPreview() {
    const [faculty, setFaculty] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                // Fetch up to 3 faculty members
                const q = query(collection(db, "faculty"), limit(3))
                const snapshot = await getDocs(q)
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setFaculty(data)
            } catch (error) {
                console.error("Error fetching faculty:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchFaculty()
    }, [])

    // Fallback content if no data (optional, or just show empty/loading)
    // To maintain "Premium" feel, if empty, we might hide the section or show nothing.
    // For now, let's just render what we have.

    // Fallback content if no data
    const displayFaculty = faculty.length > 0 ? faculty : [
        {
            id: 'placeholder-1',
            name: "Mrs. Anjali Gupta",
            role: "Science HOD",
            qualification: "M.Sc, B.Ed",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
        },
        {
            id: 'placeholder-2',
            name: "Mr. Rajesh Kumar",
            role: "Mathematics Mentor",
            qualification: "M.Sc Mathematics",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 'placeholder-3',
            name: "Ms. Priyanka Singh",
            role: "Primary Coordinator",
            qualification: "M.A, B.Ed",
            image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop"
        }
    ]

    if (!loading && displayFaculty.length === 0) return null // Should unlikely happen now

    return (
        <section className="py-20 bg-mesh-orange relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4 max-w-2xl text-center md:text-left">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">Our Mentors</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground leading-tight">
                            Meet Our <span className="text-gradient-primary">Expert Faculty</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Dedicated educators who inspire, guide, and nurture every student to achieve their full potential through personalized mentorship.
                        </p>
                    </div>
                    {/* Only show 'View All' if we have many - but preserving link */}
                    <Button variant="outline" className="hidden md:flex border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/50" asChild>
                        <Link href="/faculty">
                            View All Teachers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayFaculty.map((teacher, index) => (
                            <motion.div
                                key={teacher.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="overflow-hidden glass-card border-none group relative h-full">
                                    <div className="aspect-[3/4] overflow-hidden relative rounded-t-xl bg-slate-200">
                                        {teacher.image && (
                                            <img
                                                src={teacher.image}
                                                alt={teacher.name}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                                            />
                                        )}
                                        {/* Modern Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <CardContent className="p-6 text-center relative bg-white/50 backdrop-blur-sm group-hover:bg-white/80 transition-colors">
                                        <div className="absolute -top-10 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs font-bold text-primary uppercase tracking-wider">
                                                {teacher.role}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{teacher.name}</h3>
                                        <p className="text-muted-foreground text-sm font-medium mb-2 opacity-100 group-hover:opacity-0 transition-opacity absolute inset-x-0 bottom-4">{teacher.role}</p>

                                        <div className="pt-3 mt-3 border-t border-primary/10 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{teacher.qualification}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" className="w-full border-primary/20 text-primary" asChild>
                        <Link href="/faculty">
                            View All Teachers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

