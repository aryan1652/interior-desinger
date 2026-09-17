import empty from "@/assets/stage-1-empty-real.jpg";
import shell from "@/assets/stage-2-shell-real.jpg";
import lit from "@/assets/stage-3-light-real.jpg";
import furnished from "@/assets/stage-4-furniture-real.jpg";
import finalRoom from "@/assets/stage-5-final.jpg";
import { images } from "@/lib/site-data";

export const stageImages = { empty, shell, lit, furnished, final: finalRoom };

export type Stage = { label: string; caption: string; img: string };

export const transformStages: Stage[] = [
  { label: "Empty Room", caption: "Bare shell. Raw concrete, unfinished plaster.", img: empty },
  { label: "Walls", caption: "Panelled plaster, lime-washed in warm bone.", img: shell },
  { label: "Flooring", caption: "Wide French oak, laid in herringbone.", img: shell },
  { label: "Ceiling", caption: "Recessed cove profile and shadow gap.", img: lit },
  { label: "Lighting", caption: "Three layers — ambient, task, accent.", img: lit },
  { label: "Furniture", caption: "Boucle seating, solid marble, low profiles.", img: furnished },
  { label: "Decor", caption: "Art, ceramics and quiet objects.", img: finalRoom },
  { label: "Plants", caption: "A mature olive to hold the corner.", img: finalRoom },
  { label: "Accessories", caption: "Books, candlelight, brass detail.", img: finalRoom },
  { label: "Final Interior", caption: "Resolved, styled and handed over.", img: finalRoom },
];

export const filters = [
  "All",
  "Residential",
  "Commercial",
  "Office",
  "Villa",
  "Kitchen",
  "Bedroom",
  "Hotel",
  "Restaurant",
  "Modern",
  "Classic",
  "Minimal",
  "Contemporary",
] as const;

