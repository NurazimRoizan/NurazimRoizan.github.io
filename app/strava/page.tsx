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
    { label: "Total Effort", value: `Not Recorded`, icon: Clock },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation activeSection="strava" />

      <section className="pt-24 pb-20 px-6 border-b-4 border-border">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16 border-l-8 border-primary pl-6">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-4 flex items-center gap-4">
              <Zap size={48} className="text-primary hidden md:block" />
              Strava<br/>Activities
            </h1>
            <p className="text-xl font-bold uppercase tracking-tight text-muted-foreground max-w-2xl">
              Documenting my outdoor adventures, from mountain hikes to cycling routes and runs through scenic landscapes.
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
                    className="p-6 bg-card border-4 border-border shadow-brutal rounded-none hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} className="text-primary" />
                      <p className="text-sm font-black uppercase tracking-widest text-foreground">{stat.label}</p>
                    </div>
                    <p className="text-4xl font-black text-primary tracking-tighter">{stat.value}</p>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Error State */}
          {activities.length === 0 && (
            <Card className="mb-16 p-8 border-4 border-destructive bg-destructive/10 shadow-brutal rounded-none">
              <p className="text-destructive font-bold text-center">
                Failed to load Strava activities. I guess my STRAVA_ACCESS_TOKEN has expired. I should have been working on it or I have not found the time. 
                Sorry for any inconveniences
              </p>
            </Card>
          )}

          {/* Favorite Hike Spotlight */}
          <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-foreground">
              <span className="h-8 w-4 bg-primary block" />
              Featured Route: {favoriteHike.name}
            </h2>
            <Card className="overflow-hidden border-4 border-border shadow-brutal bg-card rounded-none">
              <div className="grid md:grid-cols-2 p-0">
                <div className="border-b-4 md:border-b-0 md:border-r-4 border-border">
                  <img
                    src={favoriteHike.image || "/placeholder.svg"}
                    alt={favoriteHike.name}
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                </div>
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <p className="text-xs bg-primary text-primary-foreground font-black uppercase tracking-widest inline-block px-2 py-1 mb-4 border-2 border-border shadow-brutal-sm">Favorite Hike</p>
                    <p className="text-foreground font-medium leading-relaxed mb-6 border-l-4 border-muted pl-4">{favoriteHike.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-secondary border-2 border-border">
                      <p className="text-xs font-black uppercase tracking-widest text-foreground mb-1">Distance</p>
                      <p className="text-xl font-bold text-primary">{favoriteHike.distance} km</p>
                    </div>
                    <div className="p-4 bg-secondary border-2 border-border">
                      <p className="text-xs font-black uppercase tracking-widest text-foreground mb-1">Elevation</p>
                      <p className="text-xl font-bold text-primary">{favoriteHike.elevation} m</p>
                    </div>
                    <div className="p-4 bg-secondary border-2 border-border">
                      <p className="text-xs font-black uppercase tracking-widest text-foreground mb-1">Difficulty</p>
                      <p className="text-xl font-bold text-primary">{favoriteHike.difficulty}</p>
                    </div>
                    <div className="p-4 bg-secondary border-2 border-border">
                      <p className="text-xs font-black uppercase tracking-widest text-foreground mb-1">Best Time</p>
                      <p className="text-xl font-bold text-primary">{favoriteHike.bestTime}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-widest mb-3">Route Highlights</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {favoriteHike.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 text-xs bg-foreground text-background font-black uppercase tracking-widest border-2 border-transparent"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <a
                      href={favoriteHike.stravaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-foreground">
                <span className="h-8 w-4 bg-primary block" />
                Recent Activities
              </h2>
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

                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">{activity.date}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm flex-1 mb-6">
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-primary" />
                            <span className="font-bold text-foreground">{activity.distance.toFixed(1)} km</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mountain size={18} className="text-primary" />
                            <span className="font-bold text-foreground">{Math.round(activity.elevation)} m</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-primary" />
                            <span className="font-bold text-foreground">{activity.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap size={18} className="text-primary" />
                            <span className="font-bold text-foreground">{Math.round(activity.calories)} kJ</span>
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
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
