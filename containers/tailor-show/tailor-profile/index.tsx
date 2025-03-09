"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  Share2,
  MessageSquare,
  Heart,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Tailor } from "@/types/tailor";

interface TailorProfileProps {
  tailor: Tailor;
}

export default function TailorProfile({ tailor }: TailorProfileProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <Image
          src={tailor.coverImage || "/placeholder.svg"}
          alt={`${tailor.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/tailors">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full h-10 w-10 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to tailors</span>
          </Button>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full h-10 w-10 p-0"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isSaved ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span className="sr-only">Save tailor</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSaved ? "Saved to favorites" : "Save to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full h-10 w-10 p-0"
                onClick={() =>
                  navigator
                    .share({
                      title: tailor.name,
                      text: `Check out ${tailor.name}`,
                      url: window.location.href,
                    })
                    .catch((err) => console.error("Error sharing:", err))
                }
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share tailor profile</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this tailor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-24 bg-background rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background -mt-20 md:-mt-24 shadow-md">
                <Image
                  src={tailor.avatar || "/placeholder.svg"}
                  alt={tailor.name}
                  fill
                  className="object-cover"
                />
                {tailor.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </div>

              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {tailor.name}
                  </h1>
                  {tailor.isVerified && (
                    <Badge
                      variant="secondary"
                      className="self-center md:self-auto"
                    >
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center md:justify-start mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {tailor.location.city}, {tailor.location.province}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {tailor.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  {tailor.tags.length > 4 && (
                    <Badge variant="outline">+{tailor.tags.length - 4}</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Stats and CTA */}
            <div className="flex-1 flex flex-col items-center md:items-end mt-4 md:mt-0">
              <div className="flex gap-4 md:gap-6 mb-4">
                <div className="text-center">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-bold text-lg">
                      {tailor.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tailor.totalReviews} reviews
                  </p>
                </div>

                <div className="text-center">
                  <p className="font-bold text-lg">{tailor.experience}+</p>
                  <p className="text-xs text-muted-foreground">Years exp.</p>
                </div>

                <div className="text-center">
                  <p className="font-bold text-lg">{tailor.totalOrders}+</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild className="gap-2">
                  <Link href={`/tailors/${tailor.slug}/chat`}>
                    <MessageSquare className="h-4 w-4" />
                    Contact
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">
                  {tailor.stats.averageResponseTime}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">Completion Rate</p>
                <p className="text-sm text-muted-foreground">
                  {tailor.stats.completionRate}%
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">
                  {tailor.memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t">
            <h2 className="text-lg font-semibold mb-2">About {tailor.name}</h2>
            <p className="text-muted-foreground">{tailor.description}</p>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-1">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {tailor.specialty.map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
