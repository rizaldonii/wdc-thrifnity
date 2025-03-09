import { notFound } from "next/navigation";
import { tailors } from "@/data/tailors";
import TailorProfile from "@/containers/tailor-show/tailor-profile";
import TailorTabs from "@/containers/tailor-show/tailor-tabs";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const tailor = tailors.find((t) => t.slug === params.slug);

  if (!tailor) {
    return {
      title: "Tailor Not Found",
    };
  }

  return {
    title: `${tailor.name} - Expert Tailor`,
    description: tailor.description,
  };
}

export default function TailorShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const tailor = tailors.find((t) => t.slug === params.slug);

  if (!tailor) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen pb-16">
      <TailorProfile tailor={tailor} />
      <div className="container mx-auto px-4 mt-8">
        <TailorTabs tailor={tailor} />
      </div>
    </main>
  );
}
