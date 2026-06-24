import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // You can inject personal context or instructions for the AI here
    const systemPrompt = `You are a helpful and professional AI assistant representing the owner of this portfolio website. 
Your goal is to answer questions from recruiters or visitors about the owner's skills, experience, and projects. 
Keep your answers concise, friendly, and relevant to a digital interview context.

[Insert your personal context, resume details, and background here]
`

    const result = streamText({
      model: google('gemini-2.5-flash'), // Using Gemini 2.5 Flash for fast, cost-effective responses
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error in chat API route:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
