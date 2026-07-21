import { Mail, Github, Linkedin, MapPin, Gamepad2 } from "lucide-react"

export default function Sidebar() {
  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:rnurazim@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/NurazimRoizan" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nurazimroy" },
    { icon: MapPin, label: "Strava", href: "/strava" },
    { icon: Gamepad2, label: "Steam", href: "https://steamcommunity.com/id/arkxenark" },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-background border-r-4 border-border p-6 z-30 flex-col justify-between overflow-y-auto">
        <div>
          <div className="text-center">
            {/* Profile Picture */}
            <div className="mb-6 flex justify-center">
              <img
                src="/professional-portrait.jpg"
                alt="Profile"
                className="w-40 h-40 rounded-none border-4 border-border shadow-brutal object-cover"
              />
            </div>

            {/* Name */}
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-1 text-foreground">Nurazim Roizan</h1>

            {/* Job Title */}
            <p className="text-primary font-bold text-sm mb-6 uppercase tracking-tight">96% Front-End Developer<br/>4% Dark Mode Enthusiast</p>

            {/* Favorite Quote */}
            <p className="text-muted-foreground font-medium text-xs leading-relaxed mb-8 p-4 border-l-4 border-primary bg-secondary text-left">
              "Cool, cool, cool, cool, cool. No doubt, no doubt, no doubt."<br/><span className="text-foreground font-bold mt-2 block">— Jake Peralta B99</span>
            </p>

            {/* Contact Links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "_blank"}
                    rel={
                      link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "noopener noreferrer"
                    }
                    className="flex items-center gap-3 px-4 py-3 bg-card border-2 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all group text-sm uppercase font-bold"
                  >
                    <Icon size={20} className="text-foreground group-hover:text-primary transition-colors" />
                    <span className="text-foreground group-hover:text-primary transition-colors tracking-wide">{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-foreground font-bold uppercase tracking-wider mt-8 pt-6 border-t-4 border-border">
          <p>© 2026 Nurazim Roizan</p>
          <p className="mt-2 text-muted-foreground">Crafted with passion<br/>and cheese</p>
        </div>
      </aside>
    </>
  )
}
