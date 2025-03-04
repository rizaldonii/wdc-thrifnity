import Navbar from "@/components/Navbar"
import {
    Check,
    Droplets,
    Sparkles,
    Users
} from "lucide-react"

export default function Thriftinity() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1">
                {/* Why We Exist Section */}
                <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-title-color">Why We Exist</h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-6">
                            <p className="text-body-color leading-relaxed">
                                Fashion is more than just clothing—it's a statement, an identity, and a reflection of culture. But
                                behind the glitz and glamor, the fashion industry faces a major challenge: sustainability.
                            </p>
                            <p className="text-body-color leading-relaxed">
                                At Thriftinity, we believe in giving fashion a second life. We are more than just an e-commerce
                                platform; we are a movement toward sustainable fashion.
                            </p>

                            <div className="bg-[#f0f9ff] p-6 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-full">
                                        <Droplets className="w-5 h-5 text-[#1d9bf0]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-title-color">Making a Difference</h3>
                                        <p className="text-body-color">
                                            By buying, selling, or swapping pre-loved clothing, you're not just updating your wardrobe—you're
                                            making a real difference for the planet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <img
                                src="/why we exist.svg?height=400&width=400"
                                alt="Sustainable clothing collection"
                                className="rounded-xl w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto bg-[#f0f9ff]">
                    <h2 className="text-2xl font-bold mb-6 text-title-color">Our Story</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <img
                                src="/our story.svg?height=350&width=350"
                                alt="Textile waste"
                                className="rounded-xl w-full object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-6">
                            <div className="bg-white p-6 rounded-xl flex items-start gap-3">
                                <div className="text-[#0284c7]">
                                    <Droplets className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 text-title-color">2700 Liters</h3>
                                    <p className="text-body-color text-sm">of water required to make a single cotton T-shirt</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl flex items-start gap-3">
                                <div className="text-[#0284c7]">
                                    <Droplets className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 text-title-color">92 Million Tons</h3>
                                    <p className="text-body-color text-sm">of textile waste produced yearly by the fashion industry</p>
                                </div>
                            </div>

                            <p className="text-body-color leading-relaxed">
                                With a passion for sustainability and technology, we built Thriftinity to connect conscious consumers
                                who want to embrace thrift fashion while reducing their environmental footprint.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Mission & Values Section */}
                <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-title-color">Our Mission & Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#e3f0fb] p-6 rounded-xl">
                            <h3 className="font-semibold text-lg mb-4 text-title-color">Our Mission</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-[#0284c7] mt-1 flex-shrink-0" />
                                    <span className="text-body-color">To extend the life cycle of fashion and reduce textile waste</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-[#0284c7] mt-1 flex-shrink-0" />
                                    <span className="text-body-color">To create a thriving community of conscious consumers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-[#0284c7] mt-1 flex-shrink-0" />
                                    <span className="text-body-color">To leverage technology for a more sustainable fashion industry</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#e3f0fb] p-6 rounded-xl">
                            <h3 className="font-semibold text-lg mb-4 text-title-color">Our Core Values</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-2">
                                    <Droplets className="w-5 h-5 text-[#10b981] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-title-color">Sustainability</h4>
                                        <p className="text-sm text-body-color">
                                            Every choice matters. We are committed to promoting eco-friendly fashion.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Users className="w-5 h-5 text-[#0284c7] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-title-color">Community</h4>
                                        <p className="text-sm text-body-color">
                                            We empower individuals to make sustainable choices together.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Sparkles className="w-5 h-5 text-[#8b5cf6] mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-title-color">Innovation</h4>
                                        <p className="text-sm text-body-color">
                                            Technology and creativity drive our mission toward a better fashion future.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* How Thriftinity Works */}
                <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto bg-[#f0f9ff]">
                    <h2 className="text-2xl font-bold mb-6 text-title-color">How Thriftinity Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-8 h-8 bg-[#1d9bf0] text-white rounded-full flex items-center justify-center mb-4">
                                1
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-title-color">Discover</h3>
                            <p className="text-body-color">Browse a curated selection of thrifted fashion treasures.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-8 h-8 bg-[#1d9bf0] text-white rounded-full flex items-center justify-center mb-4">
                                2
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-title-color">Reuse</h3>
                            <p className="text-body-color">Buy, swap, or sell pre-loved clothing with ease.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-8 h-8 bg-[#1d9bf0] text-white rounded-full flex items-center justify-center mb-4">
                                3
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-title-color">Make an Impact</h3>
                            <p className="text-body-color">
                                Every transaction helps reduce fashion waste and promotes sustainability.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Join Our Movement */}
                <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6 text-title-color">Join Our Movement</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-body-color">
                        Are you ready to make a difference? Join the Thriftinity movement and redefine fashion sustainability. Every
                        piece of clothing you save is a step toward a greener future.
                    </p>
                    <button className="bg-[#1d9bf0] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0284c7] transition-colors">
                        Discover
                    </button>
                    <p className="mt-6 text-[#0284c7] text-sm">Let's change fashion, one thread at a time.</p>
                </section>
            </main></div>
    )
}