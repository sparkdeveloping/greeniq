"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useState } from "react";

const shopUrl = "https://greeniqlawn.com/collections/all";
const guideUrl = "https://cdn.shopify.com/s/files/1/0967/2779/3981/files/May_Guide_-_Reinforcing_the_Spring_Surge.pdf?v=1779320230";

const navItems = [
  { label: "System", href: "#system" },
  { label: "Phases", href: "#phases" },
  { label: "Science", href: "#science" },
  { label: "Commercial", href: "#commercial" }
];

const phaseData = [
  {
    id: "launch",
    phase: "Phase 01",
    name: "Launch X",
    label: "Awaken",
    formula: "11-0-1",
    season: "Early spring",
    color: "#18d46d",
    accent: "emerald",
    image: "https://greeniqlawn.com/cdn/shop/files/LaunchX.png?v=1773172721&width=1946",
    url: "https://greeniqlawn.com/products/launch-x",
    headline: "Wake the lawn up without wasting the season.",
    copy:
      "Designed for the first active window, Launch X supports spring green-up, early root development, overseeding, new sod, and post-aeration renovation.",
    bullets: ["Uniform green-up", "Early root support", "New seed and sod", "Post-aeration support"],
    notice: "Healthy spring roots become summer resilience."
  },
  {
    id: "fortify",
    phase: "Phase 02",
    name: "Fortify+",
    label: "Build Density",
    formula: "16-0-8",
    season: "Mid-to-late spring",
    color: "#b66b2e",
    accent: "amber",
    image: "https://greeniqlawn.com/cdn/shop/files/Fortify.png?v=1773172328&width=1946",
    url: "https://greeniqlawn.com/products/fortify-%E2%84%A2",
    headline: "Strength training before summer starts testing it.",
    copy:
      "Built for active spring growth, Fortify+ helps build density, durability, deeper color, and more consistent growth before the heat arrives.",
    bullets: ["Fuller canopy", "Darker green color", "Stronger blades", "Supports soil activity"],
    notice: "This is the middle phase most homeowners skip."
  },
  {
    id: "defend",
    phase: "Phase 03",
    name: "Defend",
    label: "Stress Defense",
    formula: "9-0-1",
    season: "Late spring / early summer",
    color: "#244b6f",
    accent: "blue",
    image: "https://greeniqlawn.com/cdn/shop/files/Defend.png?v=1773077429&width=1946",
    url: "https://greeniqlawn.com/products/defend%E2%84%A2",
    headline: "Hold color and structure under pressure.",
    copy:
      "Applied before summer peaks, Defend supports the lawn’s natural stress response during heat, drought-prone stretches, and heavy foot traffic.",
    bullets: ["Heat support", "Traffic tolerance", "Color retention", "Stress stability"],
    notice: "Proactive applications provide the strongest support."
  },
  {
    id: "recover",
    phase: "Phase 04",
    name: "Recover",
    label: "Restore",
    formula: "2-0-23",
    season: "Late summer / fall",
    color: "#7e2730",
    accent: "rose",
    image: "https://greeniqlawn.com/cdn/shop/files/Recover.png?v=1773170907&width=1946",
    url: "https://greeniqlawn.com/products/recover%E2%84%A2",
    headline: "Close the loop after summer stress.",
    copy:
      "Recover helps the lawn transition back into growth mode, rebuild density, regain color, and set up a stronger spring return.",
    bullets: ["Post-heat recovery", "Root restoration", "Fall renovation", "Next-spring setup"],
    notice: "The fall application sets up the next spring."
  }
];

const bundles = [
  {
    eyebrow: "Top seller",
    name: "Full-Season Kit",
    price: "$139.99",
    old: "$159.99",
    description:
      "A complete four-phase program for homeowners who want the whole sequence handled from spring activation to fall recovery.",
    includes: ["Launch X", "Fortify+", "Defend", "Recover"],
    cta: "Shop Full-Season Kit",
    href: shopUrl
  },
  {
    eyebrow: "Simplified care",
    name: "Essentials Bundle",
    price: "$79.99 / year",
    old: "$89.99 / year",
    description:
      "A lighter two-step approach focused on early activation and late-season recovery with fewer applications.",
    includes: ["Launch X", "Recover"],
    cta: "Shop Essentials",
    href: shopUrl
  }
];

