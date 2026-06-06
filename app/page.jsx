"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useState } from "react";

const shopUrl = "https://greeniqlawn.com/collections/all";
const commercialUrl = "https://greeniqlawn.com/pages/commercial";
const guideUrl = "https://cdn.shopify.com/s/files/1/0967/2779/3981/files/May_Guide_-_Reinforcing_the_Spring_Surge.pdf?v=1779320230";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "System", href: "#system" },
  { label: "Commercial", href: "#commercial" },
  { label: "Products", href: "#products" },
  { label: "Inquiry", href: "#inquiry" }
];

const buyerSegments = [
  {
    label: "Facilities",
    title: "For facility managers protecting daily curb appeal.",
    body: "A clearer turf program for campuses, offices, churches, retail properties, and multi-site grounds where consistency matters to the brand experience.",
    points: ["Seasonal application guidance", "Professional presentation", "Reduced guesswork for maintenance teams"]
  },
  {
    label: "Contractors",
    title: "For lawn care teams that need a system they can explain.",
    body: "GreenIQ gives operators a clean framework for communicating timing, benefits, and product selection to customers without overcomplicating agronomy.",
    points: ["Simple phase language", "Commercial access pathway", "Easy product positioning"]
  },
  {
    label: "Homeowners",
    title: "For homeowners who want a professional plan, not random products.",
    body: "The four-phase system helps customers understand what their lawn needs by season, so they can buy with confidence and apply with purpose.",
    points: ["Clear seasonal steps", "Up to 8,000 sq. ft. coverage", "Education-first product experience"]
  }
];

const phaseData = [
  {
    id: "launch",
    phase: "Phase 01",
    name: "Launch X",
    label: "Activation",
    formula: "11-0-1",
    season: "Early spring",
    image: "https://greeniqlawn.com/cdn/shop/files/LaunchX.png?v=1773172721&width=1946",
    url: "https://greeniqlawn.com/products/launch-x",
    headline: "Start the season with root activity and controlled green-up.",
    copy: "Built for early-season activation, new sod, overseeding, and post-aeration support.",
    spec: ["Spring activation", "Root development", "New seed and sod support"]
  },
  {
    id: "fortify",
    phase: "Phase 02",
    name: "Fortify+",
    label: "Density",
    formula: "16-0-8",
    season: "Mid-to-late spring",
    image: "https://greeniqlawn.com/cdn/shop/files/Fortify.png?v=1773172328&width=1946",
    url: "https://greeniqlawn.com/products/fortify-%E2%84%A2",
    headline: "Build density and color before summer pressure arrives.",
    copy: "Designed to support active growth, canopy strength, deeper color, and consistent spring performance.",
    spec: ["Darker visual color", "Canopy strength", "Growth consistency"]
  },
  {
    id: "defend",
    phase: "Phase 03",
    name: "Defend",
    label: "Resilience",
    formula: "9-0-1",
    season: "Late spring / early summer",
    image: "https://greeniqlawn.com/cdn/shop/files/Defend.png?v=1773077429&width=1946",
    url: "https://greeniqlawn.com/products/defend%E2%84%A2",
    headline: "Prepare turf for heat, traffic, and seasonal stress.",
    copy: "Positioned for proactive support before summer conditions place heavier demand on the lawn.",
    spec: ["Heat support", "Traffic tolerance", "Color retention"]
  },
  {
    id: "recover",
    phase: "Phase 04",
    name: "Recover",
    label: "Restoration",
    formula: "2-0-23",
    season: "Late summer / fall",
    image: "https://greeniqlawn.com/cdn/shop/files/Recover.png?v=1773170907&width=1946",
    url: "https://greeniqlawn.com/products/recover%E2%84%A2",
    headline: "Restore lawn structure after summer and prepare for spring.",
    copy: "Built for recovery, root restoration, fall renovation, and next-season readiness.",
    spec: ["Post-heat recovery", "Fall readiness", "Root restoration"]
  }
];

const proofPoints = [
  { value: "4", label: "Seasonal phases", detail: "A guided program from spring activation through fall recovery." },
  { value: "8K", label: "Sq. ft. per bottle", detail: "Positioned for broad residential and light-commercial coverage." },
  { value: "B2B", label: "Commercial access", detail: "Built for teams that need repeatable, scalable application decisions." },
  { value: "MW", label: "Midwest context", detail: "Messaging shaped for Kansas and Midwest seasonal lawn conditions." }
];

