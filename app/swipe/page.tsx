"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import SwipeCard from "@/components/swipe/SwipeCard"
import SwipeFilters from "@/components/swipe/SwipeFilters"
import type { Item } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DUMMY_ITEMS, DUMMY_USERS } from "@/lib/dummyData"

export default function SwipePage() {
  const [items, setItems] = useState<Item[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [swipeCount, setSwipeCount] = useState(0)
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    tags: [] as string[],
  })

  const fetchItems = async () => {
    // Filter out current user's items and apply filters
    const filteredItems = DUMMY_ITEMS.filter((item) => {
      let match = true
      // Exclude items owned by current user (Alice)
      if (item.owner_id === DUMMY_USERS[0].id) {
        match = false
      }
      if (filters.category && filters.category !== "all" && item.category !== filters.category) {
        match = false
      }
      if (filters.size && filters.size !== "all" && item.size !== filters.size) {
        match = false
      }
      if (filters.tags.length > 0) {
        const itemTagsLower = item.tags.map((tag) => tag.toLowerCase())
        const filterTagsLower = filters.tags.map((tag) => tag.toLowerCase())
        if (!filterTagsLower.every((tag) => itemTagsLower.includes(tag))) {
          match = false
        }
      }
      return match
    })
    setItems(filteredItems)
    setCurrentIndex(0)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [filters])

  const handleSwipe = async (direction: "left" | "right") => {
    const currentItem = items[currentIndex]
    if (!currentItem) return

    console.log(`Swiped ${direction} on item: ${currentItem.title}`)
    setSwipeCount((prev) => prev + 1)

    // Simulate points for swiping
    if (direction === "right") {
      console.log("Earned 5 points for showing interest!")
    }

    setCurrentIndex((prev) => prev + 1)
  }

  const currentItem = items[currentIndex]
  const remainingItems = items.length - currentIndex

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

      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-stone-800 mb-2 font-poppins">Discover & Swap</h1>
            <p className="text-stone-600 mb-4">Swipe right to request, left to pass</p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-emerald-600">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">{swipeCount} swipes today</span>
              </div>
              <div className="text-stone-500">{remainingItems} items remaining</div>
            </div>
          </div>

          <SwipeFilters filters={filters} onFiltersChange={setFilters} />

          <div className="relative h-[650px] mb-8">
            <AnimatePresence mode="wait">
              {currentItem ? (
                <SwipeCard key={currentItem.id} item={currentItem} onSwipe={handleSwipe} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-white rounded-3xl shadow-2xl border-2 border-dashed border-stone-300"
                >
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">You're all caught up!</h3>
                    <p className="text-stone-600 mb-6 max-w-sm">
                      You've seen all available items matching your preferences. Check back later for new additions or
                      adjust your filters.
                    </p>
                    <div className="space-y-3">
                      <Button onClick={fetchItems} className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Items
                      </Button>
                      <p className="text-xs text-stone-500">You've swiped on {swipeCount} items today! 🎉</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {currentItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center space-x-8"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full border-3 border-rose-300 hover:border-rose-400 hover:bg-rose-50 bg-white/80 backdrop-blur-sm btn-hover-lift"
                onClick={() => handleSwipe("left")}
              >
                <X className="w-7 h-7 text-rose-500" />
              </Button>
              <Button
                size="lg"
                className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg btn-hover-lift"
                onClick={() => handleSwipe("right")}
              >
                <Heart className="w-7 h-7 text-white" />
              </Button>
            </motion.div>
          )}

          {/* Swipe Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-sm text-stone-500"
          >
            <p>Drag the card or use buttons to swipe</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
