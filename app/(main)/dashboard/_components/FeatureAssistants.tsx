"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";

import React from "react";
import { ExpertLists } from "../../../../services/options";
import Image from "next/image";
import {BlurFade} from "../../../../components/ui/blur-fade";
import UserInputDIalog from "./UserInputDIalog";
import Profile from "./ProfileDialog";
import ProfileDialog from "./ProfileDialog";




function FeatureAssistants() {
 
  const user=useUser();

  return (
    <>
    <div className="flex md:items-center sm:items-center sm:justify-between lg:items-center gap-3 justify-between lg:justify-between ">
          <div>
            <h3 className="text-gray-500">My Workspace</h3>
            <h2 className="font-bold text-[20px] md:text-2xl lg:text-3xl">
              Welcome Back, {user?.displayName} </h2>
            </div>
            
       <ProfileDialog><Button className="cursor-pointer ">Profile</Button></ProfileDialog>
   </div>


<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 lg:grid-cols-5 gap-8 sm:gap-6 mt-6 items-stretch">
  {ExpertLists.map((item, index) => (
 
    <BlurFade key={item.icon} delay={0.25 + index * 0.05} inView>
      <div
        key={index}
        className="
          h-full
          p-3 bg-secondary rounded-lg flex flex-col justify-between items-center gap-5
          cursor-pointer 
          transition-all duration-300 
          hover:scale-105 hover:outline hover:outline-2 hover:outline-blue-500 hover:bg-blue-50 rounded-2xl
        "
      >
      <UserInputDIalog expertList={item}>
        <div className="flex flex-col items-center gap-5 cursor-pointer">
        <Image
          src={item.icon}
          alt={item.name}
          width={150}
          height={150}
          className="h-[58px] w-[58px] hover:rotate-12 cursor-pointer transition-all"
        />
        <h3 className="text-sm text-gray-500 text-center break-words line-clamp-2">
          {item.name}
        </h3>
        </div>
      </UserInputDIalog>
      </div>
    </BlurFade>
   
  ))}
</div>



   </>
  
  );
}

export default FeatureAssistants;
