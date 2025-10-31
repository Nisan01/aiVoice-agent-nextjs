"use client";

import React, { ReactNode, Suspense } from 'react'

import { ConvexReactClient, ConvexProvider } from 'convex/react';
import AuthProvider from './authProvider';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
}

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ConvexProvider client={convex}>
      <Suspense fallback={<Loader />}>
        <AuthProvider>{children}</AuthProvider>
      </Suspense>
    </ConvexProvider>
  )
}

export default Provider
