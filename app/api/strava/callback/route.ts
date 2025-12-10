import { cookies } from "next/headers"

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || "http://localhost:3000/api/strava/callback"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return new Response("No authorization code received", { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error("Failed to get access token")
    }

    // Store token in secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set("strava_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in,
    })

    return new Response(null, {
      status: 302,
      headers: { Location: "/strava" },
    })
  } catch (error) {
    console.error("Strava auth error:", error)
    return new Response("Authentication failed", { status: 500 })
  }
}
