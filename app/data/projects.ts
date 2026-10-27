export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  note: string;
  wide?: boolean;
  anchor?: string;
  description?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  cover: ProjectImage;
  video?: string;
  description: string[];
  gallery: ProjectImage[];
  credits?: { role?: string; client?: string; year?: string; stage?: string };
  caseStudy?: { brief?: string; approach?: string; validation?: string; outcome?: string };
};

// Ordered editorially: the first project is featured; the next four appear on home.
// Add a project here to publish its card and /work/[slug] page automatically.
export const projects: Project[] = [
  {
    slug: "canine-carrier",
    title: "Canine Carrier",
    category: "Physical product",
    summary: "An enclosure for a dog, bringing together a defined frame, mesh panels, and a carrying handle.",
    // Confirmed project credits and the design story can be filled in here.
    credits: {},
    caseStudy: {},
    cover: {
      src: "/images/canine-carrier-clean.jpg",
      alt: "Canine Carrier with a black frame and mesh enclosure",
      width: 1280,
      height: 720,
      caption: "Canine Carrier",
      note: "Product film",
    },
    video: "/videos/canine-carrier-clean.mp4",
    description: [
      "The Canine Carrier brings together an enclosed body, mesh openings, and a top-mounted carrying handle. A defined frame gives structure to the enclosure.",
      "Mesh panels offer a view into the interior and break up the solid surfaces of the body. The product film and stills show how the frame, panels, and handle come together from different angles.",
    ],
    gallery: [
      {
        src: "/images/carrier-profile.jpg",
        alt: "Canine Carrier enclosure and mesh panels viewed from the front",
        width: 1600, height: 900,
        caption: "Canine Carrier", note: "Profile / Film still",
      },
      {
        src: "/images/carrier-reverse.jpg",
        alt: "Alternate view of the Canine Carrier showing the handle and frame",
        width: 1600, height: 900,
        caption: "Another perspective", note: "Film still",
      },
      {
        src: "/images/carrier-travel-montage-muted.jpg",
        alt: "Six-panel concept montage of dogs in Canine Carriers mounted on motorcycles, in muted warm grey and stone tones",
        width: 1536, height: 1024,
        caption: "Canine Carrier / Context studies", note: "AI concept visualization",
        description: "AI-generated context studies exploring the carrier on different motorcycles. Motorcycle fit, mounting details, and validation are to be confirmed.",
        wide: true, anchor: "carrier-concept",
      },
    ],
  },
];

export const homeProjects = projects.slice(0, 5);
export const hasMoreProjects = projects.length > homeProjects.length;
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
