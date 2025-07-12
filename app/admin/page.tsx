"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Search, Flag, Package, AlertTriangle, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import { DUMMY_ADMIN_PENDING_ITEMS, DUMMY_ADMIN_FLAGGED_CONTENT } from "@/lib/dummyData"

export default function AdminPage() {
  const [pendingItems, setPendingItems] = useState(DUMMY_ADMIN_PENDING_ITEMS)
  const [flaggedContent, setFlaggedContent] = useState(DUMMY_ADMIN_FLAGGED_CONTENT)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleApproveItem = (itemId: string) => {
    console.log(`Admin: Approved item ${itemId}`)
    setPendingItems((prev) => prev.filter((item) => item.id !== itemId))
    alert(`Item ${itemId} approved and published! ✅`)
  }

  const handleRejectItem = (itemId: string) => {
    console.log(`Admin: Rejected item ${itemId}`)
    setPendingItems((prev) => prev.filter((item) => item.id !== itemId))
    alert(`Item ${itemId} rejected and removed! ❌`)
  }

  const handleResolveFlag = (postId: string) => {
    console.log(`Admin: Resolved flag for post ${postId}`)
    setFlaggedContent((prev) => prev.filter((post) => post.id !== postId))
    alert(`Flag for post ${postId} resolved! ✅`)
  }

  const filteredPendingItems = pendingItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredFlaggedContent = flaggedContent.filter(
    (post) =>
      post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-rose-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2 font-poppins">Admin Dashboard</h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Manage pending items and flagged content for the ReWear platform.
            </p>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Package className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">{pendingItems.length}</h3>
                <p className="text-stone-600 text-sm">Pending Items</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">{flaggedContent.length}</h3>
                <p className="text-stone-600 text-sm">Flagged Content</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">12,500</h3>
                <p className="text-stone-600 text-sm">Active Users</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">98.5%</h3>
                <p className="text-stone-600 text-sm">Approval Rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search items or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-stone-200 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          </div>

          <Tabs defaultValue="pending-items" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-2">
              <TabsTrigger value="pending-items" className="rounded-xl">
                Pending Items ({pendingItems.length})
              </TabsTrigger>
              <TabsTrigger value="flagged-content" className="rounded-xl">
                Flagged Content ({flaggedContent.length})
              </TabsTrigger>
            </TabsList>

            {/* Pending Items Tab */}
            <TabsContent value="pending-items">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-6 h-6 text-emerald-600" />
                    <span>Items Awaiting Approval</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredPendingItems.length === 0 ? (
                    <div className="text-center py-12 text-stone-600">
                      <Package className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-stone-800 mb-2">No pending items found</h3>
                      <p>All items have been reviewed and processed.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredPendingItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col sm:flex-row items-center p-6 border border-stone-200 rounded-2xl shadow-sm bg-white/60 backdrop-blur-sm card-hover"
                        >
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-bold text-stone-800 text-xl mb-1">{item.title}</h3>
                            <p className="text-sm text-stone-600 mb-2">Listed by: {item.owner?.name}</p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-2">
                              <Badge variant="outline" className="text-xs">
                                {item.condition}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Size {item.size}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-stone-500">
                              Submitted: {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-3 mt-4 sm:mt-0 sm:ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-rose-300 text-rose-600 hover:bg-rose-50 btn-hover-lift bg-transparent"
                              onClick={() => handleRejectItem(item.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift"
                              onClick={() => handleApproveItem(item.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Flagged Content Tab */}
            <TabsContent value="flagged-content">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                    <span>Reported Posts & Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredFlaggedContent.length === 0 ? (
                    <div className="text-center py-12 text-stone-600">
                      <AlertTriangle className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-stone-800 mb-2">No flagged content found</h3>
                      <p>All reports have been reviewed and resolved.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFlaggedContent.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col sm:flex-row items-center p-6 border border-stone-200 rounded-2xl shadow-sm bg-white/60 backdrop-blur-sm card-hover"
                        >
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt="Flagged content"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-bold text-stone-800 text-xl mb-1">
                              Reported Post by {post.user?.name}
                            </h3>
                            <p className="text-sm text-stone-600 line-clamp-2 mb-2">Report reason: {post.caption}</p>
                            {post.item && (
                              <p className="text-xs text-stone-500 mb-2">Related Item: {post.item.title}</p>
                            )}
                            <p className="text-xs text-stone-500">
                              Reported: {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-3 mt-4 sm:mt-0 sm:ml-4">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 btn-hover-lift"
                              onClick={() => handleResolveFlag(post.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
