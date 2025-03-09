import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import Image from "next/image";

export default function WhyWeExist() {
  return (
    <section className="relative py-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <div className="relative mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
            Our Mission
          </Badge>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-foreground">Why We </span>
          <span className="relative">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Exist
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
            >
              <path
                d="M0,3 C30,3 70,3 100,3"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-16 items-center">
        {/* Content Section */}
        <div className="flex-1 space-y-10">
          {/* Main Text */}
          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Fashion is more than just clothing—it's a statement, an identity,
              and a reflection of culture. But behind the glitz and glamor, the
              fashion industry faces a major challenge: sustainability.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At <span className="text-primary font-semibold">Thriftinity</span>
              , we believe in giving fashion a second life. We are more than
              just an e-commerce platform; we are a movement toward sustainable
              fashion.
            </p>
          </div>

          {/* Feature Card */}
          <Card className="group overflow-hidden border-0 shadow-md bg-card transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl transform -rotate-6 transition-transform duration-300 group-hover:rotate-0">
                  <Droplets className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-foreground">
                    Making a Difference
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    By buying, selling, or swapping pre-loved clothing, you're
                    not just updating your wardrobe—you're making a real
                    difference for the planet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/why-we-exist.svg"
              alt="Sustainable clothing collection"
              width={500}
              height={500}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          {/* Floating Elements */}
          <div
            className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-l from-primary/30 to-transparent rounded-full blur-2xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-secondary/30 to-transparent rounded-full blur-2xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>
      </div>
    </section>
  );
}
