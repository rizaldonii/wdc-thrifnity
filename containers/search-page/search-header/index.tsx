"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchHeader({
  onSortChange,
  currentSort,
  initialQuery,
}: {
  onSortChange?: (value: string) => void
  currentSort?: string
  initialQuery?: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Get current sort option from URL if not provided
  const sortFromUrl = searchParams.get("sort") || "newest"
  const effectiveSort = currentSort || sortFromUrl

  // Get search query from URL if not provided
  const queryFromUrl = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery || queryFromUrl)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Update URL when search query changes
  useEffect(() => {
    if (debouncedSearchQuery !== queryFromUrl) {
      const params = new URLSearchParams(searchParams.toString())

      if (debouncedSearchQuery) {
        params.set("q", debouncedSearchQuery)
      } else {
        params.delete("q")
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [debouncedSearchQuery, queryFromUrl, pathname, router, searchParams])

  // Handle sort change
  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value)
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.set("sort", value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="w-full md:w-auto flex-1 max-w-xl">
        <Input
          type="search"
          placeholder="Search for products, tailors, or services..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={effectiveSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

