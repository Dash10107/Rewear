"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { FeedPost } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import { DUMMY_FEED_POSTS } from "@/lib/dummyData" // Use updated dummy data

export default function CommunityGrid() {
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setPosts(DUMMY_FEED_POSTS)
    setLoading(false)
  }, [])

  if (loading) {
    return null // Or a loading spinner if preferred
  }

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-t-[40px] rounded-b-[40px] shadow-lg my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 font-poppins"
          >
            Community Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-stone-600"
          >
            See how our members are styling their swapped finds
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg?height=400&width=400"}
                  alt={post.caption || "Community post"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.user?.profile_pic || "/placeholder.svg"} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">
                      {post.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-stone-800 text-sm">{post.user?.name}</p>
                    {post.item && <p className="text-xs text-stone-500">wearing "{post.item.title}"</p>}
                  </div>
                </div>
                <p className="text-stone-700 text-sm mb-3 line-clamp-2">{post.caption}</p>
                <div className="flex items-center space-x-4 text-stone-500">
                  <button className="flex items-center space-x-1 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">24</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">8</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
