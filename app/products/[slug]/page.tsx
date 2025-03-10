import ProductDetails from "@/containers/product-page/product-details";
import { products } from "@/data/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${product.name} | Your Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: product.images[0]?.url
        ? [{
          url: product.images[0].url,
          alt: product.name,
        }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}