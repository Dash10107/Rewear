"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, X, MapPin, User, Star } from "lucide-react"
import type { Item } from "@/lib/types"

interface SwipeCardProps {
  item: Item
  onSwipe: (direction: "left" | "right", item: Item) => void
  isTop: boolean
}

export default function SwipeCard({ item, onSwipe, isTop }: SwipeCardProps) {
  const [exitX, setExitX] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100

    if (info.offset.x > threshold) {
      setExitX(200)
      onSwipe("right", item)
    } else if (info.offset.x < -threshold) {
      setExitX(-200)
      onSwipe("left", item)
    }
  }

  const handleButtonSwipe = (direction: "left" | "right") => {
    setExitX(direction === "right" ? 200 : -200)
    onSwipe(direction, item)
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="h-full border-0 soft-shadow overflow-hidden bg-white">
        <div className="relative h-2/3">
          <Image
            src={item.images[0] || "/placeholder.svg?height=400&width=300"}
            alt={item.title}
            fill
            className="object-cover"
          />

          {/* Swipe indicators */}
          <motion.div
            className="absolute top-8 left-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg"
            style={{ opacity: useTransform(x, [50, 150], [0, 1]) }}
          >
            LOVE IT
          </motion.div>

          <motion.div
            className="absolute top-8 right-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg"
            style={{ opacity: useTransform(x, [-150, -50], [1, 0]) }}
          >
            PASS
          </motion.div>

          {/* Item badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-white/90 text-sage-700 border-0">{item.condition}</Badge>
            <Badge className="bg-white/90 text-sage-700 border-0">Size {item.size}</Badge>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-terracotta-500 text-white border-0">{item.category}</Badge>
          </div>
        </div>

        <CardContent className="p-6 h-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-sage-800 mb-2">{item.title}</h3>
            <p className="text-sage-600 text-sm mb-3 line-clamp-2">{item.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {item.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs border-sage-200 text-sage-600">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-sage-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-sage-800">{item.owner?.name}</p>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-sage-500" />
                    <span className="text-xs text-sage-500">2.5 km away</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-sage-600">4.8</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
              onClick={() => handleButtonSwipe("left")}
            >
              <X className="h-6 w-6 text-red-500" />
            </Button>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleButtonSwipe("right")}
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
