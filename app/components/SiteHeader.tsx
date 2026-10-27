import Link from "next/link";

export default function SiteHeader({ home = false }: { home?: boolean }) {
  return <header className="site-header wrap">
    <Link href={home ? "#home" : "/#home"} className="wordmark" aria-label="Vulcan Variants home">Vulcan Variants</Link>
    <p className="header-description">Product design<br />India · Aiming globally</p>
    <nav aria-label="Main navigation"><Link href={home ? "#work" : "/#work"}>Work</Link><Link href={home ? "#studio" : "/#studio"}>Studio</Link><Link href={home ? "#contact" : "/#contact"}>Contact</Link></nav>
  </header>;
}
