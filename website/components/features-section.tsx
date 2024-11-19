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
        <div className="text-center max-w-3xl mx-auto px-4 pt-20 pb-16">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            Transform Your Trading Psychology
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Harness the power of AI to understand your trading patterns, manage emotions, and make better decisions. Our comprehensive suite of tools is designed to help you achieve consistent trading success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 max-w-7xl mx-auto">
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
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
