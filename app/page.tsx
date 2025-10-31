"use client";

import { useEffect, useState } from "react";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import AppHeader from "../app/(main)/_components/AppHeader";
import LandingPageContent from "../app/(main)/_components/HeroSection";

export default function Page() {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
     
      router.push("/dashboard");
    } else {
  
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
 
    return null;
  }

  return (
    <div>
      <AppHeader />
      <LandingPageContent />
    </div>
  );
}
