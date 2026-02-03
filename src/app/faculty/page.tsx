"use client"

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { User, Loader2 } from "lucide-react";

interface FacultyMember {
    id: string;
    name: string;
    role: string;
    qualification: string;
    image: string;
    bio?: string;
}

export const metadata = {
    title: "Our Faculty",
    description: "Meet the dedicated and experienced faculty members of Yashoda Devi Paramount Public School who guide students towards excellence.",
};

export default function FacultyPage() {
    const [faculty, setFaculty] = useState<FacultyMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                // Fetch faculty sorted by creation time (or add an 'order' field later if needed)
                const q = query(collection(db, "faculty"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as FacultyMember[];
                setFaculty(data);
            } catch (error) {
                console.error("Error fetching faculty:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);

    return (
        <div>
            <PageHeader
                title="Our Faculty"
                subtitle="Meet the mentors shaping the future."
                backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : faculty.length === 0 ? (
                        <div className="text-center py-12 bg-muted/30 rounded-lg">
                            <p className="text-muted-foreground">Faculty details coming soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {faculty.map((teacher) => (
                                <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                    <div className="aspect-[4/4] overflow-hidden relative bg-slate-100">
                                        {teacher.image ? (
                                            <img
                                                src={teacher.image}
                                                alt={teacher.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-400">
                                                <User className="h-16 w-16" />
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-xl font-bold font-serif text-primary mb-1">{teacher.name}</h3>
                                        <p className="text-secondary font-bold text-sm uppercase tracking-wide mb-2">{teacher.role}</p>
                                        <p className="text-xs text-muted-foreground font-medium mb-3">{teacher.qualification}</p>
                                        {teacher.bio && (
                                            <p className="text-sm text-foreground/80 leading-relaxed italic">"{teacher.bio}"</p>
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
