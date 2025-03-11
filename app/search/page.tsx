"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import { tailors } from "@/data/tailors"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { useDebounce } from "@/hooks/use-debounce"
import { useMobile } from "@/hooks/use-mobile"
import type { Tailor } from "@/types/tailor"
import { ProductFilterProvider } from "@/contexts/product-filter-context"
import SearchHeader from "@/containers/search-page/search-header"
import SearchFilterSidebar from "@/containers/search-page/search-filter-sidebar"
import SearchResults from "@/containers/search-page/search-results"
import MobileFilterDrawer from "@/containers/search-page/mobile-filter-drawer"

// Extract unique specialties and tags for filtering
const allSpecialties = Array.from(new Set(tailors.flatMap((tailor) => tailor.specialty)))
const allTags = Array.from(new Set(tailors.flatMap((tailor) => tailor.tags)))

// Extract unique locations
const allLocations = Array.from(
  new Set(tailors.map((tailor) => `${tailor.location.city}, ${tailor.location.province}`)),
)

// Price ranges
const priceRanges = [
  { min: 0, max: 100000, label: "Under Rp 100,000" },
  { min: 100000, max: 250000, label: "Rp 100,000 - Rp 250,000" },
  { min: 250000, max: 500000, label: "Rp 250,000 - Rp 500,000" },
  { min: 500000, max: 1000000, label: "Rp 500,000 - Rp 1,000,000" },
  { min: 1000000, max: Number.POSITIVE_INFINITY, label: "Above Rp 1,000,000" },
]

// Loading fallback component
function SearchPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-12 bg-muted/40 rounded-md mb-6 animate-pulse"></div>
      <div className="lg:grid lg:grid-cols-4 lg:gap-8 mt-6">
        <div className="lg:hidden mb-4">
          <div className="h-10 bg-muted/40 rounded-md w-full animate-pulse"></div>
        </div>
        <div className="hidden lg:block lg:col-span-1">
          <div className="h-96 bg-muted/40 rounded-md animate-pulse"></div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted/40 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Client component that uses useSearchParams
