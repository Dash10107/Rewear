"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Upload, User, LogOut, Menu, X, Sparkles, Leaf } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DUMMY_USERS } from "@/lib/dummyData" // Import dummy users

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use a dummy user for demonstration purposes
  const user = DUMMY_USERS[0] // Always show Alice as logged in
  const userProfile = DUMMY_USERS[0]

  const handleSignOut = async () => {
    console.log("Dummy Sign Out: User logged out.")
    // In a real app, you'd redirect to login or clear session here.
    // For this static UI, we just log.
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-stone-800">ReWear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">
              Browse
            </Link>
            <Link href="/swipe" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">
              Swipe
            </Link>
            <Link href="/runway" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">
              Runway
            </Link>
            <Link href="/leaderboard" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">
              Leaderboard
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-stone-700">{userProfile?.points || 0} pts</span>
                </div>

                <Button asChild variant="outline" size="sm" className="hidden md:flex bg-transparent">
                  <Link href="/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    List Item
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.profile_pic || "/placeholder.svg"} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {userProfile?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{userProfile?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{userProfile?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/upload">
                        <Upload className="mr-2 h-4 w-4" />
                        List Item
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Join ReWear</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-200"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/browse"
                className="block text-stone-600 hover:text-emerald-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/swipe"
                className="block text-stone-600 hover:text-emerald-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Swipe
              </Link>
              <Link
                href="/runway"
                className="block text-stone-600 hover:text-emerald-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Runway
              </Link>
              <Link
                href="/leaderboard"
                className="block text-stone-600 hover:text-emerald-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>

              {user ? (
                <>
                  <div className="flex items-center space-x-2 pt-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-stone-700">{userProfile?.points || 0} points</span>
                  </div>
                  <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/upload">
                      <Upload className="w-4 h-4 mr-2" />
                      List Item
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/signup">Join ReWear</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
