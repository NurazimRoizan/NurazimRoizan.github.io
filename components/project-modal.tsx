"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    description: string
    fullDescription: string
    tags: string[]
    image: string
    github?: string
    live?: string
    features: string[]
    duration: string
    role: string
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative bg-secondary/40 border border-cyan-400/20 rounded-xl backdrop-blur-md glow-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 ml-auto flex items-center justify-center p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors mb-4 mr-4 z-50"
            aria-label="Close modal"
          >
            <X size={20} className="text-cyan-400" />
          </button>

          {/* Project Image */}
          <div className="relative h-64 overflow-hidden -mt-14">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Title and Links */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                {(project.github || project.live) && (
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-cyan-400/20">
              <div>
                <p className="text-muted-foreground text-sm">Type</p>
                <p className="font-semibold text-cyan-400">{project.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Role</p>
                <p className="font-semibold text-cyan-400">{project.role}</p>
              </div>
            </div>

            {/* Full Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* All Tags */}
            <div>
              <h3 className="text-lg font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-orange-500/10 text-orange-400 rounded-full border border-orange-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
