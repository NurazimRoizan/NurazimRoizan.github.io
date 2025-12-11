// Import the static JSON file
// Note: We use 'require' or direct import if your config allows json imports
import stravaData from '@/data/strava.json'; 

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
  // Return the static data directly.
  // We slice it to respect the limit, though the script fetches 30 by default.
  return (stravaData as StravaActivity[]).slice(0, limit);
}