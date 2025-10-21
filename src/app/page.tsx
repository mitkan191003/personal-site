import NetworkBackground from "@/components/NetworkBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <NetworkBackground
        minNetworkSettings={{ density: 14000, maxNodes: 100, maxDistance: 160 }}
        maxNetworkSettings={{ density: 1000, maxNodes: 2000, maxDistance: 80 }}
        defaultSliderPosition={0.05}
      />
      <main className="relative z-10 flex min-h-screen flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 py-16 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
          <section className="glass-card max-w-xl rounded-3xl p-8 sm:p-10">
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Mithra Kancheti
            </h1>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              Software Engineer
            </p>
            <p className="mt-2 text-base text-[var(--color-muted)]">
              ML - Infrastructure - Data Science
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:brightness-110"
              >
                View Projects
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mitkan191003"
                  aria-label="GitHub"
                  className="social-button inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.32 9.44 7.92 10.97.58.1.79-.26.79-.56 0-.28-.01-1.02-.02-2-3.22.7-3.9-1.56-3.9-1.56-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.57-2.57-.3-5.28-1.29-5.28-5.72 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.18 0 0 .97-.31 3.18 1.18.92-.26 1.9-.38 2.88-.38.98 0 1.96.13 2.88.38 2.2-1.49 3.17-1.18 3.17-1.18.64 1.66.24 2.88.12 3.18.74.81 1.18 1.84 1.18 3.1 0 4.44-2.72 5.41-5.3 5.7.42.37.8 1.1.8 2.22 0 1.6-.02 2.9-.02 3.3 0 .31.21.67.8.56 4.59-1.54 7.9-5.86 7.9-10.97C23.5 5.74 18.27.5 12 .5z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/mithra-kancheti-0793b7203/"
                  aria-label="LinkedIn"
                  className="social-button inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current translate-x-[1px] -translate-y-[2px]"
                    aria-hidden="true"
                  >
                    <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5C0 2.12 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.98h4.56V24H.2V8.98zM7.98 8.98h4.37v2.05h.06c.6-1.14 2.08-2.35 4.28-2.35 4.58 0 5.43 3.02 5.43 6.95V24h-4.56v-6.2c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.38 1.62-2.38 3.29V24H7.98V8.98z" />
                  </svg>
                </a>
                <a
                  href="mailto:mithrak8022@gmail.com"
                  aria-label="Email"
                  className="social-button inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
                <a
                  href="/Mithra_Kancheti_Resume.pdf"
                  aria-label="Resume"
                  className="social-button inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 9H15zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
