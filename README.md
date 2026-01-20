# Nurazim Roizan Portfolio

Professional portfolio and project showcase built with Next.js, featuring Strava activity integration and a dynamic theme system.

## 🚀 Getting Started

To run the project locally, follow these steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏃 Strava Integration

This portfolio project fetches and displays recent Strava activities. 

> [!IMPORTANT]
> **To update the Strava activities manually, run this command:**
> ```bash
> node scripts/strava-fetch.js
> ```
> *Note: This script is also automatically triggered as a `prebuild` step when running `npm run build`.*

## 🎨 Features

- **Theme Toggle**: Switch between Dark Mode (Cyan accent) and Light Mode (White/Orange accent) via the navbar.
- **Responsive Design**: Fully optimized for mobile with a custom hamburger menu.
- **Strava Dashboard**: Visual representation of recent cycling/running activities.
- **Projects Showcase**: Interactive modal views for detailed project information.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Lucide React](https://lucide.dev/), [Radix UI](https://www.radix-ui.com/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Deployment**: GitHub Pages

## 📖 Deployment

The site is currently hosted at: [https://nurazimroizan.github.io](https://nurazimroizan.github.io)

To deploy updates to GitHub Pages:
```bash
npm run build
# The build process produces a static export in the 'out' directory
```

## 📝 Environment Variables

Ensure you have a `.env.local` file with the following keys for Strava integration:
- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`
- `STRAVA_REFRESH_TOKEN`
