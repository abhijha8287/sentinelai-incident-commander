import { Nav } from "@/components/dashboard/nav";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background ops-grid">
      <div className="flex min-h-screen bg-gradient-to-b from-transparent to-[#050b0d]">
        <Nav />
        <main className="w-full p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
