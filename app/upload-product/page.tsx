"use client"

import type React from "react"

import { AlertCircle, Check, DollarSign, Plus, Shirt, Sparkles, Tag, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Predefined options
const CATEGORIES = [
    { value: "accessories", label: "Accessories" },
    { value: "bottoms", label: "Bottoms" },
    { value: "dresses", label: "Dresses" },
    { value: "outerwear", label: "Outerwear" },
    { value: "shoes", label: "Shoes" },
    { value: "tops", label: "Tops" },
]

const SIZES = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
    { value: "xxl", label: "XXL" },
]

const CONDITIONS = [
    { value: "new_with_tags", label: "New with tags" },
    { value: "new_without_tags", label: "New without tags" },
    { value: "very_good", label: "Very good" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
]

const COLORS = [
    { value: "black", label: "Black", hex: "#000000" },
    { value: "white", label: "White", hex: "#FFFFFF" },
    { value: "red", label: "Red", hex: "#FF0000" },
    { value: "blue", label: "Blue", hex: "#0000FF" },
    { value: "green", label: "Green", hex: "#008000" },
    { value: "yellow", label: "Yellow", hex: "#FFFF00" },
    { value: "purple", label: "Purple", hex: "#800080" },
    { value: "pink", label: "Pink", hex: "#FFC0CB" },
    { value: "orange", label: "Orange", hex: "#FFA500" },
    { value: "brown", label: "Brown", hex: "#A52A2A" },
    { value: "gray", label: "Gray", hex: "#808080" },
    { value: "beige", label: "Beige", hex: "#F5F5DC" },
]

export default function UploadProductPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Form state
    const [images, setImages] = useState<{ file: File; preview: string }[]>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [condition, setCondition] = useState("")
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [price, setPrice] = useState("")
    const [forSale, setForSale] = useState(true)
    const [forTrade, setForTrade] = useState(false)

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [dragActive, setDragActive] = useState(false)

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const newImages = Array.from(files).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }))

        if (images.length + newImages.length > 10) {
            setErrors({
                ...errors,
                images: "Maximum 10 images allowed",
            })
            return
        }

        setImages([...images, ...newImages])

        // Clear any previous errors
        if (errors.images) {
            const { images: _, ...restErrors } = errors
            setErrors(restErrors)
        }
    }

    // Handle image removal
    const handleRemoveImage = (index: number) => {
        const newImages = [...images]
        URL.revokeObjectURL(newImages[index].preview)
        newImages.splice(index, 1)
        setImages(newImages)
    }

    // Handle drag events
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    // Handle drop event
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }))

            if (images.length + droppedFiles.length > 10) {
                setErrors({
                    ...errors,
                    images: "Maximum 10 images allowed",
                })
                return
            }

            setImages([...images, ...droppedFiles])

            // Clear any previous errors
            if (errors.images) {
                const { images: _, ...restErrors } = errors
                setErrors(restErrors)
            }
        }
    }

    // Toggle color selection
    const toggleColor = (colorValue: string) => {
        setSelectedColors((prev) =>
            prev.includes(colorValue) ? prev.filter((c) => c !== colorValue) : [...prev, colorValue],
        )
    }

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (images.length === 0) {
            newErrors.images = "At least one image is required"
        }

        if (!title.trim()) {
            newErrors.title = "Title is required"
        }

        if (!description.trim()) {
            newErrors.description = "Description is required"
        }

        if (!category) {
            newErrors.category = "Category is required"
        }

        if (!size) {
            newErrors.size = "Size is required"
        }

        if (!condition) {
            newErrors.condition = "Condition is required"
        }

        if (selectedColors.length === 0) {
            newErrors.colors = "At least one color is required"
        }

        if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
            newErrors.price = "Valid price is required"
        }

        // Add validation for availability options
        if (!forSale && !forTrade) {
            newErrors.availability = "You must select at least one availability option"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            // Scroll to the first error
            const firstErrorField = Object.keys(errors)[0]
            const errorElement = document.getElementById(firstErrorField)
            errorElement?.scrollIntoView({ behavior: "smooth", block: "center" })
            return
        }

        setIsSubmitting(true)

        try {
            // In a real app, you would upload the images and submit the form data to your API
            await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

            setShowSuccessDialog(true)
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrors({
                ...errors,
                form: "Failed to submit form. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle redirect after successful submission
    const handleSuccessClose = () => {
        setShowSuccessDialog(false)
        router.push("/")
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                            <span className="tracking-wider">SELL OR TRADE</span>
                            <Sparkles className="w-4 h-4 ml-2" />
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Upload Your Product</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Share your fashion items with our community. Fill in the details below to list your item for sale or
                            trade.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Image Upload Section */}
                        <Card id="images">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-primary" />
                                    Product Images
                                </CardTitle>
                                <CardDescription>Upload up to 10 high-quality images of your product</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 transition-colors ${dragActive
                                            ? "border-primary bg-primary/5"
                                            : errors.images
                                                ? "border-destructive bg-destructive/5"
                                                : "border-border hover:border-primary/50 hover:bg-accent"
                                        }`}
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className="text-center">
                                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg font-medium mb-1">Drag & drop your images here</h3>
                                        <p className="text-muted-foreground mb-4">or click to browse files</p>
                                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Select Files
                                        </Button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                        <p className="text-xs text-muted-foreground mt-4">
                                            Supported formats: JPEG, PNG, WebP • Max 10 images • Max 5MB per image
                                        </p>
                                    </div>
                                </div>

                                {errors.images && (
                                    <p className="text-sm text-destructive mt-2 flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.images}
                                    </p>
                                )}

                                {/* Image Previews */}
                                {images.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium mb-3">Uploaded Images ({images.length}/10)</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative group aspect-square">
                                                    <div className="relative h-full w-full rounded-md overflow-hidden border">
                                                        <Image
                                                            src={image.preview || "/placeholder.svg"}
                                                            alt={`Product image ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Remove image</span>
                                                    </button>
                                                    {index === 0 && <Badge className="absolute bottom-2 left-2 bg-primary/80">Main Image</Badge>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Product Details Section */}
                        <Card id="details">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5 text-primary" />
                                    Product Details
                                </CardTitle>
                                <CardDescription>Provide detailed information about your product</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-base">
                                        Title <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Vintage Denim Jacket"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={errors.title ? "border-destructive" : ""}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-base">
                                        Description <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your item, including details about material, fit, and condition..."
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className={errors.description ? "border-destructive" : ""}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-base">
                                        Category <span className="text-destructive">*</span>
                                    </Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                {/* Brand */}
                                <div className="space-y-2">
                                    <Label htmlFor="brand" className="text-base">
                                        Brand
                                    </Label>
                                    <Input
                                        id="brand"
                                        placeholder="e.g., Levi's, Zara, H&M"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </div>

                                {/* Size */}
                                <div className="space-y-2">
                                    <Label htmlFor="size" className="text-base">
                                        Size <span className="text-destructive">*</span>
                                    </Label>
                                    <Select value={size} onValueChange={setSize}>
                                        <SelectTrigger id="size" className={errors.size ? "border-destructive" : ""}>
                                            <SelectValue placeholder="Select a size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SIZES.map((sizeOption) => (
                                                <SelectItem key={sizeOption.value} value={sizeOption.value}>
                                                    {sizeOption.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.size && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.size}
                                        </p>
                                    )}
                                </div>

                                {/* Condition */}
                                <div className="space-y-2">
                                    <Label htmlFor="condition" className="text-base">
                                        Condition <span className="text-destructive">*</span>
                                    </Label>
                                    <RadioGroup
                                        value={condition}
                                        onValueChange={setCondition}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                                    >
                                        {CONDITIONS.map((condOption) => (
                                            <div key={condOption.value} className="flex items-center space-x-2">
                                                <RadioGroupItem value={condOption.value} id={`condition-${condOption.value}`} />
                                                <Label htmlFor={`condition-${condOption.value}`} className="cursor-pointer">
                                                    {condOption.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {errors.condition && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.condition}
                                        </p>
                                    )}
                                </div>

                                {/* Colors */}
                                <div className="space-y-2" id="colors">
                                    <Label className="text-base">
                                        Colors <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                        {COLORS.map((colorOption) => (
                                            <div
                                                key={colorOption.value}
                                                className={`
                          relative flex flex-col items-center p-2 rounded-md cursor-pointer transition-all
                          ${selectedColors.includes(colorOption.value)
                                                        ? "bg-primary/10 border-2 border-primary"
                                                        : "bg-background border-2 border-border hover:border-primary/50"
                                                    }
                        `}
                                                onClick={() => toggleColor(colorOption.value)}
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full mb-1 border"
                                                    style={{ backgroundColor: colorOption.hex }}
                                                />
                                                <span className="text-xs">{colorOption.label}</span>
                                                {selectedColors.includes(colorOption.value) && (
                                                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-0.5">
                                                        <Check className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.colors && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.colors}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing Section */}
                        <Card id="pricing">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    Pricing & Availability
                                </CardTitle>
                                <CardDescription>Set your price and availability options</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-base">
                                        Price (IDR) <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className={`pl-10 ${errors.price ? "border-destructive" : ""}`}
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-sm text-destructive flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                {/* Availability Options */}
                                <div className="space-y-4">
                                    <Label className="text-base">
                                        Availability <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="for-sale"
                                                checked={forSale}
                                                onCheckedChange={(checked) => setForSale(checked as boolean)}
                                            />
                                            <Label htmlFor="for-sale" className="cursor-pointer">
                                                Available for sale
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="for-trade"
                                                checked={forTrade}
                                                onCheckedChange={(checked) => setForTrade(checked as boolean)}
                                            />
                                            <Label htmlFor="for-trade" className="cursor-pointer">
                                                Available for trade
                                            </Label>
                                        </div>
                                    </div>
                                    {errors.availability && (
                                        <p className="text-sm text-destructive flex items-center mt-2">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.availability}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form Error */}
                        {errors.form && (
                            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md flex items-start">
                                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                <p>{errors.form}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[150px]">
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="animate-spin mr-2">⏳</span>
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Shirt className="mr-2 h-5 w-5" />
                                                        Upload Product
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-primary text-primary-foreground border-primary">
                                        <p>Submit your product listing</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </form>
                </div>
            </main>

            {/* Success Dialog */}
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            Product Uploaded Successfully!
                        </DialogTitle>
                        <DialogDescription>
                            Your product has been successfully uploaded and is now available on Thriftinity.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <div className="relative w-32 h-32">
                            <Image
                                src={images[0]?.preview || "/placeholder.svg?height=128&width=128"}
                                alt="Product thumbnail"
                                fill
                                className="object-cover rounded-md"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm rounded-md">
                                <Check className="h-12 w-12 text-primary-foreground" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center space-y-1 mb-4">
                        <h3 className="font-medium">{title}</h3>
                        <p className="text-primary font-bold">IDR {Number(price).toLocaleString()}</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSuccessClose} className="w-full">
                            Go to Home Page
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

