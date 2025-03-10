"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Recycle,
  SearchCheck,
  Scale,
  HandshakeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const tradeFeatures = [
  {
    title: "Find Your Match",
    description:
      "Browse items and find the perfect exchange match for your clothes",
    icon: <SearchCheck className="w-6 h-6" />,
    color: "from-primary to-primary/70",
  },
  {
    title: "Fair Exchange",
    description:
      "Trade items of similar value and condition with other fashion lovers",
    icon: <Scale className="w-6 h-6" />,
    color: "from-secondary to-primary",
  },
  {
    title: "Direct Swap",
    description:
      "Meet up safely or use our secure shipping service for exchanges",
    icon: <HandshakeIcon className="w-6 h-6" />,
    color: "from-primary/70 to-secondary",
  },
];

export default function Trade() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="tracking-wider font-medium">SWAP & STYLE</span>
            <Recycle className="w-4 h-4 ml-2 text-primary animate-pulse" />
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Exchange Your Fashion,{" "}
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-primary/10 rounded-lg blur"></span>
              <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Find New Style
              </span>
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our fashion exchange community. Swap your pre-loved clothing
            with other fashion enthusiasts and refresh your wardrobe
            sustainably.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tradeFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 rounded-full blur-xl`}
                    />
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10">
                      {React.cloneElement(feature.icon, {
                        className: "text-primary",
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-8 p-4 rounded-full bg-background border border-border/50">
            <Button asChild size="lg" className="rounded-full group">
              <Link href="/trade" className="gap-2">
                Start Swapping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
