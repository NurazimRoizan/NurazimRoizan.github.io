"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"

import ReactMarkdown from "react-markdown"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage: Message = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      role: "user",
      content: input.trim()
    }
    
    setInput("") // clear immediately for better UX
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("Stream not available")

      const decoder = new TextDecoder()
      const assistantId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString()
      let assistantContent = ""
      
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }])

      let buffer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        assistantContent += chunk
        setMessages((prev) => 
          prev.map((m) => m.id === assistantId ? { ...m, content: assistantContent } : m)
        )
      }
      
      // Fallback if the AI returned an empty string or the stream failed silently
      if (!assistantContent.trim()) {
        const fallback = "Oops, my digital brain just short-circuited! Could you try asking that again?"
        setMessages((prev) => 
          prev.map((m) => m.id === assistantId ? { ...m, content: fallback } : m)
        )
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to fetch AI response")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[32rem] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="bg-zinc-800/50 p-4 border-b border-zinc-800 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h3 className="font-medium text-zinc-100">Digital Interview</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 mt-10 px-4">
                <p className="text-sm font-medium text-zinc-300">Welcome to my digital interview!</p>
                <p className="text-sm mt-2 mb-3">I'm Nurazim's digital clone. Feel free to ask me anything about my life experience, projects, or background.</p>
                <p className="text-xs border-t border-zinc-800/80 pt-3 text-zinc-400">
                  💡 <em>Tip: You can also leave your email and a message here, and I will securely forward it directly to the human Nurazim!</em>
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl text-sm mb-4">
                Error connecting to AI: {error}
              </div>
            )}
            
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    m.role === "user"
                      ? "bg-zinc-700 text-zinc-300"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-zinc-100 text-zinc-900"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  <ReactMarkdown 
                    className={`max-w-none text-sm [&>p]:my-0 [&>p]:leading-relaxed [&_strong]:font-bold [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-4 [&_ol]:ml-4 [&_li]:mt-1 ${
                      m.role === "user" 
                        ? "text-zinc-900" 
                        : "text-zinc-200"
                    }`}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-2xl px-4 py-2.5 bg-zinc-800 text-zinc-400 text-sm flex items-center gap-1">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse delay-75">●</span>
                  <span className="animate-pulse delay-150">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-4 bg-zinc-900 border-t border-zinc-800">
            <div className="relative flex items-center">
              <input
                className="w-full bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-zinc-500 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-1.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } transition-all duration-300 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 px-5 py-3.5 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center gap-2 font-bold text-sm`}
      >
        <MessageCircle className="w-5 h-5" />
        Interview me digitally
      </button>
    </div>
  )
}
