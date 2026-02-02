import { PageHeader } from "@/components/common/PageHeader";

export default function AcademicsPage() {
    return (
        <div>
            <PageHeader
                title="Academics"
                subtitle="A curriculum designed to challenge and inspire."
                backgroundImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
            />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold font-serif text-primary mb-6">Curriculum Framework</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Yashoda Devi Paramount Public School follows the CBSE curriculum, offering a balanced blend of academic rigour and co-curricular activities. Our approach focuses on conceptual understanding rather than rote learning.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border p-6 rounded-lg bg-gray-50 hover:border-primary/20 transition-colors">
                                <h3 className="text-xl font-bold mb-3 font-serif text-primary">Pre-Primary (Nursery - KG)</h3>
                                <p className="text-sm text-muted-foreground mb-4">Focus on play-based learning, sensory development, and social skills.</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>Language Development (English & Hindi)</li>
                                    <li>Number Work & Basic Math</li>
                                    <li>Environmental Awareness</li>
                                    <li>Art, Craft & Clay Modelling</li>
                                    <li>Physical Activities & Yoga</li>
                                </ul>
                            </div>
                            <div className="border p-6 rounded-lg bg-gray-50 hover:border-primary/20 transition-colors">
                                <h3 className="text-xl font-bold mb-3 font-serif text-primary">Primary (Classes 1 - 5)</h3>
                                <p className="text-sm text-muted-foreground mb-4">Building foundational literacy, numeracy, and environmental awareness.</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>English, Hindi, Mathematics</li>
                                    <li>Environmental Studies (EVS)</li>
                                    <li>Computer Science</li>
                                    <li>General Knowledge & Value Education</li>
                                    <li>Music, Dance & Physical Education</li>
                                </ul>
                            </div>
                            <div className="border p-6 rounded-lg bg-gray-50 hover:border-primary/20 transition-colors">
                                <h3 className="text-xl font-bold mb-3 font-serif text-primary">Middle School (Classes 6 - 8)</h3>
                                <p className="text-sm text-muted-foreground mb-4">Introduction to specialized subjects, critical thinking, and project-based learning.</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>English, Hindi, Sanskrit</li>
                                    <li>Mathematics, Science, Social Science</li>
                                    <li>Information Technology (IT)</li>
                                    <li>Life Skills & Arts</li>
                                </ul>
                            </div>
                            <div className="border p-6 rounded-lg bg-gray-50 hover:border-primary/20 transition-colors">
                                <h3 className="text-xl font-bold mb-3 font-serif text-primary">Secondary (Classes 9 - 10)</h3>
                                <p className="text-sm text-muted-foreground mb-4">Preparation for board exams with intensive coaching and guidance.</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>English Communicative</li>
                                    <li>Hindi Course A/B</li>
                                    <li>Mathematics (Standard/Basic)</li>
                                    <li>Science (Physics, Chemistry, Biology)</li>
                                    <li>Social Science (Info Tech/AI)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Co-curricular & Assessment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-12 border-t">
                            <div>
                                <h2 className="text-2xl font-bold font-serif text-primary mb-6">Evaluation & Assessment</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        We follow the Continuous and Comprehensive Evaluation (CCE) pattern as per CBSE guidelines.
                                    </p>
                                    <ul className="space-y-2 list-disc list-inside ml-2">
                                        <li><strong className="text-foreground">Periodic Tests:</strong> Conducted periodically to assess topic retention.</li>
                                        <li><strong className="text-foreground">Subject Enrichment:</strong> Projects, Lab activities, and Speaking/Listening skills.</li>
                                        <li><strong className="text-foreground">Mid-Term & Final Exams:</strong> Comprehensive assessment of the syllabus.</li>
                                        <li><strong className="text-foreground">Co-Scholastic:</strong> Grading on Work Education, Art Education, and Health/Physical Education.</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-serif text-primary mb-6">Co-Curricular Activities</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        Holistic development is at the core of our curriculum. Students are encouraged to participate in:
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-foreground mb-1">Clubs</h4>
                                            <p className="text-sm">Nature Club, Science Club, Literary Club, Math Club</p>
                                        </div>
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-foreground mb-1">Performing Arts</h4>
                                            <p className="text-sm">Classical Dance, Music (Vocal & Instrumental), Drama</p>
                                        </div>
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-foreground mb-1">Sports</h4>
                                            <p className="text-sm">Annual Sports Meet, Inter-House Tournaments, Yoga</p>
                                        </div>
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <h4 className="font-bold text-foreground mb-1">Events</h4>
                                            <p className="text-sm">Science Exhibition, Annual Function, Debate Competitions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
