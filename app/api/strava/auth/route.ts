import { redirect } from "next/navigation"

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || "http://localhost:3000/api/strava/callback"

export async function GET() {
  const scope = "activity:read_all"
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${encodeURIComponent(STRAVA_REDIRECT_URI)}&response_type=code&scope=${scope}`

  redirect(authUrl)
}
