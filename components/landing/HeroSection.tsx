"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, Leaf, Droplets, TrendingUp } from "lucide-react"
import { GLOBAL_SUSTAINABILITY_STATS } from "@/lib/dummyData"
import { useEffect, useState } from "react"

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="counter-animation">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function HeroSection() {
  const {
    total_co2_saved_kg,
    total_textiles_reworn_kg,
    total_water_saved_liters,
    total_users,
    total_swaps,
    items_saved_from_landfill,
  } = GLOBAL_SUSTAINABILITY_STATS

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 py-16 lg:py-24">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl float-animation" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Environmental Impact Section - Leading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-8 pulse-glow">
            <Leaf className="w-4 h-4 mr-2" />
            <AnimatedCounter end={total_users} /> sustainable fashion lovers worldwide
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-800 mb-6 font-poppins leading-tight">
            Swipe. <span className="text-emerald-600">Swap.</span> <span className="text-amber-600">Sustain.</span>
          </h1>

          <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join the fashion revolution that's already saved{" "}
            <strong className="text-emerald-600">
              <AnimatedCounter end={Math.round(total_co2_saved_kg / 1000)} />T of CO₂
            </strong>{" "}
            and diverted{" "}
            <strong className="text-amber-600">
              <AnimatedCounter end={Math.round(items_saved_from_landfill / 1000)} />K items
            </strong>{" "}
            from landfills.
          </p>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg card-hover"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
                <Leaf className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-stone-800 mb-2">
                <AnimatedCounter end={Math.round(total_co2_saved_kg / 1000)} />T
              </div>
              <div className="text-stone-600 text-sm font-medium">CO₂ Saved</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg card-hover"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
                <Droplets className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-stone-800 mb-2">
                <AnimatedCounter end={Math.round(total_water_saved_liters / 1000000)} />M
              </div>
              <div className="text-stone-600 text-sm font-medium">Liters Saved</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg card-hover"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-4">
                <Recycle className="w-7 h-7 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-stone-800 mb-2">
                <AnimatedCounter end={Math.round(items_saved_from_landfill / 1000)} />K
              </div>
              <div className="text-stone-600 text-sm font-medium">Items Rescued</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg card-hover"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-rose-100 rounded-full mb-4">
                <TrendingUp className="w-7 h-7 text-rose-600" />
              </div>
              <div className="text-3xl font-bold text-stone-800 mb-2">
                <AnimatedCounter end={Math.round(total_swaps / 1000)} />K
              </div>
              <div className="text-stone-600 text-sm font-medium">Swaps Made</div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-full shadow-lg btn-hover-lift"
            >
              <Link href="/swipe">
                Start Swapping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg rounded-full border-2 border-emerald-300 hover:border-emerald-400 bg-white/80 backdrop-blur-sm btn-hover-lift"
            >
              <Link href="/upload">List an Item</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg rounded-full border-2 border-amber-300 hover:border-amber-400 bg-white/80 backdrop-blur-sm btn-hover-lift"
            >
              <Link href="/browse">Explore Styles</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
