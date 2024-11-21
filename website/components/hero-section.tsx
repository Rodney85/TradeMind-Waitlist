"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { WaitlistForm } from "./waitlist-form";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div id="hero" className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center antialiased px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Main Headline */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center"
            >
              <span className="block text-white mb-1 sm:mb-2 leading-[1.1]">Level Up Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 leading-[1.1]">
                Trading Psychology
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-[600px] mx-auto text-center font-light"
            >
              AI-powered trading journal that makes mastering your mindset fun and rewarding.
            </motion.p>
          </div>

          {/* Waitlist Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <WaitlistForm />
          </motion.div>
        </motion.div>
      </div>

      <BackgroundBeams />
    </div>
  );
}