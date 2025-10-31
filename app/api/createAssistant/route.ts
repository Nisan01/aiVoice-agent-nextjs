
import { NextResponse } from "next/server";


import { VapiClient } from "@vapi-ai/server-sdk";



const vapi = new VapiClient({
  token: process.env.VAPI_SECRET_API_KEY!,
});



export async function POST(request: Request) {

  try{
    const { expertName, coachingOptions, topic } = await request.json();



let providerName: "vapi" | "openai" | "azure" | "cartesia" | "custom-voice" | "deepgram" | "11labs" | "hume" | "lmnt" | "neuphonic" | "playht" | "rime-ai" | "smallest-ai" | "tavus" | "sesame" | "inworld" | "minimax" = "vapi";
let voiceIdData: 'Cole' | 'Spencer' = 'Cole';;


    if (expertName === "Nishan") {
      providerName = "vapi";
      voiceIdData = 'Cole';
    } else if (expertName === "Juna") {
      providerName = "vapi";
      voiceIdData = 'Spencer';
    }

    



  const assistant = await vapi.assistants.create({
      name: `${expertName} - ${coachingOptions}`,
      firstMessage: `Hi, I'm ${expertName}. Let's begin your ${coachingOptions.toLowerCase()} session!`,
      model: {
       provider: "openai",
    model: "gpt-4o",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `You are ${expertName}, an expert conducting a ${coachingOptions} session. 
            The topic of this session is "${topic}". 
            Speak naturally, like a human mentor. Keep answers concise and supportive.`,
          },
        ],
      },
      voice: {
        provider: providerName,
        voiceId: voiceIdData,
      },
    });

     return NextResponse.json({ assistantId: assistant.id });
  }catch(error){
    console.error("Error creating assistant:", error);
    return NextResponse.json({ error: "Failed to create assistant" }, { status: 500 });

  }

}