function SearchPageContent() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const isMobile = useMobile()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Get current sort option from URL
  const currentSort = searchParams.get("sort") || "newest"

  // Get search query from URL
  const query = searchParams.get("q") || ""

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  // Get initial search query from URL
  const initialQuery = searchParams.get("q") || ""
  const initialSpecialty = searchParams.get("specialty") || ""
  const initialLocation = searchParams.get("location") || ""

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialQuery)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(initialSpecialty ? [initialSpecialty] : [])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialLocation ? [initialLocation] : [])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>("relevance")
  const [filteredTailors, setFilteredTailors] = useState<Tailor[]>(tailors)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Debounce search query to avoid excessive filtering
  const debouncedQuery = useDebounce(searchQuery, 300)

  // Update debounced search query when the debounced value changes
  useEffect(() => {
    setDebouncedSearchQuery(debouncedQuery)
  }, [debouncedQuery])

  // Count active filters
  useEffect(() => {
    let count = 0
    if (debouncedSearchQuery) count++
    if (selectedSpecialties.length > 0) count++
    if (selectedTags.length > 0) count++
    if (selectedLocations.length > 0) count++
    if (selectedPriceRanges.length > 0) count++
    if (minRating !== null) count++
    if (verifiedOnly) count++

    setActiveFiltersCount(count)
  }, [
    debouncedSearchQuery,
    selectedSpecialties,
    selectedTags,
    selectedLocations,
    selectedPriceRanges,
    minRating,
    verifiedOnly,
  ])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tailors]

    // Apply search filter
    if (debouncedSearchQuery) {
      const searchTerms = debouncedSearchQuery.toLowerCase().split(" ")
      result = result.filter((tailor) => {
        const searchableText = `
          ${tailor.name.toLowerCase()} 
          ${tailor.location.city.toLowerCase()} 
          ${tailor.location.province.toLowerCase()} 
          ${tailor.specialty.join(" ").toLowerCase()} 
          ${tailor.tags.join(" ").toLowerCase()} 
          ${tailor.description.toLowerCase()}
        `
        return searchTerms.every((term) => searchableText.includes(term))
      })
    }

    // Apply specialty filter
    if (selectedSpecialties.length > 0) {
      result = result.filter((tailor) => selectedSpecialties.some((specialty) => tailor.specialty.includes(specialty)))
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      result = result.filter((tailor) => selectedTags.some((tag) => tailor.tags.includes(tag)))
    }

    // Apply location filter
    if (selectedLocations.length > 0) {
      result = result.filter((tailor) => {
        const tailorLocation = `${tailor.location.city}, ${tailor.location.province}`
        return selectedLocations.includes(tailorLocation)
      })
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((tailor) => {
        // Find the average price of tailor's services
        const avgPrice = tailor.services.reduce((sum, service) => sum + service.price, 0) / tailor.services.length

        return selectedPriceRanges.some((rangeIndex) => {
          const range = priceRanges[rangeIndex]
          return avgPrice >= range.min && avgPrice <= range.max
        })
      })
    }

    // Apply rating filter
    if (minRating !== null) {
      result = result.filter((tailor) => tailor.rating >= minRating)
    }

    // Apply verified filter
    if (verifiedOnly) {
      result = result.filter((tailor) => tailor.isVerified)
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.totalReviews - a.totalReviews)
        break
      case "experience":
        result.sort((a, b) => b.experience - a.experience)
        break
      case "price_low":
        result.sort((a, b) => {
          const avgPriceA = a.services.reduce((sum, service) => sum + service.price, 0) / a.services.length
          const avgPriceB = b.services.reduce((sum, service) => sum + service.price, 0) / b.services.length
          return avgPriceA - avgPriceB
        })
        break
      case "price_high":
        result.sort((a, b) => {
          const avgPriceA = a.services.reduce((sum, service) => sum + service.price, 0) / a.services.length
          const avgPriceB = b.services.reduce((sum, service) => sum + service.price, 0) / b.services.length
          return avgPriceB - avgPriceA
        })
        break
      case "relevance":
      default:
        // For relevance, we keep the order but prioritize verified tailors
        result.sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0))
        break
    }

    setFilteredTailors(result)

    // Update URL with search parameters
    const params = new URLSearchParams()
    if (debouncedSearchQuery) params.set("q", debouncedSearchQuery)
    if (selectedSpecialties.length === 1) params.set("specialty", selectedSpecialties[0])
    if (selectedLocations.length === 1) params.set("location", selectedLocations[0])

    const url = `/search${params.toString() ? `?${params.toString()}` : ""}`
    router.replace(url, { scroll: false })
  }, [
    debouncedSearchQuery,
    selectedSpecialties,
    selectedTags,
    selectedLocations,
    selectedPriceRanges,
    minRating,
    verifiedOnly,
    sortBy,
    router,
  ])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedSpecialties([])
    setSelectedTags([])
    setSelectedLocations([])
    setSelectedPriceRanges([])
    setMinRating(null)
    setVerifiedOnly(false)
    setSortBy("relevance")
  }

  // Toggle specialty selection
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Toggle location selection
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  // Toggle price range selection
  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Remove a specific filter
  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case "search":
        setSearchQuery("")
        break
      case "specialty":
        if (value) {
          setSelectedSpecialties((prev) => prev.filter((s) => s !== value))
        }
        break
      case "tag":
        if (value) {
          setSelectedTags((prev) => prev.filter((t) => t !== value))
        }
        break
      case "location":
        if (value) {
          setSelectedLocations((prev) => prev.filter((l) => l !== value))
        }
        break
      case "price":
        if (value !== undefined) {
          setSelectedPriceRanges((prev) => prev.filter((i) => i !== Number.parseInt(value)))
        }
        break
      case "rating":
        setMinRating(null)
        break
      case "verified":
        setVerifiedOnly(false)
        break
    }
  }

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Child item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <ProductFilterProvider>
      <main className="container mx-auto px-4 py-8">
        <SearchHeader onSortChange={handleSortChange} currentSort={currentSort} initialQuery={query} />

        <div className="lg:grid lg:grid-cols-4 lg:gap-8 mt-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <SearchFilterSidebar />
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} />

          {/* Search Results */}
          <div className="lg:col-span-3">
            <SearchResults />
          </div>
        </div>
      </main>
    </ProductFilterProvider>
  )
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  )
}

// Helper function to get sort label
function getSortLabel(sortBy: string): string {
  switch (sortBy) {
    case "rating":
      return "Highest Rating"
    case "reviews":
      return "Most Reviews"
    case "price_low":
      return "Price: Low to High"
    case "price_high":
      return "Price: High to Low"
    case "experience":
      return "Most Experience"
    case "relevance":
    default:
      return "Relevance"
  }
}

