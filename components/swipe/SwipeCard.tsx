"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import Image from "next/image"
import type { Item } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Heart, X, MapPin } from "lucide-react"

interface SwipeCardProps {
  item: Item
  onSwipe: (direction: "left" | "right") => void
}

export default function SwipeCard({ item, onSwipe }: SwipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  const rightOverlayOpacity = useTransform(x, [0, 50, 100], [0, 0.7, 1])
  const leftOverlayOpacity = useTransform(x, [0, -50, -100], [0, 0.7, 1])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      onSwipe("right")
    } else if (info.offset.x < -threshold) {
      onSwipe("left")
    } else {
      x.set(0)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02 }}
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Image Section */}
        <div className="relative h-3/5 bg-stone-100">
          <Image
            src={item.images[currentImageIndex] || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
          />

          {/* Swipe Overlays */}
          <motion.div
            style={{ opacity: rightOverlayOpacity }}
            className="absolute inset-0 bg-emerald-500/40 flex items-center justify-center pointer-events-none backdrop-blur-sm"
          >
            <div className="bg-white/90 rounded-full p-6 shadow-lg">
              <Heart className="w-16 h-16 text-emerald-600" />
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: leftOverlayOpacity }}
            className="absolute inset-0 bg-rose-500/40 flex items-center justify-center pointer-events-none backdrop-blur-sm"
          >
            <div className="bg-white/90 rounded-full p-6 shadow-lg">
              <X className="w-16 h-16 text-rose-600" />
            </div>
          </motion.div>

          {/* Image Navigation */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white z-10 transition-all"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white z-10 transition-all"
              >
                ›
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {item.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white scale-125" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Condition Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-stone-700 font-semibold shadow-sm">
              {item.condition}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 h-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-2 line-clamp-1">{item.title}</h2>
            <p className="text-stone-600 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-stone-500">
                <span className="font-medium">Size {item.size}</span>
                <span>•</span>
                <span>{item.category}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-stone-300">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="outline" className="text-xs border-stone-300">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.owner?.profile_pic || "/placeholder.svg"} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-semibold">
                  {item.owner?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-stone-800">{item.owner?.name}</p>
                <div className="flex items-center text-xs text-stone-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center text-xs text-stone-500">
              <MapPin className="w-3 h-3 mr-1" />
              <span>Local</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
