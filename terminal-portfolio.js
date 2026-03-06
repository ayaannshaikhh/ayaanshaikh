#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
//  Ayaan Shaikh · Terminal Portfolio
//  Pure Node.js — no dependencies. Works over SSH.
//  Usage: node portfolio.js
// ─────────────────────────────────────────────────────────────────────────────

const readline = require("readline");

// ── ANSI helpers ──────────────────────────────────────────────────────────────
const ESC = "\x1b[";
const reset   = "\x1b[0m";
const bold    = "\x1b[1m";
const italic  = "\x1b[3m";
const dim     = "\x1b[2m";

// True-colour helpers
const fg  = (r,g,b) => `\x1b[38;2;${r};${g};${b}m`;
const bg  = (r,g,b) => `\x1b[48;2;${r};${g};${b}m`;

// Palette (from globals.css)
const C = {
  bg:          bg(14,14,13),
  bgCard:      bg(26,26,23),
  textPrimary: fg(255,232,214),
  textSec:     fg(183,183,164),
  textMuted:   fg(107,112,92),
  accent:      fg(203,153,126),
  accentHov:   fg(221,190,169),
  dustyOlive:  fg(107,112,92),
  drySage:     fg(165,165,141),
  border:      fg(42,42,37),
};

// ── Terminal size ──────────────────────────────────────────────────────────────
function cols() { return process.stdout.columns  || 100; }
function rows() { return process.stdout.rows     || 40;  }

// ── Cursor / screen control ───────────────────────────────────────────────────
const hideCursor   = () => process.stdout.write("\x1b[?25l");
const showCursor   = () => process.stdout.write("\x1b[?25h");
const clearScreen  = () => process.stdout.write("\x1b[2J\x1b[H");
const moveTo       = (r,c) => process.stdout.write(`\x1b[${r};${c}H`);
const saveCursor   = () => process.stdout.write("\x1b7");
const restCursor   = () => process.stdout.write("\x1b8");