const operatingPrinciples = [
  {
    title: "Clarity before purchase",
    body: "Visitors should understand the correct phase, use case, and expected role of each product before they enter the store."
  },
  {
    title: "Commercial confidence",
    body: "Corporate buyers need a site that communicates reliability, product logic, education, and professional fit without feeling overly casual."
  },
  {
    title: "System-led selling",
    body: "GreenIQ is strongest when it is presented as a seasonal turf framework, not just a shelf of individual bottles."
  }
];

const commercialUseCases = [
  "Corporate campuses",
  "HOA common areas",
  "Church properties",
  "Retail frontage",
  "Property management",
  "Golf and sports turf",
  "Lawn care operators",
  "Municipal grounds"
];

const bundles = [
  {
    eyebrow: "Complete program",
    name: "Full-Season Kit",
    price: "$139.99",
    old: "$159.99",
    description: "The complete four-phase sequence for customers who want the full GreenIQ system in one purchase.",
    includes: ["Launch X", "Fortify+", "Defend", "Recover"],
    href: shopUrl
  },
  {
    eyebrow: "Simplified path",
    name: "Essentials Bundle",
    price: "$79.99 / year",
    old: "$89.99 / year",
    description: "A streamlined two-step program for early activation and late-season restoration.",
    includes: ["Launch X", "Recover"],
    href: shopUrl
  }
];

