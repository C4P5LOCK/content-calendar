import { useState } from "react";

const PILLARS = {
  CORRIDOR: { label: "Africa ↔ ME Strategy", color: "#C9A96E", bg: "rgba(201,169,110,0.12)" },
  OT: { label: "OT / Cybersecurity", color: "#6EA8C9", bg: "rgba(110,168,201,0.12)" },
  OPERATOR: { label: "Investor / Operator", color: "#8EC96E", bg: "rgba(142,201,110,0.12)" },
  FOUNDER: { label: "Building / Founder", color: "#C96EB0", bg: "rgba(201,110,176,0.12)" },
};

const PLATFORMS = {
  LI: { label: "LinkedIn", icon: "in", color: "#0A66C2" },
  X: { label: "X", icon: "𝕏", color: "#E7E9EA" },
  IG: { label: "Instagram", icon: "◈", color: "#E1306C" },
};

const FORMATS = {
  MASTER: "Master 60–90s",
  CUT: "Cutdown 15–30s",
  HOOK: "Hook 5–15s",
  ESSAY: "Long-form Text",
  CINE: "Cinematic B-Roll",
};

const days = [
  // WEEK 1 — FOUNDATION / WHO YOU ARE
  {
    day: 1, platform: "LI", pillar: "CORRIDOR", clip: "V01", format: "MASTER",
    hook: "Africa doesn't need hype. It needs corridors—capital, tech, and trust.",
    caption: "I've built quietly for years. OT consulting, UK property, relationships across borders. Now I'm building in public. My focus: the Africa ↔ Middle East corridor—where capital, capability, and market access align.",
    note: "Opening statement. Set the tone for everything."
  },
  {
    day: 2, platform: "IG", pillar: "CORRIDOR", clip: "V01 cut", format: "CUT",
    hook: "I'm documenting one thing: how Africa and the Middle East build a real corridor.",
    caption: "No hype. Corridors. #Africa #Dubai #Strategy",
    note: "Repurpose V01. 9:16 vertical crop."
  },
  {
    day: 3, platform: "X", pillar: "CORRIDOR", clip: "V01 hook", format: "HOOK",
    hook: "Africa ↔ Middle East is the corridor of the decade. Building in public now.",
    caption: "Corridors beat hype. Always.",
    note: "Single punchy line. No video needed — text post."
  },
  {
    day: 4, platform: "LI", pillar: "OT", clip: "V02", format: "MASTER",
    hook: "Here's the credibility stack: OT, property, partnerships.",
    caption: "I'm not trying to be a creator. I'm trying to be useful. OT cybersecurity → consulting → UK property → Africa–Middle East corridor. I'll share what I'm seeing and the moves that compound.",
    note: "Proof post. Anchors authority fast."
  },
  {
    day: 5, platform: "X", pillar: "OT", clip: "V11 hook", format: "HOOK",
    hook: "OT security protects systems that touch the physical world. That's why the stakes change.",
    caption: "Not just IT with a different label. Physical consequences.",
    note: "Credibility signal for technical audience."
  },
  {
    day: 6, platform: "LI", pillar: "CORRIDOR", clip: "V07", format: "MASTER",
    hook: "Three flows shape the corridor: capital, talent, regulation.",
    caption: "Africa ↔ Gulf is not a vague opportunity. It's three flows. Track them and market entry becomes design, not luck.",
    note: "Framework post. High save rate expected."
  },
  {
    day: 7, platform: "IG", pillar: "CORRIDOR", clip: "V07 cut", format: "CUT",
    hook: "Corridor framework: capital, talent, regulation. Track the flows.",
    caption: "Frameworks beat vibes. #Africa #GCC #MarketEntry",
    note: "Visual: whiteboard 'Capital / Talent / Regulation'."
  },
  // WEEK 2 — OPERATOR MINDSET
  {
    day: 8, platform: "LI", pillar: "CORRIDOR", clip: "V08", format: "MASTER",
    hook: "Dubai isn't a market. It's a platform.",
    caption: "Dubai works best as a platform: credibility + access + partnerships. Treat it like a destination and you'll burn cash. Treat it like a platform and you build leverage.",
    note: "Contrarian take. High comment potential."
  },
  {
    day: 9, platform: "X", pillar: "CORRIDOR", clip: "V08 hook", format: "HOOK",
    hook: "Founders keep treating Dubai like an end market. It's a platform. Use it that way.",
    caption: "Access ≠ customers.",
    note: "Short provocation. Designed for reshares."
  },
  {
    day: 10, platform: "LI", pillar: "OPERATOR", clip: "V14", format: "MASTER",
    hook: "Property taught me this: cashflow is oxygen.",
    caption: "UK property investing taught me to treat risk as real, not theoretical. I apply the same discipline to startups and cross-border strategy. If the numbers don't work month-to-month, the story doesn't matter.",
    note: "Investor credibility. Bridges property → strategy."
  },
  {
    day: 11, platform: "IG", pillar: "OPERATOR", clip: "V14 cut", format: "CUT",
    hook: "Cashflow is oxygen. Build for sustainability, not vibes.",
    caption: "Sustainability wins. #Investing #Cashflow #Africa",
    note: "Close-up of 'cashflow' notes."
  },
  {
    day: 12, platform: "LI", pillar: "CORRIDOR", clip: "V09", format: "MASTER",
    hook: "Investors want signals, not stories.",
    caption: "Raising cross-border? Investors from the Gulf want execution, governance, and a realistic risk plan. Be operationally clear.",
    note: "Direct value for founders in the audience."
  },
  {
    day: 13, platform: "X", pillar: "CORRIDOR", clip: "V09 hook", format: "HOOK",
    hook: "Signals beat stories. Always.",
    caption: "Governance. Reporting. Execution. That's the deck.",
    note: "Ultra-short. Quotable."
  },
  {
    day: 14, platform: "LI", pillar: "CORRIDOR", clip: "V10", format: "MASTER",
    hook: "If you land in Dubai — here's your first 30 days.",
    caption: "Dubai market entry is a system: buyer clarity → partners → proof pack → consistent follow-up. Don't network randomly.",
    note: "Playbook post. Very high save/share value."
  },
  // WEEK 3 — DEEP CREDIBILITY
  {
    day: 15, platform: "LI", pillar: "OT", clip: "V11", format: "MASTER",
    hook: "OT security protects systems that touch the physical world.",
    caption: "OT security matters because OT touches the physical world. Reliability and safety constraints change everything. That lens shapes how I think about building resilient infrastructure in Africa.",
    note: "Education post. Define the domain clearly."
  },
  {
    day: 16, platform: "IG", pillar: "OT", clip: "V11 cut", format: "CUT",
    hook: "OT touches the physical world. That changes the stakes.",
    caption: "Different stakes. #OT #CriticalInfrastructure #Africa",
    note: "Short, sharp. Technical audience builder."
  },
  {
    day: 17, platform: "LI", pillar: "OT", clip: "V12", format: "MASTER",
    hook: "In OT, you design for failure — before it happens.",
    caption: "Designing for failure isn't pessimism. It's reliability. Calm operators win long-term trust — in industrial systems and in business.",
    note: "Cross-pillar: OT lesson applied to business."
  },
  {
    day: 18, platform: "X", pillar: "OT", clip: "V12 hook", format: "HOOK",
    hook: "Design for failure. Plan. Degrade safely. That's not pessimism — it's reliability.",
    caption: "OT taught me this. Applied it to everything.",
    note: "Technical credibility in one sentence."
  },
  {
    day: 19, platform: "LI", pillar: "OT", clip: "V13", format: "MASTER",
    hook: "Cross-border deals die when trust is weak.",
    caption: "Cybersecurity is a trust layer — not an afterthought. When you show basic controls and professional discipline, you reduce friction with corporates, investors, and governments.",
    note: "Bridges OT → corridor strategy. Core positioning."
  },
  {
    day: 20, platform: "IG", pillar: "OT", clip: "V13 cut", format: "CUT",
    hook: "Cybersecurity is a trust layer for cross-border partnerships.",
    caption: "Trust is infrastructure. #Cybersecurity #AfricaTech",
    note: "Visual: secure laptop + city."
  },
  {
    day: 21, platform: "LI", pillar: "OT", clip: "V22", format: "MASTER",
    hook: "OT security is a quiet goldmine — because it's necessary.",
    caption: "OT security is foundational because OT touches physical operations. As economies digitise, it becomes non-negotiable. Africa's infrastructure build-out makes this a generational opportunity.",
    note: "Bullish Africa angle. Attracts investors + operators."
  },
  // WEEK 4 — FRAMEWORKS & SYSTEMS
  {
    day: 22, platform: "LI", pillar: "CORRIDOR", clip: "V16", format: "MASTER",
    hook: "Three partnerships matter: commercial, compliance, cultural.",
    caption: "Entering a new region? Stop chasing one partner. Build the triangle: commercial, compliance, cultural.",
    note: "Framework post. Extremely shareable."
  },
  {
    day: 23, platform: "X", pillar: "CORRIDOR", clip: "V16 hook", format: "HOOK",
    hook: "Partnership triangle: commercial + compliance + cultural. Most people only chase commercial. Then wonder why deals stall.",
    caption: "Build the full triangle.",
    note: "Thread-starter potential."
  },
  {
    day: 24, platform: "LI", pillar: "FOUNDER", clip: "V20", format: "MASTER",
    hook: "Market access isn't introductions. It's execution architecture.",
    caption: "Market access is architecture: who your buyer is, which partner closes, how contracts work, how money moves, how compliance gets handled. Build that and you can scale across borders.",
    note: "Defines what Africa Market Access actually does."
  },
  {
    day: 25, platform: "IG", pillar: "FOUNDER", clip: "V20 cut", format: "CUT",
    hook: "Market access = execution architecture, not intros.",
    caption: "Architecture beats networking. #MarketAccess #Africa",
    note: "Blueprint graphic overlay."
  },
  {
    day: 26, platform: "LI", pillar: "OPERATOR", clip: "V21", format: "MASTER",
    hook: "In volatility, you don't freeze — you derisk.",
    caption: "Operator response to volatility: derisk. Shorten timelines. Tighten comms. Keep basics strong. You can still build — but you build with discipline.",
    note: "Timeless. Resonates whenever markets feel uncertain."
  },
  {
    day: 27, platform: "X", pillar: "OPERATOR", clip: "V21 hook", format: "HOOK",
    hook: "Volatility is not a reason to stop. It's a reason to tighten.",
    caption: "Derisk. Discipline. Deliver.",
    note: "3-word rhythm. Memorable."
  },
  {
    day: 28, platform: "LI", pillar: "CORRIDOR", clip: "V25", format: "MASTER",
    hook: "Here's the thesis: Africa is demand. The Gulf is leverage.",
    caption: "My thesis is simple. Africa has demand — markets, problems worth solving, massive adoption curves. The Middle East has leverage — capital, speed, global connectivity. The winning play is alignment.",
    note: "Master thesis post. Pin this."
  },
  // WEEK 5 — TRUST & REPUTATION
  {
    day: 29, platform: "LI", pillar: "FOUNDER", clip: "V26", format: "MASTER",
    hook: "Trust is built in updates, not pitches.",
    caption: "Serious stakeholders don't buy pitches. They trust operators who deliver and update consistently. That's why I'm publishing consistently now.",
    note: "Meta-post: explains the content strategy itself."
  },
  {
    day: 30, platform: "IG", pillar: "FOUNDER", clip: "V26 cut", format: "CUT",
    hook: "Trust comes from consistent updates and delivery.",
    caption: "Deliver and document. #Trust #Reputation #Leadership",
    note: "Calendar + checklist visual."
  },
  {
    day: 31, platform: "LI", pillar: "OPERATOR", clip: "V27", format: "MASTER",
    hook: "Your advantage isn't who you know. It's how you follow up.",
    caption: "Access is common. Follow-up is rare. The operators who win build systems: notes after meetings, clear next steps, consistent touchpoints.",
    note: "Tactical post. High engagement expected."
  },
  {
    day: 32, platform: "X", pillar: "OPERATOR", clip: "V27 hook", format: "HOOK",
    hook: "Follow-up converts access into outcomes. Most people have access. Few follow up well.",
    caption: "System > hustle.",
    note: "Quotable. Drives profile visits."
  },
  {
    day: 33, platform: "LI", pillar: "OPERATOR", clip: "V30", format: "MASTER",
    hook: "If it's not governable, I'm not interested.",
    caption: "A simple filter: I avoid deals that can't be governed. The corridor between Africa and the Middle East will reward people who build clean structures.",
    note: "Sets standards. Attracts serious people."
  },
  {
    day: 34, platform: "LI", pillar: "CORRIDOR", clip: "V29", format: "MASTER",
    hook: "Ecosystems aren't events. They're pipelines.",
    caption: "Real ecosystems are pipelines: founders to capital, talent to opportunity, policy to implementation. If you can build pipelines, you can build outcomes.",
    note: "Thought-leadership. Targets ecosystem builders."
  },
  {
    day: 35, platform: "IG", pillar: "CORRIDOR", clip: "V29 cut", format: "CUT",
    hook: "Ecosystems are pipelines, not events.",
    caption: "Build pipelines. #Ecosystem #Africa #Investment",
    note: "Corridor walk B-roll."
  },
  // WEEK 6 — EXPANSION + CTA
  {
    day: 36, platform: "LI", pillar: "FOUNDER", clip: "V35", format: "MASTER",
    hook: "Expansion isn't growth if it breaks you.",
    caption: "Three ways to de-risk expansion: (1) Narrow segment first. (2) Build one partner channel before hiring. (3) Keep compliance early — late compliance is expensive.",
    note: "Practical. Attracts founders considering scaling."
  },
  {
    day: 37, platform: "X", pillar: "FOUNDER", clip: "V35 hook", format: "HOOK",
    hook: "De-risk before you scale: narrow segment, partner channel, compliance early. In that order.",
    caption: "Controlled growth or no growth.",
    note: "Short list. High repost value."
  },
  {
    day: 38, platform: "LI", pillar: "OT", clip: "V05", format: "MASTER",
    hook: "OT taught me: reliability beats cleverness.",
    caption: "Founders over-index on clever features and under-index on reliability. If you want to work with enterprises or governments, reliability is your brand.",
    note: "Full circle to OT roots. Timeless post."
  },
  {
    day: 39, platform: "IG", pillar: "CORRIDOR", clip: "C01+C10", format: "CINE",
    hook: "Quiet work. Long-term play.",
    caption: "Access is nothing without execution. #Samuel #Corridor #Dubai",
    note: "Cinematic compilation. Brand energy post — no talking."
  },
  {
    day: 40, platform: "LI", pillar: "FOUNDER", clip: "V36", format: "MASTER",
    hook: "If you're serious about Africa ↔ Middle East, let's speak.",
    caption: "I'm open to serious conversations: founders, investors, corporates, government stakeholders. If you're building Africa ↔ Middle East outcomes — send a short message: who you are + what you're building + what outcome you need.",
    note: "CTA post. Harvest 40 days of momentum."
  },
];

