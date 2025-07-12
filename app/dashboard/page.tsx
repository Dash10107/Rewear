"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import type { Item, SwapRequest } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Heart,
  Recycle,
  Sparkles,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Share2,
  Leaf,
  Droplets,
  TrendingUp,
  Award,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DUMMY_USERS, DUMMY_ITEMS, DUMMY_SWAP_REQUESTS } from "@/lib/dummyData"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const user = DUMMY_USERS[0] // Alice Smith
  const userProfile = DUMMY_USERS[0]
  const [userItems, setUserItems] = useState<Item[]>([])
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([])
  const [receivedRequests, setReceivedRequests] = useState<SwapRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUserItems = DUMMY_ITEMS.filter((item) => item.owner_id === user.id)
    const currentUserSwapRequests = DUMMY_SWAP_REQUESTS.filter((req) => req.requester_id === user.id)
    const currentUserReceivedRequests = DUMMY_SWAP_REQUESTS.filter((req) =>
      currentUserItems.some((item) => item.id === req.item_id),
    )

    setUserItems(currentUserItems)
    setSwapRequests(currentUserSwapRequests)
    setReceivedRequests(currentUserReceivedRequests)
    setLoading(false)
  }, [user])

  const handleSwapResponse = async (requestId: string, status: "accepted" | "rejected") => {
    console.log(`Swap Response: Request ${requestId} ${status}`)
    setReceivedRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: status } : req)))
    if (status === "accepted") {
      console.log("Awarded 50 points for successful swap!")
    }
  }

  const calculateUserImpact = () => {
    const successfulSwaps = swapRequests.filter((r) => r.status === "accepted").length
    const itemsListed = userItems.length
    const co2Saved = successfulSwaps * 2.5 + itemsListed * 1.2 // kg per swap + listing
    const waterSaved = successfulSwaps * 500 + itemsListed * 200 // liters
    const textilesReworn = itemsListed * 0.5 + successfulSwaps * 0.5 // kg

    return { co2Saved, waterSaved, textilesReworn }
  }

  const userImpact = calculateUserImpact()

  const getUserLevel = (points: number) => {
    if (points >= 2000) return { level: "Swap Master", color: "text-purple-600", bg: "bg-purple-100" }
    if (points >= 1500) return { level: "Runway Star", color: "text-pink-600", bg: "bg-pink-100" }
    if (points >= 1000) return { level: "Eco Pro", color: "text-emerald-600", bg: "bg-emerald-100" }
    if (points >= 500) return { level: "Green Swapper", color: "text-blue-600", bg: "bg-blue-100" }
    return { level: "Eco Starter", color: "text-stone-600", bg: "bg-stone-100" }
  }

  const userLevel = getUserLevel(userProfile?.points || 0)

  const stats = [
    {
      title: "Points Balance",
      value: userProfile?.points || 0,
      icon: Sparkles,
      color: "text-amber-600",
      bg: "bg-amber-100",
      change: "+50 this week",
    },
    {
      title: "Items Listed",
      value: userItems.length,
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      change: "+2 this month",
    },
    {
      title: "Swap Requests",
      value: swapRequests.length,
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-100",
      change: "+1 pending",
    },
    {
      title: "Successful Swaps",
      value: swapRequests.filter((r) => r.status === "accepted").length,
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-100",
      change: "All time",
    },
  ]

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
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <Avatar className="w-24 h-24 shadow-lg">
                <AvatarImage src={userProfile?.profile_pic || "/placeholder.svg"} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-3xl font-bold">
                  {userProfile?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-stone-800 font-poppins">Welcome back, {userProfile?.name}!</h1>
                  <Badge className={`${userLevel.bg} ${userLevel.color} font-semibold px-3 py-1`}>
                    <Award className="w-4 h-4 mr-1" />
                    {userLevel.level}
                  </Badge>
                </div>
                <p className="text-stone-600 text-lg">{userProfile?.bio}</p>
                <div className="flex items-center justify-center sm:justify-start mt-2 text-sm text-stone-500">
                  <span>Member since {new Date(userProfile?.created_at || "").toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm btn-hover-lift">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm btn-hover-lift">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                          <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-stone-800">{stat.value}</p>
                          <p className="text-xs text-emerald-600 font-medium">{stat.change}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-stone-600">{stat.title}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="items" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-2">
              <TabsTrigger value="items" className="rounded-xl">
                My Items
              </TabsTrigger>
              <TabsTrigger value="requests" className="rounded-xl">
                My Requests
              </TabsTrigger>
              <TabsTrigger value="received" className="rounded-xl">
                Received
              </TabsTrigger>
              <TabsTrigger value="impact" className="rounded-xl">
                Impact
              </TabsTrigger>
            </TabsList>

            {/* My Items Tab */}
            <TabsContent value="items" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-stone-800">Your Listed Items</h2>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                  <Link href="/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    List New Item
                  </Link>
                </Button>
              </div>

              {userItems.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">No items listed yet</h3>
                    <p className="text-stone-600 mb-6 max-w-md mx-auto">
                      Start your sustainable journey by listing your first item and earn points!
                    </p>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                      <Link href="/upload">
                        <Upload className="w-4 h-4 mr-2" />
                        List Your First Item
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden group card-hover">
                        <Link href={`/item/${item.id}`}>
                          <div className="relative aspect-[4/5]">
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge
                                variant={item.status === "available" ? "default" : "secondary"}
                                className={`${
                                  item.status === "available" ? "bg-emerald-600" : "bg-stone-500"
                                } text-white font-semibold`}
                              >
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <h3 className="font-bold text-stone-800 mb-2 text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-stone-600 mb-3">
                              Size {item.size} • {item.condition}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs border-stone-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-stone-500">
                              <span>Listed {new Date(item.created_at).toLocaleDateString()}</span>
                              <span>47 views</span>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* My Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800">Your Swap Requests</h2>

              {swapRequests.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-rose-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">No swap requests yet</h3>
                    <p className="text-stone-600 mb-6 max-w-md mx-auto">
                      Start swiping to find items you love and make swap requests
                    </p>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                      <Link href="/swipe">
                        <Heart className="w-4 h-4 mr-2" />
                        Start Swiping
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {swapRequests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg card-hover">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                              <Image
                                src={request.item?.images?.[0] || "/placeholder.svg?height=80&width=80"}
                                alt={request.item?.title || "Item"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-stone-800 text-lg">{request.item?.title}</h3>
                              <p className="text-sm text-stone-600">Requested from {request.item?.owner?.name}</p>
                              <p className="text-xs text-stone-500 mt-1">
                                {new Date(request.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                request.status === "accepted"
                                  ? "default"
                                  : request.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className={`${
                                request.status === "accepted"
                                  ? "bg-emerald-600"
                                  : request.status === "rejected"
                                    ? "bg-rose-600"
                                    : "bg-amber-500"
                              } text-white font-semibold px-4 py-2`}
                            >
                              {request.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Received Requests Tab */}
            <TabsContent value="received" className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800">Received Swap Requests</h2>

              {receivedRequests.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">No requests received</h3>
                    <p className="text-stone-600 max-w-md mx-auto">
                      When someone requests to swap your items, they'll appear here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {receivedRequests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg card-hover">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-14 h-14">
                                <AvatarImage src={request.requester?.profile_pic || "/placeholder.svg"} />
                                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                                  {request.requester?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-bold text-stone-800 text-lg">{request.requester?.name}</h3>
                                <p className="text-sm text-stone-600">wants to swap "{request.item?.title}"</p>
                                <p className="text-xs text-stone-500 mt-1">
                                  {new Date(request.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            {request.status === "pending" && (
                              <div className="flex space-x-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSwapResponse(request.id, "rejected")}
                                  className="border-rose-300 text-rose-600 hover:bg-rose-50 btn-hover-lift"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Decline
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleSwapResponse(request.id, "accepted")}
                                  className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Accept
                                </Button>
                              </div>
                            )}

                            {request.status !== "pending" && (
                              <Badge
                                variant={request.status === "accepted" ? "default" : "destructive"}
                                className={`${
                                  request.status === "accepted" ? "bg-emerald-600" : "bg-rose-600"
                                } text-white font-semibold px-4 py-2`}
                              >
                                {request.status}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800">Your Environmental Impact</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-0 shadow-lg card-hover">
                    <CardContent className="p-8 text-center">
                      <Leaf className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold text-stone-800 mb-2">{userImpact.co2Saved.toFixed(1)}kg</h3>
                      <p className="text-stone-700 font-semibold text-lg">CO₂ Saved</p>
                      <p className="text-sm text-stone-600 mt-2">
                        Equivalent to planting {Math.floor(userImpact.co2Saved / 20)} trees
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-0 shadow-lg card-hover">
                    <CardContent className="p-8 text-center">
                      <Droplets className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold text-stone-800 mb-2">
                        {userImpact.waterSaved.toLocaleString()}L
                      </h3>
                      <p className="text-stone-700 font-semibold text-lg">Water Saved</p>
                      <p className="text-sm text-stone-600 mt-2">
                        Enough for {Math.floor(userImpact.waterSaved / 100)} showers
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-0 shadow-lg card-hover">
                    <CardContent className="p-8 text-center">
                      <Recycle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold text-stone-800 mb-2">
                        {userImpact.textilesReworn.toFixed(1)}kg
                      </h3>
                      <p className="text-stone-700 font-semibold text-lg">Textiles Re-worn</p>
                      <p className="text-sm text-stone-600 mt-2">Saved from landfills</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Shareable Impact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">Share Your Impact!</h3>
                    <p className="text-stone-700 text-lg mb-6">
                      You've saved <strong className="text-emerald-600">{userImpact.co2Saved.toFixed(1)}kg CO₂</strong>{" "}
                      by choosing sustainable fashion!
                    </p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift">
                      <Share2 className="w-4 h-4 mr-2" /> Share Your Impact
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-6 h-6 text-amber-500" />
                      <span>Sustainability Achievements</span>
                    </CardTitle>
                    <CardDescription>Your journey towards sustainable fashion</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-800">First Item Listed</h4>
                          <p className="text-sm text-stone-600">Started your sustainable journey</p>
                        </div>
                      </div>
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>

                    {swapRequests.filter((r) => r.status === "accepted").length > 0 && (
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-800">First Successful Swap</h4>
                            <p className="text-sm text-stone-600">Made your first sustainable exchange</p>
                          </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-600" />
                      </div>
                    )}

                    {(userProfile?.points || 0) >= 100 && (
                      <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-800">100 Points Milestone</h4>
                            <p className="text-sm text-stone-600">Reached your first major milestone</p>
                          </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-amber-600" />
                      </div>
                    )}

                    {(userProfile?.points || 0) >= 1000 && (
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-800">Eco Pro Status</h4>
                            <p className="text-sm text-stone-600">Achieved 1000+ points</p>
                          </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-purple-600" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
