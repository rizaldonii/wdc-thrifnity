"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { categories } from "@/data/categories"
import type { MainCategory } from "@/types/category"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  Check,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  PenIcon,
  PocketIcon,
  SaladIcon,
  Search,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface CategoryItemProps {
  id: string
  name: MainCategory
  slug: string
  description?: string
  subcategoryCount: number
  imageUrl?: string
}

export default function Category() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"name" | "items">("name")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Transform categories data to include subcategory count and image URL
  const categoryItems: CategoryItemProps[] = categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    subcategoryCount: category.subcategories.length,
    imageUrl: `/home images/categories/category${index + 1}.webp`,
  }))

  // Filter categories based on search query
  const filteredCategories = categoryItems
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name)
      } else {
        return b.subcategoryCount - a.subcategoryCount
      }
    })

  // Get icon component based on category name
  const getCategoryIcon = (name: MainCategory) => {
    switch (name.toLowerCase()) {
      case "tops":
        return <Shirt className="w-6 h-6" />
      case "bottoms":
        return <PenIcon className="w-6 h-6" />
      case "dresses":
        return <SaladIcon className="w-6 h-6" />
      case "outerwear":
        return <PocketIcon className="w-6 h-6" />
      case "accessories":
        return <Briefcase className="w-6 h-6" />
      case "shoes":
        return <ShoppingCart className="w-6 h-6" />
      default:
        return <ShoppingBag className="w-6 h-6" />
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section className="py-16 relative categories-section">
      {/* Add a style tag at the top of the component to force white text only in grid view */}
      <style jsx global>{`
        /* Only apply white text to grid view cards */
        .categories-section .grid-view .category-card h3,
        .categories-section .grid-view .category-card .badge-text,
        .categories-section .grid-view .category-card .subcategory-count {
          color: white !important;
        }
        
        /* Style for category action buttons in light mode */
        .categories-section .p-2.rounded-full.bg-primary {
          background-color: white !important;
          color: var(--color-primary) !important;
          border: 1px solid var(--color-border);
        }
        
        .categories-section .p-2.rounded-full.bg-primary:hover {
          background-color: var(--color-accent) !important;
        }
        
        /* For dark mode, keep the original styling */
        .dark .categories-section .p-2.rounded-full.bg-primary {
          background-color: var(--color-primary) !important;
          color: var(--color-primary-foreground) !important;
          border: none;
        }
        
        /* Style for the "Explore collection" text in list view */
        .categories-section .inline-flex.items-center.font-medium.text-primary {
          background-color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid var(--color-border);
        }
          
        .categories-section .inline-flex.items-center.font-medium.text-primary:hover {
          background-color: var(--color-accent);
        }
        
        .dark .categories-section .inline-flex.items-center.font-medium.text-primary {
          background-color: transparent;
          border: none;
          padding: 0;
        }
      `}</style>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -left-4 top-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl transform -translate-y-1/2 animate-pulse"
          style={{ animationDuration: "15s" }}
        />
        <div
          className="absolute -right-4 top-1/3 w-40 h-40 bg-secondary/10 rounded-full blur-3xl transform -translate-y-1/3 animate-pulse"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute left-1/4 bottom-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "25s" }}
        />
      </div>

      {/* Header Content */}
      <div className="relative text-center space-y-8 mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative inline-block">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
            <span className="tracking-wider">CLOTHING CATEGORIES</span>
            <Sparkles className="w-4 h-4 ml-2" />
          </Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative text-4xl md:text-5xl font-bold text-foreground"
        >
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Explore Our Categories
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Discover our thoughtfully curated collection of sustainable fashion pieces,
          <br className="hidden md:block" />
          where style meets consciousness in perfect harmony
        </motion.p>
      </div>

      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 flex flex-col space-y-4"
      >
        {/* Search and Filter Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72 md:w-96">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
          </div>

          {/* Filter and View Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Filter Button */}
            <Button
              variant={isFilterOpen ? "default" : "outline"}
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-expanded={isFilterOpen}
              aria-controls="filter-panel"
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </Button>

            {/* View Toggle */}
            <div className="flex items-center rounded-lg border bg-card p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className="flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                <span className="text-sm">List</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              id="filter-panel"
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="rounded-xl p-4 shadow-md overflow-hidden bg-card border border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Sort by</h4>
                  <div className="flex mt-2 space-x-2">
                    <Button
                      variant={sortOrder === "name" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("name")}
                      className="h-8 rounded-full text-xs flex items-center gap-1.5"
                    >
                      {sortOrder === "name" && <Check className="w-3 h-3" />}
                      Name
                    </Button>
                    <Button
                      variant={sortOrder === "items" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortOrder("items")}
                      className="h-8 rounded-full text-xs flex items-center gap-1.5"
                    >
                      {sortOrder === "items" && <Check className="w-3 h-3" />}
                      Most Items
                    </Button>
                  </div>
                </div>

                <div className="self-end">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredCategories.length} of {categoryItems.length} categories
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Category Grid View */}
      {viewMode === "grid" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-view"
        >
          {filteredCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/category/${category.slug}`} className="group block">
                <Card className="overflow-hidden border-0 shadow-md bg-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] category-card">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src={category.imageUrl || "/placeholder.svg?height=400&width=320"}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      quality={90}
                    />

                    {/* Update the overlay class */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70 group-hover:opacity-75 transition-opacity" />

                    {/* Category Icon Badge */}
                    <div className="absolute top-4 right-4 p-2.5 rounded-full shadow-lg transform -rotate-12 group-hover:rotate-0 transition-all duration-300 group-hover:scale-110 bg-background/90">
                      <span className="text-primary">{getCategoryIcon(category.name)}</span>
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                        <h3
                          className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform"
                          style={{ color: "white" }}
                        >
                          {category.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          {/* Update the badge to include the subcategory-count class */}
                          <Badge variant="outline" className="bg-background/20 border-transparent">
                            <span className="text-white">{category.subcategoryCount}</span>
                            <span className="text-white">&nbsp;subcategories</span>
                          </Badge>
                          <span className="p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg bg-primary text-primary-foreground">
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Category List View */}
      {viewMode === "list" && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
          {filteredCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/category/${category.slug}`} className="group">
                {/* Update the list view card to use the custom classes */}
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 category-card">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="relative w-full sm:w-56 h-52 sm:h-40">
                      <Image
                        src={category.imageUrl || "/placeholder.svg?height=160&width=224" || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 224px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:bg-gradient-to-t" />

                      {/* Category Indicator */}
                      <div className="absolute top-4 left-4 p-2.5 rounded-full shadow-md transition-colors duration-300 bg-background/90">
                        <span className="transition-colors duration-300 text-primary">
                          {getCategoryIcon(category.name)}
                        </span>
                      </div>
                    </div>

                    <CardContent className="flex-1 p-6 sm:p-5 flex flex-col justify-between relative">
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {category.subcategoryCount} subcategories
                          </Badge>
                        </div>
                        <p className="mt-2 text-muted-foreground">
                          {category.description ||
                            `Browse our selection of sustainable ${category.name.toLowerCase()} for every occasion`}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">New arrivals weekly</span>
                        <span className="inline-flex items-center font-medium text-primary">
                          Explore collection
                          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 px-4 rounded-2xl shadow-sm bg-card border border-border"
        >
          <div className="inline-flex justify-center items-center w-20 h-20 rounded-full mb-6 bg-accent">
            <Filter className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">No categories found</h3>
          <p className="mt-3 max-w-md mx-auto text-muted-foreground">
            We couldn't find any categories matching your search. Try adjusting your search terms or browse all
            categories.
          </p>
          <Button onClick={() => setSearchQuery("")} className="mt-6">
            Clear search
          </Button>
        </motion.div>
      )}
    </section>
  )
}

