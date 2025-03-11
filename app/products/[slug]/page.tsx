import ProductDetails from "@/containers/product-page/product-details"
import { products } from "@/data/products"
import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

// Define the params type for this page
type PageParams = {
  slug: string
}

// Define the props type for generateMetadata
type MetadataProps = {
  params: PageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: MetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${product.name} | Your Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: product.images[0]?.url
        ? [
            {
              url: product.images[0].url,
              alt: product.name,
            },
          ]
        : [],
    },
  }
}

// Define the props type for the page component
type PageProps = {
  params: PageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

// Page component
export default function ProductPage({ params }: PageProps) {
  // Find the product by slug
  const product = products.find((p) => p.slug === params.slug)

  // If product not found, show 404
  if (!product) {
    notFound()
  }

  // Render the product details
  return <ProductDetails product={product} />
}

