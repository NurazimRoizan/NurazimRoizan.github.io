import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Sidebar from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Professional portfolio and project showcase",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logokecik.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logokecik.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/G_logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logokecik.png",
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
          <Sidebar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
