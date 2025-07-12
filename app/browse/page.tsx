"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, X, Heart } from "lucide-react"
import { DUMMY_ITEMS } from "@/lib/dummyData"
import type { Item } from "@/lib/types"

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
const conditions = ["New", "Used - Like New", "Used - Good", "Used - Fair"]
const aesthetics = ["Vintage", "Boho", "Minimalist", "Streetwear", "Formal", "Casual", "Designer", "Athletic", "Trendy"]

export default function BrowsePage() {
  const [items, setItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "All Categories",
    size: "All Sizes",
    condition: "All Conditions",
    aesthetic: [] as string[],
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setItems(DUMMY_ITEMS)
    setLoading(false)
  }, [])

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filters.category === "All Categories" || item.category === filters.category
      const matchesSize = filters.size === "All Sizes" || item.size === filters.size
      const matchesCondition = filters.condition === "All Conditions" || item.condition === filters.condition
      const matchesAesthetic =
        filters.aesthetic.length === 0 || filters.aesthetic.some((filterTag) => item.tags.includes(filterTag))

      return matchesSearch && matchesCategory && matchesSize && matchesCondition && matchesAesthetic
    })
    setFilteredItems(filtered)
  }, [items, searchTerm, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleAestheticToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      aesthetic: prev.aesthetic.includes(tag) ? prev.aesthetic.filter((t) => t !== tag) : [...prev.aesthetic, tag],
    }))
  }

  const removeAestheticTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      aesthetic: prev.aesthetic.filter((t) => t !== tag),
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: "All Categories",
      size: "All Sizes",
      condition: "All Conditions",
      aesthetic: [],
    })
    setSearchTerm("")
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    filters.category !== "All Categories" ||
    filters.size !== "All Sizes" ||
    filters.condition !== "All Conditions" ||
    filters.aesthetic.length > 0

  const activeFilterCount =
    (filters.category !== "All Categories" ? 1 : 0) +
    (filters.size !== "All Sizes" ? 1 : 0) +
    (filters.condition !== "All Conditions" ? 1 : 0) +
    filters.aesthetic.length +
    (searchTerm ? 1 : 0)

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
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3 font-poppins">
              Discover Your Next Favorite Piece
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Browse through {items.length} curated pre-loved fashion items from our sustainable community
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-stone-200 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-stone-200 hover:border-emerald-300 px-6 py-3 rounded-2xl btn-hover-lift"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700 font-bold">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-stone-500 hover:text-stone-700 px-6 py-3 rounded-2xl"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 flex flex-wrap gap-2"
            >
              {searchTerm && (
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 bg-white/80">
                  Search: "{searchTerm}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {filters.category !== "All Categories" && (
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 bg-white/80">
                  Category: {filters.category}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange("category", "All Categories")}
                  />
                </Badge>
              )}
              {filters.size !== "All Sizes" && (
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 bg-white/80">
                  Size: {filters.size}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange("size", "All Sizes")} />
                </Badge>
              )}
              {filters.condition !== "All Conditions" && (
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 bg-white/80">
                  Condition: {filters.condition}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange("condition", "All Conditions")}
                  />
                </Badge>
              )}
              {filters.aesthetic.map((tag) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-2 px-3 py-1 bg-white/80">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeAestheticTag(tag)} />
                </Badge>
              ))}
            </motion.div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-stone-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700">Category</label>
                  <Select value={filters.category} onValueChange={(val) => handleFilterChange("category", val)}>
                    <SelectTrigger className="w-full rounded-xl border-stone-300">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700">Size</label>
                  <Select value={filters.size} onValueChange={(val) => handleFilterChange("size", val)}>
                    <SelectTrigger className="w-full rounded-xl border-stone-300">
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Sizes">All Sizes</SelectItem>
                      {sizes.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700">Condition</label>
                  <Select value={filters.condition} onValueChange={(val) => handleFilterChange("condition", val)}>
                    <SelectTrigger className="w-full rounded-xl border-stone-300">
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Conditions">All Conditions</SelectItem>
                      {conditions.map((cond) => (
                        <SelectItem key={cond} value={cond}>
                          {cond}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-stone-700">Style Tags</label>
                <div className="flex flex-wrap gap-2">
                  {aesthetics.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.aesthetic.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 rounded-full text-sm transition-all btn-hover-lift ${
                        filters.aesthetic.includes(tag)
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "border-stone-300 text-stone-700 hover:bg-stone-100"
                      }`}
                      onClick={() => handleAestheticToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-stone-600 text-lg">
              Showing <span className="font-semibold text-stone-800">{filteredItems.length}</span> of{" "}
              <span className="font-semibold text-stone-800">{items.length}</span> items
            </p>
          </div>

          {/* Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-stone-400" />
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-3">No items found</h3>
              <p className="text-stone-600 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="masonry-grid">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="masonry-item group cursor-pointer"
                >
                  <Link href={`/item/${item.id}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-stone-200">
                      <div className="relative image-overlay">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={500}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/90 backdrop-blur-sm text-stone-700 font-medium shadow-sm"
                          >
                            {item.condition}
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-sm"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-stone-800 mb-2 text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-stone-600 mb-3 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-stone-700">Size {item.size}</span>
                          <span className="text-sm text-stone-500">{item.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl border-emerald-300 text-emerald-600 hover:bg-emerald-50 btn-hover-lift bg-transparent"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
