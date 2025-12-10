"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface Experience {
  id: number
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

interface Education {
  id: number
  degree: string
  school: string
  year: string
  details: string
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Hut",
    company: "",
    period: "2025",
    description:
      "Developed a client-facing web application with Ruby on Rails as part of a competitive group project. The platform was designed to facilitate the online sale of train parts and spares, showcasing the ability to engineer a functional software system from conception to delivery.",
    skills: ["Ruby on Rails", "Full-stack", "Agile", "SRS", "Git"],
  },
  {
    id: 2,
    title: "Engineering You’re Hired (EYH)",
    company: "",
    period: "2024",
    description:
      "Collaborated within a multi-disciplinary, multi-cultural team to address a complex engineering challenge. This culminated in a conceptual design for a Smart Office, proposing technological solutions to improve environmental sustainability and employee health.",
    skills: ["Teamwork", "Engineering Council standards (AHEP)", "UKSPEC"],
  },
  {
    id: 3,
    title: "Global Engineering Challenge (GEC)",
    company: "",
    period: "2023",
    description:
      "Led a multi-disciplinary team in a week-long challenge to address the repurposing of derelict land and historic buildings in Govan, Glasgow. Developed a conceptual design to create multi-use spaces that provided significant social and community benefits. This intensive program developed critical transferable skills for real-life engineering projects.",
    skills: ["Teamwork", "Engineers Without Borders (EWB)", "UKSPEC"],
  },
]

const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Computer Science with Honours",
    school: "University of Sheffield",
    year: "2025",
    details: "Relevant Modules: Advanced Algorithm, 3D Computer Graphics, Cybersecurity in Action, The Internet of Things, Software Testing and Analysis, Robotics, Logic in Computer Science",
  },
  {
    id: 2,
    degree: "Cambridge International A Levels",
    school: "INTEC Education College",
    year: "2022",
    details: "Computer Science (A*), Mathematics (A*), Physics (A*), Further Mathematics (A)",
  },
  {
    id: 3,
    degree: "Malaysian Certificate of Education",
    school: "Sekolah Sultan Alam Shah",
    year: "2019",
    details: "6A+, 3A (including GCE 0 Level English-1119)",
  },
]

const skills = [
  "JavaScript/TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Ruby on Rails",
  "Tailwind CSS",
  "Git",
  "Docker",
  "Python",
  "C++",
  "Haskell",
  "ESP32",
]

export default function CVSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Background</h2>
          <p className="text-lg text-muted-foreground">
            My journey in software development and key achievements throughout my university.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="h-1 w-8 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full" />
            Experience
          </h3>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card
                key={exp.id}
                className="p-6 border-cyan-400/20 hover:border-cyan-400/50 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-cyan-400">{exp.title}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                </div>

                <p className="text-foreground/80 mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-cyan-400/10 text-cyan-400 border-cyan-400/20 hover:bg-cyan-400/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="h-1 w-8 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full" />
            Education
          </h3>

          <div className="space-y-4">
            {education.map((edu) => (
              <Card
                key={edu.id}
                className="p-6 border-cyan-400/20 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold">{edu.degree}</h4>
                    <p className="text-cyan-400 font-medium">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.details}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">{edu.year}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="h-1 w-8 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full" />
            Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="p-4 rounded-lg border border-cyan-400/20 bg-secondary/30 hover:bg-secondary/60 hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-3 group"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                <span className="font-medium text-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
