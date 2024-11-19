"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    toast.success("Message sent successfully!");
    setIsLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          disabled={isLoading}
          className="bg-white/10 border-white/20 placeholder:text-white/60"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          disabled={isLoading}
          className="bg-white/10 border-white/20 placeholder:text-white/60"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          disabled={isLoading}
          className="min-h-[150px] bg-white/10 border-white/20 placeholder:text-white/60"
        />
      </div>
      <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
