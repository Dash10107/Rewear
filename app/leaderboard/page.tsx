"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Sparkles, Trophy, Package, Heart, Award, TrendingUp } from "lucide-react"
import { DUMMY_LEADERBOARD_WEEKLY, DUMMY_LEADERBOARD_MONTHLY, DUMMY_LEADERBOARD_ALL_TIME } from "@/lib/dummyData"
import type { LeaderboardEntry } from "@/lib/types"

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-amber-500" />
    if (rank === 2) return <Trophy className="w-6 h-6 text-stone-400" />
    if (rank === 3) return <Trophy className="w-6 h-6 text-amber-700" />
    return null
  }

  const getUserLevelBadge = (points: number) => {
    if (points >= 2000) return { level: "Swap Master", color: "text-purple-600", bg: "bg-purple-100" }
    if (points >= 1500) return { level: "Runway Star", color: "text-pink-600", bg: "bg-pink-100" }
    if (points >= 1000) return { level: "Eco Pro", color: "text-emerald-600", bg: "bg-emerald-100" }
    if (points >= 500) return { level: "Green Swapper", color: "text-blue-600", bg: "bg-blue-100" }
    return { level: "Eco Starter", color: "text-stone-600", bg: "bg-stone-100" }
  }

  const renderLeaderboardTable = (data: LeaderboardEntry[], timeframe: string) => (
    <div className="space-y-4">
      {data.map((entry, index) => {
        const userLevel = getUserLevelBadge(entry.points)
        return (
          <motion.div
            key={entry.user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all card-hover border border-stone-200 ${
              index < 3 ? "ring-2 ring-amber-200" : ""
            }`}
          >
            <div className="w-12 text-center font-bold text-stone-700 text-xl flex items-center justify-center">
              {getRankBadge(index + 1) || (
                <span className={`${index < 3 ? "text-amber-600" : "text-stone-600"}`}>{index + 1}</span>
              )}
            </div>
            <Avatar className="w-16 h-16 mx-6 shadow-lg">
              <AvatarImage src={entry.user.profile_pic || "/placeholder.svg"} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg font-bold">
                {entry.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-stone-800 text-lg">{entry.user.name}</h3>
                <Badge className={`${userLevel.bg} ${userLevel.color} font-semibold px-3 py-1`}>
                  <Award className="w-3 h-3 mr-1" />
                  {userLevel.level}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-stone-500 space-x-4">
                <span className="flex items-center">
                  <Package className="w-4 h-4 mr-1" /> {entry.items_listed} Listed
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" /> {entry.swaps_completed} Swaps
                </span>
                <span className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" /> {timeframe}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-stone-700">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold">{entry.points}</span>
                </div>
                <span className="text-sm text-stone-500">points</span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 font-poppins">ReWear Leaderboard</h1>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Celebrate our community champions who are making the biggest impact in sustainable fashion!
            </p>
          </div>

          <Tabs defaultValue="all-time" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-2 border border-stone-200">
              <TabsTrigger value="weekly" className="rounded-xl font-semibold">
                This Week
              </TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-xl font-semibold">
                This Month
              </TabsTrigger>
              <TabsTrigger value="all-time" className="rounded-xl font-semibold">
                All Time
              </TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-stone-800 flex items-center justify-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                    Top Swappers This Week
                  </CardTitle>
                  <p className="text-stone-600">Most active community members in the past 7 days</p>
                </CardHeader>
                <CardContent>{renderLeaderboardTable(DUMMY_LEADERBOARD_WEEKLY, "Weekly")}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-stone-800 flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    Top Swappers This Month
                  </CardTitle>
                  <p className="text-stone-600">Leading contributors in the past 30 days</p>
                </CardHeader>
                <CardContent>{renderLeaderboardTable(DUMMY_LEADERBOARD_MONTHLY, "Monthly")}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all-time">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-stone-800 flex items-center justify-center gap-2">
                    <Crown className="w-6 h-6 text-amber-600" />
                    All-Time Champions
                  </CardTitle>
                  <p className="text-stone-600">The ultimate sustainable fashion heroes</p>
                </CardHeader>
                <CardContent>{renderLeaderboardTable(DUMMY_LEADERBOARD_ALL_TIME, "All Time")}</CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">2,847</h3>
                <p className="text-stone-700 font-medium">Total Items Listed</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-rose-100 to-pink-100 border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-rose-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">1,923</h3>
                <p className="text-stone-700 font-medium">Successful Swaps</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-stone-800 mb-1">12,500</h3>
                <p className="text-stone-700 font-medium">Active Members</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