// ── String utils ─────────────────────────────────────────────────────────────
// Strip ANSI so we can measure real display width
const stripAnsi = s => s.replace(/\x1b\[[0-9;]*[mGKHJABCDsuhl?]/g, "")
                         .replace(/\x1b[78]/g, "");
const len = s => stripAnsi(s).length;

function pad(s, width, char=" ") {
  const l = len(s);
  if (l >= width) return s;
  return s + char.repeat(width - l);
}
function centre(s, width) {
  const l = len(s);
  if (l >= width) return s;
  const left  = Math.floor((width - l) / 2);
  const right = width - l - left;
  return " ".repeat(left) + s + " ".repeat(right);
}
function wrap(text, maxWidth, indent=0) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (test.length > maxWidth) { if (cur) lines.push(cur); cur = " ".repeat(indent) + w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── Output helpers ────────────────────────────────────────────────────────────
const OUT = { buf: "" };
const w   = s => OUT.buf += s;
const wln = s => OUT.buf += (s||"") + "\n";
const flush = () => { process.stdout.write(OUT.buf); OUT.buf = ""; };

// ── Data (mirrored from page.tsx) ─────────────────────────────────────────────
const EXPERIENCE = [
  {
    company: "Stealth Startup",
    role:    "Software Engineer Intern",
    period:  "Dec 2025 – Present",
    bullets: [
      "Engineered a Python tool to automate 20+ complex config data transformations across backend systems.",
      "Refactored and debugged 5+ Java backend modules, including decompilation and logic corrections.",
    ],
  },
  {
    company: "SuperProf",
    role:    "Computer Science Tutor",
    period:  "Apr 2025 – Aug 2025",
    bullets: [
      "Tutored 25+ students in Python, data structures, and algorithms using C.",
      "Guided students to build full-stack apps: HTML/CSS/JS frontend, Flask backend, SQLite, Vercel.",
      "Led 5+ workshops on AWS cloud computing, Git, and Linux command-line tools.",
    ],
  },
  {
    company: "Private Client",
    role:    "UI/UX Design Intern",
    period:  "Oct 2022 – Feb 2023",
    bullets: [
      "Designed and prototyped a forum interface for 23,000+ members in Figma.",
      "Revamped web pages with HTML, CSS, JS; reduced load times by 25%.",
    ],
  },
  {
    company: "The College Board",
    role:    "High School Student Researcher",
    period:  "Sep 2023 – Jul 2024",
    bullets: [
      "Authored a 4,000+ word academic paper on cultural stigma and academic outcomes.",
      "Designed and distributed a quantitative survey (n=55) using Likert-scale instruments.",
    ],
  },
];

const PROJECTS = [
  {
    name:        "Aegis",
    tech:        "Python · NumPy · Scapy · scikit-learn",
    date:        "Dec 2025",
    github:      "github.com/ayaannshaikhh/aegis",
    description: "Hybrid anomaly-based IDS leveraging ML and statistical baselines to detect zero-day-style network anomalies. Processed 50MB+ PCAP datasets with sliding-window feature extraction.",
  },
  {
    name:        "Bloomfund",
    tech:        "Python · FastAPI · PostgreSQL · Anthropic Claude",
    date:        "Nov 2025",
    github:      "github.com/ayaannshaikhh/bloomfund",
    description: "FastAPI backend powering personalised scholarship recommendations — processes user profiles, queries PostgreSQL, returns relevance-ranked results with keyword search and smart filtering.",
  },
  {
    name:        "Diagnosica",
    tech:        "Python · Flask · TensorFlow · Keras",
    date:        "May 2025",
    github:      "github.com/ayaannshaikhh/diagnosica",
    description: "CNN for brain tumor detection achieving 95% accuracy on 3,000+ labelled MRI scans. Full ML pipeline: preprocessing, normalisation, augmentation, training, and evaluation.",
  },
];

const SKILLS = {
  languages:  ["Python","Java","C","C++","JavaScript","TypeScript","SQL","HTML/CSS"],
  frameworks: ["FastAPI","Flask","React.js","Next.js","Node.js","TensorFlow","Keras","Scikit-learn","Tailwind"],
  tools:      ["Git","Docker","Linux","AWS","GCP","VS Code","IntelliJ"],
};

// ── Navigation state ──────────────────────────────────────────────────────────
const SECTIONS = ["about","experience","projects","skills"];
let   activeSection = 0;
let   scrollOffset  = 0;   // which line of rendered content is at the top of the viewport

// ── Render helpers ────────────────────────────────────────────────────────────
function hline(char="─") {
  return C.border + char.repeat(Math.min(cols()-4, 72)) + reset;
}

function sectionLabel(text) {
  return C.textMuted + text.toUpperCase().split("").join(" ") + reset;
}

// ── Section renderers — each returns an array of display lines ────────────────

function renderAbout(W) {
  const lines = [];
  const ind = "  ";

  // name
  lines.push("");
  lines.push(bold + C.textPrimary + "Ayaan Shaikh" + reset);
  lines.push(C.textSec + "CS + Math " + C.accent + "@" + reset + C.textSec + " University of Guelph" + reset);
  lines.push(C.textMuted + "Software Engineer" + reset);
  lines.push("");

  // ◆ get to know me
  lines.push(C.dustyOlive + "◆ " + reset + C.textMuted + italic + "get to know me:" + reset);
  const about1 = [
    ["second year ", "cs major", " with math minor & cybersecurity specialization"],
    ["interested in ", "machine learning, research, networks", " and ", "full-stack development"],
    ["didn't start coding when i was 4, but doing my best at it"],
  ];
  for (const parts of about1) {
    const txt = parts.map((p,i) => i%2===1 ? bold+C.textPrimary+p+reset+C.textSec : C.textSec+p+reset).join("")+reset;
    const wrapped = wrap(stripAnsi(txt), W-6, 4);
    lines.push(ind + C.textMuted + "↳ " + reset + C.textSec + wrapped[0] + reset);
    for (let i=1;i<wrapped.length;i++) lines.push("      " + C.textSec + wrapped[i] + reset);
  }
  lines.push("");

  // ◆ what i've been building
  lines.push(C.dustyOlive + "◆ " + reset + C.textMuted + italic + "what i've been building:" + reset);
  const builds = [
    ["an anomaly-based IDS", " to detect zero-day network threats with ML"],
    ["Bloomfund", " — AI-powered scholarship matcher using Anthropic Claude", "  github.com/ayaannshaikhh/bloomfund"],
    ["DevLens", " — GitHub repository analyser to provide feedback and insights", "  github.com/ayaannshaikhh/devlens"],
    ["Diagnosica", " — CNN for brain tumor detection with 95% accuracy on 3k+ MRI scans", "  github.com/ayaannshaikhh/diagnosica"],
    ["a CLI project management tool", " to perform CRUD operations"],
  ];
  for (const parts of builds) {
    const main = bold+C.textPrimary+parts[0]+reset + C.textSec+parts[1]+reset;
    const link = parts[2] ? "\n        " + C.accent + parts[2] + reset : "";
    lines.push(ind + C.textMuted + "↳ " + reset + C.textSec + "built " + main + (parts[2]?"":" ") + reset);
    if (parts[2]) lines.push("      " + C.accent + parts[2] + reset);
  }
  lines.push("");
  return lines;
}

function renderExperience(W) {
  const lines = [];
  lines.push("");
  lines.push(sectionLabel("experience"));
  lines.push("");

  for (const exp of EXPERIENCE) {
    lines.push(hline());
    lines.push("");
    // header line
    const co   = bold + C.textPrimary + exp.company + reset;
    const sep  = C.textMuted + " · " + reset;
    const role = C.textSec   + exp.role + reset;
    const date = C.textMuted + exp.period + reset;
    const headerLeft  = co + sep + role;
    const headerRight = date;
    const gap = W - len(headerLeft) - len(headerRight) - 4;
    lines.push("  " + headerLeft + (gap > 0 ? " ".repeat(gap) : "  ") + headerRight);
    lines.push("");
    for (const b of exp.bullets) {
      const wrapped = wrap(b, W-10, 4);
      lines.push("    " + C.dustyOlive + "– " + reset + C.textSec + wrapped[0] + reset);
      for (let i=1;i<wrapped.length;i++) lines.push("      " + C.textSec + wrapped[i] + reset);
    }
    lines.push("");
  }
  lines.push(hline());
  lines.push("");
  return lines;
}

function renderProjects(W) {
  const lines = [];
  lines.push("");
  lines.push(sectionLabel("projects"));
  lines.push("");

  for (const proj of PROJECTS) {
    // card top
    lines.push("  " + C.border + "┌" + "─".repeat(Math.min(W-6,70)) + "┐" + reset);

    // name + date
    const name = bold + C.textPrimary + proj.name + reset;
    const gh   = C.accent + " [↗ " + proj.github + "]" + reset;
    const date = C.textMuted + proj.date + reset;
    const nameStr = name + gh;
    const gap  = Math.min(W-6,70) - len(nameStr) - len(date);
    lines.push("  " + C.border + "│ " + reset + nameStr + (gap>0?" ".repeat(gap):" ") + date + " " + C.border + "│" + reset);

    // tech
    lines.push("  " + C.border + "│ " + reset + C.drySage + proj.tech + reset);

    // description wrapped
    const descLines = wrap(proj.description, Math.min(W-10,66), 0);
    for (const dl of descLines) {
      const padded = pad(C.textSec + dl + reset, Math.min(W-6,70)+len(C.textSec+reset));
      lines.push("  " + C.border + "│ " + reset + C.textSec + dl + reset);
    }

    lines.push("  " + C.border + "└" + "─".repeat(Math.min(W-6,70)) + "┘" + reset);
    lines.push("");
  }
  return lines;
}

function renderSkills(W) {
  const lines = [];
  lines.push("");
  lines.push(sectionLabel("skills"));
  lines.push("");

  for (const [cat, items] of Object.entries(SKILLS)) {
    const label = pad(C.textMuted + cat + reset, 14 + len(C.textMuted+reset));
    const tags  = items.map(s => C.border + "[" + reset + C.drySage + s + reset + C.border + "]" + reset).join(" ");
    const row   = "  " + label + "  " + tags;
    // wrap tags if needed
    const plainRow = stripAnsi(row);
    if (plainRow.length <= W - 2) {
      lines.push(row);
    } else {
      lines.push("  " + label);
      // wrap tags onto multiple lines
      let cur = "    ";
      for (const s of items) {
        const tag = C.border+"["+reset+C.drySage+s+reset+C.border+"]"+reset+" ";
        if (len(cur) + len(tag) > W-4 && cur.trim()) { lines.push(cur); cur = "    "; }
        cur += tag;
      }
      if (cur.trim()) lines.push(cur);
    }
    lines.push("");
  }
  return lines;
}

// ── Footer ────────────────────────────────────────────────────────────────────
function renderFooter(W) {
  const links = [
    "github.com/ayaannshaikhh",
    "linkedin.com/in/ayaannshaikhh",
    "ayaannshaikhh8@gmail.com",
  ];
  const socials = links.map(l => C.textMuted + l + reset).join("  " + C.border + "·" + reset + "  ");
  const copy    = C.textMuted + "2026 © Ayaan Shaikh" + reset;
  return [
    hline("─"),
    centre(socials, W - 2),
    centre(copy, W - 2),
    "",
  ];
}

// ── Nav bar ───────────────────────────────────────────────────────────────────
function renderNav(W) {
  const name = bold + C.textPrimary + "Ayaan Shaikh" + reset;
  const navItems = SECTIONS.map((s, i) => {
    if (i === activeSection) return C.accent + bold + s + reset;
    return C.textSec + s + reset;
  });
  const navStr = navItems.join("  " + C.textMuted + "·" + reset + "  ");
  const gap = W - len(name) - len(navStr) - 4;
  const line1 = "  " + name + (gap > 0 ? " ".repeat(gap) : "  ") + navStr + "  ";
  const line2 = "  " + C.border + "─".repeat(Math.min(W-4,72)) + reset;
  const hint  = centre(C.textMuted + dim + "[ j/↓ scroll  k/↑ scroll  tab/h/l switch section  q quit ]" + reset, W);
  return [line1, line2, hint, ""];
}

// ── Full render ───────────────────────────────────────────────────────────────
function render() {
  const W   = cols();
  const R   = rows();

  const navLines  = renderNav(W);
  const navHeight = navLines.length;
  const viewport  = R - navHeight - 1;   // usable lines for content

  // Build content for active section
  let contentLines;
  switch (SECTIONS[activeSection]) {
    case "about":      contentLines = [...renderAbout(W),      ...renderFooter(W)]; break;
    case "experience": contentLines = [...renderExperience(W), ...renderFooter(W)]; break;
    case "projects":   contentLines = [...renderProjects(W),   ...renderFooter(W)]; break;
    case "skills":     contentLines = [...renderSkills(W),     ...renderFooter(W)]; break;
  }

  // Clamp scroll
  const maxScroll = Math.max(0, contentLines.length - viewport);
  scrollOffset = Math.max(0, Math.min(scrollOffset, maxScroll));

  // Draw
  OUT.buf = "";
  clearScreen();

  // Nav
  for (const l of navLines) wln(C.bg + l + reset);

  // Content slice
  const slice = contentLines.slice(scrollOffset, scrollOffset + viewport);
  for (const l of slice) {
    wln(C.bg + l + reset);
  }

  // Scroll indicator (bottom-right)
  if (maxScroll > 0) {
    const pct     = Math.round((scrollOffset / maxScroll) * 100);
    const indStr  = C.textMuted + ` ${pct}% ` + reset;
    moveTo(R, W - len(indStr) - 1);
    w(C.bg + indStr + reset);
  }

  flush();
}

// ── Input handling ────────────────────────────────────────────────────────────
function scrollDown(n=3) { scrollOffset += n; render(); }
function scrollUp(n=3)   { scrollOffset -= n; if (scrollOffset<0) scrollOffset=0; render(); }

function switchSection(i) {
  activeSection = ((i % SECTIONS.length) + SECTIONS.length) % SECTIONS.length;
  scrollOffset  = 0;
  render();
}

function setupInput() {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  process.stdin.on("keypress", (ch, key) => {
    if (!key) return;
    const k = key.name;

    // Quit
    if (k === "q" || (key.ctrl && k === "c")) {
      showCursor();
      clearScreen();
      moveTo(1,1);
      process.stdout.write(C.textPrimary + bold + "Ayaan Shaikh" + reset + " · thanks for visiting!\n\n");
      process.exit(0);
    }

    // Scroll
    if (k === "down" || ch === "j") scrollDown(3);
    if (k === "up"   || ch === "k") scrollUp(3);
    if (k === "pagedown" || (key.ctrl && k === "f")) scrollDown(20);
    if (k === "pageup"   || (key.ctrl && k === "b")) scrollUp(20);
    if (k === "home" || ch === "g") { scrollOffset=0; render(); }
    if (k === "end"  || ch === "G") { scrollOffset=99999; render(); }
    if (ch === " ") scrollDown(15);

    // Section nav
    if (k === "tab"   || ch === "l" || k === "right") switchSection(activeSection + 1);
    if (ch === "h"    || k === "left")                 switchSection(activeSection - 1);
    if (ch === "1") switchSection(0);
    if (ch === "2") switchSection(1);
    if (ch === "3") switchSection(2);
    if (ch === "4") switchSection(3);
  });
}

// ── Resize handler ────────────────────────────────────────────────────────────
process.stdout.on("resize", () => render());

// ── Init ──────────────────────────────────────────────────────────────────────
hideCursor();
setupInput();
render();

// Restore on unexpected exit
process.on("exit",    () => { showCursor(); clearScreen(); });
process.on("SIGINT",  () => { showCursor(); clearScreen(); process.exit(0); });
process.on("SIGTERM", () => { showCursor(); clearScreen(); process.exit(0); });
