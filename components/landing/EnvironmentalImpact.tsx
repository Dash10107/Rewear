"use client"

import { motion } from "framer-motion"
import { Leaf, Droplets, Recycle, Globe } from "lucide-react"

const stats = [
  {
    icon: Leaf,
    value: "2.5T",
    label: "CO₂ Saved",
    description: "Equivalent to planting 125 trees",
    color: "emerald",
  },
  {
    icon: Droplets,
    value: "500M",
    label: "Liters Water Saved",
    description: "Enough to fill 200 swimming pools",
    color: "blue",
  },
  {
    icon: Recycle,
    value: "50K+",
    label: "Items Rescued",
    description: "From ending up in landfills",
    color: "amber",
  },
  {
    icon: Globe,
    value: "95%",
    label: "Waste Reduction",
    description: "Compared to fast fashion",
    color: "teal",
  },
]

export default function EnvironmentalImpact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 font-poppins"
          >
            Our Environmental Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-stone-600 max-w-3xl mx-auto"
          >
            Every swap makes a difference. Together, we're creating a more sustainable future for fashion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  stat.color === "emerald"
                    ? "bg-emerald-100"
                    : stat.color === "blue"
                      ? "bg-blue-100"
                      : stat.color === "amber"
                        ? "bg-amber-100"
                        : "bg-teal-100"
                }`}
              >
                <stat.icon
                  className={`w-7 h-7 ${
                    stat.color === "emerald"
                      ? "text-emerald-600"
                      : stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "amber"
                          ? "text-amber-600"
                          : "text-teal-600"
                  }`}
                />
              </div>
              <div className="text-3xl font-bold text-stone-800 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-stone-700 mb-2">{stat.label}</div>
              <div className="text-sm text-stone-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100"
        >
          <h3 className="text-2xl font-bold text-stone-800 mb-4">Join the Movement</h3>
          <p className="text-stone-700 text-lg mb-6 max-w-2xl mx-auto">
            Every item you swap prevents textile waste and reduces the environmental impact of fast fashion. Be part of
            the solution.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-stone-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2" />
              Circular Economy
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
              Water Conservation
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2" />
              Waste Reduction
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
