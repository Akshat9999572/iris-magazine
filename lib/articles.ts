export type Section = "ideas" | "culture" | "nature" | "science";

export const sectionColors: Record<Section, string> = {
  ideas: "#0c776d",
  culture: "#c16e15",
  nature: "#035a6d",
  science: "#940b52",
};

export type Article = {
  slug: string;
  section: Section;
  title: string;
  dek: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  image: { src: string; alt: string };
  featured?: boolean;
  body: string[];
};

export const sections: { id: Section; label: string; description: string }[] = [
  {
    id: "ideas",
    label: "Ideas",
    description: "Philosophy, psychology, and the puzzles of mind and meaning.",
  },
  {
    id: "culture",
    label: "Culture",
    description: "Art, history, and the stories societies tell themselves.",
  },
  {
    id: "nature",
    label: "Nature",
    description: "Ecology, evolution, and our place among living systems.",
  },
  {
    id: "science",
    label: "Science",
    description: "Research, discovery, and how we know what we know.",
  },
];
