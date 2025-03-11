import ProductDetails from "@/containers/product-page/product-details"
import { products } from "@/data/products"
import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
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
type tParams = Promise<{ slug: string }>;


export default async function ProductPage(props : { params: tParams } ) {
  const { slug } = await props.params;
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}``

