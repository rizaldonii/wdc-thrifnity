"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  ImageIcon,
  X,
  Camera,
  FileText,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageInputProps {
  onSendMessage: (text: string, image?: File) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle text input changes
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Only image files are supported");
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if ((!message.trim() && !selectedImage) || isRecording) return;

    onSendMessage(message, selectedImage || undefined);
    setMessage("");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger file input click
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Toggle voice recording
  const handleToggleRecording = () => {
    // In a real app, this would handle voice recording
    setIsRecording(!isRecording);
  };

  // Auto-resize textarea
  const handleTextareaResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t p-3">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <div className="relative h-24 w-24 rounded-md overflow-hidden border">
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Selected image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-sm"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Attachment Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full flex-shrink-0"
            >
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Add attachment</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-56 p-2">
            <div className="grid grid-cols-3 gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center justify-center h-16 rounded-md"
                      onClick={handleAttachClick}
                    >
                      <ImageIcon className="h-6 w-6 mb-1" />
                      <span className="text-xs">Image</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send an image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center justify-center h-16 rounded-md"
                    >
                      <Camera className="h-6 w-6 mb-1" />
                      <span className="text-xs">Camera</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Take a photo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center justify-center h-16 rounded-md"
                    >
                      <FileText className="h-6 w-6 mb-1" />
                      <span className="text-xs">Document</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send a document</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center justify-center h-16 rounded-md"
                    >
                      <ShoppingBag className="h-6 w-6 mb-1" />
                      <span className="text-xs">Product</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share a product</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </PopoverContent>
        </Popover>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => {
              handleMessageChange(e);
              handleTextareaResize(e);
            }}
            placeholder="Type a message..."
            className="min-h-[40px] max-h-[120px] py-2 pr-10 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-1 h-8 w-8 rounded-full"
          >
            <Smile className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Add emoji</span>
          </Button>
        </div>

        {/* Voice Message Button */}
        <Button
          type="button"
          variant={isRecording ? "destructive" : "ghost"}
          size="icon"
          className="rounded-full flex-shrink-0"
          onClick={handleToggleRecording}
        >
          <Mic className="h-5 w-5" />
          <span className="sr-only">
            {isRecording ? "Stop recording" : "Record voice message"}
          </span>
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="rounded-full flex-shrink-0"
          disabled={(!message.trim() && !selectedImage) || isRecording}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
