import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ExpertLists } from '../../../services/options';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey:process.env.OPENROUTER_SECRET_API_KEY, 
});




export async function POST(req: Request) {
  try {
    const { coachingOptions, messages } = await req.json();

    const option = ExpertLists.find((item) => item.name === coachingOptions);


   const Prompt = `${option?.summaryPrompt}
provide some suggestions.
Do NOT include reasoning steps or internal thoughts. 
Use plain, clear language.
`;
 

 const apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.text, // Mapping 'text' to 'content'
    }));
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
 