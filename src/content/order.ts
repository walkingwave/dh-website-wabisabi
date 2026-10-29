import { projects, type Project } from "./projects";

// Display order: software first, then embedded.
export const softwareSlugs = ["paddlelab-xr", "unstable-daw", "internoutsider", "instrument-technique-classifier"];
export const embeddedSlugs = [
  "tx-power-amplifier",
  "riscfx",
  "imu-air-drumming-kit",
  "piano-synthesizer",
  "autonomous-sumo-robot",
  "soap-alarm",
  "soilbot",
];

const pick = (slugs: string[]) =>
  slugs.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => Boolean(p));

export const softwareProjects = pick(softwareSlugs);
export const embeddedProjects = pick(embeddedSlugs);
export const orderedProjects = [...softwareProjects, ...embeddedProjects];

export function year(p: Project) {
  return p.period.match(/\d{4}/g)?.pop() ?? p.period;
}
