"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  CheckCircle,
  Calendar,
  Truck,
  Package,
  User,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Trade } from "@/types/trade";

interface TradeActionsProps {
  trade: Trade;
  onTradeUpdate: (updatedTrade: Trade) => void;
}

export default function TradeActions({
  trade,
  onTradeUpdate,
}: TradeActionsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [exchangeMethod, setExchangeMethod] = useState<
    "pickup" | "delivery" | "shipping"
  >("pickup");
  const [meetupLocation, setMeetupLocation] = useState({
    address: "",
    city: "",
  });
  const [shippingDetails, setShippingDetails] = useState({
    courier: "",
    trackingNumber: "",
  });

  // Handle trade completion
  const handleCompleteTrade = () => {
    // In a real app, this would be an API call
    const additionalData: any = {
      completedAt: new Date().toISOString(),
      shippingMethod: {
        method: exchangeMethod,
      },
    };

    if (exchangeMethod === "pickup" || exchangeMethod === "delivery") {
      additionalData.meetupLocation = {
        ...meetupLocation,
        coordinate: { lat: 0, lng: 0 }, // This would be set by a map picker in a real app
      };
    } else if (exchangeMethod === "shipping") {
      additionalData.shippingMethod = {
        ...additionalData.shippingMethod,
        ...shippingDetails,
      };
    }

    const updatedTrade: Trade = {
      ...trade,
      ...additionalData,
      updatedAt: new Date().toISOString(),
    };

    onTradeUpdate(updatedTrade);
    setIsCompleteDialogOpen(false);
  };

  // Get action buttons based on trade completion status
  const getActionButtons = () => {
    if (!trade.completedAt) {
      return (
        <Button
          className="w-full gap-2 bg-green-500 hover:bg-green-600"
          onClick={() => setIsCompleteDialogOpen(true)}
        >
          <CheckCircle className="w-5 h-5" />
          Complete Trade
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Trade Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className={cn(
            "overflow-hidden border-2",
            trade.completedAt
              ? "border-green-200 dark:border-green-800"
              : "border-blue-200 dark:border-blue-800"
          )}
        >
          <div
            className={cn(
              "py-3 px-4 flex items-center justify-between",
              trade.completedAt
                ? "bg-green-50 dark:bg-green-950"
                : "bg-blue-50 dark:bg-blue-950"
            )}
          >
            <div className="flex items-center gap-2">
              {trade.completedAt ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-blue-500" />
              )}
              <h3 className="font-medium">
                Trade {trade.completedAt ? "Completed" : "In Progress"}
              </h3>
            </div>
            <Badge
              className={cn(trade.completedAt ? "bg-green-500" : "bg-blue-500")}
            >
              {trade.completedAt ? "Completed" : "Active"}
            </Badge>
          </div>

          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Trade ID</div>
                <div className="font-medium">#{trade.id.slice(-6)}</div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Initiator</div>
                <div className="font-medium">{trade.initiator.user.name}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Interested Products
                </div>
                <div className="font-medium">
                  {trade.initiator.interestedProducts.length}
                </div>
              </div>

              {trade.completedAt && (
                <>
                  <Separator />

                  {trade.shippingMethod && (
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Exchange Method
                      </div>
                      <div className="font-medium capitalize">
                        {trade.shippingMethod.method}
                      </div>
                    </div>
                  )}

                  {trade.meetupLocation && (
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Location
                      </div>
                      <div className="font-medium">
                        {trade.meetupLocation.city}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Completed On
                    </div>
                    <div className="font-medium">
                      {new Date(trade.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>

          {getActionButtons() && (
            <CardFooter className="p-4 pt-0 flex flex-col gap-3">
              {getActionButtons()}
            </CardFooter>
          )}
        </Card>
      </motion.div>

      {/* Trade Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Trade Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ol className="relative border-l border-muted-foreground/20 ml-3 space-y-6">
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3">
                  <Calendar className="w-3 h-3 text-primary-foreground" />
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">
                  Trade Created
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                  {new Date(trade.createdAt).toLocaleString()}
                </time>
                <p className="text-sm">
                  {trade.initiator.user.name} created a trade offering{" "}
                  {trade.initiator.offeredProduct.name}
                  {trade.initiator.interestedProducts.length > 0
                    ? ` and is interested in ${trade.initiator.interestedProducts.length} product(s)`
                    : " and is open to offers"}
                </p>
              </li>

              {trade.completedAt && (
                <li className="mb-6 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-500 rounded-full -left-3">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold">
                    Trade Completed
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                    {new Date(trade.completedAt).toLocaleString()}
                  </time>
                  <p className="text-sm">
                    The trade has been successfully completed.
                  </p>
                </li>
              )}
            </ol>
          </CardContent>
        </Card>
      </motion.div>

      {/* Complete Trade Dialog */}
      <Dialog
        open={isCompleteDialogOpen}
        onOpenChange={setIsCompleteDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Trade</DialogTitle>
            <DialogDescription>
              Choose how you exchanged the items and mark this trade as
              completed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <RadioGroup
              value={exchangeMethod}
              onValueChange={(value) =>
                setExchangeMethod(value as "pickup" | "delivery" | "shipping")
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label
                  htmlFor="pickup"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  In-person Pickup
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label
                  htmlFor="delivery"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  Local Delivery
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shipping" id="shipping" />
                <Label
                  htmlFor="shipping"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Shipping
                </Label>
              </div>
            </RadioGroup>

            {(exchangeMethod === "pickup" || exchangeMethod === "delivery") && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="address">Meetup Address</Label>
                  <Input
                    id="address"
                    value={meetupLocation.address}
                    onChange={(e) =>
                      setMeetupLocation({
                        ...meetupLocation,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter address"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={meetupLocation.city}
                    onChange={(e) =>
                      setMeetupLocation({
                        ...meetupLocation,
                        city: e.target.value,
                      })
                    }
                    placeholder="Enter city"
                  />
                </div>
              </div>
            )}

            {exchangeMethod === "shipping" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="courier">Courier Service</Label>
                  <Input
                    id="courier"
                    value={shippingDetails.courier}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        courier: e.target.value,
                      })
                    }
                    placeholder="Enter courier service"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="tracking">Tracking Number (optional)</Label>
                  <Input
                    id="tracking"
                    value={shippingDetails.trackingNumber}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        trackingNumber: e.target.value,
                      })
                    }
                    placeholder="Enter tracking number"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCompleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCompleteTrade}
              disabled={
                (exchangeMethod === "pickup" ||
                  exchangeMethod === "delivery") &&
                (!meetupLocation.address || !meetupLocation.city)
              }
              className="bg-green-500 hover:bg-green-600"
            >
              Complete Trade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
