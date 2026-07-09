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
    return (
      <div className="p-8 border-4 border-border shadow-brutal bg-card text-center font-black uppercase tracking-widest text-foreground">
        Loading Activities...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 border-4 border-destructive bg-destructive/10 shadow-brutal text-center">
        <p className="text-destructive font-bold mb-4">{error}</p>
        <a href="/api/strava/auth" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          Connect Strava Account
        </a>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="p-8 border-4 border-border shadow-brutal bg-card text-center font-black uppercase tracking-widest text-muted-foreground">
        No activities found
      </div>
    )
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
          className="block h-full"
        >
          <Card className="group overflow-hidden border-4 border-border bg-card shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-none h-full flex flex-col cursor-pointer p-0">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors flex-1">
                  {activity.name}
                </h3>
              </div>
              <div className="mb-4">
                <span className="px-2 py-1 text-xs font-black uppercase tracking-widest bg-foreground text-background">
                  {activity.type}
                </span>
              </div>

              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">{formatDate(activity.start_date)}</p>

              <div className="grid grid-cols-2 gap-4 text-sm flex-1 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span className="font-bold text-foreground">{(activity.distance / 1000).toFixed(1)} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain size={18} className="text-primary" />
                  <span className="font-bold text-foreground">{Math.round(activity.total_elevation_gain)} m</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span className="font-bold text-foreground">{formatDuration(activity.moving_time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-primary" />
                  <span className="font-bold text-foreground">{Math.round(activity.kilojoules)} kJ</span>
                </div>
              </div>

              <div className="pt-4 border-t-4 border-border">
                <p className="text-sm text-foreground font-black uppercase tracking-widest group-hover:text-primary transition-colors">View on Strava →</p>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  )
}
