import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";
import { FeaturesSection } from "@/components/features-section";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Brain, LineChart, TrendingUp, BarChart3, Target, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-16 px-4 md:pt-40 md:pb-24">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
              Coming Soon
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-[800px] mx-auto">
            Master Your Trading Psychology with AI
          </h1>
          <p className="text-xl text-white/70 max-w-[600px] mx-auto mb-12">
            Transform your trading performance with AI-powered insights and systematic journaling
          </p>
          <div className="flex flex-col items-center gap-6">
            <WaitlistForm />
            <p className="text-sm text-white/60">
              Join 1,000+ traders already on the waitlist
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-white/70 max-w-[600px] mx-auto">
              Have questions about TradeMind? We're here to help. Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}