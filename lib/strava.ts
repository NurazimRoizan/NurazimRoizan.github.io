// Strava OAuth and API utilities for GitHub Pages hosting

const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN || ""

export interface StravaActivity {
  id: number
  name: string
  type: string
  distance: number
  elevation: number
  duration: string
  date: string
  calories: number
  image: string
}

export async function fetchStravaActivities(limit = 30): Promise<StravaActivity[]> {
  if (!STRAVA_ACCESS_TOKEN) {
    console.error("[v0] STRAVA_ACCESS_TOKEN is not set")
    return []
  }

  try {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${limit}`, {
      headers: {
        Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`)
    }

    const activities = await response.json()

    return activities.map((activity: any) => ({
      id: activity.id,
      name: activity.name,
      type: mapActivityType(activity.type),
      distance: activity.distance / 1000,
      elevation: activity.total_elevation_gain,
      duration: formatDuration(activity.moving_time),
      date: formatDate(activity.start_date),
      calories: Math.round(activity.kilojoules || 0),
      image: "/strava-activity.jpg",
    }))
  } catch (error) {
    console.error("[v0] Error fetching Strava activities:", error)
    return []
  }
}

function mapActivityType(stravaType: string): string {
  const typeMap: { [key: string]: string } = {
    Run: "Run",
    Ride: "Bike",
    Hike: "Hike",
    Walk: "Walk",
    Swim: "Swim",
    AlpineSki: "Ski",
    BackcountrySki: "Ski",
    Canoeing: "Paddle",
    Crossfit: "CrossFit",
    EBikeRide: "Bike",
    Elliptical: "Elliptical",
    Golf: "Golf",
    Handcycle: "Handcycle",
    IceSkate: "Ice Skate",
    InlineSkate: "Inline Skate",
    Kayaking: "Paddle",
    Kitesurf: "Kitesurf",
    NordicSki: "Ski",
    RollerSki: "Roller Ski",
    Rowing: "Rowing",
    Snowboard: "Snowboard",
    Snowshoe: "Snowshoe",
    StairStepper: "Stairs",
    StandUpPaddling: "Paddle",
    Surfing: "Surf",
    Windsurf: "Windsurf",
    Workout: "Workout",
    Yoga: "Yoga",
  }

  return typeMap[stravaType] || stravaType
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
