import NetworkBackground from "@/components/NetworkBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <NetworkBackground />
      <main className="relative z-10 flex min-h-screen flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-16 sm:py-24" />
      </main>
    </div>
  );
}