const scienceCards = [
  {
    title: "Soil temperature beats the calendar.",
    metric: "Mid-50s°F",
    body:
      "Green grass does not always mean the lawn is ready. The real trigger is consistent soil temperature, because root activity determines when inputs can be used."
  },
  {
    title: "The May stall is predictable.",
    metric: "14–21 days",
    body:
      "Rapid spring growth can burn through available nutrients. The fade is usually gradual: lighter color, slower growth, and more uneven zones."
  },
  {
    title: "Root depth decides summer performance.",
    metric: "4–6 in.",
    body:
      "Deep roots pull moisture from lower soil. Shallow-rooted lawns depend on the surface and show stress faster when summer arrives."
  },
  {
    title: "Watering should build resilience.",
    metric: "Deep + infrequent",
    body:
      "A little water every day keeps roots near the surface. Slower, deeper watering encourages the root system to follow moisture downward."
  }
];

const faqs = [
  {
    q: "Is this for homeowners or professionals?",
    a: "Both. The core residential system is built for homeowners who want professional-grade sequencing without complicated agronomy. GreenIQ Commercial is positioned for golf courses, lawn care companies, and property managers who need scale and guidance."
  },
  {
    q: "How much lawn does one bottle cover?",
    a: "Each 32 fl oz bottle is positioned to cover up to 8,000 square feet when applied according to the product instructions."
  },
  {
    q: "Is it safe for lawns where kids and pets play?",
    a: "GreenIQ states its products are thoughtfully formulated for lawns where kids and pets play once the application has dried. Always follow the label and application guidance."
  },
  {
    q: "Why not just sell individual products?",
    a: "Individual products help, but the GreenIQ advantage is sequencing. Launch X, Fortify+, Defend, and Recover each solve a different seasonal problem, so the system prevents the lawn from starting over every year."
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
      description:
        "Midwest-owned, soil-first lawn care products and education for residential and commercial turf."
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

function Reveal({ children, className = "", delay = 0, y = 28 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ href, children, variant = "primary", className = "" }) {
  return (
    <motion.a
      href={href}
      className={cx("magnetic-btn", variant === "primary" ? "magnetic-primary" : "magnetic-secondary", className)}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="btn-arrow">→</span>
    </motion.a>
  );
}

function BrandMark() {
  return (
    <a href="#top" className="brand-mark" aria-label="GreenIQ home">
      <img src="/leaf-mark.svg" alt="" className="h-9 w-9 rounded-2xl" />
      <span>Greeni<span>Q</span></span>
    </a>
  );
}

function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 22, restDelta: 0.001 });

  return (
    <header className="site-header">
      <motion.div className="scroll-line" style={{ scaleX }} />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] p-1 backdrop-blur-2xl md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#lead" className="header-cta">
          Get my plan
        </a>
      </div>
    </header>
  );
}

