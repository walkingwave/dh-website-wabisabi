import type { Project } from "@/content/projects";
import { year } from "@/content/order";
import { Tile } from "./Tile";

export function ProjectTile({ project, priority }: { project: Project; index?: number; priority?: boolean }) {
  return (
    <Tile
      href={`/projects/${project.slug}`}
      title={project.title}
      blurb={project.blurb}
      image={project.cover}
      tint={project.cover.tint}
      priority={priority}
      meta={year(project)}
    />
  );
}
