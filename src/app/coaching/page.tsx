"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, GraduationCap, MapPin, Calendar, Phone, Trophy, Users, BookOpen, Star, Target, ArrowRight } from "lucide-react"

export default function CoachingPage() {
    const exams = [
        { name: "NAVODAYA VIDYALAYA", desc: "Premium preparation for JNVST" },
        { name: "SIMULTALA VIDYALAYA", desc: "Top-tier coaching for SAV entrance" },
        { name: "SAINIK SCHOOL", desc: "Rigorous training for AISSEE" },
        { name: "RAMKRISHNA MISSION", desc: "Holistic prep for RKM schools" },
        { name: "RASHTRIYA MILITARY", desc: "Dedicated RMS entrance coaching" }
    ]

    const features = [
        { icon: Users, title: "Small Batch Sizes", desc: "Personalized attention with limited students per batch." },
        { icon: BookOpen, title: "Expert Material", desc: "Comprehensive study guides tailored for each exam." },
        { icon: Target, title: "Mock Tests", desc: "Regular testing patterns to simulate real exam conditions." },
        { icon: Trophy, title: "Proven Results", desc: "Consistent track record of successful selections." }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 fixed-bg-effect" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/95" />

                {/* Decorative Mesh */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 animate-pulse" style={{ animationDelay: "2s" }} />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 font-bold tracking-wider uppercase text-xs mb-8">
                            <Star className="h-3 w-3 fill-current" />
                            Premier Residential Coaching
                        </div>

                        <div className="relative w-full max-w-5xl mx-auto mb-12 group perspective-1000">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white/10 relative transform transition-transform duration-700 group-hover:scale-[1.01]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                                <Image
                                    src="/images/Nk coaching center banner.jpeg"
                                    alt="N.K Career Coaching Center Banner"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm">
                                N.K. Career Coaching Center
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                                The <span className="text-orange-400 font-medium">only residential institute</span> dedicated to shaping champions for India's top competitive school entrance exams.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-slate-400 mt-4">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>West Azimganj, Munger</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>2026-27 Batch Open</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-primary hover:shadow-lg hover:shadow-primary/40 transition-all font-bold" asChild>
                                <Link href="/admissions">Join 2026-27 Batch</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                                <Link href="/contact">Contact Support</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-10 bg-slate-900 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { label: "Students Selected", value: "500+" },
                            { label: "Years of Excellence", value: "10+" },
                            { label: "Expert Faculty", value: "15+" },
                            { label: "Success Rate", value: "95%" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <h3 className="text-3xl md:text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">{stat.value}</h3>
                                <p className="text-xs md:text-sm text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preparation Section */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">Targeted Preparation</span>
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-6">Master Your Goals</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                            We provide specialized, results-oriented coaching for the most prestigious residential schools in India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {exams.map((exam, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card className="h-full border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden bg-white relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <CardContent className="p-8">
                                        <div className="h-12 w-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Trophy className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-primary transition-colors">{exam.name}</h3>
                                        <p className="text-slate-500 mb-6">{exam.desc}</p>
                                        <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features & Facilities */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div>
                                <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose Us</span>
                                <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-6">Excellence in Every Detail</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Our residential program acts as a catalyst for your child's success, providing an environment where learning never stops.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                                        <div className="shrink-0 h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                                            <p className="text-sm text-slate-500 leading-snug">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-[2rem] rotate-3 opacity-10" />
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                                    <div className="aspect-[4/3] bg-slate-100 relative">
                                        {/* Placeholder Pattern since we don't have a specific facility image yet */}
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-slate-900/5 to-slate-900/10">
                                            <GraduationCap className="h-24 w-24 text-slate-300 mb-4" />
                                            <h3 className="text-2xl font-bold text-slate-600">State-of-the-Art Campus</h3>
                                            <p className="text-slate-500">Designed for immersive learning</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md p-6 border-t border-white/50">
                                        <p className="font-serif italic text-lg text-center text-slate-700">
                                            "A home away from home, focused purely on your child's ambition."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 z-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-0 opacity-30" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-pulse" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">Begin The Journey To Success</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Limited seats available for the upcoming session. Don't miss the opportunity to give your child the best start.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:scale-105 transition-all" asChild>
                            <Link href="/admissions">Apply Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm" asChild>
                            <Link href="/contact">
                                <Phone className="mr-2 h-5 w-5" /> Talk to Counselor
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
