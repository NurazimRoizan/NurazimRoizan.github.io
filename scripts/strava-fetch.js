require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// 1. Setup Environment Variables
// You need to add STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, and STRAVA_REFRESH_TOKEN to your .env.local
const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.warn("⚠️  Strava credentials missing. Skipping data fetch.");
    return null;
  }

  // Exchange Refresh Token for a new Access Token
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to refresh token');
  return data.access_token;
}

async function fetchStravaData() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    // Fetch Activities
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=30`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
        // This will often be a 401 or 403 status if the token is bad
        const errorText = await response.text();
        throw new Error(`Failed to fetch activities (Status: ${response.status}). Response: ${errorText}`);
    }
    
    const activities = await response.json();

    if (!Array.isArray(activities)) {
        throw new Error("Strava API response was not an array of activities. Check your permissions/scope.");
    }

    // Map and Format Data (Logic copied from your old lib/strava.ts)
    const formattedData = activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      type: mapActivityType(activity.type),
      distance: activity.distance / 1000,
      elevation: activity.total_elevation_gain,
      duration: formatDuration(activity.moving_time),
      date: new Date(activity.start_date).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
      }),
      calories: Math.round(activity.kilojoules || 0),
      image: "/strava-activity.jpg",
    }));

    // Ensure directory exists
    const dataDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save File
    fs.writeFileSync(
      path.join(dataDir, 'strava.json'), 
      JSON.stringify(formattedData, null, 2)
    );
    
    console.log(`✅ Success: Fetched ${formattedData.length} activities.`);

  } catch (error) {
    console.error('❌ Error fetching Strava data:', error);
    // Create empty file on error to prevent build break
    const dataDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, 'strava.json'), '[]');
  }
}

// Helpers
function mapActivityType(type) {
  const typeMap = {
    Run: "Run", Ride: "Bike", Hike: "Hike", Walk: "Walk", Swim: "Swim",
    AlpineSki: "Ski", BackcountrySki: "Ski", Canoeing: "Paddle", Crossfit: "CrossFit",
    EBikeRide: "Bike", Elliptical: "Elliptical", Golf: "Golf", Handcycle: "Handcycle",
    IceSkate: "Ice Skate", InlineSkate: "Inline Skate", Kayaking: "Paddle", Kitesurf: "Kitesurf",
    NordicSki: "Ski", RollerSki: "Roller Ski", Rowing: "Rowing", Snowboard: "Snowboard",
    Snowshoe: "Snowshoe", StairStepper: "Stairs", StandUpPaddling: "Paddle", Surfing: "Surf",
    Windsurf: "Windsurf", Workout: "Workout", Yoga: "Yoga",
  };
  return typeMap[type] || type;
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

fetchStravaData();