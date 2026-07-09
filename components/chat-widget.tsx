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
        <div className="mb-4 w-80 sm:w-96 h-[32rem] bg-card border-4 border-border shadow-brutal flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="bg-primary p-4 border-b-4 border-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-primary-foreground text-primary border-2 border-border shadow-brutal-sm">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-primary-foreground">Digital Interview</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 bg-background border-2 border-border shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-foreground"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-card">
            {messages.length === 0 && (
              <div className="text-center mt-6 px-4 border-4 border-border p-4 shadow-brutal-sm bg-secondary">
                <p className="text-sm font-black uppercase tracking-widest text-foreground mb-2">Welcome!</p>
                <p className="text-sm font-medium text-foreground mb-4">I'm Nurazim's digital clone. Ask me anything about my experience or background.</p>
                <p className="text-xs border-t-2 border-border pt-3 text-muted-foreground font-bold uppercase tracking-widest">
                  💡 Tip: You can also leave your email and a message here, and I will securely forward it directly to the human Nurazim!
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive text-destructive-foreground border-4 border-border shadow-brutal text-sm font-bold uppercase tracking-widest mb-4">
                Error: {error}
              </div>
            )}
            
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[90%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-border shadow-brutal-sm ${
                    m.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`px-4 py-3 text-sm whitespace-pre-wrap border-2 border-border shadow-brutal-sm font-medium ${
                    m.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <ReactMarkdown 
                    className={`max-w-none text-sm [&>p]:my-0 [&>p]:leading-relaxed [&_strong]:font-black [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-4 [&_ol]:ml-4 [&_li]:mt-1 ${
                      m.role === "user" 
                        ? "text-background" 
                        : "text-foreground"
                    }`}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground border-2 border-border shadow-brutal-sm flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 bg-secondary text-foreground border-2 border-border shadow-brutal-sm text-sm font-black flex items-center gap-2">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-4 bg-background border-t-4 border-border">
            <div className="relative flex items-center">
              <input
                className="w-full bg-card text-foreground border-4 border-border pl-4 pr-14 py-3 text-sm font-medium focus:outline-none focus:ring-0 placeholder:text-muted-foreground transition-all shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_2px_2px_0px_rgba(255,255,255,0.1)]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2 bg-primary text-primary-foreground border-2 border-border shadow-brutal hover:shadow-brutal-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal"
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
        } transition-all duration-300 bg-primary text-primary-foreground border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] px-6 py-4 flex items-center gap-3 font-black uppercase tracking-widest text-sm`}
      >
        <MessageCircle className="w-6 h-6" />
        Interview me
      </button>
    </div>
  )
}
