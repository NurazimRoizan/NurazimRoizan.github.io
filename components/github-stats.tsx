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
    <div className="border-4 border-black dark:border-cyan-400 p-6 bg-cyan-100 dark:bg-cyan-950/40 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(34,211,238,0.5)] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(34,211,238,0.8)]">
      <div className="flex items-center gap-3 mb-4 border-b-4 border-black dark:border-cyan-400 pb-2">
        <Github className="w-8 h-8 text-black dark:text-cyan-400" />
        <h2 className="text-2xl font-bold font-mono text-black dark:text-cyan-400 uppercase">Live Github Stats</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border-2 border-black dark:border-cyan-400/50 p-3 bg-white dark:bg-black/50">
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-4 h-4 text-black dark:text-cyan-300" />
            <span className="font-mono font-bold text-sm text-black dark:text-cyan-300 uppercase">Public Repos</span>
          </div>
          <span className="text-2xl font-black text-black dark:text-white">{stats.publicRepos}</span>
        </div>
        
        <div className="border-2 border-black dark:border-cyan-400/50 p-3 bg-white dark:bg-black/50">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-black dark:text-cyan-300" />
            <span className="font-mono font-bold text-sm text-black dark:text-cyan-300 uppercase">Followers</span>
          </div>
          <span className="text-2xl font-black text-black dark:text-white">{stats.followers}</span>
        </div>
        
        <div className="border-2 border-black dark:border-cyan-400/50 p-3 bg-white dark:bg-black/50 col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-black dark:text-cyan-300" />
            <span className="font-mono font-bold text-sm text-black dark:text-cyan-300 uppercase">Total Stars</span>
          </div>
          <span className="text-2xl font-black text-black dark:text-white">{stats.totalStars}</span>
        </div>
      </div>

      {stats.topLanguages.length > 0 && (
        <div className="border-t-4 border-black dark:border-cyan-400 pt-4">
          <span className="font-mono font-bold text-sm text-black dark:text-cyan-300 uppercase mb-2 block">Top Languages</span>
          <div className="flex flex-wrap gap-2">
            {stats.topLanguages.map((lang) => (
              <span key={lang} className="border-2 border-black dark:border-cyan-400 bg-cyan-200 dark:bg-cyan-900 text-black dark:text-cyan-100 font-mono text-xs px-2 py-1 uppercase font-bold">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
