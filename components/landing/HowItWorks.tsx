"use client"

import { motion } from "framer-motion"
import { Upload, Heart, Recycle } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "List Your Items",
    description: "Upload photos of clothes you no longer wear. Add details about size, condition, and style.",
    color: "emerald",
  },
  {
    icon: Heart,
    title: "Swipe & Match",
    description: "Browse through curated items. Swipe right on pieces you love, left on ones you don't.",
    color: "rose",
  },
  {
    icon: Recycle,
    title: "Swap & Sustain",
    description: "Connect with other users, arrange swaps, and give your clothes a new life while earning points.",
    color: "amber",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-t-[40px] rounded-b-[40px] shadow-lg my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 font-poppins"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-stone-600"
          >
            Three simple steps to sustainable fashion
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  step.color === "emerald" ? "bg-emerald-100" : step.color === "rose" ? "bg-rose-100" : "bg-amber-100"
                }`}
              >
                <step.icon
                  className={`w-8 h-8 ${
                    step.color === "emerald"
                      ? "text-emerald-600"
                      : step.color === "rose"
                        ? "text-rose-600"
                        : "text-amber-600"
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-4">{step.title}</h3>
              <p className="text-stone-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
