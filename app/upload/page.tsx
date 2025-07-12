"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
const conditions = ["New", "Used - Like New", "Used - Good", "Used - Fair"]
const popularTags = [
  "Vintage", "Boho", "Minimalist", "Streetwear", "Formal",
  "Casual", "Designer", "Sustainable", "Handmade", "Trendy",
]

export default function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [size, setSize] = useState("")
  const [condition, setCondition] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images.",
      })
      return
    }

    const uploadPromises = acceptedFiles.map(async (file) => {
      // Simulate upload or use real service
      const fakeUrl = URL.createObjectURL(file)
      return fakeUrl
    })

    Promise.all(uploadPromises).then((newUrls) => {
      setImages((prev) => [...prev, ...newUrls])
    })
  }, [images, toast])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = async () => {
    if (!title || !category || !size || !condition || images.length === 0) {
      toast({
        title: "Incomplete form",
        description: "Please fill out all required fields and upload at least one image.",
      })
      return
    }

    setLoading(true)
    try {
      const newItem = {
        id: uuidv4(),
        title,
        description,
        category,
        size,
        condition,
        tags: selectedTags,
        images,
        createdAt: new Date().toISOString(),
      }

      // Replace this with your API call or DB logic
      console.log("Uploading item:", newItem)

      toast({
        title: "Upload successful!",
        description: "Your item has been listed.",
      })

      router.push("/marketplace")
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload an Item</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="">Select Size</option>
        {sizes.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="">Select Condition</option>
        {conditions.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div className="space-y-2">
        <label className="block font-medium">Upload Images (Max 5)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onDrop(Array.from(e.target.files || []))}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="w-24 h-24 relative">
              <img src={img} alt={`uploaded-${i}`} className="object-cover w-full h-full rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Tags</label>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`px-3 py-1 rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Item"}
      </button>
    </div>
  )
}
