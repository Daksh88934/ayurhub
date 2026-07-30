"use client";

import { useState } from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AyurChainMain from '@/components/AyurChainMain';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://flexible-hare-621.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export default function Home() {
  return (
    <ConvexProvider client={convex}>
      <main>
        <AyurChainMain />
      </main>
    </ConvexProvider>
  );
}
