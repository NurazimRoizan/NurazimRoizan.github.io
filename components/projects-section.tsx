"use client"

import { ExternalLink, Github } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  live: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with Next.js, Stripe integration, and real-time inventory management.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    image: "/ecommerce-dashboard.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by GPT-4 with context awareness and multi-language support.",
    tags: ["React", "AI SDK", "Tailwind CSS", "Node.js"],
    image: "/ai-chat-interface.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, team features, and intuitive UI.",
    tags: ["React", "Firebase", "Zustand", "Socket.io"],
    image: "/task-management-dashboard.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Data visualization dashboard with interactive charts and real-time analytics processing.",
    tags: ["Next.js", "Recharts", "D3.js", "TailwindCSS"],
    image: "/analytics-dashboard.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 5,
    title: "Social Media App",
    description: "Full-featured social platform with user authentication, feeds, messaging, and notifications.",
    tags: ["Next.js", "Supabase", "Realtime DB", "Auth"],
    image: "/social-media-feed.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 6,
    title: "Design System",
    description: "Comprehensive component library with 50+ reusable components and complete documentation.",
    tags: ["React", "Storybook", "TypeScript", "Tailwind"],
    image: "/design-system-components.png",
    github: "https://github.com",
    live: "https://example.com",
  },
]

export default function ProjectsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my best work showcasing my skills in full-stack development, design, and problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-cyan-400/20 hover:border-cyan-400/50 bg-secondary/30 hover:bg-secondary/60 transition-all duration-300 backdrop-blur-sm glow-border"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors"
                    >
                      <Github size={18} className="text-cyan-400" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors"
                    >
                      <ExternalLink size={18} className="text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20 glow-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
