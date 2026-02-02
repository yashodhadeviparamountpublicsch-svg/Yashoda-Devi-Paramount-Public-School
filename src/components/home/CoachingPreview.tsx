"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Trophy, Target, Award } from "lucide-react"

export function CoachingPreview() {
    return (
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/Nk coaching center banner.jpeg"
                                alt="N.K Career Coaching Center Banner"
                                width={800}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            Start your preparation for prestigious entrance exams with the best residential coaching institute. We offer specialized coaching for Grade II, IV, and V students for the 2026-27 batch.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                "Navodaya Vidyalaya",
                                "Simultala Vidyalaya",
                                "Sainik School",
                                "Ramkrishna Mission",
                                "Rashtriya Military School"
                            ].map((school, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-medium text-slate-700">{school}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="bg-gradient-primary text-white shadow-lg hover:shadow-primary/20" asChild>
                            <Link href="/coaching">View Full Details</Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
                    >
                        <Card className="bg-white border-none shadow-xl hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">Top Results</h4>
                                <p className="text-sm text-slate-500">Best performance in competitive exams</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border-none shadow-xl mt-8 hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">Expert Faculty</h4>
                                <p className="text-sm text-slate-500">Specialized teachers for entrance exams</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border-none shadow-xl hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">Focused Batch</h4>
                                <p className="text-sm text-slate-500">Grade II, IV & V Preparation</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border-none shadow-xl mt-8 hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                                    <Award className="h-6 w-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">Residential</h4>
                                <p className="text-sm text-slate-500">Complete residential facility</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
