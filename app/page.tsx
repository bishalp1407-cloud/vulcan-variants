import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import SiteHeader from "./components/SiteHeader";
import { homeProjects, hasMoreProjects } from "./data/projects";
import { siteDetails } from "./data/site";
import ProjectBrief from "./components/ProjectBrief";
import StudioMotion from "./components/StudioMotion";

export default function Home() {
  return (
    <StudioMotion>
      <main>
        <a className="skip-content" href="#home">Skip to main content</a>
        <div id="home">
          <SiteHeader home />
          <section className="home-hero wrap" aria-labelledby="home-title">
            <div className="hero-heading"><h1 id="home-title"><span className="text-line-mask"><span data-hero-line>From complex</span></span><span className="text-line-mask"><span data-hero-line>problems to</span></span><span className="text-line-mask hero-emphasis"><span data-hero-line>meaningful products.</span></span></h1><p className="hero-positioning">Physical product design for businesses and innovators.</p></div>
            <div className="hero-aside" data-entry><div><p>Indian in origin.<br />Global in ambition.</p><div className="studio-focus"><span>Product focus</span><p className={siteDetails.specialisms ? "" : "content-placeholder"}>{siteDetails.specialisms || "[Product categories and specialist services to add]"}</p></div></div><a className="text-link" href="#work">Selected work <span aria-hidden="true">↓</span></a></div>
          </section>
        </div>
        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="wrap section-heading"><h2 id="work-title">Selected work</h2><span className="project-type">Physical products</span></div>
          <div className="wrap home-projects">
            {homeProjects[0] && <ProjectCard project={homeProjects[0]} featured />}
            {homeProjects.length > 1 && <div className="portfolio-grid">{homeProjects.slice(1).map((project) => <ProjectCard key={project.slug} project={project} />)}</div>}
            {hasMoreProjects && <Link className="text-link all-projects" href="/work">View all projects <span aria-hidden="true">↗</span></Link>}
          </div>
        </section>
        <section id="studio" className="studio-section wrap" aria-labelledby="studio-title">
          <div className="studio-heading"><div><h2 id="studio-title">The studio</h2><p className="studio-note">Independent thinking.<br />Grounded in real needs.</p></div><div className="studio-person"><h3>People behind the work</h3><dl><div><dt>Name</dt><dd className={siteDetails.person.name ? "" : "content-placeholder"}>{siteDetails.person.name || "[Founder / team name]"}</dd></div><div><dt>Background</dt><dd className={siteDetails.person.role ? "" : "content-placeholder"}>{siteDetails.person.role || "[Role and design background]"}</dd></div><div><dt>Location</dt><dd className={siteDetails.person.location ? "" : "content-placeholder"}>{siteDetails.person.location || "[City, India]"}</dd></div></dl></div></div>
          <div className="studio-copy" data-text-group><p className="studio-statement">We work with businesses and innovators to give physical products a thoughtful, useful form.</p><p className={siteDetails.introduction ? "" : "content-placeholder"}>{siteDetails.introduction || "Vulcan Variants is an India-origin product design consultancy driven by the belief that meaningful innovation begins by questioning the obvious."}</p><div id="expertise" className="practice"><h3>Our practice</h3><ul>{(siteDetails.services || ["[Confirmed services and project stages to add]"]).map(service => <li key={service} className={siteDetails.services ? "" : "content-placeholder"}>{service}</li>)}</ul></div><div id="approach" className="approach-note"><h3>How we work</h3><p className={siteDetails.approach ? "" : "content-placeholder"}>{siteDetails.approach || "[Add the studio’s actual process and how clients are involved.]"}</p></div></div>
        </section>
        <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="wrap contact-grid"><div><h2 id="contact-title" data-heading-reveal><span className="text-line-mask"><span data-text-line>Let’s make</span></span><span className="text-line-mask"><span data-text-line>something useful.</span></span></h2><p>Tell us what you are working on.</p></div><div className="contact-brief"><div className="contact-direct"><h3>Email the studio</h3>{siteDetails.email ? <a className="contact-email" href={`mailto:${siteDetails.email}`}>{siteDetails.email} <span aria-hidden="true">↗</span></a> : <><p className="contact-email content-placeholder">[Studio email — to be added]</p><p className="contact-pending">The enquiry email will appear here once confirmed.</p></>}</div><details><summary>Prepare a project brief (optional) <span aria-hidden="true">+</span></summary><ProjectBrief /></details><p className="contact-note">Save your idea, requirements, and timing in a brief you can share. This tool downloads a file; it does not send an enquiry.</p></div></div></section>
        <footer className="site-footer wrap"><a href="#home">Vulcan Variants</a><span>Product design · India</span><a href="#home">Back to top ↑</a></footer>
      </main>
    </StudioMotion>
  );
}
