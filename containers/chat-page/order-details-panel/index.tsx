"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  ShoppingBag,
  Scissors,
  Clock,
  Calendar,
  CreditCard,
  Ruler,
  FileText,
  Upload,
  CheckCircle,
  Package,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ServiceRequest, OrderStatus } from "@/types/chat";

interface OrderDetailsPanelProps {
  serviceRequest: ServiceRequest;
  onStatusChange: (status: OrderStatus) => void;
}

export default function OrderDetailsPanel({
  serviceRequest,
  onStatusChange,
}: OrderDetailsPanelProps) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Format date from ISO string
  const formatDate = (isoString: string) => {
    return format(new Date(isoString), "MMMM d, yyyy");
  };

  // Get status badge color based on order status
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "ready_for_pickup":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
        return <Truck className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Get progress percentage based on status
  const getProgressPercentage = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return 10;
      case "accepted":
        return 25;
      case "in_progress":
        return 50;
      case "ready_for_pickup":
        return 75;
      case "completed":
        return 100;
      case "cancelled":
        return 0;
      default:
        return 0;
    }
  };

  // Handle cancel order
  const handleCancelOrder = () => {
    onStatusChange("cancelled");
    setCancelDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          Order Details
        </h2>
        <Badge
          variant="outline"
          className={`${getStatusColor(
            serviceRequest.status
          )} flex items-center gap-1 px-3 py-1`}
        >
          {getStatusIcon(serviceRequest.status)}
          {getStatusLabel(serviceRequest.status)}
        </Badge>
      </div>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base flex items-center">
            <Scissors className="h-4 w-4 mr-2 text-primary" />
            {serviceRequest.service.name}
          </CardTitle>
          <CardDescription>
            {serviceRequest.service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Order Progress</h4>
            <Progress
              value={getProgressPercentage(serviceRequest.status)}
              className="h-2"
            />
            <div className="grid grid-cols-5 text-xs text-muted-foreground mt-1">
              <div className="text-center">Pending</div>
              <div className="text-center">Accepted</div>
              <div className="text-center">In Progress</div>
              <div className="text-center">Ready</div>
              <div className="text-center">Completed</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Order Date</p>
              <p className="text-sm font-medium flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                {formatDate(serviceRequest.createdAt)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Estimated Completion
              </p>
              <p className="text-sm font-medium flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                {formatDate(
                  new Date(
                    new Date(serviceRequest.createdAt).getTime() +
                      serviceRequest.estimatedDays * 24 * 60 * 60 * 1000
                  ).toISOString()
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Payment Status</p>
              <p className="text-sm font-medium flex items-center">
                <CreditCard className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                {serviceRequest.paymentStatus || "Pending"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Price</p>
              <p className="text-sm font-bold text-primary">
                Rp {serviceRequest.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="text-base font-medium">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Service Details
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm">{serviceRequest.details}</p>
            </div>

            {serviceRequest.measurements &&
              Object.keys(serviceRequest.measurements).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <Ruler className="h-3.5 w-3.5 mr-1.5" />
                    Measurements
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(serviceRequest.measurements).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}:</span>
                          <span>{value} cm</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {serviceRequest.attachments &&
              serviceRequest.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    Attachments
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {serviceRequest.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="relative h-16 w-16 rounded-md overflow-hidden border"
                      >
                        {attachment.type === "image" ? (
                          <Image
                            src={attachment.url || "/placeholder.svg"}
                            alt="Attachment"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-muted">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-3">
        {serviceRequest.status === "pending" && (
          <Button variant="default" onClick={() => onStatusChange("accepted")}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept Order
          </Button>
        )}

        {serviceRequest.status === "accepted" && (
          <Button
            variant="default"
            onClick={() => onStatusChange("in_progress")}
          >
            <Scissors className="h-4 w-4 mr-2" />
            Start Working
          </Button>
        )}

        {serviceRequest.status === "in_progress" && (
          <Button
            variant="default"
            onClick={() => onStatusChange("ready_for_pickup")}
          >
            <Package className="h-4 w-4 mr-2" />
            Mark as Ready
          </Button>
        )}

        {serviceRequest.status === "ready_for_pickup" && (
          <Button variant="default" onClick={() => onStatusChange("completed")}>
            <Truck className="h-4 w-4 mr-2" />
            Complete Order
          </Button>
        )}

        {(serviceRequest.status === "pending" ||
          serviceRequest.status === "accepted") && (
          <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this order? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCancelDialogOpen(false)}
                >
                  No, Keep Order
                </Button>
                <Button variant="destructive" onClick={handleCancelOrder}>
                  Yes, Cancel Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
