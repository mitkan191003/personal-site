import NetworkBackground from "@/components/NetworkBackground";
import { networkBackgroundOptions } from "@/config/networkBackground";
import projects, { type Project } from "@/data/projects";

const GRID_LAYOUTS = [
  { cols: 2, rows: 2, capacity: 4 },
  { cols: 2, rows: 3, capacity: 6 },
  { cols: 2, rows: 4, capacity: 8 },
  { cols: 3, rows: 3, capacity: 9 },
  { cols: 3, rows: 4, capacity: 12 },
];

const GRID_CLASSES: Record<string, string> = {
  "2x2": "grid-cols-1 sm:grid-cols-2 sm:grid-rows-2",
  "2x3": "grid-cols-1 sm:grid-cols-2 sm:grid-rows-3",
  "2x4": "grid-cols-1 sm:grid-cols-2 sm:grid-rows-4",
  "3x3": "grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-3 lg:grid-rows-3",
  "3x4": "grid-cols-1 sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-3 lg:grid-rows-4",
};

const GITHUB_URL = "https://github.com/mitkan191003";

const pickLayout = (cardCount: number) =>
  GRID_LAYOUTS.find((layout) => layout.capacity >= cardCount) ??
  GRID_LAYOUTS[GRID_LAYOUTS.length - 1];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7 17L17 7M9 7h8v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProjectsPage() {
  const projectList: Project[] = projects;
  const totalCards = projectList.length + 1;
  const layout = pickLayout(totalCards);
  const gridKey = `${layout.cols}x${layout.rows}`;
  const gridClass = GRID_CLASSES[gridKey];
  const capacity = layout.capacity;
  const visibleProjects = projectList.slice(0, Math.max(0, capacity - 1));
  const fillerCount = Math.max(0, capacity - 1 - visibleProjects.length);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <NetworkBackground {...networkBackgroundOptions} />
      <main className="relative z-10 flex min-h-screen flex-col px-6 py-16 sm:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10">
          <header>
            <h1 className="mt-4 font-display text-h1 font-semibold sm:text-4xl">
              Projects
            </h1>
          </header>
          <div className={`grid flex-1 gap-6 ${gridClass}`}>
            {visibleProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group glass-card relative flex flex-col justify-between rounded-3xl p-6 transition-colors hover:border-white/30"
              >
                <span className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[var(--color-muted)] transition-colors group-hover:border-[var(--color-secondary)] group-hover:text-[var(--color-secondary)]">
                  <ArrowIcon />
                </span>
                <div>
                  <h2 className="text-h2 font-semibold">{project.title}</h2>
                  <p className="mt-3 text-body text-[var(--color-muted)]">
                    {project.description}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="social-button inline-flex items-center rounded-full px-3 py-1 text-muted uppercase tracking-[0.2em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
            {Array.from({ length: fillerCount }).map((_, index) => (
              <div key={`filler-${index}`} className="invisible" aria-hidden="true" />
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group glass-card relative flex flex-col justify-between rounded-3xl p-6 transition-colors hover:border-white/30"
            >
              <span className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[var(--color-muted)] transition-colors group-hover:border-[var(--color-secondary)] group-hover:text-[var(--color-secondary)]">
                <ArrowIcon />
              </span>
              <div>
                <h2 className="text-h2 font-semibold">See more</h2>
                <p className="mt-3 text-body text-[var(--color-muted)]">
                  Browse my work on GitHub.
                </p>
              </div>
              <div className="mt-5">
                <span className="social-button inline-flex items-center rounded-full px-3 py-1 text-muted uppercase tracking-[0.2em]">
                  GitHub
                </span>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
