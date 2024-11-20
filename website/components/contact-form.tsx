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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          className="bg-white/10 border-white/20 placeholder:text-white/60 min-h-[120px]"
        />
      </div>
      <Button 
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
