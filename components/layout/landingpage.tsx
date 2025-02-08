import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ChatBot from '../chatbot/chatbot'
import { usePrivyAuth } from '@/hooks/usePrivyAuth'

// Add types for props
interface SectionHeaderProps {
  children: React.ReactNode;
}

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
}

// Update component definitions with types
const SectionHeader = ({ children }: SectionHeaderProps) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl font-bold text-center mb-16 w-screen"
  >
    {children}
  </motion.h2>
)

const AnimatedCard = ({ children, delay = 0 }: AnimatedCardProps) => (
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

// Add type for stats and features data
interface Stat {
  number: string;
  label: string;
}

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Story {
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const { login } = usePrivyAuth()

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section - Enhanced gradient and spacing */}
      <section className="relative min-h-screen flex items-center w-full">
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
              className=" object-cover brightness-75 overflow-clip"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />


          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full z-10">
          <div className="flex flex-col items-start max-w-3xl text-white space-y-2">
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
              <button 
                onClick={login}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
              >
                Make an Impact
              </button>
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

      {/* Stats Section - Enhanced cards */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { number: '1M+', label: 'Lives Impacted' },
              { number: '50+', label: 'Global Partners' },
              { number: '100%', label: 'Transparent Impact' }
            ].map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center transform transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-5xl font-bold text-green-600 mb-3"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-stone-600 text-lg">{stat.label}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced cards and gradients */}
      <section className="py-24 bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader>Nurturing Communities Through Technology</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
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
                <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-lg transform transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 border border-white/10">
                  <div className="h-52 mb-8 relative overflow-hidden rounded-xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transform transition duration-700 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-yellow-400">{feature.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories - Enhanced cards */}
      <section className="py-24 bg-gradient-to-b from-white to-stone-50 text-green-900 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader>Growing Success Stories</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="h-80 relative overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transform transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-semibold mb-4 text-green-800">{story.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{story.description}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced gradient and hover effects */}
      <section className="py-24 bg-yellow-400 relative overflow-hidden w-full">
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, #f59e0b, #fbbf24)',
              'linear-gradient(45deg, #fbbf24, #f59e0b)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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

      {/* Footer - Enhanced spacing and hover effects */}
      <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white py-20 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

      {/* Replace the floating chat interface with the ChatBot component */}
      <ChatBot />
    </main>
  )
}