export type Project = {
  slug: string;
  name: string;
  location: string;
  type: string;
  area: string;
  year: string;
  tags: string[];
  hero: string;
  requirements: string;
  concept: string;
  challenges: string;
  materials: string[];
  palette: { name: string; hex: string }[];
  furniture: string;
  lighting: string;
  execution: string;
  before: string;
  after: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "maison-oriel",
    name: "Maison Oriel",
    location: "Bandra West, Mumbai",
    type: "Residential Apartment",
    area: "4,200 sq ft",
    year: "2025",
    tags: ["Residential", "Modern", "Minimal", "Bedroom"],
    hero: images.living,
    requirements:
      "A family of four wanted a calm, sea-facing home that could host thirty people without ever feeling like an event space.",
    concept:
      "One material story — bone plaster, French oak and honed travertine — carried across every room so the plan reads as a single continuous volume.",
    challenges:
      "A structural core sat dead centre of the living plan. We absorbed it into a full-height oak spine that now conceals storage, services and the bar.",
    materials: ["Lime plaster", "French oak", "Honed travertine", "Antique brass", "Boucle wool"],
    palette: [
      { name: "Bone", hex: "#F2EEE8" },
      { name: "Sand", hex: "#E6D7C3" },
      { name: "Beige", hex: "#D8C3A5" },
      { name: "Gold", hex: "#B8945A" },
      { name: "Ink", hex: "#232323" },
    ],
    furniture:
      "Custom curved boucle sectional, solid Calacatta coffee table, hand-turned oak dining table for twelve.",
    lighting:
      "Cove-lit perimeter at 2700K, alabaster pendant over dining, dimmable accent tracks on all art walls.",
    execution:
      "Fourteen weeks on site with our own team, weekly client reporting and a forensic snag list closed before handover.",
    before: empty,
    after: finalRoom,
    gallery: [images.living, images.dining, images.bedroom, images.lighting, images.decor],
  },
  {
    slug: "villa-sereno",
    name: "Villa Sereno",
    location: "Alibaug, Maharashtra",
    type: "Private Villa",
    area: "9,800 sq ft",
    year: "2024",
    tags: ["Villa", "Residential", "Contemporary", "Kitchen"],
    hero: images.villa,
    requirements:
      "A weekend house for a collector — generous, barefoot-friendly, and able to sit empty for weeks without looking neglected.",
    concept:
      "Architecture and interior detailed together: deep verandas, lime-plaster mass walls, and a sculptural staircase as the only ornament.",
    challenges:
      "Coastal salt air ruled out most metals. Every fixing was specified in marine-grade brass or powder-coated stainless.",
    materials: ["Kota stone", "Lime plaster", "Teak", "Marine brass", "Handloom linen"],
    palette: [
      { name: "Chalk", hex: "#F8F6F2" },
      { name: "Clay", hex: "#D8C3A5" },
      { name: "Olive", hex: "#8A8B6C" },
      { name: "Teak", hex: "#8C5A34" },
      { name: "Ink", hex: "#232323" },
    ],
    furniture:
      "Low teak daybeds, woven cane lounge chairs, a nine-metre cast terrazzo dining bench.",
    lighting:
      "Warm 2400K exterior wash, concealed step lighting, and a single sculptural chandelier over the stair void.",
    execution:
      "Eleven months of ground-up coordination with the architect and landscape team.",
    before: shell,
    after: images.villa,
    gallery: [images.villa, images.staircase, images.kitchen, images.bathroom, images.living],
  },
  {
    slug: "atelier-noor",
    name: "Atelier Noor",
    location: "Lower Parel, Mumbai",
    type: "Workplace & Studio",
    area: "6,500 sq ft",
    year: "2025",
    tags: ["Office", "Commercial", "Modern", "Minimal"],
    hero: images.office,
    requirements:
      "A design-led investment firm wanted a workplace that reads as a private residence to visiting clients.",
    concept:
      "Domestic materials in a commercial shell — oak joinery, wool acoustics and warm plaster instead of laminate and carpet tile.",
    challenges:
      "Open-plan acoustics. Wool baffles hidden inside the ceiling raft brought reverberation down to 0.6 seconds.",
    materials: ["Oak veneer", "Acoustic wool", "Micro-cement", "Blackened steel", "Leather"],
    palette: [
      { name: "Paper", hex: "#F8F6F2" },
      { name: "Oat", hex: "#E6D7C3" },
      { name: "Bronze", hex: "#B8945A" },
      { name: "Graphite", hex: "#4A4A4A" },
      { name: "Ink", hex: "#232323" },
    ],
    furniture:
      "Bespoke oak workstations, leather-topped boardroom table, lounge library with a full-height bookwall.",
    lighting:
      "Linear indirect uplight at 3000K, task lamps at every desk, and pinspots on the art collection.",
    execution: "Nine weeks, phased over two floors so the team never stopped trading.",
    before: empty,
    after: images.office,
    gallery: [images.office, images.lighting, images.decor, images.dining, images.staircase],
  },
  {
    slug: "the-verre-hotel",
    name: "The Verre",
    location: "Panjim, Goa",
    type: "Boutique Hotel & Restaurant",
    area: "21,000 sq ft",
    year: "2024",
    tags: ["Hotel", "Restaurant", "Commercial", "Classic"],
    hero: images.hotel,
    requirements:
      "Twenty-four keys, an all-day restaurant and a lobby that locals would use as a living room.",
    concept:
      "Portuguese-colonial bones treated with restraint — restored terrazzo, tall louvred shutters and a single deep-green accent.",
    challenges:
      "Heritage constraints prevented altering the façade, so every service run was threaded through new internal bulkheads.",
    materials: ["Restored terrazzo", "Burma teak", "Rattan", "Glazed tile", "Aged brass"],
    palette: [
      { name: "Shell", hex: "#F2EEE8" },
      { name: "Sand", hex: "#E6D7C3" },
      { name: "Brass", hex: "#B8945A" },
      { name: "Deep green", hex: "#2F4438" },
      { name: "Ink", hex: "#232323" },
    ],
    furniture:
      "Rattan lounge suites, marble-topped café tables, custom teak headboards in every key.",
    lighting:
      "Candle-level dining at 2200K, layered lobby scheme on five circuits, fully scene-programmed.",
    execution:
      "Sixteen months including heritage approvals, delivered two weeks ahead of the season.",
    before: shell,
    after: images.hotel,
    gallery: [images.hotel, images.restaurant, images.bedroom, images.bathroom, images.lighting],
  },
];

export const galleryFilterMap: Record<string, string[]> = {
  "Living Room": ["Residential", "Modern", "Contemporary"],
  Kitchen: ["Kitchen", "Residential", "Modern"],
  Bedroom: ["Bedroom", "Residential", "Minimal"],
  Dining: ["Residential", "Classic"],
  Bathroom: ["Residential", "Minimal"],
  Villa: ["Villa", "Residential", "Contemporary"],
  Office: ["Office", "Commercial", "Modern"],
  Restaurant: ["Restaurant", "Commercial", "Contemporary"],
  Hotel: ["Hotel", "Commercial", "Classic"],
  Lighting: ["Modern", "Minimal", "Commercial"],
  Decor: ["Classic", "Residential"],
};

export const testimonials = [
  {
    quote:
      "They understood how we actually live before they drew a single line. Two years on, the house still feels finished rather than decorated.",
    name: "Ananya & Rohan Mehta",
    role: "Maison Oriel, Mumbai",
  },
  {
    quote:
      "The detail drawings were better than our architect's. Nothing on site was left to interpretation, and nothing ran over budget.",
    name: "Farhan Qureshi",
    role: "Villa Sereno, Alibaug",
  },
  {
    quote:
      "Clients walk in and assume it's someone's home. That single decision changed how our firm is perceived.",
    name: "Devika Raman",
    role: "Managing Partner, Atelier Noor",
  },
  {
    quote:
      "They handed over on time, in season, with a care manual for every surface. Rare, and quietly luxurious.",
    name: "Marco Fernandes",
    role: "Owner, The Verre",
  },
];
