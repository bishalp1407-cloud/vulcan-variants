import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/projects";
import ProjectPreview from "./ProjectPreview";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const href = `/work/${project.slug}`;
  return <article className={featured ? "portfolio-card featured-card" : "portfolio-card"}>
    <div className="portfolio-preview">
      {featured ? <ProjectPreview src={project.video} poster={project.cover.src} title={project.title} width={project.cover.width} height={project.cover.height} /> : <Link href={href} aria-label={`View ${project.title}`}><Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} sizes="(max-width: 600px) 100vw, 50vw" /></Link>}
    </div>
    <div className="portfolio-card-caption" data-reveal>
      <div><h3><Link href={href}>{project.title}</Link></h3><p>{project.category}</p></div>
      {featured && <p className="card-summary">{project.summary}</p>}
      <Link className="text-link" href={href}>View project <span aria-hidden="true">↗</span></Link>
    </div>
  </article>;
}
