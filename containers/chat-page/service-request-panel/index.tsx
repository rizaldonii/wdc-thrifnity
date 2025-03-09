"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Scissors,
  Clock,
  Ruler,
  Upload,
  FileText,
  X,
  Calendar,
  Info,
  CheckCircle,
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServicePrice } from "@/types/tailor";

interface ServiceRequestPanelProps {
  tailor: {
    id: string;
    name: string;
    businessName: string;
  };
  services: ServicePrice[];
}

export default function ServiceRequestPanel({
  tailor,
  services,
}: ServiceRequestPanelProps) {
  const [selectedService, setSelectedService] = useState<ServicePrice | null>(
    null
  );
  const [details, setDetails] = useState("");
  const [measurements, setMeasurements] = useState<{ [key: string]: number }>({
    chest: 0,
    waist: 0,
    hips: 0,
    length: 0,
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [step, setStep] = useState<"service" | "details" | "review">("service");

  // Handle service selection
  const handleServiceSelect = (service: ServicePrice) => {
    setSelectedService(service);
    setStep("details");
  };

  // Handle measurement change
  const handleMeasurementChange = (key: string, value: string) => {
    setMeasurements({
      ...measurements,
      [key]: Number.parseFloat(value) || 0,
    });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setAttachments([...attachments, ...newFiles]);

    // Create previews for images
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setAttachmentPreviews([...attachmentPreviews, ...newPreviews]);
  };

  // Remove attachment
  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);

    const newPreviews = [...attachmentPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setAttachmentPreviews(newPreviews);
  };

  // Submit service request
  const handleSubmit = () => {
    // In a real app, this would send the request to the server
    alert("Service request submitted!");

    // Reset form
    setSelectedService(null);
    setDetails("");
    setMeasurements({
      chest: 0,
      waist: 0,
      hips: 0,
      length: 0,
    });
    setAttachments([]);
    setAttachmentPreviews([]);
    setStep("service");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Request a Service</h2>
        {step !== "service" && (
          <Button variant="ghost" size="sm" onClick={() => setStep("service")}>
            Back to Services
          </Button>
        )}
      </div>

      {step === "service" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-muted-foreground mb-4">
            Select a service to request from {tailor.businessName}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card
                key={service.id}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleServiceSelect(service)}
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Scissors className="h-4 w-4 mr-2 text-primary" />
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between items-center">
                  <p className="font-medium text-primary">
                    Rp {service.price.toLocaleString()}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Est. {service.estimatedDays} days</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {step === "details" && selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader className="p-4 pb-2 bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center">
                  <Scissors className="h-4 w-4 mr-2 text-primary" />
                  {selectedService.name}
                </CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Rp {selectedService.price.toLocaleString()}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {selectedService.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <div>
              <Label htmlFor="details" className="text-base font-medium">
                Service Details
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Describe what you need in detail
              </p>
              <Textarea
                id="details"
                placeholder="Describe your requirements, preferences, and any special instructions..."
                className="min-h-[120px]"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="measurements">
                <AccordionTrigger className="text-base font-medium">
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2" />
                    Measurements
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Provide your measurements for a better fit
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(measurements).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label
                          htmlFor={`measurement-${key}`}
                          className="capitalize"
                        >
                          {key} (cm)
                        </Label>
                        <Input
                          id={`measurement-${key}`}
                          type="number"
                          min="0"
                          step="0.1"
                          value={value || ""}
                          onChange={(e) =>
                            handleMeasurementChange(key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div>
              <Label className="text-base font-medium">Attachments</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Upload images or documents
              </p>

              <div className="grid grid-cols-4 gap-2 mb-3">
                {attachmentPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative h-20 w-20 rounded-md overflow-hidden border"
                  >
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt={`Attachment ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-background/80"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove attachment</span>
                    </Button>
                  </div>
                ))}

                <label className="h-20 w-20 rounded-md border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full"
                onClick={() => setStep("review")}
                disabled={!details.trim()}
              >
                Continue to Review
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {step === "review" && selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Review Your Request</CardTitle>
              <CardDescription>
                Please review your service request details before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-sm flex items-center">
                  <Scissors className="h-4 w-4 mr-2 text-primary" />
                  Service
                </h4>
                <p className="mt-1">{selectedService.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedService.description}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-sm flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  Details
                </h4>
                <p className="mt-1 text-sm">{details}</p>
              </div>

              {Object.values(measurements).some((m) => m > 0) && (
                <>
                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      <Ruler className="h-4 w-4 mr-2 text-primary" />
                      Measurements
                    </h4>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(measurements)
                        .filter(([_, value]) => value > 0)
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span>{value} cm</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}

              {attachmentPreviews.length > 0 && (
                <>
                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      <Upload className="h-4 w-4 mr-2 text-primary" />
                      Attachments
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {attachmentPreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative h-16 w-16 rounded-md overflow-hidden border"
                        >
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt={`Attachment ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Estimated Completion
                  </h4>
                  <p className="mt-1 text-sm">
                    {new Date(
                      Date.now() +
                        selectedService.estimatedDays * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({selectedService.estimatedDays} days)
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <h4 className="font-medium text-sm">Total Price</h4>
                  <p className="mt-1 text-lg font-bold text-primary">
                    Rp {selectedService.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm bg-muted/30 p-3 rounded-md">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  By submitting this request, you agree to the terms and
                  conditions of {tailor.businessName}. The tailor will review
                  your request and respond with confirmation or questions.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("details")}
                >
                  Edit Request
                </Button>
                <Button className="flex-1 gap-1" onClick={handleSubmit}>
                  <CheckCircle className="h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
