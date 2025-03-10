"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, ChevronRight, Clock, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tailors } from "@/data/tailors";
import { Tailor } from "@/types/tailor";

export default function FeaturedTailors() {
  // Get top tailors by different filters
  const topRatedTailors = [...tailors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const mostExperiencedTailors = [...tailors]
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .slice(0, 3);

  const nearbyTailors = [...tailors]
    .sort((a, b) => a.distance - b.distance) // Asumsi: 'distance' adalah properti yang menunjukkan jarak
    .slice(0, 3);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        {/* Section Header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center relative"
        >
          {/* Improved decorative elements */}
          <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0" />

          <div className="relative inline-block mb-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 mb-4 backdrop-blur-sm px-4 py-1.5 text-sm"
            >
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Featured Professionals
            </Badge>
          </div>

          <div className="relative max-w-3xl mx-auto z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Expert Tailors for{" "}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-primary/10 rounded-lg blur"></span>
                <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Your Perfect Fit
                </span>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Connect with our handpicked tailors who blend traditional
              craftsmanship with modern style to create clothing that's uniquely
              yours.
            </motion.p>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center gap-8 mt-8 mb-6"
            >
              <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
                <div className="flex items-center justify-center mb-2 text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {tailors.length}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Expert Tailors
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
                <div className="flex items-center justify-center mb-2 text-primary">
                  <Star className="w-6 h-6 fill-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  4.8
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
                <div className="flex items-center justify-center mb-2 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  1k+
                </div>
                <div className="text-sm text-muted-foreground">
                  Completed Orders
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs for different tailor categories */}
        <Tabs defaultValue="top-rated" className="w-full mb-8">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
              <TabsTrigger value="experienced">Most Experienced</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="top-rated">
            <div className="grid md:grid-cols-3 gap-8">
              {topRatedTailors.map((tailor, index) => (
                <TailorCard
                  key={tailor.id}
                  tailor={tailor}
                  index={index}
                  badgeIcon={
                    <Star className="w-3 h-3 fill-primary text-primary mr-1" />
                  }
                  badgeText={tailor.rating.toFixed(1)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experienced">
            <div className="grid md:grid-cols-3 gap-8">
              {mostExperiencedTailors.map((tailor, index) => (
                <TailorCard
                  key={tailor.id}
                  tailor={tailor}
                  index={index}
                  badgeIcon={<Clock className="w-3 h-3 mr-1" />}
                  badgeText={`${tailor.yearsOfExperience}+ years`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nearby">
            <div className="grid md:grid-cols-3 gap-8">
              {nearbyTailors.map((tailor, index) => (
                <TailorCard
                  key={tailor.id}
                  tailor={tailor}
                  index={index}
                  badgeIcon={<MapPin className="w-3 h-3 mr-1" />}
                  badgeText={`${tailor.distance || "0.5"}km`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="px-8 py-6 text-base rounded-full shadow-md hover:shadow-lg transition-all"
            asChild
          >
            <Link href="/tailors">
              Explore All Tailors
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function TailorCard({
  tailor,
  index,
  badgeIcon,
  badgeText,
}: {
  tailor: Tailor;
  index: number;
  badgeIcon: React.ReactNode;
  badgeText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={tailor.coverImage}
              alt={tailor.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 flex items-center bg-background/80 backdrop-blur-sm border-border/20"
            >
              {badgeIcon}
              {badgeText}
            </Badge>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="font-semibold text-xl mb-2">{tailor.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1 text-primary" />
                  {tailor.location.city}, {tailor.location.country}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {tailor.description}
              </p>

              {/* Specialties tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {tailor.services.slice(0, 3).map((service, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-primary/5 text-xs"
                  >
                    {service.name}
                  </Badge>
                ))}
                {tailor.services.length > 3 && (
                  <Badge variant="outline" className="bg-secondary/5 text-xs">
                    +{tailor.services.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/30">
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">
                  {tailor.services.length} services
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-primary hover:text-primary/80 hover:bg-primary/5"
                asChild
              >
                <Link href={`/tailors/${tailor.slug}`}>
                  View Profile
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
