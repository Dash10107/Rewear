"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, Leaf, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Leaf className="h-8 w-8 text-sage-600" />
              <Sparkles className="h-4 w-4 text-terracotta-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sage-700 to-terracotta-600 bg-clip-text text-transparent">
              ReWear
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-sage-700 hover:text-terracotta-600 transition-colors">
              Browse
            </Link>
            <Link href="/swipe" className="text-sage-700 hover:text-terracotta-600 transition-colors">
              Swipe
            </Link>
            <Link href="/runway" className="text-sage-700 hover:text-terracotta-600 transition-colors">
              Runway
            </Link>
            <Link href="/leaderboard" className="text-sage-700 hover:text-terracotta-600 transition-colors">
              Leaderboard
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-sage-100 text-sage-700">
                        {user.user_metadata?.name?.[0] || user.email?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/upload">Upload Item</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-sage-600 hover:bg-sage-700">
                  <Link href="/signup">Join ReWear</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="md:hidden bg-white border-t border-sage-200"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/browse"
                className="block px-3 py-2 text-sage-700 hover:bg-sage-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/swipe"
                className="block px-3 py-2 text-sage-700 hover:bg-sage-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Swipe
              </Link>
              <Link
                href="/runway"
                className="block px-3 py-2 text-sage-700 hover:bg-sage-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Runway
              </Link>
              <Link
                href="/leaderboard"
                className="block px-3 py-2 text-sage-700 hover:bg-sage-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
