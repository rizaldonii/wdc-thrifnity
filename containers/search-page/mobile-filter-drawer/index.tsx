"use client";

import { useEffect } from "react";
import { useProductFilter } from "@/contexts/product-filter-context";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import SearchFilterSidebar from "../search-filter-sidebar";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
}: MobileFilterDrawerProps) {
  const { filteredProducts } = useProductFilter();

  // Close drawer when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </SheetHeader>

        <div className="overflow-y-auto h-[calc(100vh-10rem)] p-4">
          <SearchFilterSidebar />
        </div>

        <SheetFooter className="p-4 border-t">
          <Button onClick={onClose} className="w-full">
            Show {filteredProducts.length} Results
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
