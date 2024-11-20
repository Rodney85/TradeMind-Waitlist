"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting email:', email);

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Subscription Error:', data);
        throw new Error(data.message || 'Failed to subscribe');
      }

      console.log('Success:', data);
      toast.success("Welcome aboard! 🚀", {
        description: "You're on the waitlist. We'll be in touch soon.",
      });
      
      setEmail("");
    } catch (error) {
      console.error('Detailed error:', error);
      toast.error("Subscription Failed", {
        description: error instanceof Error ? error.message : "Please try again or contact support if the issue persists.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 w-full text-base bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
        />
        <Button 
          type="submit" 
          disabled={loading} 
          className="h-12 px-8 w-full sm:w-auto whitespace-nowrap text-base bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white/90 hover:text-white transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </Button>
      </motion.form>
    </div>
  );
}