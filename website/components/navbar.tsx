"use client";
import { Button } from "@/components/ui/button";
import { Brain, LineChart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#contact", label: "Contact" },
    { href: "#newsletter", label: "Newsletter" },
  ];

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2.5"
          >
            <Brain className="h-6 w-6" />
            <span className="font-semibold text-lg">TradeMind</span>
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Button and Mobile Menu */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center">
              <Button className="h-10 px-6 whitespace-nowrap text-sm bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white/90 hover:text-white transition-all duration-200 shadow-lg shadow-blue-500/20">
                <LineChart className="mr-2 h-4 w-4" />
                Join Waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 ml-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                className="w-full bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white/90 hover:text-white transition-all duration-200 shadow-lg shadow-blue-500/20"
                onClick={() => setIsMenuOpen(false)}
              >
                <LineChart className="mr-2 h-4 w-4" />
                Join Waitlist
              </Button>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}