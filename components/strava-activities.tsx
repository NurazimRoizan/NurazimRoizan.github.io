"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock, Mountain, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StravaActivity {
  id: number
  name: string
  type: string
  distance: number
  total_elevation_gain: number
  moving_time: number
  start_date: string
  kilojoules: number
  strava_url?: string
}

export default function StravaActivities() {
  const [activities, setActivities] = useState<StravaActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/strava/activities")
        if (response.status === 401) {
          setError("Not authenticated")
          return
        }
        const data = await response.json()
        setActivities(data)
      } catch (err) {
        setError("Failed to load activities")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading your Strava activities...</div>
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">{error}</p>
        <a href="/api/strava/auth" className="text-cyan-400 hover:text-cyan-300 font-semibold">
          Connect Strava Account
        </a>
      </div>
    )
  }

  if (activities.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No activities found</div>
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <a
          key={activity.id}
          href={`https://www.strava.com/activities/${activity.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card className="group overflow-hidden border-cyan-400/20 hover:border-cyan-400/50 bg-secondary/30 hover:bg-secondary/60 transition-all duration-300 h-full cursor-pointer">
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors flex-1 truncate">
                  {activity.name}
                </h3>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30 whitespace-nowrap ml-2">
                  {activity.type}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-4">{formatDate(activity.start_date)}</p>

              <div className="grid grid-cols-2 gap-3 text-sm flex-1">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-400" />
                  <span className="text-muted-foreground">{(activity.distance / 1000).toFixed(1)} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain size={16} className="text-cyan-400" />
                  <span className="text-muted-foreground">{Math.round(activity.total_elevation_gain)} m</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-cyan-400" />
                  <span className="text-muted-foreground">{formatDuration(activity.moving_time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-orange-500" />
                  <span className="text-muted-foreground">{Math.round(activity.kilojoules)} kJ</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-cyan-400/10">
                <p className="text-xs text-cyan-400 font-semibold hover:text-cyan-300">View on Strava →</p>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  )
}
