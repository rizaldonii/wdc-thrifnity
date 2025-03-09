"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import {
  CheckCircle,
  Clock,
  Package,
  Calendar,
  CreditCard,
  FileText,
  Ruler,
  Scissors,
  ShoppingBag,
  ImageIcon,
  ExternalLink,
  Check,
  CheckCheck,
  ZoomIn,
  Download,
  Share2,
} from "lucide-react";
import type { ChatMessage, User, OrderStatus } from "@/types/chat";

interface MessageListProps {
  messages: ChatMessage[];
  user: User;
  tailor: {
    id: string;
    name: string;
    avatar?: string;
    businessName: string;
  };
  onLoadMore?: () => void;
  hasMoreMessages?: boolean;
  isLoadingMore?: boolean;
}

export default function MessageList({
  messages,
  user,
  tailor,
  onLoadMore,
  hasMoreMessages = false,
  isLoadingMore = false,
}: MessageListProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle scroll to load more messages
  useEffect(() => {
    const handleScroll = () => {
      const container = messagesContainerRef.current;
      if (
        container &&
        hasMoreMessages &&
        !isLoadingMore &&
        container.scrollTop < 100
      ) {
        onLoadMore?.();
      }
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [hasMoreMessages, isLoadingMore, onLoadMore]);

  // Group messages by date
  const groupedMessages: { [key: string]: ChatMessage[] } = {};

  messages.forEach((message) => {
    const date = new Date(message.createdAt);
    let dateKey: string;

    if (isToday(date)) {
      dateKey = "Today";
    } else if (isYesterday(date)) {
      dateKey = "Yesterday";
    } else {
      dateKey = format(date, "MMMM d, yyyy");
    }

    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }

    groupedMessages[dateKey].push(message);
  });

  // Format time from ISO string
  const formatMessageTime = (isoString: string) => {
    return format(new Date(isoString), "HH:mm");
  };

  // Get status badge color based on order status
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return isDark
          ? "bg-yellow-900/30 text-yellow-200 border-yellow-800"
          : "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return isDark
          ? "bg-blue-900/30 text-blue-200 border-blue-800"
          : "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return isDark
          ? "bg-indigo-900/30 text-indigo-200 border-indigo-800"
          : "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "ready_for_pickup":
        return isDark
          ? "bg-green-900/30 text-green-200 border-green-800"
          : "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return isDark
          ? "bg-emerald-900/30 text-emerald-200 border-emerald-800"
          : "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return isDark
          ? "bg-red-900/30 text-red-200 border-red-800"
          : "bg-red-100 text-red-800 border-red-200";
      default:
        return isDark
          ? "bg-gray-800 text-gray-200 border-gray-700"
          : "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status label
  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "in_progress":
        return "In Progress";
      case "ready_for_pickup":
        return "Ready for Pickup";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "in_progress":
        return <Scissors className="h-4 w-4" />;
      case "ready_for_pickup":
        return <Package className="h-4 w-4" />;
      case "completed":
        return <CheckCheck className="h-4 w-4" />;
      case "cancelled":
        return <FileText className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div
      className="space-y-8 overflow-y-auto px-1 py-4"
      style={{ maxHeight: "calc(100vh - 200px)" }}
      ref={messagesContainerRef}
    >
      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Load more button */}
      {hasMoreMessages && !isLoadingMore && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLoadMore}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Load older messages
          </Button>
        </div>
      )}

      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          <div className="relative flex items-center justify-center">
            <Separator className="absolute w-full" />
            <span className="relative bg-background px-2 text-xs text-muted-foreground">
              {date}
            </span>
          </div>

          {dateMessages.map((message) => {
            const isUserMessage = message.senderId === user.id;
            const sender = isUserMessage ? user : tailor;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  isUserMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] sm:max-w-[75%] ${
                    isUserMessage ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 ${
                      isUserMessage ? "ml-2" : "mr-2"
                    }`}
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage
                        src={sender.avatar || "/placeholder.svg"}
                        alt={sender.name}
                      />
                      <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Message Content */}
                  <div className="space-y-1">
                    {/* Text Message */}
                    {message.text && (
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isUserMessage
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted dark:bg-muted/50 rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                      </div>
                    )}

                    {/* Image Message */}
                    {message.image && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className={`overflow-hidden rounded-lg cursor-pointer group relative ${
                              isUserMessage
                                ? "rounded-tr-none"
                                : "rounded-tl-none"
                            }`}
                          >
                            <div className="relative h-48 w-48 sm:h-64 sm:w-64">
                              <Image
                                src={message.image || "/placeholder.svg"}
                                alt="Shared image"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <ZoomIn className="h-8 w-8 text-white" />
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl p-0 bg-background/95 backdrop-blur-sm dark:bg-background/90">
                          <div className="relative aspect-auto max-h-[80vh]">
                            <Image
                              src={message.image || "/placeholder.svg"}
                              alt="Shared image"
                              width={1200}
                              height={800}
                              className="object-contain w-full h-full"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full h-10 w-10"
                              >
                                <Download className="h-5 w-5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full h-10 w-10"
                              >
                                <Share2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {/* Product Message */}
                    {message.product && (
                      <Card
                        className={`w-64 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${
                          isUserMessage
                            ? "border-primary/20"
                            : "border-muted-foreground/20"
                        }`}
                      >
                        <div className="relative h-32 w-full overflow-hidden group">
                          <Image
                            src={message.product.image || "/placeholder.svg"}
                            alt={message.product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardHeader className="p-3 pb-0">
                          <CardTitle className="text-sm line-clamp-2">
                            {message.product.name}
                          </CardTitle>
                        </CardHeader>
                        <CardFooter className="p-3 pt-0 flex justify-between items-center">
                          <p className="font-medium text-primary">
                            Rp {message.product.price.toLocaleString()}
                          </p>
                          <Button size="sm" variant="secondary" className="h-8">
                            View
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {/* Service Request Message */}
                    {message.serviceRequest && (
                      <Card
                        className={`w-72 shadow-sm transition-all duration-300 hover:shadow-md ${
                          isUserMessage
                            ? "border-primary/20"
                            : "border-muted-foreground/20"
                        }`}
                      >
                        <CardHeader className="p-3 pb-2 bg-muted/30 dark:bg-muted/10">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              <Scissors className="h-3 w-3 mr-1" />
                              Service Request
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 space-y-3">
                          <div>
                            <h4 className="font-medium text-sm">
                              {message.serviceRequest.service.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {message.serviceRequest.service.description}
                            </p>
                          </div>

                          <div className="text-sm">
                            <p className="font-medium text-xs text-muted-foreground mb-1">
                              Details:
                            </p>
                            <p className="text-xs">
                              {message.serviceRequest.details}
                            </p>
                          </div>

                          {message.serviceRequest.measurements && (
                            <div>
                              <p className="font-medium text-xs text-muted-foreground mb-1 flex items-center">
                                <Ruler className="h-3 w-3 mr-1" />
                                Measurements:
                              </p>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                {Object.entries(
                                  message.serviceRequest.measurements
                                ).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex justify-between"
                                  >
                                    <span className="capitalize">{key}:</span>
                                    <span>{value} cm</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {message.serviceRequest.attachments &&
                            message.serviceRequest.attachments.length > 0 && (
                              <div>
                                <p className="font-medium text-xs text-muted-foreground mb-1 flex items-center">
                                  <ImageIcon className="h-3 w-3 mr-1" />
                                  Attachments:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {message.serviceRequest.attachments.map(
                                    (attachment) => (
                                      <Dialog key={attachment.id}>
                                        <DialogTrigger asChild>
                                          <div className="relative h-12 w-12 rounded overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                            {attachment.type === "image" ? (
                                              <Image
                                                src={
                                                  attachment.url ||
                                                  "/placeholder.svg" ||
                                                  "/placeholder.svg"
                                                }
                                                alt="Attachment"
                                                fill
                                                className="object-cover"
                                              />
                                            ) : (
                                              <div className="h-full w-full flex items-center justify-center bg-muted dark:bg-muted/50">
                                                <FileText className="h-6 w-6 text-muted-foreground" />
                                              </div>
                                            )}
                                          </div>
                                        </DialogTrigger>
                                        {attachment.type === "image" && (
                                          <DialogContent className="sm:max-w-3xl p-0 bg-background/95 backdrop-blur-sm dark:bg-background/90">
                                            <div className="relative aspect-auto max-h-[80vh]">
                                              <Image
                                                src={
                                                  attachment.url ||
                                                  "/placeholder.svg"
                                                }
                                                alt="Attachment"
                                                width={1200}
                                                height={800}
                                                className="object-contain w-full h-full"
                                              />
                                            </div>
                                          </DialogContent>
                                        )}
                                      </Dialog>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-3 pt-0 flex justify-between items-center border-t border-border/40">
                          <p className="font-medium text-primary">
                            Rp{" "}
                            {message.serviceRequest.service.price.toLocaleString()}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              Est.{" "}
                              {message.serviceRequest.service.estimatedDays}{" "}
                              days
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    )}

                    {/* Order Details Message */}
                    {message.orderDetails && (
                      <Card
                        className={`w-72 shadow-sm transition-all duration-300 hover:shadow-md ${
                          isUserMessage
                            ? "border-primary/20"
                            : "border-muted-foreground/20"
                        }`}
                      >
                        <CardHeader className="p-3 pb-2 bg-muted/30 dark:bg-muted/10">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              <ShoppingBag className="h-3 w-3 mr-1" />
                              Order #{message.orderDetails.orderId}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(
                                message.orderDetails.status
                              )} flex items-center gap-1`}
                            >
                              {getStatusIcon(message.orderDetails.status)}
                              {getStatusLabel(message.orderDetails.status)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 space-y-3">
                          <div>
                            <h4 className="font-medium text-sm">
                              {message.orderDetails.service.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {message.orderDetails.service.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-start gap-1">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-muted-foreground">
                                  Est. Completion:
                                </p>
                                <p>
                                  {message.orderDetails.estimatedCompletion}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-1">
                              <CreditCard className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-muted-foreground">
                                  Payment:
                                </p>
                                <p>Pending</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0 flex justify-between items-center border-t border-border/40">
                          <p className="font-medium text-primary">
                            Rp{" "}
                            {message.orderDetails.totalPrice.toLocaleString()}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {/* Message Time and Status */}
                    <div
                      className={`flex items-center text-xs text-muted-foreground ${
                        isUserMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span>{formatMessageTime(message.createdAt)}</span>
                      {isUserMessage && (
                        <span className="ml-1">
                          {message.read ? (
                            <CheckCheck className="h-3 w-3 text-primary" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}

      {/* Reference for scrolling to bottom */}
      <div ref={messagesEndRef} />

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="sm:max-w-3xl p-0 bg-background/95 backdrop-blur-sm dark:bg-background/90">
          {selectedImage && (
            <div className="relative aspect-auto max-h-[80vh]">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Shared image"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-10 w-10"
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-10 w-10"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
