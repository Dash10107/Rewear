"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]
const conditions = ["New", "Used - Like New", "Used - Good", "Used - Fair"]
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > 5) {
        toast({
          title: "Too many images",\
          description: "You can upload a
