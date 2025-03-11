import { notFound } from "next/navigation";
import { tailors } from "@/data/tailors";
import TailorProfile from "@/containers/tailor-show/tailor-profile";
import TailorTabs from "@/containers/tailor-show/tailor-tabs";


type tParams = Promise<{ slug: string }>;

export default async function TailorShowPage( props: { params: tParams } ) {
  const { slug } = await props.params;
  const tailor = tailors.find((t) => t.slug === slug);

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
