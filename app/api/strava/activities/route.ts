import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("strava_token")?.value

    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 })
    }

    // Fetch activities from Strava API
    const response = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=30", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch activities")
    }

    const activities = await response.json()
    return new Response(JSON.stringify(activities), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching Strava activities:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch activities" }), { status: 500 })
  }
}
