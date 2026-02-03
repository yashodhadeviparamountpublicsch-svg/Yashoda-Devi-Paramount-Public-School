"use client"

import { HeroSlider } from "@/components/home/HeroSlider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Shield, Users, Music } from "lucide-react"
import { StatsCounter } from "@/components/home/StatsCounter"
import { NoticesPreview } from "@/components/home/NoticesPreview"
import { FacultyPreview } from "@/components/home/FacultyPreview"
import { GalleryPreview } from "@/components/home/GalleryPreview"
import { PridePreview } from "@/components/home/PridePreview"
import { CoachingPreview } from "@/components/home/CoachingPreview"
import { motion } from "framer-motion"
import { ScrollAnimation } from "@/components/common/ScrollAnimation"

const highlights = [
  { icon: GraduationCap, title: "Nursery to Class 10", desc: "Complete schooling with CBSE aligned curriculum aiming for holistic excellence." },
  { icon: Shield, title: "Safe & Secure Campus", desc: "Prioritizing safety with 24/7 security, CCTV surveillance, and caring staff." },
  { icon: Users, title: "Qualified Teachers", desc: "Experienced educators dedicated to nurturing every child's potential." },
  { icon: Music, title: "Holistic Development", desc: "A balanced focus on academics, sports, arts, and cultural activities." },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSlider />

      <ScrollAnimation>
        <StatsCounter />
      </ScrollAnimation>

      {/* Highlights Section */}
      <section className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground mb-4 md:mb-6">Nurturing Excellence</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We provide a stimulating environment where every child is encouraged to explore, learn, and grow into confident individuals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden h-full">
                  <CardContent className="p-6 md:p-8 flex flex-col items-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="h-14 w-14 md:h-16 md:w-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                      <item.icon className="h-7 w-7 md:h-8 md:w-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 font-serif text-foreground relative z-10">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ScrollAnimation>
        <CoachingPreview />
      </ScrollAnimation>

      <ScrollAnimation delay={0.2}>
        <FacultyPreview />
      </ScrollAnimation>

      {/* Principal's Message */}
      <section className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] glass p-2 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 relative z-10 max-w-sm lg:max-w-md mx-auto">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
                  {/* Placeholder for Principal Image */}
                  <img
                    src="/images/director.jpg"
                    alt="Director of Yashoda Devi Paramount Public School"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Decorative border */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-3xl z-0 max-w-md hidden md:block left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left"
            >
              <div>
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Leadership</span>
                <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground">Principal's Message</h2>
              </div>
              <blockquote className="text-lg md:text-2xl font-medium text-foreground/90 italic font-serif leading-relaxed border-l-4 border-primary pl-4 md:pl-6 py-3 md:py-4 ml-2 md:ml-4 lg:ml-0 glass rounded-r-xl pr-4 md:pr-6 shadow-sm text-left">
                "Education is not just about filling a bucket, but lighting a fire. We strive to ignite the passion for learning in every student."
              </blockquote>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                At Yashoda Devi Paramount Public School, we believe in fostering not just academic excellence but a strong moral compass. Our mission is to empower students to become compassionate, critical thinkers who contribute positively to society. We are committed to providing a safe and nurturing environment where every child feels valued.
              </p>
              <div className="pt-2 md:pt-4">
                <p className="font-bold text-xl md:text-2xl font-serif text-gradient-primary">ER Sumit Kumar Choudhary</p>
                <p className="text-muted-foreground font-medium">Director, YDPPS</p>
              </div>
              <div className="pt-2 md:pt-4">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors" asChild>
                  <Link href="/about">Read Full Message</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ScrollAnimation>
        <PridePreview />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <NoticesPreview />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <GalleryPreview />
      </ScrollAnimation>

      {/* Call to Action */}
      <ScrollAnimation>
        <section className="py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[100px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-gradient-primary drop-shadow-sm">Join Our Growing Family</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Admissions are now open for the academic session 2026-27. Give your child the gift of quality education.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-10 h-16 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 bg-gradient-primary text-white font-bold" asChild>
                <Link href="/admissions">Apply for Admission</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 h-16 rounded-full border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/50 transition-all bg-white/50 backdrop-blur-sm" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
