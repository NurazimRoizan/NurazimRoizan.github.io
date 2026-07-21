"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import GithubStats from "@/components/github-stats"

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
    title: "Front-End Developer",
    company: "Softinn Solutions (Hotel SaaS Provider)",
    period: "Feb 2026 - Present",
    description:
      "Developed and maintained a comprehensive suite of hospitality SaaS applications (Booking Engine, PMS, CMS, and Portal) utilizing Angular, Bootstrap, and Metronic with C#, leveraging deep expertise in hotel operations to deliver highly responsive, user-centric solutions that resolve complex operational bottlenecks.",
    skills: ["Angular", "C#", "TypeScript", "Firebase", "Git", "Hotel Operations", "Hotel SaaS"],
  },
  {
    id: 2,
    title: "Software Hut",
    company: "University of Sheffield",
    period: "2025",
    description:
      "Developed a client-facing web application with Ruby on Rails as part of a competitive group project. The platform was designed to facilitate the online sale of train parts and spares, showcasing the ability to engineer a functional software system from conception to delivery.",
    skills: ["Ruby on Rails", "Full-stack", "Agile", "SRS", "Git"],
  },
  {
    id: 3,
    title: "Engineering You’re Hired (EYH)",
    company: "University of Sheffield",
    period: "2024",
    description:
      "Collaborated within a multi-disciplinary, multi-cultural team to address a complex engineering challenge. This culminated in a conceptual design for a Smart Office, proposing technological solutions to improve environmental sustainability and employee health.",
    skills: ["Teamwork", "Engineering Council standards (AHEP)", "UKSPEC"],
  },
  {
    id: 4,
    title: "Global Engineering Challenge (GEC)",
    company: "University of Sheffield",
    period: "2023",
    description:
      "Led a multi-disciplinary team in a week-long challenge to address the repurposing of derelict land and historic buildings in Govan, Glasgow. Developed a conceptual design to create multi-use spaces that provided significant social and community benefits. This intensive program developed critical transferable skills for real-life engineering projects.",
    skills: ["Teamwork", "Engineers Without Borders (EWB)", "UKSPEC"],
  },
]

const education: Education[] = [
  {
    id: 1,
    degree: "BSc in Computer Science with Honours",
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
  "JavaScript",
  "TypeScript",
  "Angular",
  "C#",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Ruby on Rails",
  "Tailwind CSS",
  "Git",
  "Firebase",
  "Python",
  "C++",
  "Haskell",
  "ESP32",
]

export default function CVSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 border-l-8 border-primary pl-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-foreground">Curriculum<br/>Vitae</h2>
          <p className="text-xl font-bold uppercase tracking-tight text-muted-foreground">
            A timeline of my academic and professional journey.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-20">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-foreground">
            <span className="h-8 w-4 bg-primary block" />
            Experience
          </h3>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card
                key={exp.id}
                className="p-0 border-4 border-border rounded-none shadow-brutal bg-card flex flex-col md:flex-row overflow-hidden group hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                {/* Date Block */}
                <div className="bg-primary text-primary-foreground p-6 md:w-64 flex flex-col justify-center items-start md:border-r-4 md:border-border border-b-4 md:border-b-0 border-border">
                  <span className="text-sm font-black uppercase tracking-widest">{exp.period}</span>
                </div>
                
                {/* Content Block */}
                <div className="p-6 md:flex-1">
                  <h4 className="text-2xl font-black uppercase tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors">{exp.title}</h4>
                  <p className="text-lg font-bold text-muted-foreground mb-4">{exp.company}</p>
                  
                  <p className="text-foreground font-medium leading-relaxed mb-6 border-l-4 border-muted pl-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-foreground text-background font-black uppercase tracking-widest border-2 border-transparent group-hover:border-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-20">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-foreground">
            <span className="h-8 w-4 bg-primary block" />
            Education
          </h3>

          <div className="space-y-6">
            {education.map((edu) => (
              <Card
                key={edu.id}
                className="p-6 border-4 border-border rounded-none shadow-brutal bg-card hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary flex-shrink-0 flex items-center justify-center border-2 border-border shadow-brutal">
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <h4 className="text-xl font-black uppercase tracking-tight text-foreground">{edu.degree}</h4>
                      <span className="bg-foreground text-background px-3 py-1 font-black text-xs uppercase tracking-widest border-2 border-border shadow-brutal-sm">{edu.year}</span>
                    </div>
                    <p className="text-primary font-bold uppercase mb-2">{edu.school}</p>
                    <p className="text-sm font-medium text-muted-foreground border-t-2 border-border pt-2">{edu.details}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="mb-20">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-foreground">
            <span className="h-8 w-4 bg-primary block" />
            GitHub Activity
          </h3>
          <div className="border-4 border-border p-4 bg-card shadow-brutal">
            <GithubStats />
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-foreground">
            <span className="h-8 w-4 bg-primary block" />
            Skills
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="p-4 bg-card border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center text-center group cursor-default"
              >
                <span className="font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
