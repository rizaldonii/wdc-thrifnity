"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Images,
  MessageSquare,
  Phone,
  Star,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import type { Tailor } from "@/types/tailor";
import TailorServices from "../tailor-services";
import TailorPortfolio from "../tailor-portfolio";
import TailorReviews from "../tailor-reviews";
import TailorContact from "../tailor-contact";
import React from "react";

interface TailorTabsProps {
  tailor: Tailor;
}

export default function TailorTabs({ tailor }: TailorTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab configuration
  const tabConfig: Record<
    string,
    {
      icon: JSX.Element;
      label: string;
      getStat: (() => number) | null;
      component: React.ComponentType<{ tailor: Tailor }>;
    }
  > = useMemo(
    () => ({
      services: {
        icon: <Scissors className="h-4 w-4 mr-2" />,
        label: "Services",
        getStat: () => tailor.services?.length || 0,
        component: TailorServices,
      },
      portfolio: {
        icon: <Images className="h-4 w-4 mr-2" />,
        label: "Portfolio",
        getStat: () => tailor.portfolio?.length || 0,
        component: TailorPortfolio,
      },
      reviews: {
        icon: <Star className="h-4 w-4 mr-2" />,
        label: "Reviews",
        getStat: () => tailor.totalReviews,
        component: TailorReviews,
      },
      contact: {
        icon: <Phone className="h-4 w-4 mr-2" />,
        label: "Contact",
        getStat: null,
        component: TailorContact,
      },
    }),
    [tailor]
  );

  const validTabs = Object.keys(tabConfig);
  const tabParam = searchParams.get("tab");
  const initialTab = validTabs.includes(tabParam || "") ? tabParam : "services";
  const [activeTab, setActiveTab] = useState(initialTab);

  // URL management
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", activeTab || "services");
    router.push(`?${newParams.toString()}`, { scroll: false });
  }, [activeTab, router, searchParams]);

  // Smooth scroll handling
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const element = document.getElementById(`tailor-tab-${value}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Quick info section
  const QuickInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-secondary/5 rounded-lg">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Response Time</p>
          <p className="text-sm text-muted-foreground">
            {tailor.stats.averageResponseTime}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Location</p>
          <p className="text-sm text-muted-foreground">
            {tailor.location.city}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Rating</p>
          <p className="text-sm text-muted-foreground">
            {tailor.rating} ({tailor.totalReviews} reviews)
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative pb-20 md:pb-0">
      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b">
        <ScrollArea className="w-full">
          <div className="flex space-x-2 p-4">
            {validTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => handleTabChange(tab)}
                className="flex items-center whitespace-nowrap"
              >
                {tabConfig[tab].icon}
                {tabConfig[tab].label}
                {tabConfig[tab].getStat && (
                  <Badge variant="secondary" className="ml-1">
                    {tabConfig[tab].getStat()}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Desktop Tabs */}
      <Tabs
        value={activeTab!}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="hidden md:block">
          <QuickInfo />
          <TabsList className="w-full grid grid-cols-4">
            {validTabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex items-center justify-center gap-2"
              >
                {tabConfig[tab].icon}
                {tabConfig[tab].label}
                {tabConfig[tab].getStat && (
                  <Badge variant="secondary" className="ml-1">
                    {tabConfig[tab].getStat()}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content with Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {validTabs.map((tab) => (
              <TabsContent key={tab} value={tab} id={`tailor-tab-${tab}`}>
                {React.createElement(tabConfig[tab].component, { tailor })}

                {/* Booking prompt for services tab */}
                {tab === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-primary" />
                        <div>
                          <h3 className="font-medium">Ready to Book?</h3>
                          <p className="text-sm text-muted-foreground">
                            Next available: Tomorrow at 10:00 AM
                          </p>
                        </div>
                      </div>
                      <Button size="lg" className="w-full md:w-auto">
                        Book Appointment
                      </Button>
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 flex gap-2 z-20">
        <Button variant="outline" size="lg" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button size="lg" className="flex-1">
          Book Now
        </Button>
      </div>
    </div>
  );
}
