import ProductDetails from "@/containers/product-page/product-details"
import { products } from "@/data/products"
import { notFound } from "next/navigation"


type tParams = Promise<{ slug: string }>;


export default async function ProductPage(props : { params: tParams } ) {
  const { slug } = await props.params;
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}``

