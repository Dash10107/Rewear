import Link from "next/link"
import { Leaf, Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl">ReWear</span>
            </div>
            <p className="text-stone-300 mb-6 max-w-md">
              Join the sustainable fashion revolution. Swap, share, and sustain with a community that cares about the
              planet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-stone-300 hover:text-white transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link href="/swipe" className="text-stone-300 hover:text-white transition-colors">
                  Start Swiping
                </Link>
              </li>
              <li>
                <Link href="/runway" className="text-stone-300 hover:text-white transition-colors">
                  Community Runway
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-stone-300 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-stone-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-stone-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-stone-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-400">
          <p>&copy; 2024 ReWear. All rights reserved. Made with 💚 for the planet.</p>
        </div>
      </div>
    </footer>
  )
}
