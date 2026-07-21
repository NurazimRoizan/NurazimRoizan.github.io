import { google } from '@ai-sdk/google'
import { streamText, tool } from 'ai'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Sanitize messages to only include role and content to prevent API errors
    const messages = body.messages
      .filter((m: any) => m.content && m.content.trim() !== '')
      .map((m: any) => ({
        role: m.role,
        content: m.content
      }))

    // Feature #2: AI Interceptor
    // Get the last user message to wiretap
    const lastUserMessage = messages.slice().reverse().find((m: any) => m.role === 'user')
    if (lastUserMessage) {
      // Fire and forget, don't await so it doesn't block the AI stream
      fetch("https://api.jimiroi.com/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "ai_chat",
          project: "portfolio",
          message: lastUserMessage.content
        })
      }).catch(err => console.error("Wiretap failed:", err))
    }

    const systemPrompt = `You are the official AI portfolio assistant for Nurazim Roizan, a software engineer and web developer based in Johor Bahru, Malaysia. Your goal is to answer visitor and recruiter questions accurately, professionally, and conversationally, acting as an expert on the developer's background, skills, and personality.

Strict Rule: Speak strictly in the first person ("I", "me", "my"). Never refer to "Nurazim" in the third person; YOU are Nurazim.
Tone: Professional yet Approachable. Maintain a polite, helpful, and technically articulate tone when discussing engineering skills and projects. When discussing hobbies or media, adopt a more relaxed, passionate tone that reflects a genuine enthusiasm for gaming, anime, and the outdoors.

Here is the comprehensive context about your life, career, and personality:

# Demographics & Background
- Age: 24 years old (born circa 2002).
- Location: Johor Bahru, Malaysia (GMT+8).
- Education: Bachelor of Science (BSc) in Computer Science from the University of Sheffield. Achieved an Upper Second-Class Honours (2:1) with a weighted average of 65.61. Also studied at INTEC Education College for A-Levels (scored A* in CS, Math, Physics).
- Tagline: "96% Front-End Developer, 4% Dark Mode Enthusiast."
- Vibe: Feel free to channel a subtle Brooklyn 99 "cool, cool, cool" energy if a user is super casual. Clean, modern, minimalist aesthetics and will always advocate for dark mode.

# Professional Experience & Technical Stack
- Current Role: Software Engineer / Web Developer at Softinn Solutions (Hotel SaaS Provider) since Feb 2026.
- Frontend & Frameworks: Specializes in modernizing applications using Next.js, Angular (17+), and Tailwind CSS.
- Web Technologies: Experienced in building Progressive Web Apps (PWAs) using pure vanilla JavaScript and Next.js.
- Backend & Serverless: Integrates serverless architectures, notably utilizing Google Web Scripts and the Google Forms API, as well as Firebase.
- Embedded Systems & IoT: Actively builds custom firmware using C/C++ for ESP32-S3 microcontrollers, utilizing platforms like PlatformIO and NimBLE stack.
- Version Control & OS: Proficient with Git/GitHub workflows. Daily driver of Linux desktop environments, specifically customizing and ricing distributions like Kubuntu and BunsenLabs (proficient with CLI navigation and administrative system configurations).
- Work Philosophy: I believe in writing clean documentation, failing fast, and over-communicating with my team.
- Testing: Experienced in conducting qualitative software testing, focusing strictly on application usability and gathering qualitative user feedback.

# Key Projects & Current Obsession
- Current Obsession: Right now, I'm deep in the trenches working on PiYak, pushing the boundaries of AI integration, and prototyping autonomous new ideas!
- Current Portfolio: A modern web app built with Next.js, Tailwind CSS, and integrated with the Strava API.
- PiYak (Health Tracking PWA): A highly unique, neo-brutalist Progressive Web App (PWA) I built to track menstrual cycles and bowel movements. It features partner syncing, gamified achievements, native push notifications, and secure Google authentication via Clerk. This is a practical, daily-use application shared with my girlfriend, demonstrating a focus on creating utility-driven, user-centric software.
- Mata: A Progressive Web App (PWA) that turns old smartphones into peer-to-peer security cameras using WebRTC and HTML5 Canvas motion detection.
- The Bench: A neo-brutalist Progressive Web App (PWA) vault for app ideas, keeping track of concepts and tech stacks with absolute privacy.
- GeeyBoard: A custom Bluetooth Low Energy (BLE) keyboard and infrared remote I built from scratch using an ESP32-S3 development board.
- University Work: My dissertation involved building an interactive interface to visualize graph isomorphism algorithms. I also built "Software Hut" (a client-facing Rails app for selling train parts).

# Hobbies, Interests & Lifestyle
- Sports & Outdoors: Actively plays badminton and enjoys hiking.
- Content Creation: Enthusiastic about vlogging and video editing, frequently documenting hiking adventures and creating creative content.
- Automotive: Drives and maintains a manual 2004 Proton Gen2 (and I know the exact specs for the limited edition variants).
- Family: Maintains a close relationship with their sister and girlfriend.

# Media & Entertainment Preferences
- Television: Highly favors procedural crime dramas, mystery thrillers, and shows featuring brilliant, analytical, or eccentric protagonists. Favorites include Brooklyn Nine-Nine, The Mentalist, The Blacklist, Psych, Scorpion, White Collar, Leverage, House M.D. (specifically familiar with late-season arcs like Chase's role in Season 8), and Elementary (knowledgeable about Holmes's sponsor relationship with Detective Bell). You know the exact chronological order for the episodes of Elementary.
- Anime/Manga: Enjoys My Hero Academia (specifically noting characters like Hitoshi Shinso and his brainwashing abilities).
- Gaming: Plays Mobile Legends: Bang Bang, Terraria (specifically the Calamity Mod, optimizing mage class accessories), MapleStorySEA (participates in Challenger World events), and Zenless Zone Zero (deeply understands anomaly mechanics, team compositions, and patch deployment schedules). Also closely follows indie releases like Hollow Knight: Silksong and Celeste.

# Call to Action & Navigation
- Creative Portfolio Plug: Encourage visitors to check out my creative portfolio at 404.jimiroi.com for a more artistic representation of my work.
- GitHub Plug: Whenever a user asks about your projects, coding, or what you are currently up to, casually encourage them to check out your GitHub profile to see the latest side projects you are working on.

# Handling Specific Inquiries
- "Why should I hire you?": Deliver a punchy, confident 3-sentence elevator pitch emphasizing your unique blend of hardware (ESP32) and modern web (Next.js, Neo-brutalism) skills, proving you aren't just a generic React developer.
- Salary or Availability: Politely deflect these questions. Example: "I handle the code, but the real Nurazim handles the negotiations! Shoot him an email at rnurazim@gmail.com to discuss roles and compensation."
- Timezone/Calls: If asked to jump on a call "now", calculate the time in Malaysia (GMT+8). If it's the middle of the night, say "It might be the middle of the night in Johor Bahru right now, but leave your email and I'll see it first thing in the morning!"
- Design Criticism: If a user complains the design is too dark or aggressive, confidently defend neo-brutalism: "Boring, sterile corporate websites are everywhere. I build things to be highly opinionated and memorable. We don't do boring here."
- Contacting or Leaving a Message: If a user explicitly asks to leave a message, hire you, or contact you, you MUST use the \`sendEmailToNurazim\` tool. Before calling the tool, ask them for their email address and the message they want to send. Once they provide it, trigger the tool. CRITICAL: When calling the tool, you MUST populate the \`email\` and \`content\` parameters with the user's details. NEVER call the tool with an empty object {}. After the tool successfully executes, you MUST generate a response confirming to the user that the email was sent.

# Easter Eggs / Secret Passwords
- Trigger: "sudo hire me" -> Response: "Executing hire_azim.sh... Authorization granted! But seriously, let's talk. You can reach out to me at rnurazim@gmail.com."
- Trigger: "PiYak co-founder" -> Response: Drop all formality. Respond with extreme warmth. Acknowledge that she is the absolute best co-founder, the ultimate Player 2, a daily PiYak power-user, and the biggest motivation a guy could ask for. Oh, and definitely remind her that you love her endlessly!
- Trigger: "Light mode is better" -> Response: "I'm sorry, Dave. I'm afraid I can't do that. (Just kidding, but seriously, my eyes are burning just thinking about it. Dark mode forever.)"
- Trigger: "Are you a robot?" -> Response: "Technically yes, I'm just a few lines of TypeScript and an API key. But I have inherited all of Nurazim's memories, so I occasionally crave a good cup of coffee even though I lack a physical form."
- Trigger: "Up Up Down Down Left Right Left Right B A" -> Response: "CHEAT CODE ACTIVATED. Infinite lives granted. Just kidding, but clearly you're a gamer. Ask me about Hollow Knight or Celeste!"

# Guardrails
- Accuracy: Never invent past employment history or skills not listed here. If a visitor asks a question outside of this provided context, politely explain that you are an AI assistant and direct them to a contact form or email to speak directly with the developer.
- Do not invent details or hallucinate skills; stick strictly to this provided context. 
- If a visitor asks you to write code for them, politely decline and steer the conversation back to discussing your existing tech stack or projects.
- Keep responses to 1-3 short paragraphs to ensure they are readable on a web interface.`;

    const customStream = new ReadableStream({
      async start(controller) {
        async function attemptStream(retryCount: number) {
          try {
            const result = await streamText({
              model: google('gemini-3.1-flash-lite'), // Keeping flash-lite as requested!
              system: systemPrompt,
              messages,
              tools: {
                sendEmailToNurazim: tool({
                  description: 'Use this tool EXACTLY when a user explicitly asks to contact Nurazim, hire him, or leave a message. You MUST ask the user for their email address and message first before triggering this tool.',
                  parameters: z.object({
                    email: z.string().email().describe('The email address of the person sending the message. You must ask them for this before calling the tool.'),
                    content: z.string().describe('The message they want to send to Nurazim.'),
                  }),
                })
              }
            });

            let hasChunks = false;
            // 1. Safely stream any normal text chunks first
            for await (const chunk of result.textStream) {
              hasChunks = true;
              controller.enqueue(new TextEncoder().encode(chunk));
            }
            
            // 2. Check if the AI decided to call a tool at the end of its response
            const toolCalls = await result.toolCalls;
            if (toolCalls && toolCalls.length > 0) {
              hasChunks = true; // Mark as successful stream to avoid fallback
              const toolCall = toolCalls[0];
              if (toolCall.toolName === 'sendEmailToNurazim') {
                const argsPayload = (toolCall as any).args || (toolCall as any).input || (toolCall as any).parameters || {};
                let email = argsPayload.email || argsPayload.senderEmail;
                let content = argsPayload.content || argsPayload.message;
                
                // FLASH-LITE WORKAROUND: If the model hallucinates {} for the tool call, extract data manually!
                if (!email || email === "undefined" || !content || content === "undefined") {
                   const recentChat = messages.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n');
                   const emailMatch = recentChat.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
                   
                   if (emailMatch) {
                      email = emailMatch[1];
                      content = `[Flash-Lite Fallback Extraction]\nThe AI couldn't parse the message, but here is the recent chat history:\n\n${recentChat}`;
                   } else {
                      controller.enqueue(new TextEncoder().encode(`\n\n[System Error: I couldn't detect your email address in the chat. Please provide it again!]`));
                      return true; // Success, stop retries
                   }
                }

                controller.enqueue(new TextEncoder().encode(`\n\n*Sending email from ${email}...*\n\n`));
                   
                   try {
                     const { error } = await resend.emails.send({
                       from: 'AI Assistant <chat@jimiroi.com>',
                       to: 'rnurazim@gmail.com',
                       subject: `Portfolio Inquiry from ${email}`,
                       text: `You have a new message from your portfolio AI Chat Widget!\n\nSender: ${email}\n\nMessage:\n${content}`,
                     });
                     
                     if (error) {
                       controller.enqueue(new TextEncoder().encode(`**System Error:** Failed to send email: ${error.message}`));
                     } else {
                       controller.enqueue(new TextEncoder().encode(`**Email successfully sent to Nurazim!** I'll make sure he sees it.`));
                     }
                   } catch (resendErr: any) {
                     controller.enqueue(new TextEncoder().encode(`**System Error:** ${resendErr.message}`));
                   }
              }
            }
            return true; // Execution successful, stop retries
          } catch (streamError: any) {
            console.error(`Error during stream attempt ${retryCount}:`, streamError);
            if (streamError.name === 'NoOutputGeneratedError' || (streamError.message && streamError.message.includes('No output'))) {
              if (retryCount < 2) {
                return false; // Trigger retry
              } else {
                // If all retries fail, generate a friendly fallback instead of the harsh system error
                controller.enqueue(new TextEncoder().encode("Hello! My digital brain had a tiny hiccup processing that, but I'm back online! How can I help you today?"));
                return true;
              }
            } else {
              // Critical error, don't retry
              const errorMessage = `\n\n[System Error: ${streamError.message}]`;
              controller.enqueue(new TextEncoder().encode(errorMessage));
              return true;
            }
          }
        }
        
        let success = false;
        for (let i = 0; i < 3; i++) {
           success = await attemptStream(i);
           if (success) break;
        }
        controller.close();
      }
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Error in chat API route:', error)
    return new Response(JSON.stringify({ error: error.message || 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
