import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedBackground from "@/components/animated-background";
import ReviewsSection from "components/reviews-section";
import About from "./about/page";
import Works from "./works/page";
import Contact from "./contact/page";
import Footer from "components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="mb-8 relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
              <Image src="/images/profile-photo.png" alt="Khushi Hassan" fill className="object-cover" priority />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="block">Hello, I'm</span>
              <span className="block mt-2 text-gray-300">Khushi Hassan</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300">
              A passionate full-stack developer building modern web experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/works"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md flex items-center transition-all"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-gray-600 hover:border-gray-400 text-white px-6 py-3 rounded-md transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">What People Say</h2>
            <ReviewsSection />
          </div>
        </div>

        {/* About, Works, and Contact Sections */}
        <About />
        <Works />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