const pillarKeys = ["ALL", ...Object.keys(PILLARS)];
const platformKeys = ["ALL", ...Object.keys(PLATFORMS)];

export default function App() {
  const [filterPillar, setFilterPillar] = useState("ALL");
  const [filterPlatform, setFilterPlatform] = useState("ALL");
  const [activeDay, setActiveDay] = useState(null);
  const [view, setView] = useState("grid");

  const filtered = days.filter(d =>
    (filterPillar === "ALL" || d.pillar === filterPillar) &&
    (filterPlatform === "ALL" || d.platform === filterPlatform)
  );

  const stats = {
    LI: days.filter(d => d.platform === "LI").length,
    X: days.filter(d => d.platform === "X").length,
    IG: days.filter(d => d.platform === "IG").length,
  };

  const pillarCounts = Object.fromEntries(
    Object.keys(PILLARS).map(k => [k, days.filter(d => d.pillar === k).length])
  );

  const activeEntry = activeDay !== null ? days.find(d => d.day === activeDay) : null;

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0A0D13",
      minHeight: "100vh",
      color: "#E8E4DC",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .header-rule {
          width: 40px; height: 2px; background: #C9A96E; margin: 12px 0;
        }
        .card {
          background: #111520;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .card:hover {
          border-color: rgba(201,169,110,0.3);
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .card.active {
          border-color: #C9A96E;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 2px;
          font-size: 10px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.08em;
          font-weight: 500;
          text-transform: uppercase;
        }
        .filter-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(232,228,220,0.6);
          padding: 6px 14px;
          border-radius: 2px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.15s;
        }
        .filter-btn:hover, .filter-btn.active {
          background: rgba(201,169,110,0.12);
          border-color: #C9A96E;
          color: #C9A96E;
        }
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 20px;
          backdrop-filter: blur(4px);
        }
        .modal {
          background: #111520;
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 4px;
          max-width: 600px; width: 100%;
          max-height: 85vh; overflow-y: auto;
          padding: 32px;
        }
        .timeline-line {
          position: absolute; left: 28px; top: 0; bottom: 0;
          width: 1px; background: rgba(255,255,255,0.06);
        }
        .stat-card {
          background: #111520;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          padding: 20px;
          flex: 1;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0D13; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 2px; }
      `}</style>

      {/* HEADER */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 40px 28px",
        background: "linear-gradient(180deg, rgba(201,169,110,0.04) 0%, transparent 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase", marginBottom: 8 }}>
              Samuel Ubido · Personal Brand
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, lineHeight: 1.2, color: "#E8E4DC" }}>
              40-Day Content Scope
            </div>
            <div className="header-rule" />
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(232,228,220,0.5)", fontWeight: 300, letterSpacing: "0.02em" }}>
              LinkedIn · X · Instagram &nbsp;·&nbsp; Starting 9 March 2026
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {Object.entries(stats).map(([p, n]) => (
              <div className="stat-card" key={p} style={{ minWidth: 80, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: PLATFORMS[p].color }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(232,228,220,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                  {PLATFORMS[p].label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar summary */}
        <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
          {Object.entries(PILLARS).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, background: v.bg, border: `1px solid ${v.color}30`, borderRadius: 2, padding: "4px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: v.color }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: v.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {v.label} <span style={{ opacity: 0.6 }}>({pillarCounts[k]})</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(232,228,220,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 8 }}>Filter</span>
        {pillarKeys.map(k => (
          <button key={k} className={`filter-btn ${filterPillar === k ? "active" : ""}`} onClick={() => setFilterPillar(k)}>
            {k === "ALL" ? "All Pillars" : PILLARS[k]?.label}
          </button>
        ))}
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
        {platformKeys.map(k => (
          <button key={k} className={`filter-btn ${filterPlatform === k ? "active" : ""}`} onClick={() => setFilterPlatform(k)}>
            {k === "ALL" ? "All Platforms" : PLATFORMS[k]?.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["grid", "list"].map(v => (
            <button key={v} className={`filter-btn ${view === v ? "active" : ""}`} onClick={() => setView(v)}>
              {v === "grid" ? "⊞ Grid" : "☰ List"}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "32px 40px" }}>
        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {filtered.map(d => {
              const pillar = PILLARS[d.pillar];
              const platform = PLATFORMS[d.platform];
              return (
                <div key={d.day} className={`card ${activeDay === d.day ? "active" : ""}`}
                  onClick={() => setActiveDay(d.day === activeDay ? null : d.day)}
                  style={{ padding: "20px" }}>
                  {/* Accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${pillar.color}, transparent)` }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "rgba(201,169,110,0.2)", fontWeight: 700, lineHeight: 1 }}>
                      {String(d.day).padStart(2, "0")}
                    </div>
                    <div style={{ display: "flex", gap: 4, flexDirection: "column", alignItems: "flex-end" }}>
                      <span className="pill" style={{ background: `${platform.color}18`, color: platform.color, border: `1px solid ${platform.color}30` }}>
                        {platform.label}
                      </span>
                      <span className="pill" style={{ background: pillar.bg, color: pillar.color }}>
                        {d.format}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, lineHeight: 1.5, color: "#E8E4DC", marginBottom: 10 }}>
                    "{d.hook}"
                  </div>

                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(232,228,220,0.35)", letterSpacing: "0.05em" }}>
                    {d.clip} · {pillar.label}
                  </div>

                  {activeDay === d.day && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(232,228,220,0.6)", lineHeight: 1.6, marginBottom: 10 }}>
                        {d.caption}
                      </div>
                      <div style={{ background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 2, padding: "8px 10px" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#C9A96E", textTransform: "uppercase", letterSpacing: "0.08em" }}>Director's note · </span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(232,228,220,0.5)" }}>{d.note}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // LIST / TIMELINE VIEW
          <div style={{ position: "relative", maxWidth: 800 }}>
            <div className="timeline-line" />
            {filtered.map(d => {
              const pillar = PILLARS[d.pillar];
              const platform = PLATFORMS[d.platform];
              return (
                <div key={d.day} style={{ display: "flex", gap: 24, marginBottom: 8, paddingLeft: 56, position: "relative" }}>
                  {/* Day circle */}
                  <div style={{
                    position: "absolute", left: 12, top: 18,
                    width: 32, height: 32, borderRadius: "50%",
                    background: "#0A0D13", border: `1px solid ${pillar.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: pillar.color, fontWeight: 500,
                  }}>
                    {d.day}
                  </div>

                  <div className="card" style={{ flex: 1, padding: "16px 20px" }}
                    onClick={() => setActiveDay(d.day === activeDay ? null : d.day)}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                      <span className="pill" style={{ background: `${platform.color}18`, color: platform.color, border: `1px solid ${platform.color}30` }}>
                        {platform.label}
                      </span>
                      <span className="pill" style={{ background: pillar.bg, color: pillar.color }}>
                        {pillar.label}
                      </span>
                      <span className="pill" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(232,228,220,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {d.format}
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(232,228,220,0.25)", marginLeft: "auto" }}>{d.clip}</span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#E8E4DC", lineHeight: 1.5 }}>
                      "{d.hook}"
                    </div>
                    {activeDay === d.day && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(232,228,220,0.6)", lineHeight: 1.6, marginBottom: 8 }}>
                          {d.caption}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#C9A96E", opacity: 0.7 }}>
                          ↳ {d.note}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BRAND PRINCIPLES FOOTER */}
      <div style={{
        margin: "0 40px 40px",
        background: "#111520",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: "2px solid #C9A96E",
        borderRadius: 4,
        padding: "28px 32px",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#C9A96E", marginBottom: 16 }}>
          Brand Constitution — What Never Changes
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { title: "The Big Idea", text: "Trust Moves Economies" },
            { title: "Positioning", text: "Trusted Corridor Architect" },
            { title: "Two Words", text: "Trusted. Strategic." },
            { title: "Tone", text: "Measured certainty. Briefings, not monologues." },
            { title: "What This Is Not", text: "Lifestyle. Hype. Transactional." },
            { title: "Long Game", text: "Credibility → Responsibility → Alignment → Legacy" },
          ].map(p => (
            <div key={p.title}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "rgba(201,169,110,0.6)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "rgba(232,228,220,0.75)", lineHeight: 1.4 }}>
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
