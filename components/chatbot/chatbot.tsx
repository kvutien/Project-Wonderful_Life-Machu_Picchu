import { useState, useRef, useEffect } from 'react'

// Chat Message component
const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[80%] p-3 rounded-lg ${
      isUser ? 'bg-green-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
    }`}>
      {message}
    </div>
  </div>
)

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    //The deployed agent suddenly stopped working and we couldn't deploy it again as
    //  there was a technical issue at autonome dashboard.
    //so temporarily we are using self hosted eliza agent.


//   const response = await fetch('https://autonome.alt.technology/humanity-aszqaz/11eac870-7416-06e2-8ced-d919b63c9c82/message', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Basic bmFkZXI6cElDVHRaYURUYw=='
    //     },
    //     body: JSON.stringify({
    //       text: userMessage,
    //     }),
    //   })

    //   const data = await response.json()
    //   if (data?.text) {
    //     setChatHistory(prev => [...prev, { text: data.text, isUser: false }])
    //   }
    // } catch (error) {
    //   console.error('Error:', error)
    //   setChatHistory(prev => [...prev, { 
    //     text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
    //     isUser: false 
    //   }])
    // }
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
                className="flex-1 p-2 border rounded-lg focus:outline-none text-black focus:border-green-600"
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
  )
}