import AnimatedBackground from "components/animated-background"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "components/contact-form"
import Image from "next/image"

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">Get In Touch</h1>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
              <Image src="/images/profile-photo.png" alt="Khushi Hassan" fill className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 md:p-10 backdrop-blur-sm shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-300">Email</h3>
                    <p className="text-gray-400">fatimahbaloch917@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-300">Phone</h3>
                    <p className="text-gray-400">+92 3021884972</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-300">Location</h3>
                    <p className="text-gray-400">Hyderabad, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/khushi0433"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full text-gray-300 hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/khushi-baloch-789013365/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full text-gray-300 hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.upwork.com/freelancers/~01626b34fb15c459c0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full text-gray-300 hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 md:p-10 backdrop-blur-sm shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Send Me a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
