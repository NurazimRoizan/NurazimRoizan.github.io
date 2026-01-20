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
            <button className="p-2 rounded-lg bg-secondary/50 border border-[#FF8C00]/20 dark:border-cyan-400/20">
                <div className="w-5 h-5" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-[#FF8C00]/20 dark:border-cyan-400/20 hover:border-[#FF8C00]/50 dark:hover:border-cyan-400/50 transition-all group glow-border"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-[#FF8C00] dark:text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
                <Moon className="w-5 h-5 text-orange-500 group-hover:-rotate-12 transition-transform duration-300" />
            )}
        </button>
    )
}
