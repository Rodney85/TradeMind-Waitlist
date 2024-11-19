"use client";

import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconBrain,
  IconChartBar,
  IconClockHour4,
  IconHelp,
  IconRouteAltLeft,
  IconTargetArrow,
  IconCurrencyDollar,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Analysis",
      description:
        "Get personalized insights and recommendations based on your trading patterns.",
      icon: <IconBrain className="w-6 h-6" />,
    },
    {
      title: "Real-time Tracking",
      description:
        "Monitor your trades and emotions in real-time with advanced analytics.",
      icon: <IconChartBar className="w-6 h-6" />,
    },
    {
      title: "Affordable Plans",
      description:
        "Flexible pricing options designed to support traders at every level.",
      icon: <IconCurrencyDollar className="w-6 h-6" />,
    },
    {
      title: "24/7 Market Coverage",
      description: "Stay connected to markets around the clock with our platform.",
      icon: <IconClockHour4 className="w-6 h-6" />,
    },
    {
      title: "Multi-Strategy Support",
      description: "Track and analyze multiple trading strategies simultaneously.",
      icon: <IconRouteAltLeft className="w-6 h-6" />,
    },
    {
      title: "Expert Support",
      description:
        "Access our team of trading psychology experts whenever you need guidance.",
      icon: <IconHelp className="w-6 h-6" />,
    },
    {
      title: "Performance Optimization",
      description:
        "Fine-tune your trading strategy with AI-powered performance insights.",
      icon: <IconAdjustmentsBolt className="w-6 h-6" />,
    },
    {
      title: "Goal Achievement",
      description: "Set and track your trading goals with precision and clarity.",
      icon: <IconTargetArrow className="w-6 h-6" />,
    },
  ];
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <div className="h-full w-full dark:bg-black bg-white [background-size:16px_16px] [background-image:radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Transform Your Trading Psychology
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-neutral-600 dark:text-neutral-300 px-2">
            Harness the power of AI to understand your trading patterns, manage emotions, and make better decisions. Our comprehensive suite of tools is designed to help you achieve consistent trading success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-950",
        "p-6 sm:p-8"
      )}
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              "bg-neutral-100 dark:bg-neutral-900"
            )}
          >
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        </div>
        <p className="text-sm sm:text-base leading-6 text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  );
};
