"use client";

import { useState } from "react";
import Hero from "@/containers/tailor-page/hero-section";
import TailorsList from "@/containers/tailor-page/tailors-list-section";

export default function Tailor() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main>
      <Hero onSearch={setSearchQuery} />
      <TailorsList searchQuery={searchQuery} />
    </main>
  );
}
