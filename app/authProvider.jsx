"use client";

import { useUser } from '@stackframe/stack';
import React, { useEffect } from 'react'
import { useMutation } from 'convex/react';
import { api } from '../ai-agent/convex/_generated/api';
import { UserContext } from './__context/userContext';
import { useState } from 'react';

function AuthProvider({children}) {

const user=useUser();

const createUser=useMutation(api.users.createUser);
const[userData,setUserData]=useState();



useEffect(() => {

  user && createNewUser();
}, [user]);

const createNewUser=async()=>{
  const result=await createUser({
    name:user?.displayName,
    email:user.primaryEmail

});
setUserData(result);
}


  return (


    <div>

      <UserContext.Provider value={{userData,setUserData}}>{children}</UserContext.Provider>

      </div>
  )
}

export default AuthProvider;