const faqs = [
  {
    q: "Is GreenIQ only for residential lawns?",
    a: "No. GreenIQ supports homeowners and commercial users, including lawn care companies, golf courses, facilities teams, and property managers that need a repeatable seasonal turf approach."
  },
  {
    q: "What makes the site more corporate?",
    a: "The rebuild uses a more restrained visual system, stronger information hierarchy, professional terminology, commercial use cases, trust-focused sections, and more practical calls to action."
  },
  {
    q: "Can this still convert homeowners?",
    a: "Yes. The site is more mature, but it still keeps the homeowner path clear through phase education, product cards, bundle recommendations, and simple calls to shop."
  },
  {
    q: "Can the inquiry form send emails?",
    a: "Yes. The included API route can send form submissions through Resend when environment variables are added. Without email settings, submissions are logged server-side during development."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "GreenIQ",
      url: "https://greeniqlawn.com",
      slogan: "Lawn Science, Simplified.",
      description: "A soil-first lawn care system for homeowners, facilities teams, lawn care professionals, and commercial turf programs."
    },
    {
      "@type": "ItemList",
      name: "GreenIQ Four-Phase Lawn System",
      itemListElement: phaseData.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.name} — ${item.label}`,
        url: item.url
      }))
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
    }
  ]
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Reveal({ children, className = "", delay = 0, y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, body, align = "left" }) {
  return (
    <Reveal className={cx("section-header", align === "center" && "section-header-center")}> 
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </Reveal>
  );
}

function BrandMark() {
  return (
    <a href="#top" className="brand-mark" aria-label="GreenIQ home">
      <img src="/leaf-mark.svg" alt="" />
      <span>GreenIQ</span>
    </a>
  );
}

function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <header className="site-header">
      <motion.div className="scroll-line" style={{ scaleX }} />
      <div className="header-inner">
        <BrandMark />
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a href="#inquiry" className="header-cta">Request guidance</a>
      </div>
    </header>
  );
}

function Button({ href, children, variant = "primary" }) {
  return (
    <motion.a
      href={href}
      className={cx("btn", variant === "secondary" ? "btn-secondary" : "btn-primary")}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </motion.a>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 80]);

  return (
    <section id="top" className="hero-section">
      <motion.div className="hero-bg" style={{ y }} />
      <div className="container hero-grid">
        <Reveal className="hero-copy-wrap">
          <p className="market-label">Midwest turf program · Residential + commercial</p>
          <h1>Corporate-grade lawn science, simplified for every property.</h1>
          <p className="hero-lede">
            GreenIQ turns seasonal lawn care into a clear, professional system for homeowners, facilities teams, property managers, and commercial turf operators.
          </p>
          <div className="hero-actions">
            <Button href="#commercial">Explore commercial fit</Button>
            <Button href={shopUrl} variant="secondary">Shop seasonal system</Button>
          </div>
          <div className="hero-meta" aria-label="GreenIQ trust points">
            <span>Four-phase program</span>
            <span>Soil-first education</span>
            <span>Commercial pathway</span>
          </div>
        </Reveal>

        <Reveal className="executive-card" delay={0.08}>
          <div className="card-topline">
            <span>GreenIQ seasonal framework</span>
            <strong>2026</strong>
          </div>
          <div className="program-arc" aria-hidden="true">
            {phaseData.map((phase, index) => (
              <motion.a
                key={phase.id}
                href={phase.url}
                className="arc-node"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
              >
                <span>{`0${index + 1}`}</span>
                <strong>{phase.name}</strong>
                <small>{phase.label}</small>
              </motion.a>
            ))}
          </div>
          <div className="hero-product-strip">
            {phaseData.map((item) => (
              <img key={item.id} src={item.image} alt={`${item.name} GreenIQ product`} />
            ))}
          </div>
          <div className="executive-note">
            <strong>Designed for decision clarity.</strong>
            <p>Each phase explains when to apply, what problem it solves, and why it matters for long-term turf performance.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section id="overview" className="proof-section">
      <div className="container proof-grid">
        {proofPoints.map((item, index) => (
          <Reveal className="proof-card" key={item.label} delay={index * 0.04}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <p>{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SegmentSection() {
  const [active, setActive] = useState(0);
  const current = buyerSegments[active];

  return (
    <section className="section segment-section">
      <div className="container segment-grid">
        <SectionHeader
          eyebrow="Audience clarity"
          title="A professional website must speak to the buyer in front of it."
          body="The corporate direction keeps GreenIQ polished for B2B audiences while still making the homeowner buying path simple and clear."
        />
        <Reveal className="segment-panel" delay={0.08}>
          <div className="segment-tabs" role="tablist" aria-label="Customer segments">
            {buyerSegments.map((segment, index) => (
              <button
                key={segment.label}
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
              >
                {segment.label}
              </button>
            ))}
          </div>
          <motion.div
            key={current.label}
            className="segment-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h3>{current.title}</h3>
            <p>{current.body}</p>
            <ul>
              {current.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="section muted-section">
      <div className="container">
        <SectionHeader
          eyebrow="Corporate direction"
          title="Less playful. More credible. Still premium."
          body="The new aesthetic uses a restrained executive palette, clean product hierarchy, practical proof points, and subtle motion that feels expensive rather than experimental."
          align="center"
        />
        <div className="principle-grid">
          {operatingPrinciples.map((item, index) => (
            <Reveal className="principle-card" key={item.title} delay={index * 0.05}>
              <span>{`0${index + 1}`}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section id="system" className="section system-section">
      <div className="container">
        <SectionHeader
          eyebrow="The GreenIQ system"
          title="A four-phase turf program customers can understand immediately."
          body="Instead of presenting products as separate purchases, the site organizes GreenIQ around a seasonal program: activate, build, defend, and restore."
          align="center"
        />
        <div className="timeline-board">
          {phaseData.map((phase, index) => (
            <Reveal className="phase-row" key={phase.id} delay={index * 0.05}>
              <div className="phase-index">
                <span>{phase.phase}</span>
                <strong>{phase.label}</strong>
              </div>
              <div className="phase-product">
                <img src={phase.image} alt={`${phase.name} bottle`} />
                <div>
                  <h3>{phase.name}</h3>
                  <p>{phase.formula} · {phase.season}</p>
                </div>
              </div>
              <div className="phase-copy">
                <h4>{phase.headline}</h4>
                <p>{phase.copy}</p>
              </div>
              <ul className="phase-specs">
                {phase.spec.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommercialSection() {
  return (
    <section id="commercial" className="section commercial-section">
      <div className="container commercial-grid">
        <Reveal className="commercial-copy">
          <p className="eyebrow">Commercial readiness</p>
          <h2>Built to feel credible for corporate and property-focused customers.</h2>
          <p>
            Corporate buyers care about risk, consistency, operational fit, and whether a product can be explained clearly to the people making property decisions. This direction gives GreenIQ a more mature presence for decision-makers who are managing real property standards.
          </p>
          <div className="commercial-actions">
            <Button href={commercialUrl}>View commercial access</Button>
            <Button href="#inquiry" variant="secondary">Request product guidance</Button>
          </div>
        </Reveal>
        <Reveal className="commercial-panel" delay={0.08}>
          <div className="panel-header">
            <span>Use cases</span>
            <strong>Professional turf contexts</strong>
          </div>
          <div className="use-case-grid">
            {commercialUseCases.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="procurement-box">
            <h3>What a corporate buyer sees</h3>
            <p>Clear positioning, organized product logic, commercial entry points, practical education, and a brand that feels prepared for professional conversations.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="products" className="section products-section">
      <div className="container">
        <SectionHeader
          eyebrow="Product pathways"
          title="Give customers a confident next step."
          body="The product section uses restrained cards and direct language so the visitor can move from education to purchase without confusion."
          align="center"
        />
        <div className="bundle-grid">
          {bundles.map((bundle, index) => (
            <Reveal className="bundle-card" key={bundle.name} delay={index * 0.05}>
              <span>{bundle.eyebrow}</span>
              <h3>{bundle.name}</h3>
              <div className="price-row">
                <strong>{bundle.price}</strong>
                <small>{bundle.old}</small>
              </div>
              <p>{bundle.description}</p>
              <ul>
                {bundle.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={bundle.href}>Shop bundle <span aria-hidden="true">→</span></a>
            </Reveal>
          ))}
        </div>
        <Reveal className="guide-card">
          <div>
            <p className="eyebrow">Education asset</p>
            <h3>Reinforce trust with useful seasonal guidance.</h3>
            <p>GreenIQ’s guide content can support SEO, product education, and buyer confidence by explaining timing, symptoms, and seasonal turf strategy.</p>
          </div>
          <Button href={guideUrl} variant="secondary">Open seasonal guide</Button>
        </Reveal>
      </div>
    </section>
  );
}

function LeadForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
      setMessage("Thank you. GreenIQ has enough information to follow up with the right next step.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Please try again.");
    }
  }

  const inquiryTypes = useMemo(() => ["Commercial program", "Residential lawn plan", "Retail product question", "Professional applicator interest"], []);

  return (
    <section id="inquiry" className="section inquiry-section">
      <div className="container inquiry-grid">
        <Reveal className="inquiry-copy">
          <p className="eyebrow">Inquiry flow</p>
          <h2>Make the next step feel professional, not generic.</h2>
          <p>
            The form is written for higher-quality conversations. It captures the property context, buyer intent, and contact details GreenIQ needs to respond with relevant guidance.
          </p>
          <div className="inquiry-note">
            <strong>Production ready:</strong>
            <span>The API route is included. Add Resend environment variables to deliver submissions by email.</span>
          </div>
        </Reveal>
        <Reveal className="form-card" delay={0.08}>
          <form onSubmit={handleSubmit}>
            <input type="text" name="website" tabIndex="-1" autoComplete="off" className="honeypot" aria-hidden="true" />
            <div className="form-grid">
              <label>
                Full name
                <input required name="name" type="text" placeholder="Your name" />
              </label>
              <label>
                Email
                <input required name="email" type="email" placeholder="name@company.com" />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" placeholder="Optional" />
              </label>
              <label>
                Organization
                <input name="organization" type="text" placeholder="Company, church, HOA, or property" />
              </label>
              <label>
                Property type
                <select name="propertyType" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Corporate / commercial property</option>
                  <option>Residential lawn</option>
                  <option>Golf / sports turf</option>
                  <option>Lawn care business</option>
                  <option>Retail / distribution</option>
                </select>
              </label>
              <label>
                Inquiry type
                <select name="inquiryType" defaultValue="">
                  <option value="" disabled>Select one</option>
                  {inquiryTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <label>
              Notes
              <textarea name="notes" rows="5" placeholder="Tell us about the lawn, property size, current issue, or commercial need." />
            </label>
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Submit inquiry"}
              <span aria-hidden="true">→</span>
            </button>
            {message ? <p className={cx("form-message", status === "error" && "form-error")}>{message}</p> : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section faq-section">
      <div className="container faq-grid">
        <SectionHeader
          eyebrow="Presentation notes"
          title="What changed in this corporate rebuild?"
          body="This version is built to be shown to a business owner with polished, client-facing language throughout."
        />
        <div className="faq-list">
          {faqs.map((item, index) => (
            <Reveal className="faq-item" key={item.q} delay={index * 0.04}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandMark />
          <p>Soil-first lawn science presented with the clarity corporate and residential buyers need.</p>
        </div>
        <div>
          <span>Primary actions</span>
          <a href={shopUrl}>Shop products</a>
          <a href={commercialUrl}>Commercial access</a>
          <a href="#inquiry">Request guidance</a>
        </div>
        <div>
          <span>Site focus</span>
          <p>Corporate aesthetic, seasonal product logic, commercial credibility, and SEO-ready structure.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <SegmentSection />
        <PrinciplesSection />
        <SystemSection />
        <CommercialSection />
        <ProductsSection />
        <LeadForm />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
