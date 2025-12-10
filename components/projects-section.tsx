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
    title: "Dissertation Project: Graph Theory Visualization Tool",
    description: "This project involves developing an interactive interface to visualize the bijective k-Pebble game and the k-Weisfeiler- Leman algorithm, enabling users to explore and understand graph isomorphism – a fundamental problem in computer science with applications in areas such as network analysis and pattern recognition.",
    tags: ["Java", "Graphstream", "Swing", "Graph Theory"],
    image: "/dissertation-cr.png",
    github: "https://github.com/NurazimRoizan/dissertation-com3610",
    live: "https://github.com/NurazimRoizan/dissertation-com3610",
  },
  {
    id: 2,
    title: "Internet of Things - UnPhone",
    description: "Developed a custom game controller using a Wi-Fi-enabled ESP32 device, which sends a “jump” command to a game server via HTTP GET requests. The controller features both a gesture-based input using its onboard IMU (accelerometer/gyroscope) and a physical button press, with a custom UI screen to manage the input state.",
    tags: ["C++", "Embedded Systems", "ESP32-S3", "Arduino", "unPhone"],
    image: "/dinoGameUI.jpeg",
    github: "https://nurazimroizan.github.io/project/2025-iot-unphone",
    live: "https://nurazimroizan.github.io/project/2025-iot-unphone",
  },
  {
    id: 3,
    title: "Research Paper - CRYSTALS-Kyber Algorithm",
    description: "Researched and documented the CRYSTALS-Kyber (ML-KEM) algorithm, a lattice-based Post-Quantum Cryptography solution. The paper covers the quantum threat to current cryptography, the algorithm’s operational mechanics, and its security profile as a NIST standard.",
    tags: ["Quantum Cryptography", "Cybersecurity", "RnD", "Algorithm"],
    image: "/UoSLogo.png",
    github: "https://nurazimroizan.github.io/project/2025-research-paper-kyber",
    live: "https://nurazimroizan.github.io/project/2025-research-paper-kyber",
  },
  {
    id: 4,
    title: "Internet of Things - GeeyBoard",
    description: "Developed a custom Bluetooth Low Energy (BLE) Human Interface Device (HID) and an integrated Infrared (IR) remote, turning the Unphone device into a highly versatile, single-handed control unit. The primary design goal was maximizing comfort and control from the sofa.",
    tags: ["C++", "C", "Arduino", "Embedded Systems", "Open Source", "unPhone", "ESP32-S3"],
    image: "/keyboardUI.jpg",
    github: "https://github.com/NurazimRoizan/GeeyBoard",
    live: "https://github.com/NurazimRoizan/GeeyBoard",
  },
  {
    id: 5,
    title: "Progressive Web Application - PiYak",
    description: "A Progressive Web App (PWA) for tracking your period cycle and poop counter. I built this to avoid the constant ads and $2 subscription fees of other mobile trackers. Data is saved simply and freely using the Google Forms API.",
    tags: ["Vanilla Javascript", "HTML", "CSS", "Git"],
    image: "/piyakIcon.png",
    github: "https://github.com/NurazimRoizan/PiYak",
    live: "https://nurazimroizan.github.io/PiYak/",
  },
  {
    id: 6,
    title: "Makam Designer - Design Your Gravestone",
    description: "Create a dignified and personalized batu nisan with our futuristic customization tool. Honor your loved ones with thoughtfully designed memorials.",
    tags: ["Three.js", "Node.js", "TypeScript", "TailwindCSS", "React"],
    image: "/makamEx.png",
    github: "https://github.com/muazsazelim/tanahkubur",
    live: "https://github.com/muazsazelim/tanahkubur",
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
