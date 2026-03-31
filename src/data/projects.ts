export type ProjectLink = {
  label: string;
  href: string;
};

export type SingleProject = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export type MultiUrlProject = {
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
};

export type Project = SingleProject | MultiUrlProject;

export function isMultiUrl(project: Project): project is MultiUrlProject {
  return "links" in project;
}

const projects: Project[] = [
  {
    title: "GiftGen",
    description:
      "User made prompts are used to generate 3D gifts, which are then shared with other users. Uses AWS and Modal to run the backend and custom ML inference in a scalable manner.",
    tags: ["AWS", "Terraform", "Kubernetes"],
    links: [
      { label: "Live Site", href: "https://giftgen.mithrak.com/" },
      { label: "Frontend Source", href: "https://github.com/mitkan191003/giftgen-frontend" },
      { label: "Backend Source", href: "https://github.com/mitkan191003/giftgen-backend" },
      { label: "Infra Source", href: "https://github.com/mitkan191003/giftgen-infra" },
    ],
  },
  {
    title: "ParksTracker",
    description:
      "A web app to track your visits to national parks. You can view your timeline for each park with past visits, journal entries, and photos. User authentication and RLS policies ensure data privacy and security. Try the demo today!",
    tags: ["React", "S3", "PostgreSQL", "Supabase"],
    href: "https://parkstracker.mithrak.com/",
  },
  {
    title: "Fast Fashion",
    description:
      "A scrolling story about the fast fashion industry and its impact on the environment. Utilized a three.js canvas to create an immersive experience with 3D models and animations. Optimized assets in Blender for performance and bandwidth.",
    tags: ["Three.js", "React", "Asset Optimization"],
    href: "https://fastfashion.mithrak.com/",
  },
];

export default projects;
