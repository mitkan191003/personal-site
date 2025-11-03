const projects = [
  {
    title: "ParksTracker",
    description:
      "A web app to track your visits to national parks. You can view your timeline for each park with past visits, journal entries, and photos. User authentication and RLS policies ensure data privacy and security. Try the demo today!",
    tags: ["React", "Tailwind CSS", "Supabase"],
    href: "https://parkstracker.mithrak.com/",
  },
  {
    title: "Fast Fashion",
    description: "A scrolling story about the fast fashion industry and its impact on the environment. Utilized a three.js canvas to create an immersive experience using 3D models and animations.",
    tags: ["Three.js", "React", "Tailwind CSS"],
    href: "https://fastfashion.mithrak.com/",
  },
  {
    title: "Gift Maker",
    description:
      "A Secret Santa gift exchange generator. User made prompts are used to generate 3D gifts, which are then shipped to a random recipient. Uses Modal to run custom ML inference in a scalable manner.",
    tags: ["Observability", "TypeScript", "React"],
    href: "https://shipmasday1-2025.vercel.app/",
  },
] as const;

export default projects;
