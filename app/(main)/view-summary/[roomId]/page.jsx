
"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from "convex/react";
import moment from 'moment';

import Image from 'next/image';

import { api } from '../../../../ai-agent/convex/_generated/api';
import { ExpertLists} from '../../../../services/options';
import Summary from '../_components/page';

function View_Summary() {

const{roomId}=useParams();

  const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomById, {
    id: roomId,
  });

 const getAbstractImages = (option) => {
 
    if (!option) return null; 
    
    const images = ExpertLists.find((item) => item.name === option);
 
    return images?.icon || null; 
  }

  const images = getAbstractImages(discussionRoomData?.coachingOptions);
   const conversation = discussionRoomData?.conversation || [];

  return (
    <div>
      
    {images &&(
  <div className='flex flex-col   gap-4'>
    
      <div className='flex items-center gap-4'>
      <Image src={getAbstractImages(discussionRoomData?.coachingOptions)} width={50} height={50} alt='icon' className=' rounded-full object-center w-[3.5rem]  h-[3.8rem] ' />
    
       <div className=''>
        <h2 className='font-bold text-gray-600'>{discussionRoomData?.topic}</h2>
        <h2>{discussionRoomData?.coachingOptions}</h2>
        <h2 className='text-sm text-gray-400'>{moment(discussionRoomData?._creationTime).fromNow()}</h2>
      </div>
      </div>
     
<div className='flex-row   gap-3 lg:flex  md:flex sm:flex  '>

 <div className='bg-white   dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-4 rounded-xl flex-1 lg:max-w-[50%]'>
      <h2 className='font-bold text-xl  text-gray-700 dark:text-gray-100 border-b pb-2'>Summary</h2>
        <div className="flex bg-gray-200 px-3 flex-col gap-3 overflow-y-auto h-[20rem] lg:h-[23rem]">
        <Summary summaryData={discussionRoomData?.summary} />

      </div>
    </div>

    <div className='bg-white mt-5 lg:mt-0 md:mt-0 sm:mt-0 dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-4 rounded-xl flex-1 lg:max-w-[50%]'>
        <h2 className='font-bold text-xl  text-gray-700 dark:text-gray-100 border-b pb-2'>Conversation Transcript</h2>
        
        <div className="flex flex-col gap-3 overflow-y-auto h-[20rem] lg:h-[23rem]">
        {conversation.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No conversation data saved for this session.</p>
        ) : (
            conversation.map((msg, i) => (
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
                        {msg.content}
                    </div>
                </div>
            ))
        )}
        </div>
   </div>

   </div>   


 </div>


    )}
      
 
      
      
      </div>
  )
}

export default View_Summary

