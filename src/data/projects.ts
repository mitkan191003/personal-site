export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "ParksTracker",
    description:
      "A web app to track your visits to national parks. You can view your timeline for each park with past visits, journal entries, and photos. User authentication and RLS policies ensure data privacy and security. Try the demo today!",
    tags: ["React", "S3", "PostgreSQL", "Supabase"],
    href: "https://parkstracker.mithrak.com/",
  },
  {
    title: "Fast Fashion",
    description: "A scrolling story about the fast fashion industry and its impact on the environment. Utilized a three.js canvas to create an immersive experience with 3D models and animations. Optimized assets in Blender for performance and bandwidth.",
    tags: ["Three.js", "React", "Asset Optimization"],
    href: "https://fastfashion.mithrak.com/",
  },
  {
    title: "Gift Maker",
    description:
      "A Secret Santa gift exchange generator. User made prompts are used to generate 3D gifts, which are then shipped to a random recipient. Uses Modal to run custom ML inference in a scalable manner.",
    tags: ["Supabase", "Modal", "Diffusion Model"],
    href: "https://shipmasday1-2025.vercel.app/",
  },
  // {
  //   title: "Placeholder 1",
  //   description: "Placeholder 1",
  //   tags: ["Placeholder 1"],
  //   href: "https://placeholder.mithrak.com/",
  // },
  // {
  //   title: "Placeholder 2",
  //   description: "Placeholder 2",
  //   tags: ["Placeholder 2"],
  //   href: "https://placeholder.mithrak.com/",
  // },
];

export default projects;
