import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useContext } from "react"
import { UserContext } from "../../../__context/userContext"
import { useUser } from "@stackframe/stack"

import Image from "next/image"



import React from 'react'



function ProfileDialog({children}) {


  const{userData}=useContext(UserContext);
  const user=useUser();
  
  return (
    <div>
 <Dialog >
      <form>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
          <DialogTitle></DialogTitle>
            <DialogDescription>
         <div asChild>
{user && <Image src={user?.profileImageUrl} alt="Profile Image" width={100} height={100} className="rounded-full mx-auto mb-4"/>}

<div asChild className="text-center mb-4">
  <p className="text-2xl font-semibold">{userData?.name}</p>
  <p className="text-gray-600">{userData?.email}</p>
</div>

         </div>
            </DialogDescription>
          </DialogHeader>
        
              <Button variant="outline" className="mt-4 bg-primary hover:bg-blue-300" onClick={() => user.signOut()}>SignOut</Button>
        </DialogContent>
      </form>
    </Dialog>

    </div>
  )
}

export default ProfileDialog