"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Github, Twitter, Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand and Description */}
          <div className="space-y-3 md:max-w-xs">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-white" />
              <h3 className="text-lg font-semibold text-white">TradeMind</h3>
            </div>
            <p className="text-sm text-white/60">
              Transform your trading performance with AI-powered insights and systematic journaling.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10" asChild>
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="h-4 w-4 text-white/60" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="h-4 w-4 text-white/60" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/80">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:max-w-sm w-full">
            <h3 className="text-sm font-medium text-white/80">Stay Updated</h3>
            <p className="text-sm text-white/60">
              Subscribe to our newsletter for updates and trading insights.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-9 w-full rounded-md bg-white/5 border border-white/10 px-3 py-1 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
              />
              <Button type="submit" size="sm" className="bg-white text-black hover:bg-white/90 transition-colors">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} TradeMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
