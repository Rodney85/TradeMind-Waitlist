"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { WaitlistForm } from "./waitlist-form";

export function HeroSection() {
  return (
    <div className="relative h-[40rem] w-full bg-black flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
            Coming Soon
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-[800px] mx-auto text-center text-white">
          Master Your Trading Psychology with AI
        </h1>
        <p className="text-xl text-white/70 max-w-[600px] mx-auto mb-12 text-center">
          Transform your trading performance with AI-powered insights and systematic journaling
        </p>
        <div className="flex flex-col items-center gap-6">
          <WaitlistForm />
          <p className="text-sm text-white/60">
            Join 1,000+ traders already on the waitlist
          </p>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}