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

    console.log('Submitting form data:', data);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      toast.success(result.message || "Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Detailed form submission error:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
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
          id="name"
          autoComplete="name"
          placeholder="Your name"
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Your email"
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          name="message"
          id="message"
          autoComplete="off"
          placeholder="Your message"
          required
          disabled={isLoading}
          className="w-full min-h-[100px]"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
