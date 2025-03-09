"use client";

import type React from "react";

import { useState } from "react";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tailor } from "@/types/tailor";

interface TailorContactProps {
  tailor: Tailor;
}

export default function TailorContact({ tailor }: TailorContactProps) {
  const [messageType, setMessageType] = useState("general");
  const [message, setMessage] = useState("");

  // Get current day of week
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }) as
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";

  // Find today's business hours
  const todayHours = tailor.businessHours.find((hours) => hours.day === today);

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    // Simple formatting, can be adjusted based on your phone number format
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Message sent to ${tailor.name}!`);
    setMessage("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-bold mb-6">Contact Information</h3>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tailor.location.address}</p>
              <p>
                {tailor.location.city}, {tailor.location.province}
              </p>

              {tailor.location.coordinates && (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    const { latitude, longitude } =
                      tailor.location.coordinates!;
                    window.open(
                      `https://maps.google.com/?q=${latitude},${longitude}`,
                      "_blank"
                    );
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Business Hours
              </CardTitle>
              {todayHours && (
                <CardDescription>
                  {todayHours.isClosed
                    ? "Closed Today"
                    : `Open Today: ${todayHours.open} - ${todayHours.close}`}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tailor.businessHours.map((hours) => (
                  <div key={hours.day} className="flex justify-between text-sm">
                    <span className={hours.day === today ? "font-medium" : ""}>
                      {hours.day}
                    </span>
                    <span
                      className={
                        hours.day === today
                          ? "font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {hours.isClosed
                        ? "Closed"
                        : `${hours.open} - ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Phone</p>
                <a
                  href={`tel:${tailor.contact.phone}`}
                  className="flex items-center text-primary hover:underline"
                >
                  {formatPhoneNumber(tailor.contact.phone)}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              {tailor.contact.whatsapp && (
                <div>
                  <p className="text-sm font-medium mb-1">WhatsApp</p>
                  <a
                    href={`https://wa.me/${tailor.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    {formatPhoneNumber(tailor.contact.whatsapp)}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}

              {tailor.contact.email && (
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${tailor.contact.email}`}
                    className="flex items-center text-primary hover:underline"
                  >
                    {tailor.contact.email}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form */}
      <div>
        <h3 className="text-xl font-bold mb-6">Send a Message</h3>

        <Card>
          <CardHeader>
            <CardTitle>Contact {tailor.name}</CardTitle>
            <CardDescription>
              Fill out the form below to send a message directly to{" "}
              {tailor.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input id="name" placeholder="Enter your name" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Your Phone (optional)
                </label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>

              <div className="space-y-2">
                <label htmlFor="messageType" className="text-sm font-medium">
                  Message Type
                </label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger id="messageType">
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="quote">Request a Quote</SelectItem>
                    <SelectItem value="appointment">
                      Schedule Appointment
                    </SelectItem>
                    <SelectItem value="custom">Custom Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Your contact information will only be used to respond to your
            inquiry and will not be shared with third parties.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
