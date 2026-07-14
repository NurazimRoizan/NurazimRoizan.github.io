import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Sidebar from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import AnalyticsTracker from "@/components/analytics"
import "./globals.css"
import ChatWidget from "@/components/chat-widget"
import CustomCursor from "@/components/custom-cursor"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Nurazim Roizan | Portfolio",
    template: "%s | Nurazim Roizan"
  },
  description: "Professional portfolio and project showcase of Nurazim Roizan, a digital builder creating functional and beautiful experiences.",
  keywords: ["Nurazim Roizan", "Portfolio", "Software Engineer", "Web Developer", "Neo-Brutalism"],
  authors: [{ name: "Nurazim Roizan" }],
  creator: "Nurazim Roizan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.jimiroi.com",
    title: "Nurazim Roizan | Portfolio",
    description: "Professional portfolio and project showcase of Nurazim Roizan.",
    siteName: "Nurazim Roizan Portfolio",
    images: [
      {
        url: "/jimiroi_logo.svg",
        width: 1200,
        height: 630,
        alt: "Nurazim Roizan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurazim Roizan | Portfolio",
    description: "Professional portfolio and project showcase of Nurazim Roizan.",
    images: ["/jimiroi_logo.svg"],
  },
  icons: {
    icon: "/jimiroi_logo.svg",
    shortcut: "/jimiroi_logo.svg",
    apple: "/jimiroi_logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased md:ml-72 pt-16 md:pt-0`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          <Sidebar />
          {children}
          <Analytics />
          <AnalyticsTracker />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
