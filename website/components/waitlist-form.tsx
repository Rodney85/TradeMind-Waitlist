"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thanks for joining our waitlist!", {
      description: "We'll notify you when TradeMind launches.",
    });
    
    setEmail("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2 sm:gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-10 sm:h-11 flex-1 text-base"
      />
      <Button 
        type="submit" 
        disabled={loading} 
        className="h-10 sm:h-11 px-6 sm:px-8 w-full sm:w-auto whitespace-nowrap text-base"
      >
        {loading ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
}