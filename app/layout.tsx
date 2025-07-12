import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Footer" // Import Footer

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "ReWear - The Fashion Swap Revolution",
  description: "Swipe. Swap. Sustain. Join the sustainable fashion revolution.",
  keywords: ["fashion", "sustainability", "clothing swap", "eco-friendly", "community"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${poppins.variable} bg-gradient-to-br from-stone-50 to-amber-50 min-h-screen flex flex-col`}
      >
        <div className="flex-1">{children}</div>
        <Toaster />
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  )
}
