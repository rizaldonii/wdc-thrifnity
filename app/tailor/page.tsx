import { TailorPortfolio } from "@/components/tailor-portfolio/tailor-portfolio"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Expert Tailors at Your Service</h2>
            <p className="text-gray-600">
              Discover skilled tailors who can repair and restore your favorite clothing items. Browse through their
              portfolios and find the perfect match for your needs.
            </p>
          </div>

          <TailorPortfolio />
        </section>
      </main>
    </div>
  )
}

