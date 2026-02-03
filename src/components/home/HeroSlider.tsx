"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

const defaultSlides = [
    {
        id: "local-1",
        image: "/images/school-hero.png",
        title: "Welcome to Yashoda Devi Paramount Public School",
        subtitle: "Nurturing Excellence, Inspiring Futures",
        ctaText: "Contact Us",
        ctaLink: "/contact"
    },
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
        title: "Academic Excellence",
        subtitle: "Fostering a love for learning in every child.",
        ctaText: "Learn More",
        ctaLink: "/about"
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
        title: "World-Class Facilities",
        subtitle: "Empowering students with modern learning methodologies.",
        ctaText: "Academics",
        ctaLink: "/academics"
    }
]

export function HeroSlider() {
    const [slides, setSlides] = useState(defaultSlides)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const q = query(collection(db, "hero_slides"), orderBy("order", "asc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const fetchedSlides = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as any[]
                setSlides(fetchedSlides)
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

    if (slides.length === 0) return null

    return (
        <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    >
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
                        <motion.div
                            key={`content-${slides[current].id}`}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="max-w-4xl pt-10 md:pt-0"
                        >
                            <span className="inline-block py-1 px-4 mb-4 md:mb-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs md:text-sm font-bold tracking-widest uppercase">
                                Welcome to YDPPS
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-4 md:mb-6 tracking-tight drop-shadow-md leading-tight">
                                {slides[current].title}
                            </h1>
                            <p className="text-base sm:text-lg md:text-2xl mb-8 md:mb-10 opacity-90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm px-2">
                                {slides[current].subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="text-lg px-8 h-14 rounded-full bg-primary hover:bg-primary/90 text-white border-none shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1" asChild>
                                    <Link href={slides[current].ctaLink?.trim() || "/"}>{slides[current].ctaText || "Learn More"}</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-primary border-white/50 hover:border-white transition-all backdrop-blur-sm" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20 backdrop-blur-sm">
                <ChevronLeft className="h-8 w-8" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20 backdrop-blur-sm">
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-secondary w-8" : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
