import Navigation from "@/components/Navigation"
import HeroSection from "@/components/landing/HeroSection"
import FeaturedItems from "@/components/landing/FeaturedItems"
import HowItWorks from "@/components/landing/HowItWorks"
import EnvironmentalImpact from "@/components/landing/EnvironmentalImpact"
import CommunityGrid from "@/components/landing/CommunityGrid"
// Removed: import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedItems />
      <HowItWorks />
      <EnvironmentalImpact />
      <CommunityGrid />
      {/* Removed Footer */}
    </div>
  )
}
