"use client"

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

interface Notice {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    fileUrl?: string;
    fileName?: string;
}

fileName ?: string;
}

export const metadata = {
    title: "Notices",
    description: "Stay updated with the latest news, announcements, and circulars from Yashoda Devi Paramount Public School.",
};

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const noticesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Notice[];
                setNotices(noticesData);
            } catch (error) {
                console.error("Error fetching notices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            "General": "bg-blue-100 text-blue-800",
            "Academic": "bg-green-100 text-green-800",
            "Event": "bg-purple-100 text-purple-800",
            "Holiday": "bg-orange-100 text-orange-800",
            "Exam": "bg-red-100 text-red-800"
        };
        return colors[category] || "bg-gray-100 text-gray-800";
    };

    return (
        <div>
            <PageHeader
                title="Notices & Announcements"
                subtitle="Stay updated with the latest school news."
                backgroundImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
            />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold font-serif text-primary mb-6">Guidelines for Students</h2>
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-8">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Students must carry their almanac to school every day.</li>
                                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Punctuality is essential; latecomers may be sent back home.</li>
                                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Uniforms must be neat, clean, and ironed.</li>
                                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> Use of mobile phones or electronic gadgets is strictly prohibited.</li>
                                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> School property must be taken care of; damage will be fined.</li>
                                    <li className="flex gap-2"><span className="text-primary font-bold">•</span> 75% attendance is mandatory to appear for final examinations.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <h2 className="text-3xl font-bold font-serif text-primary mb-8">Latest Announcements</h2>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : notices.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground">No notices available yet.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {notices.map((notice) => (
                                <Card key={notice.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                                                        {notice.category}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">{notice.date}</span>
                                                </div>
                                                <h3 className="text-xl font-bold font-serif mb-2">{notice.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{notice.content}</p>
                                                {notice.fileUrl && (
                                                    <div className="mt-4">
                                                        <a
                                                            href={notice.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            Download {notice.fileName || "Attachment"}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
