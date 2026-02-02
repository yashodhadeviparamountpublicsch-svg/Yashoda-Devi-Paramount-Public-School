"use client"

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Loader2 } from "lucide-react";

interface PrideStudent {
    id: string;
    name: string;
    achievement: string;
    class: string;
    year: string;
    image: string;
    description?: string;
}

export default function PridePage() {
    const [students, setStudents] = useState<PrideStudent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const q = query(collection(db, "pride_students"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as PrideStudent[];
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <PageHeader
                title="Our Pride"
                subtitle="Celebrating excellence and achievement."
                backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : students.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                <p className="text-muted-foreground">Our achievers will be showcased here soon.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {students.map((student) => (
                                <Card key={student.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/5] overflow-hidden relative bg-slate-100">
                                        {student.image ? (
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-400">
                                                <Trophy className="h-16 w-16" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {student.year}
                                        </div>
                                    </div>
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-xl font-bold font-serif text-primary mb-1">{student.name}</h3>
                                        <p className="text-secondary font-bold text-sm uppercase tracking-wide mb-2">{student.achievement}</p>
                                        <p className="text-xs text-muted-foreground font-medium mb-3">{student.class}</p>
                                        {student.description && (
                                            <p className="text-sm text-foreground/80 leading-relaxed italic">"{student.description}"</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
