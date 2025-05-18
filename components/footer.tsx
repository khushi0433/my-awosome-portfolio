import Link from "next/link"
import { useRouter } from 'next/router'
import { Github, Linkedin, ExternalLink } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            {/* KH Badge instead of profile photo */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-200">KH</span>
            </div>
            <div className="ml-3">
              <Link href="/" className="text-xl font-bold text-white">
                Khushi Hassan
              </Link>
              <p className="text-gray-400 mt-1">Full-Stack Developer</p>
            </div>
          </div>

          <div className="flex space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/works" className="text-gray-400 hover:text-white transition-colors">
              Works
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://github.com/khushi0433"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/khushi-baloch-789013365/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01626b34fb15c459c0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
            aria-label="Upwork"
          >
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Khushi Hassan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
