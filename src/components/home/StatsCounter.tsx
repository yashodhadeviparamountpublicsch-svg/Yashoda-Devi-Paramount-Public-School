"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, animate } from "framer-motion"

const stats = [
    { label: "Students", value: 1200, suffix: "+" },
    { label: "Teachers", value: 50, suffix: "+" },
    { label: "Years of Excellence", value: 15, suffix: "+" },
    { label: "Pass Percentage", value: 100, suffix: "%" },
]

function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null)
    const inView = useInView(nodeRef, { once: true, margin: "-100px" })

    useEffect(() => {
        if (!inView) return

        const node = nodeRef.current
        if (!node) return

        const controls = animate(from, to, {
            duration: duration,
            onUpdate(value) {
                node.textContent = Math.floor(value).toString()
            },
        })
        return () => controls.stop()
    }, [from, to, duration, inView])

    return <span ref={nodeRef} />
}

export function StatsCounter() {
    return (
        <section className="py-12 md:py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200/50">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-2 p-4 cursor-default group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-gradient-primary drop-shadow-sm">
                                <Counter from={0} to={stat.value} duration={2} />
                                {stat.suffix}
                            </div>
                            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs md:text-sm group-hover:text-primary transition-colors">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
