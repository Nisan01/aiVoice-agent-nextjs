"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { UserButton, useStackApp, useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { UserContext } from "../../__context/userContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

function AppHeader() {
  const router = useRouter();
  const user = useUser();
  const app = useStackApp();
  const { userData } = useContext(UserContext);

  const routeHandler = () => {
    router.push("/dashboard");
  };

  const handleSignIn = () => {
    app.redirectToSignIn();
  };

 

  return (
    <div className="p-8 shadow-sm flex justify-between">
      <Image
        src={"/logo.svg"}
        alt="Logo"
        width={160}
        height={200}
        onClick={routeHandler}
        className="cursor-pointer"
      />

      {user ? (
        <UserButton />
      ) : (
        <Button onClick={handleSignIn}>Sign In</Button>
      )}
    </div>
  );
}

export default AppHeader;
