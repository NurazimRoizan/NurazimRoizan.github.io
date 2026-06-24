"use client"

import React, { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
              <div className="text-center text-zinc-500 mt-10">
                <p className="text-sm">Hi! I'm an AI assistant.</p>
                <p className="text-sm">Ask me anything about my experience and skills.</p>
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
                  {m.content}
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
          <form onSubmit={handleSubmit} className="p-4 bg-zinc-900 border-t border-zinc-800">
            <div className="relative flex items-center">
              <input
                className="w-full bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-zinc-500 transition-all"
                value={input || ""}
                onChange={handleInputChange}
                placeholder="Type your message..."
              />
              <button
                type="submit"
                disabled={isLoading || !input || !input.trim()}
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
        } transition-all duration-300 bg-zinc-100 hover:bg-white text-zinc-900 px-5 py-3.5 rounded-full shadow-lg shadow-zinc-900/20 flex items-center gap-2 font-medium text-sm`}
      >
        <MessageCircle className="w-5 h-5" />
        Interview me digitally
      </button>
    </div>
  )
}
