import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

/**
 * Landing hub — served at the site root "/".
 *
 * The recipes blog uses routeBasePath "/", so its posts keep their original
 * root-level URLs (/about, /huggingface, /aws, …), and the blog's list page
 * would normally claim "/" too. Swizzling BlogListPage overrides that: the site
 * root renders this two-bucket hub instead of the default scrollable post list.
 * The full post list still exists at the auto-generated /archive.
 */

type Destination = {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
  cta: string;
  badge?: string;
};

// Generic, hand-authored icons — no external or internal-only assets.
function GuidesIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RecipesIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 8-4 4 4 4m6-8 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The two "sides" of the site. Kept intentionally minimal — this is scaffolding;
// finished copy lands with the later rebrand pass.
const DESTINATIONS: Destination[] = [
  {
    title: "Agentforce Voice Implementation Guide",
    href: "/docs/voice/voice-intro",
    description:
      "A step-by-step guide to implementing Agentforce Voice, with accompanying skills.",
    icon: <GuidesIcon />,
    cta: "Run the interactive guide",
    badge: "Beta",
  },
  {
    title: "LLM Open Connector Recipes",
    href: "/about",
    description:
      "Open-source code examples and API recipes for building with the LLM Open Connector.",
    icon: <RecipesIcon />,
    cta: "Explore the recipes",
  },
];

function DestinationCard({
  title,
  href,
  description,
  icon,
  cta,
  badge,
}: Destination): ReactNode {
  return (
    <div className="col col--6 margin-bottom--lg">
      <Link className={styles.card} to={href}>
        <span className={styles.cardIcon}>{icon}</span>
        <Heading as="h2" className={styles.cardHeading}>
          {title}
          {badge && <span className={styles.badge}>{badge}</span>}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.cardCta}>{cta}</span>
      </Link>
    </div>
  );
}

export default function BlogListPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Heading as="h1" className={styles.heroTitle}>
                Agentforce Companion Resources
              </Heading>
              <p className={styles.heroSubtitle}>
                Open-source resources for implementing
                Agentforce Voice and building with the LLM Open Connector.
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <div className={`row ${styles.cards}`}>
          {DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.href} {...destination} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
