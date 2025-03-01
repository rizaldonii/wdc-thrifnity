import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full h-64 bg-cover bg-center text-white flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
        <h1 className="text-4xl font-semibold italic">Thriftnity</h1>
        <p className="text-center text-sm max-w-md">
          thriftnity is a ajkbfyusebfyuwbguhrbgahd jhrsbfguerbvuera...
        </p>
        <button className="mt-4 bg-blue-500 px-4 py-2 rounded-md">About Us</button>
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
