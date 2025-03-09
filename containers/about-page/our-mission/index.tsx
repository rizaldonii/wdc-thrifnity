import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  RefreshCw,
  Users,
  Cpu,
  BarChart,
  Heart,
  Droplets,
  Sparkles,
  Scale,
} from "lucide-react";
import React from "react";

export default function OurMission() {
  return (
    <section className="relative py-24 px-4 md:px-6 max-w-7xl mx-auto my-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-accent/40 rounded-3xl shadow-lg" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div className="absolute bottom-0 left-0 w-120 h-120 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="bg-primary/15 text-primary border-primary/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary mr-2.5 animate-pulse" />
            Our Guiding Principles
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Mission & Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Redefining fashion through sustainability, community engagement, and
            technological innovation to create lasting global impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission Section */}
          <Card className="group border-0 shadow-lg bg-card/80 transition-all duration-300 hover:translate-y-[-8px]">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're revolutionizing the fashion industry through sustainable
                practices, vibrant community building, and cutting-edge
                innovation. Our journey began with a crucial question:{" "}
                <span className="italic font-medium">
                  How can we make fashion truly sustainable for generations to
                  come?
                </span>
              </p>
              <ul className="space-y-6">
                {[
                  {
                    title: "Extend Fashion Life Cycles",
                    description:
                      "To extend the life cycle of fashion and reduce textile waste through circular economy practices and innovative recycling technologies",
                    icon: <RefreshCw className="w-5 h-5" />,
                  },
                  {
                    title: "Build Conscious Communities",
                    description:
                      "To nurture a thriving global community of conscious consumers who prioritize sustainability in their fashion choices and inspire positive change",
                    icon: <Users className="w-5 h-5" />,
                  },
                  {
                    title: "Leverage Technology",
                    description:
                      "To harness cutting-edge technology in creating a more accessible, transparent, and sustainable fashion ecosystem for everyone",
                    icon: <Cpu className="w-5 h-5" />,
                  },
                  {
                    title: "Measure Real Impact",
                    description:
                      "To quantify and transparently report our environmental impact, empowering consumers to make truly informed decisions",
                    icon: <BarChart className="w-5 h-5" />,
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/30 transition-all duration-300">
                      {React.cloneElement(item.icon, {
                        className: "text-primary",
                      })}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        {item.title}
                      </span>{" "}
                      <p className="text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-6 border-t border-accent/30">
                <p className="text-muted-foreground italic text-center font-medium">
                  "By 2030, we aim to help divert 1 million garments from
                  landfills and reduce the fashion industry's carbon footprint
                  by measurable metrics."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values Section */}
          <Card className="group border-0 shadow-lg bg-card/80 transition-all duration-300 hover:translate-y-[-8px]">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Core Values
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                These principles guide every decision we make—from product
                development to community initiatives and business partnerships.
              </p>
              <ul className="space-y-8">
                {[
                  {
                    icon: <Droplets className="w-7 h-7" />,
                    title: "Sustainability",
                    description:
                      "Every choice matters. We are committed to promoting eco-friendly fashion through mindful production, ethical sourcing, and zero-waste initiatives.",
                    bg: "bg-emerald-50 dark:bg-emerald-900/30",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                  },
                  {
                    icon: <Users className="w-7 h-7" />,
                    title: "Community",
                    description:
                      "We empower individuals to make sustainable choices together, creating a movement that transcends borders and unites fashion enthusiasts in a common purpose.",
                    bg: "bg-blue-50 dark:bg-blue-900/30",
                    iconColor: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    icon: <Sparkles className="w-7 h-7" />,
                    title: "Innovation",
                    description:
                      "Technology and creativity drive our mission toward a better fashion future. We constantly explore new approaches to solve age-old problems in the industry.",
                    bg: "bg-purple-50 dark:bg-purple-900/30",
                    iconColor: "text-purple-600 dark:text-purple-400",
                  },
                  {
                    icon: <Scale className="w-7 h-7" />,
                    title: "Transparency",
                    description:
                      "We believe in honest communication and clear metrics. Our commitment to transparency builds trust and sets new standards for accountability in fashion.",
                    bg: "bg-amber-50 dark:bg-amber-900/30",
                    iconColor: "text-amber-600 dark:text-amber-400",
                  },
                ].map((value, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-5 group/item transform transition duration-300 hover:translate-x-1"
                  >
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl ${value.bg} flex items-center justify-center group-hover/item:scale-110 transition-all duration-300`}
                    >
                      {React.cloneElement(value.icon, {
                        className: value.iconColor,
                      })}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
