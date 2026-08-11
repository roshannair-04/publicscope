import { Hero } from "@/components/shared/Hero";
import { GridBackground } from "@/components/shared/GridBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      <GridBackground />
      <Hero />
    </main>
  );
}