import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";
import { FeaturesSection } from "@/components/features-section";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Brain, LineChart, TrendingUp, BarChart3, Target, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
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
    <Card className="p-6 border-0 bg-white/5">
      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </Card>
  );
}