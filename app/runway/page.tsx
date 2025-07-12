"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Plus, Share2, Bookmark } from "lucide-react"
import { DUMMY_FEED_POSTS } from "@/lib/dummyData"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function RunwayPage() {
  const [posts, setPosts] = useState(DUMMY_FEED_POSTS)
  const [loading, setLoading] = useState(true)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })
  }

  const handleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const newSaved = new Set(prev)
      if (newSaved.has(postId)) {
        newSaved.delete(postId)
      } else {
        newSaved.add(postId)
      }
      return newSaved
    })
  }

  const handleComment = (postId: string) => {
    console.log(`Comment on post ${postId}`)
  }

  const handleShare = (postId: string) => {
    console.log(`Share post ${postId}`)
    if (navigator.share) {
      navigator.share({
        title: "Check out this ReWear style!",
        text: "Amazing sustainable fashion find on ReWear",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleUploadPost = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Upload Post: Post submitted")
    alert("Your post has been submitted! 🎉")
    setIsUploadModalOpen(false)
  }

  const getLikeCount = (index: number) => (index + 1) * 7 + (likedPosts.has(posts[index].id) ? 1 : 0)
  const getCommentCount = (index: number) => (index + 1) * 2

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-stone-800 font-poppins mb-2">Community Runway</h1>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Discover how our vibrant community styles their swapped finds and sustainable fashion. Get inspired!
              </p>
            </div>
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-stone-800">Create New Runway Post</DialogTitle>
                  <DialogDescription className="text-stone-600">
                    Share your latest ReWear outfit with the community and inspire others!
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUploadPost} className="grid gap-6 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="image-url" className="text-sm font-semibold text-stone-700">
                      Image URL
                    </Label>
                    <Input
                      id="image-url"
                      placeholder="https://example.com/your-outfit-photo.jpg"
                      required
                      className="rounded-xl border-stone-300"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="caption" className="text-sm font-semibold text-stone-700">
                      Caption
                    </Label>
                    <Textarea
                      id="caption"
                      placeholder="Tell us about your outfit, styling tips, or the story behind your sustainable find..."
                      rows={4}
                      className="rounded-xl border-stone-300"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="item-id" className="text-sm font-semibold text-stone-700">
                      Associated Item ID (Optional)
                    </Label>
                    <Input id="item-id" placeholder="e.g., item-123" className="rounded-xl border-stone-300" />
                  </div>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                    Post to Runway
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="masonry-grid">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="masonry-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-stone-200"
              >
                <div className="relative image-overlay">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.caption || "Runway post"}
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-lg transition-all ${
                        savedPosts.has(post.id) ? "text-amber-500" : ""
                      }`}
                      onClick={() => handleSave(post.id)}
                    >
                      <Bookmark className={`w-4 h-4 ${savedPosts.has(post.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user?.profile_pic || "/placeholder.svg"} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-bold">
                        {post.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold text-stone-800 text-sm">{post.user?.name}</p>
                      {post.item && <p className="text-xs text-stone-500">wearing "{post.item.title}"</p>}
                    </div>
                  </div>
                  <p className="text-stone-700 text-sm mb-4 line-clamp-3 leading-relaxed">{post.caption}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.caption
                      ?.split(" ")
                      .filter((word) => word.startsWith("#"))
                      .slice(0, 3)
                      .map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-stone-300">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                  <div className="flex items-center justify-between text-stone-500">
                    <div className="flex items-center space-x-4">
                      <button
                        className={`flex items-center space-x-1 hover:text-rose-500 transition-colors ${
                          likedPosts.has(post.id) ? "text-rose-500" : ""
                        }`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                        <span className="text-xs font-medium">{getLikeCount(index)}</span>
                      </button>
                      <button
                        className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                        onClick={() => handleComment(post.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">{getCommentCount(index)}</span>
                      </button>
                    </div>
                    <button
                      className="flex items-center space-x-1 hover:text-emerald-500 transition-colors"
                      onClick={() => handleShare(post.id)}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200"
          >
            <h3 className="text-2xl font-bold text-stone-800 mb-3">Share Your Style</h3>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Show off your sustainable fashion finds and inspire others in the ReWear community!
            </p>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
