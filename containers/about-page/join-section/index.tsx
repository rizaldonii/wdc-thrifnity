import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Join() {
  return (
    <section className="relative py-24 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Background Elements */}
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
          Be Part of the Change
        </Badge>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-foreground">Join Our </span>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Movement
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Are you ready to make a difference? Join the Thriftinity movement and
          redefine fashion sustainability. Every piece of clothing you save is a
          step toward a{" "}
          <span className="text-primary font-semibold">greener future</span>.
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

        {/* Inspirational Quote */}
        <p className="mt-10 text-muted-foreground font-medium italic">
          Let's change fashion,{" "}
          <span className="text-primary">one thread at a time</span>.
        </p>
      </div>
    </section>
  );
}
