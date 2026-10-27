import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../data/projects";
import ProductFilm from "../../components/ProductFilm";
import SiteHeader from "../../components/SiteHeader";
import StudioMotion from "../../components/StudioMotion";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found — Vulcan Variants" };
  return { title: `${project.title} — Vulcan Variants`, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const facts = [
    ["Our role", project.credits?.role, "[Add the studio’s contribution]"],
    ["Client / context", project.credits?.client, "[Client or self-initiated project]"] ,
    ["Year", project.credits?.year, "[Project year]"],
    ["Stage", project.credits?.stage, "[Concept / prototype / production — confirm]"] ,
  ];
  const story = [
    ["The brief", project.caseStudy?.brief, "[Add the original problem, intended user, and key constraints.]"],
    ["Design approach", project.caseStudy?.approach, "[Explain the important design decisions and why they were made. Add supporting sketches or development images when available.]"],
    ["Development & validation", project.caseStudy?.validation, "[Add confirmed materials, prototypes, and testing. Include what was learned and any limitations.]"],
    ["Outcome", project.caseStudy?.outcome, "[Add the current project status and documented results. If development is ongoing, explain what comes next.]"],
  ];
  return <StudioMotion><main id="project-top">
    <a className="skip-content" href="#project-content">Skip to project</a>
    <SiteHeader />
    <section className="project-page-heading wrap" id="project-content" aria-labelledby="project-title">
      <Link href="/#work" className="text-link">← Selected work</Link>
      <div className="project-title-row"><h1 id="project-title"><span className="text-line-mask"><span data-hero-line>{project.title}</span></span></h1><p data-entry>{project.category}</p></div>
      <p className="project-page-summary" data-entry>{project.summary}</p>
    </section>
    <dl className="project-facts wrap">{facts.map(([label, value, placeholder]) => <div key={label}><dt>{label}</dt><dd className={value ? "" : "content-placeholder"}>{value || placeholder}</dd></div>)}</dl>
    <div className="wrap project-page-film">{project.video ? <ProductFilm src={project.video} poster={project.cover.src} title={project.title} /> : <Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} sizes="100vw" />}</div>
    <section id="product-views" className="product-description wrap" data-text-group aria-labelledby="about-product"><h2 id="about-product">Product overview</h2><div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    <section className="case-study wrap" aria-label="Project story">{story.map(([title, value, placeholder]) => <div className="case-study-row" data-text-group key={title}><h2>{title}</h2><div>{!value && <span className="detail-pending">Details to add</span>}<p className={value ? "" : "content-placeholder"}>{value || placeholder}</p></div></div>)}</section>
    <div className="product-views wrap">{project.gallery.map((image) => <figure id={image.anchor} className={`product-view${image.wide ? " view-context" : ""}`} data-reveal key={image.src}><div className="still-frame"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={image.wide ? "(max-width: 900px) 100vw, 1440px" : "(max-width: 600px) 100vw, 50vw"} /></div><figcaption><span>{image.caption}</span><span>{image.note}</span>{image.description && <p className="image-context">{image.description}</p>}</figcaption></figure>)}</div>
    <section className="project-end wrap" data-text-group><h2>Have a related idea?</h2><p>Tell us about the product you want to explore.</p><Link className="text-link" href="/#contact">Discuss a project <span aria-hidden="true">↗</span></Link></section>
    <footer className="site-footer wrap"><Link href="/#work">← Back to selected work</Link><Link href="#project-top">Back to top ↑</Link></footer>
  </main></StudioMotion>;
}
