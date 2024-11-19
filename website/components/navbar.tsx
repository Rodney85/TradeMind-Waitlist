import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Brain, LineChart } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-2.5"
          >
            <Brain className="h-6 w-6" />
            <span className="font-semibold text-lg">TradeMind</span>
          </Link>
          
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6 mr-8">
              <Link 
                href="#features" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <ModeToggle />
              <Button>
                <LineChart className="mr-2 h-4 w-4" />
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}