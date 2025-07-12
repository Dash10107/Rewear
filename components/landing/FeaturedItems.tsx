"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
// Removed: import { supabase } from "@/lib/supabase"
import type { Item } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowRight } from "lucide-react"

// Dummy data for featured items
const DUMMY_ITEMS: Item[] = [
  {
    id: "item-1",
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket, perfect for layering.",
    tags: ["Vintage", "Outerwear", "Casual"],
    size: "M",
    category: "Outerwear",
    condition: "Used - Good",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    owner_id: "user-1",
    status: "available",
    created_at: "2024-01-15T10:00:00Z",
    owner: {
      id: "user-1",
      name: "Alice",
      email: "alice@example.com",
      points: 100,
      created_at: "2024-01-01T00:00:00Z",
      profile_pic: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "item-2",
    title: "Boho Floral Dress",
    description: "Flowy maxi dress with a beautiful floral print.",
    tags: ["Boho", "Dresses", "Summer"],
    size: "S",
    category: "Dresses",
    condition: "New",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    owner_id: "user-2",
    status: "available",
    created_at: "2024-01-20T11:30:00Z",
    owner: {
      id: "user-2",
      name: "Bob",
      email: "bob@example.com",
      points: 100,
      created_at: "2024-01-05T00:00:00Z",
      profile_pic: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "item-3",
    title: "Minimalist White Shirt",
    description: "Crisp white cotton shirt, versatile for any occasion.",
    tags: ["Minimalist", "Tops", "Formal"],
    size: "L",
    category: "Tops",
    condition: "Used - Like New",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    owner_id: "user-3",
    status: "available",
    created_at: "2024-01-25T14:00:00Z",
    owner: {
      id: "user-3",
      name: "Charlie",
      email: "charlie@example.com",
      points: 100,
      created_at: "2024-01-10T00:00:00Z",
      profile_pic: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "item-4",
    title: "Streetwear Cargo Pants",
    description: "Comfortable and stylish cargo pants with multiple pockets.",
    tags: ["Streetwear", "Bottoms", "Casual"],
    size: "32",
    category: "Bottoms",
    condition: "Used - Good",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    owner_id: "user-4",
    status: "available",
    created_at: "2024-01-28T09:00:00Z",
    owner: {
      id: "user-4",
      name: "Diana",
      email: "diana@example.com",
      points: 100,
      created_at: "2024-01-12T00:00:00Z",
      profile_pic: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "item-5",
    title: "Designer Handbag",
    description: "Elegant leather handbag, perfect for evening wear.",
    tags: ["Designer", "Accessories", "Formal"],
    size: "One Size",
    category: "Accessories",
    condition: "Used - Like New",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    owner_id: "user-5",
    status: "available",
    created_at: "2024-02-01T16:00:00Z",
    owner: {
      id: "user-5",
      name: "Eve",
      email: "eve@example.com",
      points: 100,
      created_at: "2024-01-18T00:00:00Z",
      profile_pic: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default function FeaturedItems() {
  const [items, setItems] = useState<Item[]>([])
  // Removed: const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setItems(DUMMY_ITEMS)
    // Removed: setLoading(false)
  }, [])

  // Removed loading state UI, always render content
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
            Featured Finds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-stone-600"
          >
            Discover the latest additions to our sustainable marketplace
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/item/${item.id}`}>
                <div className="relative overflow-hidden rounded-2xl bg-stone-100 aspect-square mb-4 group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src={item.images[0] || "/placeholder.svg?height=300&width=300"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/80 text-stone-700">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                <h3 className="font-semibold text-stone-800 mb-1 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 mb-2">Size {item.size}</p>
                <div className="flex items-center space-x-2">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
            <Link href="/browse">
              View All Items
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
