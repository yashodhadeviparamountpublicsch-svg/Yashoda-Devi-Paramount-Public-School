"use client"

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Loader2 } from "lucide-react";

interface GalleryImage {
    id: string;
    url: string;
    title: string;
}

title: string;
}

export const metadata = {
    title: "Gallery",
    description: "View the latest photos and events from Yashoda Devi Paramount Public School. Explore our campus life and activities.",
};

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
                const querySnapshot = await getDocs(q);
                const imagesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as GalleryImage[];
                setImages(imagesData);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <PageHeader
                title="Gallery"
                subtitle="Capturing moments, creating memories."
                backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    ) : images.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground">No images available yet.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.5 }}
                                    className="break-inside-avoid mb-6"
                                >
                                    <div
                                        className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.title}
                                            className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                                            <div className="flex justify-end">
                                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full transform translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-300">
                                                    <ZoomIn className="h-5 w-5 text-white" />
                                                </div>
                                            </div>
                                            <div className="transform translate-y-[20px] group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-white font-bold text-lg">{image.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
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
                                <p className="text-white text-xl font-bold">{selectedImage.title}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
