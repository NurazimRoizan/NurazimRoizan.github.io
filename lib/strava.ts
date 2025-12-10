// Strava OAuth and API utilities for GitHub Pages hosting

const STRAVA_CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID || ""
const STRAVA_REDIRECT_URI =
  typeof window !== "undefined" ? `${window.location.origin}/strava` : "http://localhost:3000/strava"

export class StravaOAuth {
  async getAccessToken(): Promise<string | null> {
    // Check if token is already stored
    const stored = localStorage.getItem("strava_access_token")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Check if token is still valid (expiration buffer of 5 minutes)
        if (parsed.expires_at * 1000 > Date.now() + 5 * 60 * 1000) {
          return parsed.access_token
        }

        // Try to refresh if refresh token exists
        if (parsed.refresh_token) {
          return await this.refreshAccessToken(parsed.refresh_token)
        }
      } catch (e) {
        localStorage.removeItem("strava_access_token")
      }
    }

    // Get code from URL params
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    if (code) {
      return await this.exchangeCodeForToken(code)
    }

    return null
  }

  private async exchangeCodeForToken(code: string): Promise<string | null> {
    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
        }),
      })

      if (!response.ok) throw new Error("Token exchange failed")

      const data = await response.json()

      // Store token and expiration
      localStorage.setItem(
        "strava_access_token",
        JSON.stringify({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at: data.expires_at,
        }),
      )

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)

      return data.access_token
    } catch (error) {
      console.error("Failed to exchange code for token:", error)
      return null
    }
  }

  private async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: STRAVA_CLIENT_ID,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      })

      if (!response.ok) throw new Error("Token refresh failed")

      const data = await response.json()

      localStorage.setItem(
        "strava_access_token",
        JSON.stringify({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at: data.expires_at,
        }),
      )

      return data.access_token
    } catch (error) {
      console.error("Failed to refresh token:", error)
      localStorage.removeItem("strava_access_token")
      return null
    }
  }

  initiateLogin(): void {
    const scope = "activity:read_all"
    const authUrl =
      `https://www.strava.com/oauth/authorize?` +
      `client_id=${STRAVA_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(STRAVA_REDIRECT_URI)}&` +
      `response_type=code&` +
      `scope=${scope}&` +
      `approval_prompt=force`

    window.location.href = authUrl
  }

  logout(): void {
    localStorage.removeItem("strava_access_token")
  }
}

export interface StravaActivity {
  id: number
  name: string
  type: string
  distance: number
  total_elevation_gain: number
  moving_time: number
  start_date: string
  kilojoules?: number
  calories?: number
}

export async function fetchStravaActivities(accessToken: string, limit = 30): Promise<StravaActivity[]> {
  try {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`)
    }

    const activities = await response.json()

    // Map Strava activity type to readable format
    return activities.map((activity: any) => ({
      id: activity.id,
      name: activity.name,
      type: mapActivityType(activity.type),
      distance: activity.distance / 1000, // Convert to km
      elevation: activity.total_elevation_gain,
      duration: formatDuration(activity.moving_time),
      date: formatDate(activity.start_date),
      calories: Math.round(activity.kilojoules || 0),
      image: "/strava-activity.jpg",
    }))
  } catch (error) {
    console.error("Error fetching Strava activities:", error)
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
