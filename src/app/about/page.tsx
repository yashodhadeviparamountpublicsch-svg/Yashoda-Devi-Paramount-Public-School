"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PageHeader } from "@/components/common/PageHeader"
import { Loader2 } from "lucide-react"

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

const defaultData: AboutPageData = {
    heroTitle: "About Us",
    heroSubtitle: "Dedicated to fostering holistic development and academic excellence since establishment.",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
    historyTitle: "Our History",
    historyContent: "Yashoda Devi Paramount Public School was founded with a vision to provide world-class education to the students of Haveli Kharagpur and surrounding areas. Over the years, we have grown from a modest beginning into an institution known for its discipline, academic results, and holistic approach.\n\nNamed after the late Yashoda Devi, a visionary who believed in the transformative power of education, the school stands as a tribute to her ideals.",
    historyImage: "/images/Our History.jpeg",
    visionTitle: "Our Vision",
    visionContent: "To be a center of excellence in education that nurtures the unique potential of every child, empowering them to become responsible global citizens.",
    missionTitle: "Our Mission",
    missionContent: "To provide a stimulating learning environment, instilling values of integrity, discipline, and empathy, while ensuring academic proficiency and physical wellness."
}

export default function AboutPage() {
    const [data, setData] = useState<AboutPageData>(defaultData)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "pages_content", "about")
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    // Start with defaults, overwrite with fetched data
                    // This creates a robust fallback if fields are missing in DB
                    setData({ ...defaultData, ...docSnap.data() as Partial<AboutPageData> })
                }
            } catch (error) {
                console.error("Error fetching about content:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <div className="h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    return (
        <div>
            <PageHeader
                title={data.heroTitle}
                subtitle={data.heroSubtitle}
                backgroundImage={data.heroImage || defaultData.heroImage}
            />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold font-serif text-primary">{data.historyTitle}</h2>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {data.historyContent}
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={data.historyImage || defaultData.historyImage}
                                alt="School Building"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-20 bg-primary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-4 border-white relative">
                                <img
                                    src="/images/director.jpg"
                                    alt="Director"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                                    <p className="font-bold">ER Sumit Kumar Choudhary</p>
                                    <p className="text-xs opacity-90">Director, YDPPS</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 space-y-6">
                            <h2 className="text-3xl font-bold font-serif text-primary">From the Director's Desk</h2>
                            <blockquote className="text-lg text-muted-foreground italic border-l-4 border-primary pl-6 py-2">
                                "Education is not merely the accumulation of facts, but the training of the mind to think. at Yashoda Devi Paramount Public School, we strive to build a community of lifelong learners who are equipped to face the challenges of the modern world with confidence and compassion."
                            </blockquote>
                            <p className="text-muted-foreground leading-relaxed">
                                Our commitment extends beyond the classroom. We focus on shaping character, instilling values, and fostering leadership skills. Every child is unique, and our goal is to uncover and nurture that uniqueness. We welcome you to join our family and be a part of this transformative journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-serif text-primary mb-12 text-center">Our Facilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Smart Classrooms", icon: "🖥️", desc: "Interactive digital learning tools." },
                            { title: "Science Labs", icon: "🔬", desc: "Modern physics, chemistry & biology labs." },
                            { title: "Library", icon: "📚", desc: "Well-stocked with diverse collection." },
                            { title: "Sports Complex", icon: "⚽", desc: "Large playground for cricket, football." },
                            { title: "Computer Lab", icon: "💻", desc: "High-spec systems for practicals." },
                            { title: "Transport", icon: "🚌", desc: "Safe bus fleet covering 20km radius." },
                            { title: "Security", icon: "🛡️", desc: "CCTV surveillance & trained guards." },
                            { title: "Medical Room", icon: "🏥", desc: "First-aid & nursing assistance." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1 bg-white group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold font-serif text-primary mb-6">Vision & Mission</h2>
                        <p className="text-xl text-muted-foreground italic">"To Create Leaders of Tomorrow"</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-background p-8 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow">
                            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">V</div>
                            <h3 className="text-xl font-bold mb-4 font-serif">{data.visionTitle}</h3>
                            <p className="text-muted-foreground leading-relaxed">{data.visionContent}</p>
                        </div>
                        <div className="bg-background p-8 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow">
                            <div className="h-16 w-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">M</div>
                            <h3 className="text-xl font-bold mb-4 font-serif">{data.missionTitle}</h3>
                            <p className="text-muted-foreground leading-relaxed">{data.missionContent}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
