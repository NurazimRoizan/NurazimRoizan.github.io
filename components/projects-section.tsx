"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import ProjectModal from "./project-modal"

interface Project {
  id: number
  title: string
  description: string
  overview: string
  workingPrinciple?: string
  lessons: string
  tags: string[]
  image: string
  github?: string
  live?: string
  features: string[]
  duration: string
  role: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Dissertation Project: Graph Theory Visualization Tool",
    description: "This project involves developing an interactive interface to visualize the bijective k-Pebble game and the k-Weisfeiler- Leman algorithm, enabling users to explore and understand graph isomorphism – a fundamental problem in computer science with applications in areas such as network analysis and pattern recognition.",
    overview: "My dissertation project addressed the significant learning challenges presented by advanced graph theory concepts focusing on graph isomorphism. I designed and implemented an interactive desktop application aimed at making these complex topics more accessible and tangible to learners. \n The primary objective was to create a visualization tool that could clearly demonstrate the 1-dimensional Weisfeiler-Leman (1-WL) algorithm and simulate the k-Pebble Game. A key focus was to visually explain the theoretical link between these two concepts, showing how the stable colouring from the 1-WL algorithm informs a winning strategy for the 'Duplicator' in the 2-Pebble Game.",
    lessons: "This project was a deep dive into both software design and pedagogical principles. It reinforced my skills in object-oriented programming with Java and my ability to build a complex application from conception to evaluation of graph theory. Furthermore, it demonstrated the potential of interactive visualization to demystify abstract algorithms and make them more tangible. The positive feedback from manual testing highlighted the tool's value as a pedagogical aid, confirming that a well-designed visualization can significantly improve comprehension of advanced academic topics.",
    tags: ["Java", "Graphstream", "Swing", "Graph Theory"],
    image: "/dissertation-cr.png",
    github: "https://github.com/NurazimRoizan/dissertation-com3610",
    features: [
      "Standalone Desktop Application",
      "Integrated Theoretical Visualization",
      "Configurable k-Pebble Game Simulation",
      "Interactive 1-Dimensional Weisfeiler-Leman (1-WL) Algorithm",
    ],
    duration: "Individual Project",
    role: "Author",
  },
  {
    id: 2,
    title: "Internet of Things - UnPhone",
    description: "Developed a custom game controller using a Wi-Fi-enabled ESP32 device, which sends a “jump” command to a game server via HTTP GET requests. The controller features both a gesture-based input using its onboard IMU (accelerometer/gyroscope) and a physical button press, with a custom UI screen to manage the input state.",
    overview: "This project was a deep dive into embedded systems, combining hardware and software to create a custom game controller from an Unphone device. The goal was to build an unconventional input device for a simple web-based game, showcasing the Unphone's capabilities for sensor integration, custom UI, and network communication. \n The controller provides two distinct ways for a player to 'jump': a physical button press, and a more intuitive gesture using the device's onboard accelerometer and gyroscope. When either action is detected, the Unphone sends a command to a game server running on a local PC, bringing the physical and digital worlds together.",
    workingPrinciple:"The magic happens when a player makes a flicking motion with the Unphone. The firmware constantly reads data from the IMU, and when a combination of acceleration and angular velocity thresholds are met, it recognizes the gesture as a 'jump.' \n This is a more immersive and physical way to play, moving beyond a simple button press. A custom menu screen, 'DinoGame Controller,' was added to the Unphone's interface, with a player number displayed for visual feedback. The flick-to-jump feature is intelligently activated only when this screen is active, preventing accidental triggers. For a more traditional experience, a dedicated physical button on the Unphone can also be used to send the jump command. \n The project also includes a small, playful feature for fun: a 'TV Remote' function using the device's infrared capabilities to send a power signal.",
    lessons: "This project was a fantastic exercise in integrating multiple systems—hardware, firmware, and networking—to create a unified, interactive experience. It reinforced the importance of careful sensor calibration, state management, and debugging in an embedded environment, particularly when dealing with physical inputs and network dependencies. It's also worth noting that this is just a small glimpse into the Unphone's capabilities; there is a whole lot more fun to be explored with this device.",
    tags: ["C++", "Embedded Systems", "ESP32-S3", "Arduino", "unPhone"],
    image: "/dinoGameUI.jpeg",
    features: [
      "Embedded C++ & Custom Firmware",
      "Dual-Input Custom Game Controller",
      "Sensor-Driven Input",
      "IoT Network Communication",
      "Custom UI Development",
    ],
    duration: "Duo Project",
    role: "Lead Project",
  },
  {
    id: 3,
    title: "Research Paper - CRYSTALS-Kyber Algorithm",
    description: "Researched and documented the CRYSTALS-Kyber (ML-KEM) algorithm, a lattice-based Post-Quantum Cryptography solution. The paper covers the quantum threat to current cryptography, the algorithm’s operational mechanics, and its security profile as a NIST standard.",
    overview: "This research paper, completed for the COM3109 module, investigates the critical need for Post-Quantum Cryptography (PQC) in the face of quantum computing's threat to current public-key encryption standards like RSA. The project focuses specifically on CRYSTALS-Kyber, a lattice-based key encapsulation mechanism (KEM) selected as a standard by the National Institute of Standards and Technology (NIST). \n My work provides a comprehensive overview of the Kyber algorithm, from its foundational principles to its practical applications in securing future communications.",
    lessons: "Writing this paper was a valuable exercise in understanding the intricate details of modern cryptography and the future of cybersecurity. It provided a deep insight into the practical application of complex mathematical problems to secure data, as well as the rigorous process of standardization by organizations like NIST. The project reinforced my ability to research a highly technical subject, synthesize complex information, and present it clearly and logically.",
    tags: ["Quantum Cryptography", "Cybersecurity", "RnD", "Algorithm"],
    image: "/UoSLogo.png",
    features: [
      "The Quantum Threat: The paper establishes the motivation for PQC by explaining how Shor's algorithm can efficiently break classical cryptographic systems, highlighting the urgent need for new security standards.",
      "Algorithmic Breakdown: I detail the core components of the Kyber algorithm, including key generation, encapsulation, and decapsulation. This involves explaining how it uses cryptographic hashing and pseudorandom functions to create a secure key exchange.",
      "Security Analysis: The research explores Kyber's security properties, focusing on the IND-CCA2 security notion it achieves. The paper discusses how its security is based on the computational hardness of the Module-LWE problem and the performance trade-offs of its various parameter sets (Kyber-512, -768, -1024).",
    ],
    duration: "Individual Coursework",
    role: "Author",
  },
  {
    id: 4,
    title: "Internet of Things - GeeyBoard",
    description: "Developed a custom Bluetooth Low Energy (BLE) Human Interface Device (HID) and an integrated Infrared (IR) remote, turning the Unphone device into a highly versatile, single-handed control unit. The primary design goal was maximizing comfort and control from the sofa.",
    overview: "This project was focused on creating a multi-tool controller that eliminates the need for reaching for a keyboard, mouse, or TV remote while deep in a couch session. It shifts the focus from Wi-Fi communication to the much more reliable and power-efficient Bluetooth Low Energy (BLE) standard. The controller masquerades as a standard Bluetooth keyboard, allowing seamless control over a PC, tablet, or smart TV. \n The device integrates two key functions: a custom, single-handed keyboard optimized for media controls (like Windows Key and Arrows) and an integrated IR blaster to handle line-of-sight remote functions (like turning the TV on or off).",
    workingPrinciple:"The magic lies in combining the most-used controls into a single, intuitive device. Instead of a full keyboard, the GeeyBoard provides only the essentials for navigation and media control, with keys like the Windows key (for opening menus or search) and directional arrows being primary inputs. \n The true 'sloth mode' feature is the Force Reconnect button. If I pair the Unphone to my PC and then want to switch to my tablet without getting up, I simply hit the mode-switcher button. The Unphone instantly broadcasts itself for pairing again, eliminating the need to physically interact with the ESP32. \n The project also includes a critical, secondary function: a 'TV Power Off' button utilizing the IR transmitter. This ensures that even the final act of ending the binge session—turning off the television—can be performed without ever leaving the gravitational pull of the sofa.",
    lessons: "This project was an excellent lesson in the complexities of the BLE stack, particularly focusing on device reliability and power state management. It reinforced the importance of using the extern keyword for global object definitions and ensuring that the BLE thread has enough time in the main loop() (via a small delay) to prevent the advertising routine from stalling. The integration of two separate wireless technologies (BLE and IR) into one cohesive user interface was a rewarding exercise in embedded system multitasking and state transition logic.",
    tags: ["C++", "C", "Arduino", "Embedded Systems", "Open Source", "unPhone", "ESP32-S3"],
    image: "/keyboardUI.jpg",
    github: "https://github.com/NurazimRoizan/GeeyBoard",
    features: [
      "BLE HID Emulation (NimBLE): The core challenge involved implementing the Human Interface Device (HID) profile over BLE using the NimBLE stack. This required deep knowledge of the protocol to ensure the Unphone was recognized as a reliable input device (Keyboard) across Windows, Linux (like BunsenLabs), and Android/iOS.",
      "Connection State Management: I implemented logic to manually manage the BLE connection state. This included detecting if the device was connected and, crucially, using a dedicated button to force a disconnect and restart BLE advertising (bleKeyboard.end() followed by bleKeyboard.begin()), solving the common problem of switching between host devices without a hard reset. ",
      "Infrared (IR) Protocol Implementation: I integrated the IRremoteESP8266 library to enable infrared transmission, mapping a button press to a specific IR protocol (e.g., NEC, SONY) and command code. This requires careful configuration of the IR LED pin and protocol details.",
      "Custom Key Mapping: I mapped essential, non-character keys—like KEY_LEFT_GUI (Windows/Super Key) and the directional arrow keys (KEY_UP_ARROW, KEY_DOWN_ARROW)—to the custom touch clusters, creating a highly specific control experience.",
      "Embedded C++ & Firmware Development: The entire control logic is written in Embedded C++ for the ESP32. This includes advanced C++ techniques essential for embedded systems",
    ],
    duration: "Hobby Project",
    role: "Author",
  },
  {
    id: 5,
    title: "Progressive Web Application - PiYak",
    description: "A Progressive Web App (PWA) for tracking your period cycle and poop counter. I built this to avoid the constant ads and $2 subscription fees of other mobile trackers. Data is saved simply and freely using the Google Forms API.",
    overview: "This project was focused on creating a Progressive Web App (PWA) to provide a clean, secure, and ad-free alternative to bloated commercial mobile trackers for essential health metrics: menstrual cycles and bowel movements (poop counter). The motivation was to build a zero-cost, accessible platform, eliminating the common requirement for users to pay subscriptions or view excessive advertising just to log simple bodily functions. The application leverages the simplicity and ubiquity of Google Forms as a dedicated API endpoint for all data ingress, storing user data securely in a connected Google Sheet. A key feature is the ability to securely fetch and display anonymized tracking data from friends, fostering community engagement and comparative health insights without compromising individual privacy.",
    workingPrinciple:"This project was focused on creating a Progressive Web App (PWA) to provide a clean, secure, and ad-free alternative to bloated commercial mobile trackers for essential health metrics: menstrual cycles and bowel movements (poop counter). The motivation was to build a zero-cost, accessible platform, eliminating the common requirement for users to pay subscriptions or view excessive advertising just to log simple bodily functions. \n The application leverages the simplicity and ubiquity of Google Forms as a dedicated API endpoint for all data ingress, storing user data securely in a connected Google Sheet. A key feature is the ability to securely fetch and display anonymized tracking data from friends, fostering community engagement and comparative health insights without compromising individual privacy.",
    lessons: "This project was an excellent demonstration of 'API-les' data architecture and leveraging common web services for simple data storage. It reinforced the importance of PWA Service Worker lifecycle management for guaranteed offline functionality. Most importantly, it provided hands-on experience in client-side data sanitation and anonymization logic to implement a privacy-focused social feature, ensuring that while the data is communal, the individual identity and specific entries remain protected.",
    tags: ["Vanilla Javascript", "HTML", "CSS", "Git"],
    image: "/piyakIcon.png",
    github: "https://github.com/NurazimRoizan/PiYak",
    live: "https://nurazimroizan.github.io/PiYak/",
    features: [
      "Progressive Web App (PWA) Implementation",
      "Zero-Cost, Serverless Backend",
      "Community Data Feature",
      "Clean Front-End Development",
    ],
    duration: "Hobby Project",
    role: "Author",
  },
  {
    id: 6,
    title: "Makam Designer - Design Your Gravestone",
    description: "Create a dignified and personalized batu nisan with our futuristic customization tool. Honor your loved ones with thoughtfully designed memorials.",
    overview: "Create a dignified and personalized batu nisan with our futuristic customization tool. Honor your loved ones with thoughtfully designed memorials.",
    lessons: "New challenge for learning 3D",
    tags: ["Three.js", "Node.js", "TypeScript", "TailwindCSS", "React"],
    image: "/makamEx.png",
    github: "https://github.com/muazsazelim/tanahkubur",
    features: [
      "Custom 3D Design Panel Implementation",
      "Full Customization Capabilities",
      "Modern Stack Integration",
      "Collaborative Development",
    ],
    duration: "Duo Project",
    role: "3D Designer",
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of my best work showcasing my skills in full-stack development, design, and problem-solving.
              Click on any project to learn more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group overflow-hidden border-cyan-400/20 hover:border-cyan-400/50 bg-secondary/30 hover:bg-secondary/60 transition-all duration-300 backdrop-blur-sm glow-border cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 bg-secondary">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {(project.github || project.live) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors"
                          >
                            <Github size={18} className="text-cyan-400" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 transition-colors"
                          >
                            <ExternalLink size={18} className="text-cyan-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
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

      {isModalOpen && selectedProject && (
        <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
      )}
    </>
  )
}
