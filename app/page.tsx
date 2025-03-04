import Slider from "@/components/Slider";
import Quote from "@/components/Quote";
import Categories from "@/components/Category";
import NewArrivals from "@/components/NewArrivals";

export default function Home() {
  const sliderData = [
    {
      id: 1,
      imageUrl: "/slider/slide1.jpg",
      title: "Welcome to Thrifnity",
      description: "Your Sustainable Fashion Destination",
    },
    {
      id: 2,
      imageUrl: "/slider/slide2.jpg",
      title: "Shop Sustainably",
      description: "Discover our curated collection of second-hand fashion",
    },
    {
      id: 3,
      imageUrl: "/slider/slide3.jpg",
      title: "Join Our Community",
      description: "Trade and repair your clothes with us",
    },
  ];

  const categoryData = [
    {
      id: "1",
      name: "Tops",
      slug: "tops",
      imageUrl: "/categories/tops.jpg",
      icon: "👕",
      itemCount: 120,
    },
    {
      id: "2",
      name: "Bottoms",
      slug: "bottoms",
      imageUrl: "/categories/bottoms.jpg",
      icon: "👖",
      itemCount: 85,
    },
    {
      id: "3",
      name: "Dresses",
      slug: "dresses",
      imageUrl: "/categories/dresses.jpg",
      icon: "👗",
      itemCount: 64,
    },
    {
      id: "4",
      name: "Outerwear",
      slug: "outerwear",
      imageUrl: "/categories/outerwear.jpg",
      icon: "🧥",
      itemCount: 45,
    },
    {
      id: "5",
      name: "Accessories",
      slug: "accessories",
      imageUrl: "/categories/accessories.jpg",
      icon: "👜",
      itemCount: 92,
    },
    {
      id: "6",
      name: "Shoes",
      slug: "shoes",
      imageUrl: "/categories/shoes.jpg",
      icon: "👟",
      itemCount: 78,
    },
    {
      id: "7",
      name: "Vintage",
      slug: "vintage",
      imageUrl: "/categories/vintage.jpg",
      icon: "🕰️",
      itemCount: 56,
    },
    {
      id: "8",
      name: "Sustainable",
      slug: "sustainable",
      imageUrl: "/categories/sustainable.jpg",
      icon: "♻️",
      itemCount: 63,
    },
  ];

  const productDaa = [
    {
      id: "p1",
      name: "Vintage Denim Jacket",
      slug: "vintage-denim-jacket",
      imageUrl: "/products/denim-jacket.jpg",
      price: 249000,
      originalPrice: 320000,
      isNew: true,
      category: "Outerwear",
    },
    {
      id: "p2",
      name: "Sustainable Cotton Tee",
      slug: "sustainable-cotton-tee",
      imageUrl: "/products/cotton-tee.jpg",
      price: 89000,
      isNew: true,
      category: "Tops",
    },
    {
      id: "p3",
      name: "Upcycled Patchwork Skirt",
      slug: "upcycled-patchwork-skirt",
      imageUrl: "/products/patchwork-skirt.jpg",
      price: 175000,
      originalPrice: 220000,
      isNew: true,
      category: "Bottoms",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider slides={sliderData} autoPlayInterval={5000} />
      <Quote />
      <Categories categories={categoryData} />
      <NewArrivals products={productDaa} />
    </div>
  );
}
