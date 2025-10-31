import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
  
} from "@/components/ui/dialog"

import { Textarea } from '@/components/ui/textarea';

import Image from 'next/image';

import { SpeechOptions } from '../../../../services/options';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../../../ai-agent/convex/_generated/api';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '../../../__context/userContext';




function UserInputDIalog({children ,expertList}: {children:React.ReactNode,expertList:any}) {

  const[selectExpert,setSelectExpert]=useState("");  
  const[selectTopic,setSelectTopic]=useState("");
  const[loading,setLoading]=useState(false);
  const[openDialog,setOpenDialog]=useState(false);
  const router=useRouter();
  const{userData}=useContext(UserContext);

 const createDiscussionRoom=useMutation(api.discussionRoom.CreateNewRoom);
 const onClickNext=async()=>{
  setLoading(true);
  const result=await createDiscussionRoom({
    coachingOptions:expertList?.name,
    topic:selectTopic,
    expertName:selectExpert,
    userId:userData?._id,

  }
)

setLoading(false);
setOpenDialog(false);
router.push('/discussion-room/'+result);
}


  return (
    <div>
         
       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{expertList.name}</DialogTitle>
      <DialogDescription asChild>
      <div>
<div className='mt-3 flex flex-col gap-2'>
<h2 className='text-gray-800 font-bold text-[18px]'>Enter a topic to master {expertList.name} </h2>
<Textarea placeholder="Enter Your Topic here !" onChange={(e)=>{
  setSelectTopic(e.target.value);
}} />
</div>
<div>
      <h2 className='text-gray-800 mt-5  font-semibold text-[14px]'>Select Your Coaching Expert</h2>

  <div className='flex gap-4'>
{SpeechOptions.map((option,index)=>(
  <div key={index} className="mt-2 rounded-xl cursor-pointer flex flex-col " onClick={()=>setSelectExpert(option.name)}>
    <h3 className='text-[16px] mx-0.5 font-semibold text-gray-500 mb-2'>{option.name}</h3>
  <Image src={option.avatar} alt={option.name} width={55} height={55}  className={`rounded-xl cursor-pointer
          hover:scale-105 hover:outline hover:outline-2 hover:outline-blue-500 hover:bg-blue-50 transition-all duration-300 
           ${selectExpert === option.name && "outline-blue-500 outline-2 p-1"}`} />
</div>

))}




      </div>
      </div>

<div className='mt-6 flex justify-end gap-3 '>

<DialogClose asChild>
 <Button variant='ghost'>Cancel</Button>
</DialogClose>
 
  <Button  onClick={onClickNext}  disabled={(!selectExpert || !selectTopic || loading) ? true : false } >
    {
      loading && <LoaderCircle className='animate-spin' size={16} />
    }
    
    Next</Button>
</div>

      </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
        
        
        </div>
  )
}

export default UserInputDIalog