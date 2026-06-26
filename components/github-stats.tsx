"use client"

import { useEffect, useState } from "react"
import { Github, Star, GitBranch, Users } from "lucide-react"

interface GithubStatsData {
  followers: number
  publicRepos: number
  totalStars: number
  topLanguages: string[]
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // If testing locally alongside the Vercel CLI backend, set this to http://localhost:3000 or wherever hono runs
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.jimiroi.com'
        const response = await fetch(`${API_URL}/stats/github`)
        
        if (!response.ok) {
          throw new Error("Failed to load GitHub stats")
        }
        
        const data = await response.json()
        setStats(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="border-4 border-black p-6 bg-yellow-400 font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">Loading GitHub stats...</div>
  }

  if (error || !stats) {
    return null // Fail silently so we don't break the portfolio UI
  }

  return (
    <div className="border-4 border-black p-6 bg-[#b2f5ea] dark:bg-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
      <div className="flex items-center gap-3 mb-4 border-b-4 border-black pb-2">
        <Github className="w-8 h-8 text-black dark:text-white" />
        <h2 className="text-2xl font-bold font-mono text-black dark:text-white uppercase">Live Github Stats</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border-2 border-black p-3 bg-white dark:bg-black">
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-4 h-4 text-black dark:text-white" />
            <span className="font-mono font-bold text-sm text-black dark:text-white uppercase">Public Repos</span>
          </div>
          <span className="text-2xl font-black text-black dark:text-white">{stats.publicRepos}</span>
        </div>
        
        <div className="border-2 border-black p-3 bg-white dark:bg-black">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-black dark:text-white" />
            <span className="font-mono font-bold text-sm text-black dark:text-white uppercase">Followers</span>
          </div>
          <span className="text-2xl font-black text-black dark:text-white">{stats.followers}</span>
        </div>
        
        <div className="border-2 border-black p-3 bg-white dark:bg-black col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-black dark:text-white" />
            <span className="font-mono font-bold text-sm text-black dark:text-white uppercase">Total Stars</span>
          </div>
          <span className="text-2xl font-black text-black dark:text-white">{stats.totalStars}</span>
        </div>
      </div>

      {stats.topLanguages.length > 0 && (
        <div className="border-t-4 border-black pt-4">
          <span className="font-mono font-bold text-sm text-black dark:text-white uppercase mb-2 block">Top Languages</span>
          <div className="flex flex-wrap gap-2">
            {stats.topLanguages.map((lang) => (
              <span key={lang} className="border-2 border-black bg-[#fef08a] dark:bg-zinc-600 text-black dark:text-white font-mono text-xs px-2 py-1 uppercase font-bold">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
