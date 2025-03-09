import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import Image from "next/image";

export default function OurStory() {
  return (
    <section className="relative py-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="absolute inset-0 bg-accent/30 rounded-3xl" />

      {/* Content Container */}
      <div className="relative">
        {/* Section Header */}
        <div className="mb-10">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
            Our Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Story
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Section */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/our story.svg"
                alt="Textile waste"
                width={400}
                height={400}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Stats & Info Section */}
          <div className="flex-1 space-y-8">
            {/* Stats Cards */}
            <div className="space-y-6">
              {/* Water Usage Stat */}
              <Card className="group overflow-hidden border-0 shadow-md bg-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <Droplets className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        2700 Liters
                      </h3>
                      <p className="text-muted-foreground">
                        of water required to make a single cotton T-shirt
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Textile Waste Stat */}
              <Card className="group overflow-hidden border-0 shadow-md bg-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <Droplets className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        92 Million Tons
                      </h3>
                      <p className="text-muted-foreground">
                        of textile waste produced yearly by the fashion industry
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mission Statement */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a passion for{" "}
              <span className="text-primary font-semibold">sustainability</span>{" "}
              and
              <span className="text-primary font-semibold"> technology</span>,
              we built Thriftinity to connect conscious consumers who want to
              embrace thrift fashion while reducing their environmental
              footprint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