function HeroVisual() {
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, y: 34, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <motion.div className="visual-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
      <motion.div className="visual-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 52, repeat: Infinity, ease: "linear" }} />

      <div className="scan-card">
        <div className="scan-top">
          <span>Live lawn readout</span>
          <span className="pulse-dot" />
        </div>
        <div className="lawn-window">
          <img src="https://greeniqlawn.com/cdn/shop/files/Fortify_WebHero.png?v=1778613296&width=3840" alt="GreenIQ Fortify product on healthy lawn" />
          <motion.div className="scan-beam" animate={{ x: ["-120%", "140%"] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="soil-readout">
          <div>
            <span className="readout-label">Recommended phase</span>
            <strong>Fortify+</strong>
          </div>
          <div className="readout-meter">
            <span style={{ width: "74%" }} />
          </div>
          <small>Late spring density builder • 16-0-8</small>
        </div>
      </div>

      <motion.div className="floating-product product-a" animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
        <img src="https://greeniqlawn.com/cdn/shop/files/LaunchX.png?v=1773172721&width=416" alt="Launch X" />
      </motion.div>
      <motion.div className="floating-product product-b" animate={{ y: [0, 14, 0], rotate: [2, -2, 2] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
        <img src="https://greeniqlawn.com/cdn/shop/files/Recover.png?v=1773170907&width=416" alt="Recover" />
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-bg" />
      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pt-32">
        <div className="relative z-10">
          <motion.div
            className="eyebrow-chip"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span /> Midwest owned • Soil-first lawn science
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          >
            Stop guessing. Start sequencing.
          </motion.h1>
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            GreenIQ turns lawn care into a seasonal system: awaken roots, build density, defend through stress, then restore before winter. Every product has a job. Every application has a reason.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <MagneticButton href="#lead">Find my phase</MagneticButton>
            <MagneticButton href={shopUrl} variant="secondary">Shop the system</MagneticButton>
          </motion.div>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
          >
            <div><strong>4</strong><span>seasonal phases</span></div>
            <div><strong>8k</strong><span>sq. ft. coverage</span></div>
            <div><strong>14k</strong><span>Kansas Lawn Nuts</span></div>
          </motion.div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function ProblemStrip() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-[#06110c]/85 py-6 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-3 lg:px-8">
        {[
          ["The real problem", "Most lawns do not need more random products. They need the right input at the right seasonal window."],
          ["The visual cue", "Color fade, stalled growth, shallow roots, and stress patterns tell you which phase your lawn is in."],
          ["The GreenIQ answer", "A four-phase sequence built around how turf actually wakes, grows, defends, and recovers."]
        ].map(([title, body], index) => (
          <Reveal key={title} delay={index * 0.08} className="mini-proof-card">
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section id="system" className="section-wrap overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="section-kicker">The system advantage</p>
            <h2 className="section-title">A lawn plan that moves with the season.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="section-lede">
              Lawn care gets confusing fast: bags, bottles, generic calendars, and one-size-fits-all advice. GreenIQ makes it clearer with a four-phase sequence built around how turf actually wakes, grows, defends, and recovers.
            </p>
          </Reveal>
        </div>

        <div className="season-line mt-14">
          {phaseData.map((phase, index) => (
            <Reveal key={phase.id} delay={index * 0.07} className="season-node">
              <div className="node-dot" style={{ "--phase": phase.color }} />
              <span>{phase.phase}</span>
              <strong>{phase.label}</strong>
              <p>{phase.season}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseSelector() {
  const [active, setActive] = useState(1);
  const phase = phaseData[active];

  return (
    <section id="phases" className="section-wrap pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-kicker justify-center">Four products. One complete system.</p>
          <h2 className="section-title">Every bottle answers a specific lawn signal.</h2>
          <p className="section-lede mt-5">Each GreenIQ phase answers a different lawn signal. Click through the sequence to see when each formula belongs, what it supports, and why timing matters.</p>
        </Reveal>

        <div className="phase-shell mt-12">
          <div className="phase-tabs" role="tablist" aria-label="GreenIQ phases">
            {phaseData.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                className={cx("phase-tab", active === index && "phase-tab-active")}
                onClick={() => setActive(index)}
              >
                <span style={{ background: item.color }} />
                <small>{item.phase}</small>
                {item.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              className="phase-stage"
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="phase-copy-card" style={{ "--phase": phase.color }}>
                <p className="phase-kicker">{phase.phase} • {phase.season}</p>
                <h3>{phase.name}: {phase.headline}</h3>
                <p>{phase.copy}</p>
                <div className="phase-meta-grid">
                  <div><span>Formula</span><strong>{phase.formula}</strong></div>
                  <div><span>Coverage</span><strong>Up to 8,000 sq. ft.</strong></div>
                </div>
                <ul>
                  {phase.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <div className="phase-notice">{phase.notice}</div>
                <MagneticButton href={phase.url} className="mt-7 w-fit">View {phase.name}</MagneticButton>
              </div>
              <div className="phase-image-wrap">
                <motion.img
                  src={phase.image}
                  alt={`${phase.name} product label`}
                  className="phase-product-img"
                  initial={{ rotate: -4, y: 12 }}
                  animate={{ rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 130, damping: 18 }}
                />
                <div className="phase-halo" style={{ background: phase.color }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Analyzer() {
  const [soilTemp, setSoilTemp] = useState(56);
  const [season, setSeason] = useState("late-spring");
  const [signal, setSignal] = useState("color-fade");

  const recommendation = useMemo(() => {
    if (soilTemp < 52) return phaseData[0];
    if (soilTemp >= 75 || signal === "heat") return phaseData[2];
    if (season === "late-summer" || signal === "recovery") return phaseData[3];
    if (season === "late-spring" || signal === "color-fade") return phaseData[1];
    return phaseData[0];
  }, [soilTemp, season, signal]);

  const message = useMemo(() => {
    if (soilTemp < 52) return "The lawn may be waking up, but root activity still needs consistency. Prepare the yard and watch the soil temperature window.";
    if (recommendation.id === "fortify") return "This is the danger zone where lawns look fine, then quietly stall. Build density before summer pressure arrives.";
    if (recommendation.id === "defend") return "You are no longer chasing growth. You are protecting structure, color, and resilience under pressure.";
    if (recommendation.id === "recover") return "The heat is fading. Now the lawn needs to rebuild roots, recover color, and set up next spring.";
    return "The first active window is about waking roots and building the foundation for everything that comes next.";
  }, [soilTemp, recommendation]);

  return (
    <section id="lead" className="section-wrap analyzer-wrap">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <Reveal>
          <p className="section-kicker">Lawn phase finder</p>
          <h2 className="section-title">Find the right GreenIQ phase for your lawn.</h2>
          <p className="section-lede mt-5">
            Move the sliders, choose what your lawn is showing, and GreenIQ will point you toward the seasonal phase that best matches your current conditions.
          </p>
          <div className="analyzer-panel mt-8">
            <label className="range-label">
              <span>Current 2-inch soil temperature</span>
              <strong>{soilTemp}°F</strong>
            </label>
            <input
              type="range"
              min="38"
              max="88"
              value={soilTemp}
              onChange={(event) => setSoilTemp(Number(event.target.value))}
              className="smart-range"
            />

            <div className="choice-grid mt-7">
              {[
                ["early-spring", "Early spring"],
                ["late-spring", "Late spring"],
                ["summer", "Summer"],
                ["late-summer", "Late summer"]
              ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => setSeason(value)} className={cx("choice-pill", season === value && "choice-active")}>
                  {label}
                </button>
              ))}
            </div>

            <div className="choice-grid mt-3">
              {[
                ["waking", "Waking up"],
                ["color-fade", "Color fading"],
                ["heat", "Heat pressure"],
                ["recovery", "Needs recovery"]
              ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => setSignal(value)} className={cx("choice-pill", signal === value && "choice-active")}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="recommendation-card" style={{ "--phase": recommendation.color }}>
            <div className="recommendation-top">
              <div>
                <span>Recommended next move</span>
                <h3>{recommendation.name}</h3>
              </div>
              <img src={recommendation.image} alt={`${recommendation.name} product`} />
            </div>
            <p>{message}</p>
            <div className="recommendation-grid">
              <div><span>Phase</span><strong>{recommendation.phase}</strong></div>
              <div><span>Season</span><strong>{recommendation.season}</strong></div>
              <div><span>Formula</span><strong>{recommendation.formula}</strong></div>
            </div>
            <LeadForm recommendedPhase={recommendation.name} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LeadForm({ recommendedPhase }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <input type="hidden" name="recommendedPhase" value={recommendedPhase} />
      <input type="text" name="company" tabIndex="-1" autoComplete="off" className="honeypot" aria-hidden="true" />
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span>Name</span>
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span>Phone</span>
          <input name="phone" placeholder="Optional" />
        </label>
        <label>
          <span>Lawn size</span>
          <select name="lawnSize" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Under 4,000 sq. ft.</option>
            <option>4,000–8,000 sq. ft.</option>
            <option>8,000–16,000 sq. ft.</option>
            <option>Commercial / multi-site</option>
          </select>
        </label>
      </div>
      <label>
        <span>What are you noticing?</span>
        <textarea name="notes" rows="4" placeholder="Example: color fade, thin patches, summer stress, new seed, pet traffic..." />
      </label>
      <button className="submit-btn" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending recommendation..." : "Email me my lawn plan"}
      </button>
      <AnimatePresence>
        {status === "success" && (
          <motion.p className="form-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            Your recommendation request is in. GreenIQ can follow up with a tailored plan.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p className="form-error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function BundleSection() {
  return (
    <section className="section-wrap pt-6">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {bundles.map((bundle, index) => (
            <Reveal key={bundle.name} delay={index * 0.08}>
              <div className="bundle-card">
                <div className="bundle-topline">
                  <span>{bundle.eyebrow}</span>
                  <div><del>{bundle.old}</del><strong>{bundle.price}</strong></div>
                </div>
                <h2>{bundle.name}</h2>
                <p>{bundle.description}</p>
                <div className="bundle-includes">
                  {bundle.includes.map((item) => <span key={item}>{item}</span>)}
                </div>
                <MagneticButton href={bundle.href} variant={index === 0 ? "primary" : "secondary"} className="mt-8 w-fit">
                  {bundle.cta}
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  return (
    <section id="science" className="section-wrap science-wrap">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_.95fr]">
          <Reveal>
            <p className="section-kicker">The science made visual</p>
            <h2 className="section-title">Read the lawn before choosing the bottle.</h2>
            <p className="section-lede mt-5">
              Better lawns start with better timing. Soil temperature, root depth, nutrient rhythm, watering behavior, and seasonal stress all help determine what your lawn can actually use.
            </p>
            <div className="science-grid mt-9">
              {scienceCards.map((card, index) => (
                <div className="science-card" key={card.title}>
                  <span>{card.metric}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="soil-stack">
              <div className="grass-layer" />
              <div className="soil-layer soil-one"><span>Nutrients</span></div>
              <div className="soil-layer soil-two"><span>Root zone</span></div>
              <div className="soil-layer soil-three"><span>Water reserve</span></div>
              <motion.div className="root-system" animate={{ scaleY: [0.94, 1.04, 0.94] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                <span />
                <span />
                <span />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuideSection() {
  return (
    <section className="section-wrap pt-0">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="guide-card">
            <div>
              <p className="section-kicker">Free lawn guide</p>
              <h2>Learn why lawns stall before summer.</h2>
              <p>
                The free GreenIQ guide explains the spring surge, the common May stall, color fade, root depth, and watering rhythm so homeowners can make better seasonal decisions.
              </p>
              <div className="guide-points">
                <span>May stall</span>
                <span>Color fade signals</span>
                <span>Root depth checks</span>
                <span>Watering rhythm</span>
              </div>
              <MagneticButton href={guideUrl} className="mt-8 w-fit">Read the guide</MagneticButton>
            </div>
            <div className="guide-preview">
              <div className="guide-page page-one">REINFORCE<br />THE SPRING<br />SURGE</div>
              <div className="guide-page page-two">COLOR<br />FADE<br /><span>14–21 day timeline</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CommercialSection() {
  return (
    <section id="commercial" className="section-wrap commercial-wrap">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="commercial-card">
            <div>
              <p className="section-kicker">GreenIQ Commercial</p>
              <h2>For serious operators managing turf at scale.</h2>
              <p>
                Golf courses, lawn care companies, and property managers need repeatable turf performance across larger properties. GreenIQ Commercial provides an access path for program details, commercial pricing, and seasonal guidance.
              </p>
              <div className="commercial-grid">
                <span>Golf turf</span>
                <span>Lawn care companies</span>
                <span>Property managers</span>
                <span>Program guidance</span>
              </div>
              <MagneticButton href="#lead" className="mt-8 w-fit">Request commercial access</MagneticButton>
            </div>
            <div className="operator-panel">
              <div className="operator-row"><span>Route density</span><strong>High</strong></div>
              <div className="operator-row"><span>Program timing</span><strong>Seasonal</strong></div>
              <div className="operator-row"><span>Application clarity</span><strong>Guided</strong></div>
              <div className="operator-scan"><span /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="section-wrap pt-4">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="proof-quote">
          <p>“The goal isn’t just greener grass. It’s healthier soil and a lawn that lasts.”</p>
          <span>Soil-first lawn education from GreenIQ</span>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-wrap faq-wrap">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <Reveal>
          <p className="section-kicker">Decision clarity</p>
          <h2 className="section-title">Clear answers before you order.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div className="faq-item" key={item.q}>
                <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
                  <span>{item.q}</span>
                  <strong>{open === index ? "−" : "+"}</strong>
                </button>
                <AnimatePresence initial={false}>
                  {open === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
            Lawn Science, Simplified. Science-backed, soil-conscious formulas built to feed your soil, grow your lawn, and create the neighborhood envy you deserve.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-white/60">
          <a href={shopUrl}>Shop</a>
          <a href={guideUrl}>Free guide</a>
          <a href="https://www.instagram.com/greeniqlawn/">Instagram</a>
          <a href="#lead">Get my plan</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <Hero />
      <ProblemStrip />
      <SystemSection />
      <PhaseSelector />
      <Analyzer />
      <BundleSection />
      <ScienceSection />
      <GuideSection />
      <CommercialSection />
      <SocialProofSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
