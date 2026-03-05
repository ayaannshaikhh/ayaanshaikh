"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "about",      href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects",   href: "#projects" },
];

const SOCIAL_LINKS = [
  {
    label: "github",
    href: "https://github.com/ayaannshaikhh",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
      </svg>
    ),
  },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/ayaannshaikhh",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "email",
    href: "mailto:ayaannshaikhh8@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

const EXPERIENCE = [
  {
    company: "Stealth Startup",
    role: "Software Engineer Intern",
    period: "Dec 2025 – Present",
    bullets: [
      "Engineered a Python tool to automate 20+ complex config data transformations across backend systems.",
      "Refactored and debugged 5+ Java backend modules, including decompilation and logic corrections.",
    ],
  },
  {
    company: "SuperProf",
    role: "Computer Science Tutor",
    period: "Apr 2025 – Aug 2025",
    bullets: [
      "Tutored 25+ students in Python, data structures, and algorithms using C.",
      "Guided students to build full-stack apps: HTML/CSS/JS frontend, Flask backend, SQLite, Vercel.",
      "Led 5+ workshops on AWS cloud computing, Git, and Linux command-line tools.",
    ],
  },
  {
    company: "Private Client",
    role: "UI/UX Design Intern",
    period: "Oct 2022 – Feb 2023",
    bullets: [
      "Designed and prototyped a forum interface for 23,000+ members in Figma.",
      "Revamped web pages with HTML, CSS, JS; reduced load times by 25%.",
    ],
  },
  {
    company: "The College Board",
    role: "High School Student Researcher",
    period: "Sep 2023 – Jul 2024",
    bullets: [
      "Authored a 4,000+ word academic paper on cultural stigma and academic outcomes.",
      "Designed and distributed a quantitative survey (n=55) using Likert-scale instruments.",
    ],
  },
];

const PROJECTS: { name: string; tech: string; date: string; github: string; description: string }[] = [
  {
    name: "Aegis",
    tech: "Python · NumPy · Scapy · scikit-learn",
    date: "Dec 2025",
    github: "https://github.com/ayaannshaikhh/aegis",
    description: "Hybrid anomaly-based IDS leveraging ML and statistical baselines to detect zero-day-style network anomalies. Processed 50MB+ PCAP datasets with sliding-window feature extraction.",
  },
  {
    name: "Bloomfund",
    tech: "Python · FastAPI · PostgreSQL · Anthropic Claude",
    date: "Nov 2025",
    github: "https://github.com/ayaannshaikhh/bloomfund",
    description: "FastAPI backend powering personalized scholarship recommendations — processes user profiles, queries PostgreSQL, returns relevance-ranked results with keyword search and smart filtering.",
  },
  {
    name: "Diagnosica",
    tech: "Python · Flask · TensorFlow · Keras",
    date: "May 2025",
    github: "https://github.com/ayaannshaikhh/diagnosica",
    description: "CNN for brain tumor detection achieving 95% accuracy on 3,000+ labeled MRI scans. Full ML pipeline: preprocessing, normalization, augmentation, training, and evaluation.",
  },
];

const SKILLS: Record<string, string[]> = {
  languages:  ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  frameworks: ["FastAPI", "Flask", "React.js", "Next.js", "Node.js", "TensorFlow", "Keras", "Scikit-learn", "Tailwind CSS"],
  tools:      ["Git", "Docker", "Linux", "AWS", "GCP", "VS Code", "IntelliJ"],
};

