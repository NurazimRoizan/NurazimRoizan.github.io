"use client"

import { MapPin, Zap, Clock, TrendingUp, Mountain } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { fetchStravaActivities } from "@/lib/strava"

interface ActivityStats {
  label: string
  value: string
  icon: any
}

const favoriteHike = {
  name: "Mountain Ridge Trail",
  description:
    "A breathtaking hike through pristine alpine meadows with panoramic views of the valley below. The trail winds through wildflower-covered slopes and ancient pine forests, offering countless photo opportunities. Best visited during fall for stunning foliage.",
  distance: 12.5,
  elevation: 1840,
  difficulty: "Moderate",
  bestTime: "July - October",
  highlights: ["Alpine Meadows", "Summit Vista Point", "Crystal Lake", "Old Growth Forest"],
  image: "/stunning-mountain-ridge-alpine-trail-landscape.jpg",
  stravaUrl: "https://www.strava.com/activities/YOUR_ACTIVITY_ID",
}

export default async function StravaPage() {
  const activities = await fetchStravaActivities(30)

  // Calculate stats from real activities
  const totalDistance = activities.reduce((sum, a) => sum + a.distance, 0)
  const totalElevation = activities.reduce((sum, a) => sum + a.elevation, 0)
  const totalCalories = activities.reduce((sum, a) => sum + a.calories, 0)

  const activityStats: ActivityStats[] = [
    { label: "Total Activities", value: activities.length.toString(), icon: TrendingUp },
    { label: "Total Distance", value: `${totalDistance.toFixed(1)} km`, icon: MapPin },
    { label: "Total Elevation", value: `${totalElevation.toFixed(0)} m`, icon: Mountain },
    { label: "Total Effort", value: `${totalCalories.toFixed(0)} kJ`, icon: Clock },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation onNavigate={() => {}} activeSection="strava" />

      <section className="pt-24 pb-20 px-4 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap size={32} className="text-orange-500" />
              <h1 className="text-4xl md:text-5xl font-bold">Strava Activities</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Documenting my outdoor adventures, from mountain hikes to cycling routes and runs through scenic
              landscapes.
            </p>
          </div>

          {/* Stats Grid */}
          {activities.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {activityStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={stat.label}
                    className="p-6 bg-secondary/40 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} className="text-cyan-400" />
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <p className="text-3xl font-bold text-cyan-400">{stat.value}</p>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Error State */}
          {activities.length === 0 && (
            <Card className="mb-16 p-8 border-red-400/20 bg-red-500/10">
              <p className="text-red-400 text-center">
                Failed to load Strava activities. I guess my STRAVA_ACCESS_TOKEN has expired. I should have been working on it or I have not found the time. 
                Sorry for any inconveniences
              </p>
            </Card>
          )}

          {/* Favorite Hike Spotlight */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Route: {favoriteHike.name}</h2>
            <Card className="overflow-hidden border-cyan-400/20 bg-secondary/30">
              <div className="grid md:grid-cols-2 gap-6 p-8">
                <div>
                  <img
                    src={favoriteHike.image || "/placeholder.svg"}
                    alt={favoriteHike.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-cyan-400 font-semibold mb-2">FAVORITE HIKE</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{favoriteHike.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-secondary/50 rounded-lg border border-cyan-400/10">
                      <p className="text-xs text-muted-foreground mb-1">Distance</p>
                      <p className="text-xl font-bold text-cyan-400">{favoriteHike.distance} km</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg border border-cyan-400/10">
                      <p className="text-xs text-muted-foreground mb-1">Elevation</p>
                      <p className="text-xl font-bold text-cyan-400">{favoriteHike.elevation} m</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg border border-cyan-400/10">
                      <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                      <p className="text-xl font-bold text-cyan-400">{favoriteHike.difficulty}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg border border-cyan-400/10">
                      <p className="text-xs text-muted-foreground mb-1">Best Time</p>
                      <p className="text-xl font-bold text-cyan-400">{favoriteHike.bestTime}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-3">Route Highlights</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {favoriteHike.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 text-sm bg-orange-500/10 text-orange-400 rounded-full border border-orange-400/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <a
                      href={favoriteHike.stravaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/20 transition-colors font-semibold text-sm glow-cyan"
                    >
                      View on Strava →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Activities Grid */}
          {activities.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
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

                        <p className="text-xs text-muted-foreground mb-4">{activity.date}</p>

                        <div className="grid grid-cols-2 gap-3 text-sm flex-1">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-cyan-400" />
                            <span className="text-muted-foreground">{activity.distance.toFixed(1)} km</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mountain size={16} className="text-cyan-400" />
                            <span className="text-muted-foreground">{Math.round(activity.elevation)} m</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-cyan-400" />
                            <span className="text-muted-foreground">{activity.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap size={16} className="text-orange-500" />
                            <span className="text-muted-foreground">{Math.round(activity.calories)} kJ</span>
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
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
