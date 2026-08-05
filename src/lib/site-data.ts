import living from "@/assets/living.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bedroom from "@/assets/bedroom.jpg";
import dining from "@/assets/dining.jpg";
import bathroom from "@/assets/bathroom.jpg";
import staircase from "@/assets/staircase.jpg";
import office from "@/assets/office.jpg";
import restaurant from "@/assets/restaurant.jpg";
import hotel from "@/assets/hotel.jpg";
import villa from "@/assets/villa.jpg";
import lighting from "@/assets/lighting.jpg";
import decor from "@/assets/decor.jpg";

export const images = {
  living,
  kitchen,
  bedroom,
  dining,
  bathroom,
  staircase,
  office,
  restaurant,
  hotel,
  villa,
  lighting,
  decor,
};

export type Shot = { src: string; label: string; category: string };

export const gallery: Shot[] = [
  { src: living, label: "Luxury Living Room", category: "Living Room" },
  { src: kitchen, label: "Modular Kitchen", category: "Kitchen" },
  { src: bedroom, label: "Master Bedroom", category: "Bedroom" },
  { src: dining, label: "Formal Dining", category: "Dining" },
  { src: bathroom, label: "Stone Bathroom", category: "Bathroom" },
  { src: staircase, label: "Sculptural Staircase", category: "Villa" },
  { src: office, label: "Executive Office", category: "Office" },
  { src: restaurant, label: "Fine Dining Room", category: "Restaurant" },
  { src: hotel, label: "Hotel Lobby", category: "Hotel" },
  { src: villa, label: "Private Villa", category: "Villa" },
  { src: lighting, label: "Ceiling & Lighting", category: "Lighting" },
  { src: decor, label: "Curated Decor", category: "Decor" },
];

export const processSteps = [
  { title: "Consultation", copy: "An unhurried conversation about how you live, host and retreat." },
  { title: "Requirement Analysis", copy: "Programme, adjacencies and lifestyle mapped into a written brief." },
  { title: "Site Visit", copy: "Light study, measurements and structural survey of the existing shell." },
  { title: "Concept Development", copy: "A single, committed narrative for the space — not a menu of options." },
  { title: "Mood Board", copy: "Materials, tones and references assembled into one tactile story." },
  { title: "Space Planning", copy: "Circulation, proportion and sightlines resolved to the millimetre." },
  { title: "3D Visualisation", copy: "Photoreal renders so nothing is left to imagination or chance." },
  { title: "Material Selection", copy: "Stone, timber, plaster and metal chosen slab by slab." },
  { title: "Budget Planning", copy: "Transparent costing with allowances mapped against every line." },
  { title: "Execution", copy: "Our own site team, working to drawings and weekly reporting." },
  { title: "Quality Inspection", copy: "A forensic snag list closed before you ever see the space." },
  { title: "Project Handover", copy: "Styled, photographed and handed over with a care manual." },
];

export const services = [
  { title: "Residential Interior", copy: "Complete homes designed around the rhythm of a family.", img: living },
  { title: "Commercial Interior", copy: "Retail and hospitality environments built for dwell time.", img: restaurant },
  { title: "Office Design", copy: "Workplaces that feel considered, calm and quietly premium.", img: office },
  { title: "Luxury Villa Design", copy: "Ground-up villa interiors with architectural coordination.", img: villa },
  { title: "Modular Kitchen", copy: "German hardware, stone tops, and cabinetry built to last.", img: kitchen },
  { title: "Bedroom Design", copy: "Layered textiles, soft light and considered storage.", img: bedroom },
  { title: "Furniture Selection", copy: "Curated and bespoke pieces sourced from trusted ateliers.", img: decor },
  { title: "Lighting Design", copy: "Three-layer lighting schemes with full circuit drawings.", img: lighting },
  { title: "Space Planning", copy: "Plans that resolve proportion, flow and natural light.", img: staircase },
  { title: "Renovation", copy: "Sensitive reworking of existing homes and heritage shells.", img: dining },
  { title: "Turnkey Projects", copy: "One contract, one team, from drawing to final styling.", img: hotel },
  { title: "3D Visualisation", copy: "Photoreal previews of every room before work begins.", img: bathroom },
];
