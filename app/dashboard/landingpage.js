import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Chat Message component
const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[80%] p-3 rounded-lg ${
      isUser ? 'bg-green-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
    }`}>
      {message}
    </div>
  </div>
)

// Animated Section Header
const SectionHeader = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl font-bold text-center mb-16"
  >
    {children}
  </motion.h2>
)

// Animated Card
const AnimatedCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="h-full"
  >
    {children}
  </motion.div>
)

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = message
    setMessage('')
    setChatHistory(prev => [...prev, { text: userMessage, isUser: true }])
    setIsLoading(true)

    try {
      const response = await fetch('https://machupicchu.agent.myriadflow.com/e9ae6f57-2059-0334-91c3-304bef2bfcce/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: userMessage,
          userId: "user1",
          userName: "visitor"
        }),
      })

      const data = await response.json()
      if (data[0]?.text) {
        setChatHistory(prev => [...prev, { text: data[0].text, isUser: false }])
      }
    } catch (error) {
      console.error('Error:', error)
      setChatHistory(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        isUser: false 
      }])
    }

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-full"
          >
            <Image
              src="/mp2.jpg"
              alt="Sustainable farming and aid distribution"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </motion.div>
        </div>
        
        <div className="container mx-auto px-6 z-10 ">
          <div className="flex flex-col items-start max-w-3xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-48 mb-4"
            >
              <Image
                src="/machu.webp"
                alt="Machu Picchu - Wonderful Life"
                width={200}
                height={80}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 leading-tight">
                Machu Picchu
              </h2>
              <p className="text-2xl md:text-3xl text-white/90 mt-2">
                Wonderful Life
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Cultivating Hope, <br/>Harvesting Change
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl mb-8"
            >
              Connecting humanitarian aid with AI-powered precision to nurture communities worldwide
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-4"
            >
              <Link 
                href="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
              >
                Make an Impact
              </Link>
              <Link
                href="https://github.com/kvutien/Project-Wonderful_Life-Machu_Picchu"
                target="_blank"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Stats Section with Counters */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { number: '1M+', label: 'Lives Impacted' },
              { number: '50+', label: 'Global Partners' },
              { number: '100%', label: 'Transparent Impact' }
            ].map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <div className="bg-white p-8 rounded-xl shadow-sm text-center transform transition hover:shadow-lg">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-4xl font-bold text-green-600 mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-stone-600">{stat.label}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Parallax */}
      <section className="py-20 bg-gradient-to-b from-green-900 to-green-800 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader>Nurturing Communities Through Technology</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Smart Resource Distribution',
                description: 'AI-driven analysis ensures resources reach the communities that need them most',
                image: '/mp3.jpg'
              },
              {
                title: 'Transparent Impact',
                description: 'Blockchain technology ensures every contribution is tracked and verified',
                image: '/mp4.jpg'
              },
              {
                title: 'Community First',
                description: 'Empowering local communities with sustainable aid solutions',
                image: '/mp5.jpg'
              }
            ].map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <div className="bg-white/10 p-8 rounded-xl backdrop-blur transform transition hover:bg-white/20">
                  <div className="h-48 mb-6 relative overflow-hidden rounded-lg">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transform transition hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-200">{feature.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories with Hover Effects */}
      <section className="py-20 bg-stone-50 text-green-900">
        <div className="container mx-auto px-6">
          <SectionHeader>Growing Success Stories</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Agricultural Revival in Peru',
                description: 'How AI-powered resource distribution transformed traditional farming communities',
                image: '/mp6.jpg'
              },
              {
                title: 'Building Resilient Communities',
                description: 'Creating sustainable impact through technology and community engagement',
                image: '/mp7.jpg'
              }
            ].map((story, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg group">
                  <div className="h-72 relative overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transform transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-green-800">{story.title}</h3>
                    <p className="text-stone-600">{story.description}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Animation */}
      <section className="py-20 bg-yellow-400 relative overflow-hidden">
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, #f59e0b, #fbbf24)',
              'linear-gradient(45deg, #fbbf24, #f59e0b)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-green-900">Join the Wonderful Life Movement</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-green-800">
              Be part of a revolutionary approach to humanitarian aid that combines technology with compassion
            </p>
            <Link
              href="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 inline-block"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer with Contact */}
      <footer className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/machupicchu.jpg"
                    alt="Machu Picchu Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-yellow-400">Machu Picchu</h2>
                  <p className="text-xl text-white/90 mt-2">Wonderful Life</p>
                </div>
              </div>
              <p className="text-lg text-gray-300 max-w-md">
                Revolutionizing humanitarian aid through AI and blockchain technology
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:kvutien.yes@gmail.com" className="hover:text-yellow-400 transition">
                    kvutien.yes@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+352 123 456 789</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                  </svg>
                  <a 
                    href="https://www.linkedin.com/in/kvutien/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <a 
                    href="https://twitter.com/godreaperrr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition"
                  >
                    Twitter Agent
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <a 
                    href="https://t.me/chicken396_bot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition"
                  >
                    Telegram Agent
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Interface */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>Chat with AI Assistant</span>
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-xl w-96 flex flex-col" style={{ height: '500px' }}>
            {/* Chat Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <span className="font-semibold">Machu Picchu AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {chatHistory.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-green-600"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}