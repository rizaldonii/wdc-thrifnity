import React from "react";
import WhyWeExist from "@/containers/about-page/why-we-exist-section";
import OurStory from "@/containers/about-page/our-story-section";
import OurMission from "@/containers/about-page/our-mission";
import HowWorks from "@/containers/about-page/how-works-section";
import Join from "@/containers/about-page/join-section";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Why We Exist Section */}
        <WhyWeExist />
        {/* Our Story Section */}
        <OurStory />
        {/* Our Mission Section */}
        <OurMission />
        {/* How Thriftinity Works */}
        <HowWorks />
        {/* Join Our Movement */}
        <Join />
      </main>
    </div>
  );
}
