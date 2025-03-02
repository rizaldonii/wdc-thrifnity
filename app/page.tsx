import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // Main Content
    <div className="flex-1 bg-[#d7e8f4]">
      <Navbar />
      {/* Feature Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative aspect-[16/9] md:aspect-[4/3]">
            <Link href="/shop">
              <Image
                src="/home images/image 46.png"
                alt="Shop our collection"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                <h2 className="text-white text-xl font-bold">Shop</h2>
              </div>
            </Link>
          </div>
          <div className="grid gap-4">
            <div className="relative aspect-[16/9]">
              <Link href="/repair">
                <Image
                  src="/home images/image 46.png"
                  alt="Repair your clothes"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                  <h2 className="text-white text-xl font-bold">Repair your clothes</h2>
                </div>
              </Link>
            </div>
            <div className="relative aspect-[16/9]">
              <Link href="/trade">
                <Image
                  src="/home images/image 46.png"
                  alt="Trade with others"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                  <h2 className="text-white text-xl font-bold">Trade with others</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex justify-center space-x-4 p-6">
        {["👕", "👖", "👗", "🧥", "👚", "🩳"].map((item, index) => (
          <button key={index} className="bg-white p-4 rounded-lg shadow-lg text-2xl">{item}</button>
        ))}
      </div>
      <div className="text-center">
        <button className="bg-blue-500 px-4 py-2 rounded-md text-white">See More</button>
      </div>

      {/* Service Section */}
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="bg-blue-500 p-6 rounded-lg text-white text-center">Shop</div>
        <div className="bg-white p-6 rounded-lg text-center shadow-lg">Repair Your Clothes</div>
        <div className="bg-blue-500 p-6 rounded-lg text-white text-center">Trade with Others</div>
      </div>
    </div>
  );
}
