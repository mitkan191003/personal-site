import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mithrak",
  description: "Personal site for Mithrak.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="relative min-h-screen">
          <header className="glass-card glass-card--header fixed inset-x-0 top-0 z-20">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
              <span className="font-display text-[var(--color-text)]">Mithrak</span>
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--color-secondary)]"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-[var(--color-secondary)]"
                >
                  Projects
                </Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
