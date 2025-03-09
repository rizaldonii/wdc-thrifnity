import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, RefreshCw, Sparkles } from "lucide-react";
import React from "react";

export default function HowWorks() {
  return (
    <section className="relative py-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-accent/30 rounded-3xl" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
            Simple Steps
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How Thriftinity Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Discover",
              description:
                "Browse a curated selection of thrifted fashion treasures.",
              icon: <Search className="w-6 h-6" />,
              gradient: "from-primary to-primary/70",
            },
            {
              step: 2,
              title: "Reuse",
              description: "Buy, swap, or sell pre-loved clothing with ease.",
              icon: <RefreshCw className="w-6 h-6" />,
              gradient: "from-secondary to-primary",
            },
            {
              step: 3,
              title: "Make an Impact",
              description:
                "Every transaction helps reduce fashion waste and promotes sustainability.",
              icon: <Sparkles className="w-6 h-6" />,
              gradient: "from-primary/70 to-secondary",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="group border-0 shadow-md bg-card/80 transition-all duration-300 hover:translate-y-[-8px]"
            >
              <CardContent className="p-8">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} text-white font-bold text-lg`}
                  >
                    {item.step}
                  </div>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6 transform -rotate-6 transition-transform duration-300 group-hover:rotate-0">
                  {React.cloneElement(item.icon, {
                    className: "text-primary",
                  })}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
