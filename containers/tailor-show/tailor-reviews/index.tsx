"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Image as ImageIcon,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { Tailor } from "@/types/tailor";

interface TailorReviewsProps {
  tailor: Tailor;
}

export default function TailorReviews({ tailor }: TailorReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [showImages, setShowImages] = useState(false);

  // Calculate rating stats
  const ratingStats = useMemo(() => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    tailor.reviews.forEach((review) => {
      stats[review.rating as keyof typeof stats]++;
    });
    return stats;
  }, [tailor.reviews]);

  // Get unique services from reviews
  const services = useMemo(() => {
    const uniqueServices = new Set(tailor.reviews.map((r) => r.serviceType));
    return Array.from(uniqueServices);
  }, [tailor.reviews]);

  // Filter reviews based on selection
  const filteredReviews = useMemo(() => {
    return tailor.reviews.filter((review) => {
      const ratingMatch =
        selectedRating === "all" || review.rating === parseInt(selectedRating);
      const serviceMatch =
        selectedService === "all" || review.serviceType === selectedService;
      const imageMatch = showImages ? review.images?.length! > 0 : true;
      return ratingMatch && serviceMatch && imageMatch;
    });
  }, [tailor.reviews, selectedRating, selectedService, showImages]);

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{tailor.rating}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(tailor.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardDescription>
              Based on {tailor.totalReviews} reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(ratingStats)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="w-12 text-sm">{rating} stars</div>
                    <Progress
                      value={(count / tailor.totalReviews) * 100}
                      className="h-2"
                    />
                    <div className="w-12 text-sm text-muted-foreground">
                      {Math.round((count / tailor.totalReviews) * 100)}%
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Filter Reviews</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Stars (
                      {ratingStats[rating as keyof typeof ratingStats]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant={showImages ? "default" : "outline"}
              className="w-full"
              onClick={() => setShowImages(!showImages)}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              {showImages ? "Show All Reviews" : "Show Reviews with Images"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {filteredReviews.length} Reviews
          </h3>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Sort by: Latest
          </Button>
        </div>

        <AnimatePresence>
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>
                          {review.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(review.date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{review.serviceType}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                      {review.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-md overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Helpful
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredReviews.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No reviews match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
