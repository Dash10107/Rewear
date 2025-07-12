"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Sparkles, User, Share2, MapPin, Calendar, Package } from "lucide-react"
import Link from "next/link"
import { DUMMY_ITEMS } from "@/lib/dummyData"
import type { Item } from "@/lib/types"

export default function ItemDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const foundItem = DUMMY_ITEMS.find((i) => i.id === id)
    if (foundItem) {
      setItem(foundItem)
    } else {
      router.push("/browse")
    }
    setLoading(false)
  }, [id, router])

  const handleRequestSwap = () => {
    console.log(`Request swap for item ${item?.title}`)
    alert(`Swap request sent for "${item?.title}"! The owner will be notified.`)
  }

  const handleRedeemPoints = () => {
    console.log(`Redeem points for item ${item?.title}`)
    alert(`Points redeemed for "${item?.title}"! Item will be shipped to you.`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.title,
        text: `Check out this ${item?.category.toLowerCase()} on ReWear!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const nextImage = () => {
    if (item && item.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (item && item.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    )
  }

  if (!item) {
    return null
  }

  const suggestedItems = DUMMY_ITEMS.filter(
    (i) => i.category === item.category && i.id !== item.id && i.owner_id !== item.owner_id,
  ).slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 flex items-center text-stone-600 hover:text-emerald-600 btn-hover-lift"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Browse
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-stone-200">
            {/* Image Carousel */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.images[currentImageIndex] || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {item.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
                    onClick={prevImage}
                  >
                    ‹
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
                    onClick={nextImage}
                  >
                    ›
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {item.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white scale-125" : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className={`rounded-full w-12 h-12 p-0 bg-white/90 hover:bg-white shadow-lg transition-all ${
                    isLiked ? "text-rose-500" : ""
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full w-12 h-12 p-0 bg-white/90 hover:bg-white shadow-lg"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-stone-800 mb-3 font-poppins">{item.title}</h1>
                <p className="text-stone-600 text-lg leading-relaxed">{item.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 text-base px-4 py-2 font-semibold"
                >
                  Size: {item.size}
                </Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-base px-4 py-2 font-semibold">
                  {item.condition}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-base px-4 py-2 font-semibold">
                  {item.category}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm border-stone-300 px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Item Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-stone-50 rounded-2xl">
                <div className="text-center">
                  <Calendar className="w-5 h-5 text-stone-500 mx-auto mb-1" />
                  <p className="text-xs text-stone-500">Listed</p>
                  <p className="text-sm font-semibold text-stone-700">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <Package className="w-5 h-5 text-stone-500 mx-auto mb-1" />
                  <p className="text-xs text-stone-500">Views</p>
                  <p className="text-sm font-semibold text-stone-700">127</p>
                </div>
                <div className="text-center">
                  <Heart className="w-5 h-5 text-stone-500 mx-auto mb-1" />
                  <p className="text-xs text-stone-500">Likes</p>
                  <p className="text-sm font-semibold text-stone-700">23</p>
                </div>
              </div>

              {/* Owner Info */}
              <Card className="bg-stone-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={item.owner?.profile_pic || "/placeholder.svg"} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl font-bold">
                      {item.owner?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-600">Listed by</p>
                    <h3 className="text-xl font-bold text-stone-800">{item.owner?.name}</h3>
                    <p className="text-sm text-stone-600">{item.owner?.bio}</p>
                    <div className="flex items-center mt-2 text-sm text-stone-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Local area</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white border-stone-300 btn-hover-lift">
                    <User className="w-4 h-4 mr-2" /> View Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg rounded-2xl shadow-lg btn-hover-lift"
                  onClick={handleRequestSwap}
                >
                  <Heart className="w-5 h-5 mr-2" /> Request Swap
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 py-4 text-lg rounded-2xl shadow-lg bg-white btn-hover-lift"
                  onClick={handleRedeemPoints}
                >
                  <Sparkles className="w-5 h-5 mr-2" /> Redeem Points (150)
                </Button>
              </div>

              {/* Environmental Impact */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">Environmental Impact</h4>
                <p className="text-sm text-emerald-700">
                  By choosing this pre-loved item, you're saving approximately <strong>2.5kg of CO₂</strong> and{" "}
                  <strong>500L of water</strong> compared to buying new!
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Items */}
          {suggestedItems.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-stone-800 mb-8 font-poppins text-center">
                More from this category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {suggestedItems.map((suggestedItem, index) => (
                  <motion.div
                    key={suggestedItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/item/${suggestedItem.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover border border-stone-200">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={suggestedItem.images[0] || "/placeholder.svg"}
                            alt={suggestedItem.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-stone-800 text-base line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {suggestedItem.title}
                          </h3>
                          <p className="text-sm text-stone-600 mt-1">Size {suggestedItem.size}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestedItem.condition}
                            </Badge>
                            <span className="text-xs text-stone-500">{suggestedItem.category}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
