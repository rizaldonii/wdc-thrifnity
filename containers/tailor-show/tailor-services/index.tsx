"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Tailor, ServicePrice } from "@/types/tailor";

interface TailorServicesProps {
  tailor: Tailor;
}

export default function TailorServices({ tailor }: TailorServicesProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const servicesRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (serviceId: string) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };

  // Group services by category
  const serviceCategories = tailor.services.reduce((acc, service) => {
    // Extract category from service name (e.g., "Wedding - Custom Suit" -> "Wedding")
    const category = service.name.includes(" - ")
      ? service.name.split(" - ")[0]
      : "Other Services";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(service);
    return acc;
  }, {} as Record<string, ServicePrice[]>);

  // Get all categories
  const categories = ["all", ...Object.keys(serviceCategories)];

  // Filter services by active category
  const filteredServices =
    activeCategory === "all"
      ? serviceCategories
      : { [activeCategory]: serviceCategories[activeCategory] };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Scroll to services section with a small delay to allow for rendering
    setTimeout(() => {
      servicesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // Service card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Services & Pricing</h2>
            <p className="text-muted-foreground mt-1">
              Explore {tailor.name}'s professional tailoring services
            </p>
          </div>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            {tailor.services.length} services available
          </Badge>
        </div>

        {/* Category Tabs */}
        <div className="relative">
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <TabsList className="inline-flex h-10 bg-muted/50 p-1 rounded-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="mt-8 space-y-12" ref={servicesRef}>
        {Object.entries(filteredServices).map(
          ([category, services], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              <div className="flex items-center mb-6 gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Scissors className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <Card className="h-full overflow-hidden border-border/60 transition-all duration-300 hover:border-primary/30 group">
                      <CardHeader className="pb-3 relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {service.name.includes(" - ")
                                ? service.name.split(" - ")[1]
                                : service.name}
                            </CardTitle>
                            <div className="flex items-center text-muted-foreground text-sm mt-1.5">
                              <Clock className="h-4 w-4 mr-1.5" />
                              <span>
                                Est. {service.estimatedDays}{" "}
                                {service.estimatedDays === 1 ? "day" : "days"}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              ${service.price.toLocaleString()}
                            </div>
                            {service.price < 50 && (
                              <Badge
                                variant="secondary"
                                className="text-xs font-normal"
                              >
                                Best Value
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <AnimatePresence>
                        {expandedService === service.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pb-3 pt-0">
                              <div className="border-l-2 border-primary/20 pl-3 my-2">
                                <CardDescription className="text-sm">
                                  {service.description}
                                </CardDescription>
                              </div>

                              {/* Features list - this is mock data, you would need to add this to your service model */}
                              <div className="mt-4 grid grid-cols-1 gap-2">
                                {[
                                  "Professional craftsmanship",
                                  "Premium materials",
                                  "Free consultation",
                                ].map((feature, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center text-sm"
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 mr-2 text-primary" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <CardFooter className="flex justify-between pt-3 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(service.id)}
                          className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground hover:bg-transparent"
                        >
                          {expandedService === service.id ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1.5" /> Less
                              details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1.5" /> More
                              details
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1.5 group-hover:bg-primary/90"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Inquire
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl" />
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-70" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative p-8 md:p-10 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Need a custom service?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Don't see what you're looking for? Contact {tailor.name} to discuss
            your specific requirements and get a personalized solution.
          </p>
          <Button size="lg" className="gap-2 px-6">
            Request Custom Quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