// Mobile Filters Component
function MobileFilters({
  selectedSpecialties,
  selectedTags,
  selectedLocations,
  selectedPriceRanges,
  minRating,
  verifiedOnly,
  toggleSpecialty,
  toggleTag,
  toggleLocation,
  togglePriceRange,
  setMinRating,
  setVerifiedOnly,
}: {
  selectedSpecialties: string[]
  selectedTags: string[]
  selectedLocations: string[]
  selectedPriceRanges: number[]
  minRating: number | null
  verifiedOnly: boolean
  toggleSpecialty: (specialty: string) => void
  toggleTag: (tag: string) => void
  toggleLocation: (location: string) => void
  togglePriceRange: (index: number) => void
  setMinRating: (rating: number | null) => void
  setVerifiedOnly: (verified: boolean) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Specialties</h3>
        <div className="space-y-2">
          {allSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <Checkbox
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => toggleSpecialty(specialty)}
              />
              <label
                htmlFor={`specialty-${specialty}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Location</h3>
        <div className="space-y-2">
          {allLocations.map((location) => (
            <div key={location} className="flex items-center">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <label
                htmlFor={`location-${location}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                id={`price-${index}`}
                checked={selectedPriceRanges.includes(index)}
                onCheckedChange={() => togglePriceRange(index)}
              />
              <label
                htmlFor={`price-${index}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={minRating === rating ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setMinRating(minRating === rating ? null : rating)}
              >
                {rating}
              </Button>
            ))}
            <span className="text-sm text-muted-foreground ml-1">& up</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center">
          <Checkbox
            id="verified-only-mobile"
            checked={verifiedOnly}
            onCheckedChange={() => setVerifiedOnly(!verifiedOnly)}
          />
          <label
            htmlFor="verified-only-mobile"
            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Verified Tailors Only
          </label>
        </div>
      </div>
    </div>
  )
}

// Desktop Filters Component
function DesktopFilters({
  selectedSpecialties,
  selectedTags,
  selectedLocations,
  selectedPriceRanges,
  minRating,
  verifiedOnly,
  toggleSpecialty,
  toggleTag,
  toggleLocation,
  togglePriceRange,
  setMinRating,
  setVerifiedOnly,
}: {
  selectedSpecialties: string[]
  selectedTags: string[]
  selectedLocations: string[]
  selectedPriceRanges: number[]
  minRating: number | null
  verifiedOnly: boolean
  toggleSpecialty: (specialty: string) => void
  toggleTag: (tag: string) => void
  toggleLocation: (location: string) => void
  togglePriceRange: (index: number) => void
  setMinRating: (rating: number | null) => void
  setVerifiedOnly: (verified: boolean) => void
}) {
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["specialties", "tags", "location", "price", "rating"]}>
        <AccordionItem value="specialties" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Specialties</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-2">
              {allSpecialties.map((specialty) => (
                <div key={specialty} className="flex items-center">
                  <Checkbox
                    id={`specialty-desktop-${specialty}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onCheckedChange={() => toggleSpecialty(specialty)}
                  />
                  <label
                    htmlFor={`specialty-desktop-${specialty}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Tags</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Location</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {allLocations.map((location) => (
                <div key={location} className="flex items-center">
                  <Checkbox
                    id={`location-desktop-${location}`}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => toggleLocation(location)}
                  />
                  <label
                    htmlFor={`location-desktop-${location}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Price Range</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox
                    id={`price-desktop-${index}`}
                    checked={selectedPriceRanges.includes(index)}
                    onCheckedChange={() => togglePriceRange(index)}
                  />
                  <label
                    htmlFor={`price-desktop-${index}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-sm font-medium">Rating</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    variant={minRating === rating ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setMinRating(minRating === rating ? null : rating)}
                  >
                    {rating}
                  </Button>
                ))}
                <span className="text-sm text-muted-foreground ml-1">& up</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <div className="flex items-center pt-2">
        <Checkbox
          id="verified-only-desktop"
          checked={verifiedOnly}
          onCheckedChange={() => setVerifiedOnly(!verifiedOnly)}
        />
        <label
          htmlFor="verified-only-desktop"
          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Verified Tailors Only
        </label>
      </div>
    </div>
  )
}

