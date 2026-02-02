"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PageHeaderProps {
    title: string
    subtitle?: string
    className?: string
    backgroundImage?: string
}

export function PageHeader({ title, subtitle, className, backgroundImage }: PageHeaderProps) {
    return (
        <div className={cn("relative py-32 md:py-48 overflow-hidden flex items-center justify-center", className)}>
            {/* Background Layers */}
            <div className="absolute inset-0 bg-mesh-orange -z-20" />

            {/* Animated Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10"
            />

            {/* Background Image Overlay (Optional) */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center -z-10 opacity-5 mix-blend-overlay grayscale"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-xs font-bold text-primary uppercase tracking-widest mb-6 shadow-sm">
                        Paramount Public School
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-foreground drop-shadow-sm tracking-tight">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 === 1 ? "text-gradient-primary inline-block" : "inline-block"}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                </motion.div>

                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="h-1 w-24 bg-gradient-primary mx-auto rounded-full mb-8 opacity-80" />
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                            {subtitle}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
