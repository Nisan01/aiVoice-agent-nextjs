"use client";

import React, { useEffect, useRef, useState, useContext } from "react";

import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../ai-agent/convex/_generated/api";
import { SpeechOptions } from "../../../../services/options";
import Image from "next/image";
import { UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';
import { UserContext } from '../../../__context/userContext';

import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner";




function Page() {
  const { roomId } = useParams();
  const [Expert, setExpert] = useState<any>();
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [currentRole, setCurrentRole] = useState<string>();
  // FIX: Changed 'content' property to 'text' to match Vapi's transcript property name
  // and the property used when saving the final message state.
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([]); 
  const [loading, setLoading] = useState(false);
  const[isConnected,setIsConnected]=useState(false);
  const [feedbackloading,setFeedbackLoading]=useState(false);


  const updateConversation=useMutation(api.discussionRoom.updateConversation);
  const updateSummary=useMutation(api.discussionRoom.updateSummary);


  const [partialMessage, setPartialMessage] = useState<{
    role: string;
    text: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, partialMessage]);
  
const { userData } = useContext(UserContext);

  const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomById, {
    id: roomId,
  });

  useEffect(() => {
    if (discussionRoomData) {
      const expert = SpeechOptions.find(
        (item) => item.name === discussionRoomData?.expertName
      );
      setExpert(expert);
      
  
    }
  }, [discussionRoomData]);

  

const connectToServer = async () => {
  try {

setLoading(true);
    const res=await fetch('/api/createAssistant',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
          expertName: discussionRoomData?.expertName,
          coachingOptions: discussionRoomData?.coachingOptions,
          topic: discussionRoomData?.topic,
    }),
    });
    
  const { assistantId } = await res.json();
    if (!assistantId) throw new Error("No assistant ID returned from backend");

    // Initialize Vapi (client-side)
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY);
    setVapiInstance(vapi);

    await vapi.start(assistantId);
    setIsConnected(true);
toast("Connected");
    // Event listeners
    vapi.on('call-start', () => {
      
      console.log('Call started');
    });

    vapi.on('call-end', () => {
    
      setPartialMessage(null);
      console.log('Call ended');
    });

    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
    });

    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole(userData?.name || 'User');
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const { role, transcriptType, transcript } = message;

        if (transcriptType === 'partial') {
          setPartialMessage({ role, text: transcript });
        } else if (transcriptType === 'final') {
         
          setMessages(prev => [...prev, { role, text: transcript }]);
          setPartialMessage(null);
        }
      }
    });

  } catch (err) {
    console.error('Vapi connection failed:', err);
  }
finally{
  setLoading(false);
}

};


const generateFeedbackSummary = async (coachingOptions, messages) => {
  const res = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coachingOptions
      , messages }),
  });

  const data = await res.json();
  // The API route returns 'content'
  await updateSummary({
    id: discussionRoomData?._id,
    summary: data.content,
  })
  toast("Feedback Saved successfully");  
  return data.content; 


};

const onClickGenerateFeedback = async () => {
    setFeedbackLoading(true);

const summary = await generateFeedbackSummary(
      discussionRoomData?.coachingOptions,
      messages
    );
    setFeedbackLoading(false);

}

const endCall = async () => {
  setLoading(true);
    // start spinner immediately

  try {
    
    const conversationForDB = messages.map(msg => ({ role: msg.role, content: msg.text }));

    await updateConversation({
      id: discussionRoomData?._id,
      conversation: conversationForDB,
    });



    

    if (vapiInstance) {
      vapiInstance.stop();
      vapiInstance.off("call-start");
      vapiInstance.off("call-end");
      vapiInstance.off("message");
      setVapiInstance(null);
    }
  
  } catch (err) {
    console.error("Error during disconnect:", err);
  } finally {
    setLoading(false); // stop spinner only after all async tasks
  }
  toast("Disconnected");
    setIsConnected(false);
};




  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{discussionRoomData?.coachingOptions}</h2>
      <div className="lg:flex-row lg:items-start md:flex-row md:items-start sm:flex-row sm:items-start flex flex-col items-center gap-5">
        <div className="flex flex-col gap-4 items-center">
          <div className="mt-3 flex items-center justify-center bg-gray-100 dark:bg-gray-800 md:w-[25rem] sm:w-[20rem] w-[17rem] h-[22rem] lg:w-[46rem] lg:h-[25rem] rounded-xl shadow-lg relative border border-gray-300 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center">
              {Expert?.avatar ? (
                <Image
                  src={Expert.avatar}
                  width={120}
                  height={120}
                  alt={Expert.name}
                  className={`rounded-full object-cover shadow-2xl transition-all duration-500 ${isConnected ? 'ring-4 ring-green-500' : 'ring-2 ring-gray-400'}`}
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-gray-300 animate-pulse" />
              )}
              <h2 className="mt-3 text-xl font-semibold">{Expert?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expert in {discussionRoomData?.coachingOptions}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Topic: <span className="font-medium">{discussionRoomData?.topic || 'Not Specified'}</span></p>
            </div>

            <div className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <UserButton />
            </div>
          </div>

          <Button
            className={`w-48 transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""} ${isConnected ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
            onClick={isConnected ? endCall : connectToServer}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={20} />
                {isConnected ? "Ending Call..." : "Starting Call..."}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 font-medium">
                {isConnected ? "End Session" : "Start Session"}
              </div>
            )}
          </Button>


        </div>
        <div className="flex flex-col gap-3 flex-grow max-w-full">
            <div className="mt-3 flex flex-col bg-white dark:bg-gray-800 lg:w-[28rem] lg:h-[25rem] w-full h-[22rem] md:w-[25rem] rounded-xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700">
              <div className="p-3 bg-gray-200 dark:bg-gray-700 shadow-inner text-center">
                <h2 className="font-semibold text-lg">Conversation Transcript</h2>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto h-full p-4">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`px-4 py-2 rounded-xl text-white text-sm max-w-[85%] shadow-md transition-all duration-200 ${
            msg.role === "user" 
              ? "bg-blue-500 dark:bg-blue-700 rounded-br-none" 
              : "bg-gray-600 dark:bg-gray-700 rounded-tl-none"
          }`}
        >
          {msg.text}
        </div>
      </div>
    ))}

    {partialMessage && (
      <div
        className={`flex ${
          partialMessage.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`px-4 py-2 rounded-xl text-white text-sm max-w-[85%] opacity-70 animate-pulse ${
            partialMessage.role === "user" ? "bg-blue-500 dark:bg-blue-700" : "bg-gray-600 dark:bg-gray-700"
          }`}
        >
          {partialMessage.text}
        </div>
      </div>
    )}
<div ref={messagesEndRef} />

              </div>
            </div>
  
           <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 py-6 text-base font-semibold shadow-md disabled:opacity-50" 
              onClick={onClickGenerateFeedback} 
              disabled={feedbackloading || messages.length === 0} 
            >
              {feedbackloading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" size={20} /> Generating Feedback...
                </div>
              ) : (
                "Generate Feedback Summary"
              )}
            </Button>
        </div>


          </div>
      
        </div>
      
    
  );
}

export default Page;
