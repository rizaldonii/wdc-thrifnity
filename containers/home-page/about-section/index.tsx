"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto relative"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative inline-block mb-6"
          >
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-4 py-1.5 font-medium"
            >
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="tracking-wider">WHO WE ARE</span>
              <Heart className="w-4 h-4 ml-2 text-primary animate-pulse" />
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Reimagining Fashion{" "}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-primary/10 rounded-lg blur"></span>
                <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Through Sustainability
                </span>
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
          >
            At Thriftinity, we're more than just a marketplace - we're a
            community <br className="hidden md:block" />
            driven by the passion for sustainable fashion and conscious living.
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-12 mt-8 pt-8 border-t border-border/50"
          >
            {[
              { label: "Happy Customers", value: "5K+", icon: "💚" },
              { label: "Expert Tailors", value: "100+", icon: "✂️" },
              { label: "Sustainable Items", value: "1K+", icon: "🌱" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm shadow-sm border border-border/30"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/home images/about-preview.webp"
                alt="Thriftinity Sustainable Fashion"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />

              {/* Optional: Floating Badge */}
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-background/80 backdrop-blur-sm text-foreground px-4 py-2">
                  Est. 2024
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 mb-2"
              >
                Our Vision
              </Badge>
              <h3 className="text-2xl font-bold mb-4">
                Transforming Fashion,{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  One Piece at a Time
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Thriftinity, we're more than just a marketplace - we're a
                community driven by the passion for sustainable fashion and the
                belief that style shouldn't come at the expense of our planet.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform connects conscious shoppers with quality pre-loved
                fashion and expert tailors, creating a circular economy that
                benefits both people and the environment.
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  {
                    stat: "60%",
                    label: "Less Environmental Impact",
                    description: "Compared to buying new clothes",
                  },
                  {
                    stat: "100+",
                    label: "Local Tailors",
                    description: "Supporting local communities",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-2xl font-bold text-primary">
                      {item.stat}
                    </div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex items-center gap-6 pt-4">
              <Button asChild size="lg" className="group">
                <Link href="/about" className="gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="relative pl-6 text-sm text-muted-foreground before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border">
                Join our mission for
                <br />
                sustainable fashion
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