/* ─── tiny inline style helpers ─────────────────────────────────────────── */
const s = {
  // layout
  wrapper: { position: "relative" as const, zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "48px 24px" },
  // nav
  nav:     { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56 },
  navName: { fontFamily: '"DM Serif Display", serif', fontSize: 15, color: "var(--text-primary)" },
  navLinks:{ display: "flex", gap: 24 },
  navLink: { color: "var(--text-secondary)", fontSize: 13, transition: "color 0.15s", cursor: "pointer" },
  // hero
  heroRow: { display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 },
  avatarBox: { position: "relative" as const, flexShrink: 0, cursor: "pointer" },
  avatarImg: { width: 52, height: 52, borderRadius: 6, border: "1px solid var(--border)", display: "block", imageRendering: "pixelated" as const, transition: "border-color 0.2s" },
  avatarImgHovered: { width: 52, height: 52, borderRadius: 6, border: "1px solid var(--accent)", display: "block", imageRendering: "pixelated" as const, transition: "border-color 0.2s" },
  tooltip: { position: "absolute" as const, top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "3px 10px", fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap" as const, zIndex: 10 },
  heroName:{ fontFamily: '"DM Serif Display", serif', fontSize: 22, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 4 },
  heroSub: { color: "var(--text-secondary)", fontSize: 13 },
  // bullets
  bullets: { listStyle: "none", padding: 0 },
  bHead:   { display: "flex", gap: 12, color: "var(--text-secondary)", marginBottom: 4, lineHeight: 1.6 },
  bIndent: { display: "flex", alignItems: "flex-start", gap: 8, paddingLeft: 28, color: "var(--text-secondary)", fontSize: 13, marginBottom: 6, lineHeight: 1.5 },
  bArrow:  { color: "var(--text-muted)", flexShrink: 0, marginTop: 1 },
  bDiamond:{ color: "var(--dusty-olive)", flexShrink: 0 },
  // section
  sLabel:  { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: 20 },
  divider: { border: "none", borderTop: "1px solid var(--border)", marginBottom: 48 },
  // exp
  expList: { display: "flex", flexDirection: "column" as const, gap: 28 },
  expItem: { borderLeft: "1px solid var(--border)", paddingLeft: 16 },
  expHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 12 },
  expCo:   { color: "var(--text-primary)", fontWeight: 500 },
  expRole: { color: "var(--text-secondary)", fontSize: 13 },
  expDate: { color: "var(--text-muted)", fontSize: 12, flexShrink: 0 },
  expBuls: { listStyle: "none", padding: 0 },
  expBul:  { color: "var(--text-secondary)", fontSize: 13, paddingLeft: 14, position: "relative" as const, marginBottom: 2 },
  expDash: { position: "absolute" as const, left: 0, color: "var(--dusty-olive)" },
  // projects
  projList:{ display: "flex", flexDirection: "column" as const, gap: 16 },
  projCard:{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6, padding: 16, transition: "border-color 0.2s", cursor: "default" },
  projHead:{ display: "flex", justifyContent: "space-between", marginBottom: 6 },
  projName:{ color: "var(--text-primary)", fontWeight: 500 },
  projDate:{ color: "var(--text-muted)", fontSize: 12 },
  projTech:{ color: "var(--accent)", fontSize: 12, marginBottom: 8 },
  projDesc:{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 },
  // skills
  skillList:{ display: "flex", flexDirection: "column" as const, gap: 10 },
  skillRow: { display: "flex", gap: 12, alignItems: "flex-start" },
  skillCat: { color: "var(--text-muted)", fontSize: 12, minWidth: 80, flexShrink: 0, paddingTop: 2 },
  skillTags:{ display: "flex", flexWrap: "wrap" as const, gap: 6 },
  skillTag: { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 3, padding: "2px 8px", fontSize: 12, color: "var(--dry-sage)", transition: "border-color 0.15s, color 0.15s", cursor: "default" },
  // footer
  footer:  { borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" },
  ftSocials:{ display: "flex", gap: 16 },
  ftSocial: { color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.15s" },
  ftCopy:  { color: "var(--text-muted)", fontSize: 12 },
};

export default function Home() {
  const [avatarHovered, setAvatarHovered] = useState(false);

  return (
    <main style={s.wrapper}>

      {/* Nav */}
      <nav style={s.nav} className="anim d1">
        <span style={s.navName}>ayaan shaikh</span>
        <div style={s.navLinks}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} style={s.navLink}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
            >{l.label}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{ marginBottom: 24 }}>
        <div style={s.heroRow} className="anim d2">
          <div style={s.avatarBox}
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.png" alt="Ayaan pixel avatar" style={avatarHovered ? s.avatarImgHovered : s.avatarImg} />
            {avatarHovered && <div style={s.tooltip}>that&apos;s me!</div>}
          </div>
          <div>
            <h1 style={s.heroName}>Ayaan Shaikh</h1>
            <p style={s.heroSub}>
              CS + Math <span style={{ color: "var(--accent)" }}>@</span> University of Guelph
            </p>
          </div>
        </div>

        <ul style={s.bullets}>
          <li style={s.bHead} className="anim d3">
            <span style={s.bDiamond}>◆</span>
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>get to know me:</span>
          </li>
          <li style={s.bIndent} className="anim d4">
            <span style={s.bArrow}>↳</span><span>second year <strong style={{ color: "var(--text-primary)" }}>cs major</strong> with math minor & cybersecurity specialization </span>
          </li>
          <li style={s.bIndent} className="anim d4">
            <span style={s.bArrow}>↳</span><span>interested in <strong style={{ color: "var(--text-primary)" }}>machine learning, research, networks</strong> and <strong style={{ color: "var(--text-primary)" }}>full-stack development</strong></span>
          </li>
          <li style={s.bIndent} className="anim d4">
            <span style={s.bArrow}>↳</span><span>didn&apos;t start coding when i was 4, but doing my best at it</span>
          </li>
        </ul>
        <br />

        <ul style={s.bullets}>
          <li style={s.bHead} className="anim d3">
            <span style={s.bDiamond}>◆</span>
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>what i&apos;ve been building:</span>
          </li>
          <li style={s.bIndent} className="anim d4">
            <span style={s.bArrow}>↳</span><span>built <strong style={{ color: "var(--text-primary)" }}>an anomaly-based IDS</strong> to detect zero-day network threats with ML</span>
          </li>
          <li style={s.bIndent} className="anim d5">
            <span style={s.bArrow}>↳</span><span>shipped <strong><a href="#projects" className="link-accent">Bloomfund</a></strong> — AI-powered scholarship matcher using Anthropic Claude</span>
          </li>
          <li style={s.bIndent} className="anim d5">
            <span style={s.bArrow}>↳</span><span>shipped <strong><a href="https://github.com/ayaannshaikhh/devlens" className="link-accent">DevLens</a></strong> — GitHub repository analyzer to provide feedback and insights</span>
          </li>
          <li style={s.bIndent} className="anim d5">
            <span style={s.bArrow}>↳</span><span>shipped <strong><a href="#projects" className="link-accent">Diagnosica</a></strong> — CNN for brain tumor detection with 95% accuracy on 3k+ MRI scans</span>
          </li>
          <li style={s.bIndent} className="anim d5">
            <span style={s.bArrow}>↳</span><span>created a <strong style={{ color: "var(--text-primary)" }}>CLI project management tool</strong> to perform CRUD operations</span>
          </li>
        </ul>
      </section>

      <hr style={s.divider} />

      {/* Experience */}
      <section id="experience" style={{ marginBottom: 48 }}>
        <p style={s.sLabel}>experience</p>
        <div style={s.expList}>
          {EXPERIENCE.map((exp) => (
            <div key={exp.company} style={s.expItem}>
              <div style={s.expHead}>
                <div>
                  <span style={s.expCo}>{exp.company}</span>
                  <span style={{ color: "var(--text-muted)", margin: "0 6px" }}>·</span>
                  <span style={s.expRole}>{exp.role}</span>
                </div>
                <span style={s.expDate}>{exp.period}</span>
              </div>
              <ul style={s.expBuls}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={s.expBul}>
                    <span style={s.expDash}>–</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <hr style={s.divider} />

      {/* Projects */}
      <section id="projects" style={{ marginBottom: 48 }}>
        <p style={s.sLabel}>projects</p>
        <div style={s.projList}>
          {PROJECTS.map((proj) => (
            <div key={proj.name} style={s.projCard}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--dusty-olive)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              <div style={s.projHead}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={s.projName}>{proj.name}</span>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                    </svg>
                  </a>
                </div>
                <span style={s.projDate}>{proj.date}</span>
              </div>
              <div style={s.projTech}>{proj.tech}</div>
              <p style={s.projDesc}>{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={s.divider} />

      {/* Skills */}
      <section style={{ marginBottom: 56 }}>
        <p style={s.sLabel}>skills</p>
        <div style={s.skillList}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} style={s.skillRow}>
              <span style={s.skillCat}>{cat}</span>
              <div style={s.skillTags}>
                {items.map((skill) => (
                  <span key={skill} style={s.skillTag}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--dry-sage)"; }}
                  >{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.ftSocials}>
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={s.ftSocial}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >{link.icon}</a>
          ))}
        </div>

        {/* Webring */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href="https://www.uguelph.network/#ayaanshaikh.ca?nav=prev"
            style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >←</a>
          <a href="https://www.uguelph.network" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gryphon.png"
              alt="Guelph Webring"
              width={24}
              height={24}
              style={{ opacity: 0.5, transition: "opacity 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
            />
          </a>
          <a
            href="https://www.uguelph.network/#ayaanshaikh.ca?nav=next"
            style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >→</a>
        </div>

        <span style={s.ftCopy}>2026 © Ayaan Shaikh</span>
      </footer>

    </main>
  );
}