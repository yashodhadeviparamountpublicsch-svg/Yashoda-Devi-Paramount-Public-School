"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageIcon, ArrowRight, Loader2, X, ZoomIn } from "lucide-react"

export function GalleryPreview() {
    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<any>(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"), limit(6))
                const snapshot = await getDocs(q)
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setImages(data)
            } catch (error) {
                console.error("Error fetching gallery images:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchImages()
    }, [])

    if (!loading && images.length === 0) return null

    return (
        <>
            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-primary/5 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="text-center md:text-left">
                            <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm bg-secondary/10 px-4 py-1.5 rounded-full inline-block mb-2">Our Campus</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground leading-tight">
                                Campus <span className="text-gradient-primary">Gallery</span>
                            </h2>
                            <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
                                Explore the vibrant moments and memories from our school life.
                            </p>
                        </div>
                        <Button variant="outline" className="hidden md:flex border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/50 group" asChild>
                            <Link href="/gallery">
                                View All Photos <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className={index === 0 ? "col-span-2 row-span-2" : ""}
                                >
                                    <div
                                        className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <div className={`relative ${index === 0 ? 'aspect-[16/10]' : 'aspect-square'} overflow-hidden`}>
                                            <img
                                                src={image.url}
                                                alt={image.title || "Gallery Image"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 md:p-6">
                                                <div className="flex justify-end">
                                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        <ZoomIn className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                                    </div>
                                                </div>
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <p className="text-white font-bold text-sm md:text-lg">
                                                        {image.title || "School Highlight"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center md:hidden">
                        <Button variant="outline" className="w-full border-primary/20 text-primary" asChild>
                            <Link href="/gallery">
                                View All Photos <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors z-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-7xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                <p className="text-white text-xl font-bold">{selectedImage.title || "School Highlight"}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
