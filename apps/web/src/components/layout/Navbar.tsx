import { Logo } from "@/components/shared/BrandMark";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <div className="flex items-center gap-4">
          <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:border-blue-500">
            Sign In
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}