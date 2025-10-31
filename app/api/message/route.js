import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Define the type for your local message structure


// Initialize the OpenAI client with OpenRouter base URL and API Key
// Ensure OPENROUTER_SECRET_API_KEY is set in your .env file
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_SECRET_API_KEY, 
});

export async function GET(req) {
  try {
    
    const names = {
      mock: "Mock Interview", 
    };

    // 1. The full conversation history (local format: role, text)
    const mappedMessages = [
      // Introduction and Correction
      { role: 'assistant', text: "Hi. I'm Gina. Let's begin your topic-based mock interview." },
      { role: 'user', text: 'Hi, Zena. I’m ready.' },
      { role: 'assistant', text: "Actually, it's Juna, but no worries. I'm glad you're here. We'll be focusing on the topic of **cybersecurity**." },
      
      // Setting the context
      { role: 'assistant', text: 'To start, let’s assume you are interviewing for a Security Analyst role. Where would you like to begin in terms of topics?' },
      { role: 'user', text: 'I’d like to start with **Network Security Fundamentals**.' },
      
      // Technical Question 1
      { role: 'assistant', text: 'Excellent choice. Can you describe the primary difference between an **Intrusion Detection System (IDS)** and an **Intrusion Prevention System (IPS)**? And provide an example of when you would use one over the other.' },
      
      // Technical Response
      { role: 'user', text: 'Certainly. An **IDS** is purely a monitoring system; it detects suspicious activity, logs it, and generates alerts but takes no action. An **IPS**, however, is placed in-line with network traffic and actively works to stop the detected threat. I would use an IDS for passive traffic analysis and audit logging, like on a spanning port, but I would use an IPS at a network boundary to automatically block known attack signatures, like a common SQL injection attempt, before it reaches the web server.' },

      // Follow-up Question
      { role: 'assistant', text: 'That is a clear explanation. Now, can you briefly define the **CIA Triad** and why it’s foundational to security?' },
    ];







    // 2. TRANSFORM the local message array to the API's expected format (role, content)
    // This mapping ensures 'text' is correctly passed as 'content'
    const apiMessages = mappedMessages.map(msg => ({
        role: msg.role,
        content: msg.text, // Mapping 'text' to 'content'
    }));

    // 3. Define the Prompt (Instructions)
    // The prompt is updated with the user's requested, more explicit wording.
   const Prompt = `
You are an **${names.mock}** expert assistant. Summarize the **entire preceding mock interview between Juna (the interviewer) and the candidate** in a single, concise paragraph. 
Ensure the summary includes the interview topic (Cybersecurity) and the key concepts discussed.
Immediately following the summary, provide a one-sentence overview assessing the candidate's performance, focusing on the clarity, depth, and technical accuracy of their responses regarding the topics and also provide some suggestions.
Do NOT include reasoning steps or internal thoughts. 
Use plain, clear language.
`;
    // Call the OpenAI chat completions endpoint
    const completion = await openai.chat.completions.create({ 
      model: 'openai/gpt-3.5-turbo',
      messages: [
       
        ...apiMessages, 
        
    
        {
          role: 'user',
          content: Prompt,
        },
      ],
      temperature: 0.1, // Low temperature for factual summarization
    });
    
    
    return NextResponse.json({ 
        content: completion.choices[0].message.content 
    });
  } 
  
  catch (error) {
    console.error('Error generating summary:', error);
    // Return a 500 status code on error
    return NextResponse.json(
        { error: 'Failed to generate summary' }, 
        { status: 500 }
    );
  }
}
