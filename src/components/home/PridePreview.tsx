"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, Trophy } from "lucide-react"
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function PridePreview() {
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const q = query(collection(db, "pride_students"), orderBy("createdAt", "desc"), limit(4))
                const snapshot = await getDocs(q)
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setStudents(data)
            } catch (error) {
                console.error("Error fetching pride students:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStudents()
    }, [])

    // Fallback content if no data
    const displayStudents = students.length > 0 ? students : [
        {
            id: 'p1',
            name: "Aarav Kumar",
            achievement: "1st Rank in State Olympiad",
            class: "Class 10",
            year: "2025",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop"
        },
        {
            id: 'p2',
            name: "Ishita Patel",
            achievement: "98.5% in CBSE Finals",
            class: "Class 12",
            year: "2024",
            image: "https://images.unsplash.com/photo-1491013566860-e9a19e10af2a?q=80&w=3270&auto=format&fit=crop"
        },
        {
            id: 'p3',
            name: "Rohan Singh",
            achievement: "Best Athlete of the Year",
            class: "Class 11",
            year: "2025",
            image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 'p4',
            name: "Sanya Gupta",
            achievement: "Winner of National Debate",
            class: "Class 9",
            year: "2025",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
        }
    ]

    if (!loading && displayStudents.length === 0) return null // Should unlikely happen now

    return (
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4 max-w-2xl text-center md:text-left">
                        <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm bg-secondary/10 px-4 py-1.5 rounded-full inline-block mb-2">Our Achievers</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground leading-tight">
                            Our <span className="text-gradient-primary">Pride</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Celebrating the exceptional achievements and academic excellence of our brilliant students.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/50" asChild>
                        <Link href="/pride">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayStudents.map((student, index) => (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <Card className="overflow-hidden glass-card border-none group relative h-full">
                                    <div className="aspect-[3/4] overflow-hidden relative rounded-t-xl bg-slate-200">
                                        {student.image && (
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {student.year}
                                        </div>
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <CardContent className="p-6 text-center relative bg-white/50 backdrop-blur-sm group-hover:bg-white/80 transition-colors">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                                <Trophy className="h-5 w-5 text-secondary" />
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{student.name}</h3>
                                        <p className="text-secondary text-xs font-bold uppercase tracking-wider mb-2">{student.achievement}</p>
                                        <p className="text-xs text-muted-foreground font-medium">{student.class}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" className="w-full border-primary/20 text-primary" asChild>
                        <Link href="/pride">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
