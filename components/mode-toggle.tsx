"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="p-3 bg-background border-4 border-border shadow-brutal opacity-50 cursor-not-allowed">
                <div className="w-6 h-6" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 bg-card border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all group"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-300" />
            ) : (
                <Moon className="w-6 h-6 text-primary group-hover:-rotate-12 transition-transform duration-300" />
            )}
        </button>
    )
}
