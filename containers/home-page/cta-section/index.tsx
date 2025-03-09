import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="relative py-24 px-4 md:px-6 max-w-7xl mx-auto mb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent rounded-3xl" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* Content Container */}
      <div className="relative text-center space-y-8">
        {/* Badge */}
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
          Join Thriftinity
        </Badge>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-foreground">Start Your </span>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sustainable Journey
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Sign up today and get exclusive access to our newest collections,
          special offers, and sustainable fashion tips.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            variant="outline"
            className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
