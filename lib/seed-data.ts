import type { Article } from "@/lib/articles";

/** Initial editorial content loaded into SQLite on first run. */
export const seedArticles: Article[] = [
  {
    slug: "quiet-courage",
    section: "culture",
    title: "Quiet courage beats loud certainty in times of fracture",
    dek: "Communities that endure stress often reward restraint over spectacle — and that pattern shows up far beyond politics.",
    author: "Maya Chen",
    readMinutes: 12,
    publishedAt: "2026-10-02",
    featured: true,
    image: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
      alt: "Mountain ridge at dawn with soft mist",
    },
    body: [
      "When institutions wobble, public life fills with people who speak in absolutes. The performance is familiar: certainty as armor, outrage as identity. Yet the groups that adapt — neighborhoods after a storm, labs after a failed experiment, families after loss — often move differently. They notice more than they announce.",
      "Restraint is not passivity. It is the discipline of waiting until you understand the shape of a problem before you claim to have solved it. That delay can look like weakness from the outside, especially in feeds optimized for heat. Inside a community, it can be the difference between a repair that holds and a gesture that evaporates.",
      "Historians of disaster repeatedly find the same pattern: the people who coordinate food, shelter, and information without branding themselves as heroes tend to keep showing up after cameras leave. Their courage is procedural — check on the neighbor, share the map, fix the leak — rather than theatrical.",
      "If there is a lesson for public culture, it may be this: we can admire clarity without mistaking volume for truth. The voices worth trusting often arrive with questions attached.",
    ],
  },
  {
    slug: "mycelium-minds",
    section: "nature",
    title: "What fungal networks teach us about shared intelligence",
    dek: "Mycelium moves nutrients and signals without a central brain — a model that unsettles our usual metaphors for thinking.",
    author: "Jonah Weiss",
    readMinutes: 9,
    publishedAt: "2026-09-28",
    image: {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      alt: "Sunlight through a dense green forest",
    },
    body: [
      "Forests look like collections of individuals: this oak, that birch, a carpet of moss. Underground, another picture forms. Fungal threads link roots, trading carbon and nitrogen, routing chemical warnings about insects or drought.",
      "No single hypha \"decides\" for the network, yet the system allocates resources in ways that resemble planning. Researchers debate how far the analogy to brains can stretch, but the comparison already changed how ecologists talk about cooperation.",
      "For designers of human systems, the metaphor is humbling. Resilience may depend less on heroic leaders than on dense, redundant connections and slow signals everyone can act on.",
    ],
  },
  {
    slug: "sufficient-reason",
    section: "ideas",
    title: "Is everything conscious? The question that will not sit still",
    dek: "If every fact demands a reason, consciousness might be closer than we like to admit — or the principle might crack under pressure.",
    author: "Elena Ruiz",
    readMinutes: 15,
    publishedAt: "2026-09-21",
    image: {
      src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
      alt: "Starry night sky over silhouetted hills",
    },
    body: [
      "Leibniz insisted that nothing happens without a sufficient reason. Push that thought far enough and strangers appear at the door: panpsychism, integrated information, simulations.",
      "Critics reply that reason is a tool forged inside consciousness, not a independent ruler that can crown every electron with experience. The dispute is not merely academic. It shapes how we treat animals, machines, and ecosystems.",
    ],
  },
  {
    slug: "glass-harmonica",
    section: "culture",
    title: "The instrument so uncanny that cities tried to ban it",
    dek: "Benjamin Franklin's glass armonica once filled salons — then rumor, physiology, and moral panic wrote it out of the repertoire.",
    author: "Amelia Holt",
    readMinutes: 7,
    publishedAt: "2026-09-14",
    image: {
      src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
      alt: "Close-up of vintage piano keys and warm light",
    },
    body: [
      "Sound can slide beneath language and straight into the body. The glass armonica's sustained tones were described as piercing, mournful, even dangerous — a blend of acoustics and suggestion.",
      "Ban attempts failed, but fashion moved on. The episode reminds us that new media often trigger the same anxieties, dressed in new vocabulary.",
    ],
  },
  {
    slug: "measurement-and-trust",
    section: "science",
    title: "When better instruments broke old certainties",
    dek: "Precision does not always simplify reality. Sometimes it reveals how much our previous answers were stories.",
    author: "David Okonkwo",
    readMinutes: 11,
    publishedAt: "2026-09-07",
    image: {
      src: "https://images.unsplash.com/photo-1532094349883-543bc11b234d?w=1200&q=80",
      alt: "Laboratory glassware with blue liquid",
    },
    body: [
      "Every generation inherits instruments that feel like windows. Then someone builds a finer grid, and the window becomes a lens — distortions included.",
      "Science advances not only by discovery but by learning which questions the old tools accidentally smuggled in as facts.",
    ],
  },
  {
    slug: "urban-night",
    section: "nature",
    title: "City darkness is an ecology, not an absence",
    dek: "Light pollution reshapes predator cycles, plant flowering, and the mental maps of migratory birds.",
    author: "Priya Natarajan",
    readMinutes: 8,
    publishedAt: "2026-08-30",
    image: {
      src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80",
      alt: "City skyline at night with bridge lights",
    },
    body: [
      "Dark skies campaigns often frame light as waste. That is true on energy ledgers, but incomplete biologically. Night is a habitat with its own gradients.",
      "Designers who treat illumination as reversible — dimmable, shielded, timed — are practicing a kind of urban conservation.",
    ],
  },
];
