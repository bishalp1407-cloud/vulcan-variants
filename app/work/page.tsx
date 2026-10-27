import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import SiteHeader from "../components/SiteHeader";
import StudioMotion from "../components/StudioMotion";

export const metadata: Metadata = { title: "Selected work — Vulcan Variants", description: "Explore product design projects from Vulcan Variants." };
export default function WorkPage() {
  return <StudioMotion><main id="work-top"><SiteHeader /><section className="wrap work-index-heading"><h1><span className="text-line-mask"><span data-hero-line>Selected work</span></span></h1><p>Products, form, and the details in between.</p></section><section className="wrap portfolio-grid work-index" aria-label="All projects">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</section><footer className="site-footer wrap"><Link href="/">← Back to home</Link><Link href="/#contact">Discuss a project ↗</Link></footer></main></StudioMotion>;
}
