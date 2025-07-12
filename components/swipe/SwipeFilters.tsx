"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SwipeFiltersProps {
  filters: {
    category: string
    size: string
    tags: string[]
  }
  onFiltersChange: (filters: any) => void
}

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

const popularTags = [
  "Vintage",
  "Boho",
  "Minimalist",
  "Streetwear",
  "Formal",
  "Casual",
  "Designer",
  "Sustainable",
  "Handmade",
  "Trendy",
]

export default function SwipeFilters({ filters, onFiltersChange }: SwipeFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const updateFilters = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      updateFilters("tags", [...filters.tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    updateFilters(
      "tags",
      filters.tags.filter((t) => t !== tag),
    )
  }

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      size: "",
      tags: [],
    })
  }

  const hasActiveFilters = filters.category || filters.size || filters.tags.length > 0

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {(filters.category ? 1 : 0) + (filters.size ? 1 : 0) + filters.tags.length}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-stone-500 hover:text-stone-700">
            Clear all
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-4"
          >
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Category</label>
              <Select value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Size</label>
              <Select value={filters.size} onValueChange={(value) => updateFilters("size", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Style Tags</label>

              {/* Selected Tags */}
              {filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {filters.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center space-x-1 bg-emerald-100 text-emerald-700"
                    >
                      <span>{tag}</span>
                      <button onClick={() => removeTag(tag)} className="ml-1 hover:bg-emerald-200 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Available Tags */}
              <div className="flex flex-wrap gap-2">
                {popularTags
                  .filter((tag) => !filters.tags.includes(tag))
                  .map((tag) => (
                    <Button key={tag} variant="outline" size="sm" onClick={() => addTag(tag)} className="text-xs h-8">
                      {tag}
                    </Button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
