"use client";
import { useEffect, useState, useCallback } from "react";

interface LeadSegment { makeup_bridal: number; makeup_party: number; nails: number; beauty: number; other: number }
interface Stats {
  leads: { total: number; byWeek: number; byService: Record<string, number>; bySegment: LeadSegment };
  instagram: { followers_bb: number; followers_mbu: number; reach_7d: number };
  ads: { spend: number; leads_from_ads: number; cpl: number; cpl_nails: number; cpl_makeup: number };
  revenue: { services: number; total: number };
  funnel: { leads: number; contacted: number; booked: number; served: number };
}

const PLACEHOLDER: Stats = {
  leads: { total: 0, byWeek: 0, byService: { Makeup: 0, "Nail Art": 0, Beauty: 0 }, bySegment: { makeup_bridal: 0, makeup_party: 0, nails: 0, beauty: 0, other: 0 } },
  instagram: { followers_bb: 280, followers_mbu: 0, reach_7d: 0 },
  ads: { spend: 0, leads_from_ads: 0, cpl: 0, cpl_nails: 0, cpl_makeup: 0 },
  revenue: { services: 0, total: 0 },
  funnel: { leads: 0, contacted: 0, booked: 0, served: 0 },
};

type Tint = "teal" | "gold" | "peach" | "mint" | "rose" | "lav";
function Chip({ label, value, sub, gold, tint }: { label: string; value: string | number; sub?: string; gold?: boolean; tint?: Tint }) {
  const t: Tint = tint ?? (gold ? "gold" : "teal");
  const M: Record<Tint, { bg: string; tx: string }> = {
    teal:  { bg: "bg-[#BFE0DA]/50 border-[#2E8B83]/25", tx: "text-[#1A5A54]" },
    gold:  { bg: "bg-[#F0DDB4]/50 border-[#C9A55C]/35", tx: "text-[#B8893B]" },
    peach: { bg: "bg-[#F7D6C6]/55 border-[#E89B8B]/30", tx: "text-[#B0563F]" },
    mint:  { bg: "bg-[#CFE9DF]/60 border-[#7BB5A8]/35", tx: "text-[#2E7D6E]" },
    rose:  { bg: "bg-[#F3CDD3]/55 border-[#E09BA6]/35", tx: "text-[#B05A68]" },
    lav:   { bg: "bg-[#DFD5EE]/55 border-[#A593C9]/35", tx: "text-[#6B5A8E]" },
  };
  return (
    <div className={`rounded-2xl border p-4 ${M[t].bg}`}>
      <p className="text-[9px] font-semibold uppercase tracking-widest text-[#1A5A54]/55">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${M[t].tx}`}>{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-[#1A5A54]/45">{sub}</p>}
    </div>
  );
}

function Bar({ label, value, max, color, pct }: { label: string; value: number; max: number; color: string; pct?: boolean }) {
  const p = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-[10px] font-semibold text-[#1E4A3A]/70">{label}</span>
      <div className="flex-1 rounded-full bg-[#1E4A3A]/10 h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${Math.max(p, 2)}%` }} />
      </div>
      <span className="w-6 text-right text-[10px] font-bold text-[#1E4A3A]">{value}</span>
      {pct && <span className="w-8 text-right text-[10px] text-[#1E4A3A]/40">{p}%</span>}
    </div>
  );
}

type Tab = "overview" | "quests" | "studio" | "ads" | "reputation" | "leads";

interface Quest { id: string; track: string; phase: number; title: string; desc: string; who: string; points: number; category: string; est: string }
interface Phase { track: string; phase: number; name: string; theme: string; reward: string; rewardEmoji: string; unlockAt: number }
interface Presence { platform: string; status: string; detail: string; action: string }
interface Reputation { score: number; grade: string; google: { rating: number; total: number }; instagram: { followers: number; posts: number }; presence: Presence[]; priorityActions: { title: string; impact: string; effort: string; why: string }[] }

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats>(PLACEHOLDER);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [reportSent, setReportSent] = useState(false);

  // Studio state
  const [scriptType, setScriptType] = useState("Bridal Makeup");
  const [script, setScript] = useState<Record<string, string> | null>(null);
  const [generating, setGenerating] = useState(false);
  const [renderStatus, setRenderStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const [renderId, setRenderId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [genCaps, setGenCaps] = useState(false);

  // Ads state
  const [campaigns, setCampaigns] = useState<{id:string;name:string;status:string}[]>([]);
  const [adForm, setAdForm] = useState({ name: "BB Nails — West Delhi", service: "nails", daily_budget: 150, headline: "", body: "" });
  const [adCreating, setAdCreating] = useState(false);
  const [adResult, setAdResult] = useState<Record<string,string> | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [optResult, setOptResult] = useState<{optimized:number;results:{ad_id:string;action:string;reason:string}[]} | null>(null);

  // Quests state
  const [quests, setQuests] = useState<Quest[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [celebrate, setCelebrate] = useState("");
  const [questTrack, setQuestTrack] = useState<"urvashi" | "piyush">("urvashi");

  // Reputation state
  const [rep, setRep] = useState<Reputation | null>(null);

  const DASH_PW = process.env.NEXT_PUBLIC_DASH_PW ?? "bb2026";

  const loadQuests = useCallback(async () => {
    let serverDone: Record<string, boolean> = {};
    try {
      const res = await fetch("/api/quests");
      const d = await res.json();
      setQuests(d.quests ?? []); setPhases(d.phases ?? []);
      serverDone = Object.fromEntries((d.completed ?? []).map((id: string) => [id, true]));
    } catch { /* ignore */ }
    let local: Record<string, boolean> = {};
    try { local = JSON.parse(localStorage.getItem("bb_quests") ?? "{}"); } catch { /* ignore */ }
    setDone({ ...serverDone, ...local });
  }, []);

  const loadReputation = useCallback(async () => {
    try { const res = await fetch("/api/reputation"); if (res.ok) setRep(await res.json()); } catch { /* ignore */ }
  }, []);

  function toggleQuest(q: Quest) {
    setDone(prev => {
      const next = { ...prev, [q.id]: !prev[q.id] };
      localStorage.setItem("bb_quests", JSON.stringify(next));
      if (!prev[q.id]) {
        setCelebrate(`+${q.points} ✨`);
        setTimeout(() => setCelebrate(""), 1800);
      }
      return next;
    });
  }

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/stats");
      if (res.ok) { setStats(await res.json()); setLastUpdated(new Date().toLocaleTimeString("en-IN")); }
    } catch { /* use placeholder */ }
    setLoading(false);
  }, []);

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch("/api/ads/manage");
      if (res.ok) { const d = await res.json(); setCampaigns(d.campaigns ?? []); }
    } catch { /* meta not wired yet */ }
  }, []);

  function login() {
    if (pw === DASH_PW) { setAuth(true); fetchStats(); fetchCampaigns(); loadQuests(); loadReputation(); }
    else alert("Wrong password");
  }

  useEffect(() => {
    if (auth) { const id = setInterval(fetchStats, 5 * 60 * 1000); return () => clearInterval(id); }
  }, [auth, fetchStats]);

  // Poll render status
  useEffect(() => {
    if (renderStatus !== "rendering" || !renderId) return;
    const poll = setInterval(async () => {
      const res = await fetch(`/api/video/render?id=${renderId}`);
      const d = await res.json();
      if (d.status === "done") { setVideoUrl(d.url); setRenderStatus("done"); clearInterval(poll); }
      if (d.status === "failed") { setRenderStatus("error"); clearInterval(poll); }
    }, 5000);
    return () => clearInterval(poll);
  }, [renderStatus, renderId]);

  async function generateScript() {
    setGenerating(true); setScript(null);
    const res = await fetch("/api/content/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "single_video", type: scriptType }) });
    const d = await res.json();
    setScript(d.script ?? null);
    setGenerating(false);
  }

  async function generateCaptions() {
    setGenCaps(true); setCaptions([]);
    const res = await fetch("/api/content/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: "captions" }) });
    const d = await res.json();
    setCaptions(d.captions ?? []);
    setGenCaps(false);
  }

  async function createAd() {
    setAdCreating(true); setAdResult(null);
    const res = await fetch("/api/ads/manage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "create", ...adForm }) });
    setAdResult(await res.json());
    setAdCreating(false);
    fetchCampaigns();
  }

  async function runOptimize() {
    setOptimizing(true);
    const res = await fetch("/api/ads/manage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "optimize" }) });
    setOptResult(await res.json());
    setOptimizing(false);
    fetchCampaigns();
  }

  const seg = stats.leads.bySegment;
  const segTotal = seg.makeup_bridal + seg.makeup_party + seg.nails + seg.beauty + seg.other || 1;

  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "linear-gradient(135deg,#FBEFE7 0%,#F4E6DE 30%,#E6F0EA 70%,#EFE4F0 100%)" }}>
        <div className="w-80 rounded-3xl bg-white/80 backdrop-blur p-8 shadow-xl text-center border border-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: "linear-gradient(135deg,#CFE9DF,#F3CDD3)" }}>🌸</div>
          <h1 className="text-xl font-bold text-[#1A5A54]">B&amp;B Command Center</h1>
          <p className="mt-1 text-[10px] text-[#1A5A54]/55">Video Studio · Ads · Reputation · Quests</p>
          <input className="mt-6 w-full rounded-xl border border-[#2E8B83]/25 bg-[#FBF4EA] px-4 py-3 text-sm text-[#1A5A54] outline-none focus:border-[#2E8B83]" type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
          <button onClick={login} className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#2E8B83,#C9A55C)" }}>Enter →</button>
        </div>
      </div>
    );
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "quests", label: "🏆 Quests" },
    { id: "studio", label: "Video Studio" },
    { id: "ads", label: "Ads Manager" },
    { id: "reputation", label: "Reputation" },
    { id: "leads", label: "Leads" },
  ];

  // Quest computed values (filtered by selected person)
  const trackQuests = quests.filter(q => q.track === questTrack);
  const trackPhases = phases.filter(p => p.track === questTrack);
  const totalPoints = trackQuests.filter(q => done[q.id]).reduce((s, q) => s + q.points, 0);
  const totalDone = trackQuests.filter(q => done[q.id]).length;
  const isU = questTrack === "urvashi";

  return (
    <div className="min-h-screen font-sans" style={{ background: "linear-gradient(160deg,#FBEFE7 0%,#F5E8DF 25%,#E8F0EB 55%,#F0E5F0 80%,#FBEFE7 100%)" }}>
      <div className="mx-auto max-w-5xl p-4">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1A5A54]">B&amp;B Command Center <span className="text-[#C9A55C]">✦</span></h1>
            <p className="text-[10px] text-[#1A5A54]/55">{lastUpdated ? `Updated ${lastUpdated}` : "Loading…"}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchStats} disabled={loading} className="rounded-xl bg-white/70 border border-[#2E8B83]/20 px-3 py-2 text-[10px] font-semibold text-[#1A5A54]">{loading ? "…" : "↻"}</button>
            <button onClick={async () => { await fetch("/api/cron/weekly-report", { method: "POST" }); setReportSent(true); }} className="rounded-xl px-3 py-2 text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#E89B8B,#C9A55C)" }}>{reportSent ? "✓ Sent" : "📱 Report"}</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-2xl bg-white/70 p-1 shadow-sm">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 rounded-xl py-2 text-[11px] font-semibold transition-all ${tab === t.id ? "text-white shadow" : "text-[#1A5A54]/55 hover:text-[#1A5A54]"}`} style={tab === t.id ? { background: "linear-gradient(135deg,#2E8B83,#3AA395)" } : undefined}>{t.label}</button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Chip label="Total Leads" value={stats.leads.total} sub={`+${stats.leads.byWeek} this week`} tint="mint" />
              <Chip label="Revenue" value={`₹${Math.round(stats.revenue.total / 1000)}K`} sub="Service bookings" tint="rose" />
              <Chip label="BB Followers" value={stats.instagram.followers_bb} sub="@blushesandbrushes2022" tint="peach" />
              <Chip label="Ad Spend" value={`₹${stats.ads.spend}`} sub={stats.ads.cpl ? `₹${stats.ads.cpl}/lead` : "No ads yet"} tint="gold" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5">
                <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Lead Funnel</p>
                <div className="space-y-2.5">
                  <Bar label="Leads in" value={stats.funnel.leads} max={stats.funnel.leads || 1} color="bg-[#1E4A3A]" pct />
                  <Bar label="Contacted" value={stats.funnel.contacted} max={stats.funnel.leads || 1} color="bg-[#2A6355]" pct />
                  <Bar label="Booked" value={stats.funnel.booked} max={stats.funnel.leads || 1} color="bg-[#C9A066]" pct />
                  <Bar label="Served / Paid" value={stats.funnel.served} max={stats.funnel.leads || 1} color="bg-[#C9A066]/60" pct />
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Instagram</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: "@blushesandbrushes", v: stats.instagram.followers_bb },
                    { l: "@makeovers_urvashi", v: stats.instagram.followers_mbu },
                    { l: "7-day reach", v: stats.instagram.reach_7d },
                  ].map(({ l, v }) => (
                    <div key={l} className="rounded-xl bg-[#F5EDD8] p-3 text-center">
                      <p className="text-base font-bold text-[#1E4A3A]">{v}</p>
                      <p className="text-[9px] text-[#1E4A3A]/50 mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-[#F5EDD8] p-3">
                  <p className="text-[9px] font-semibold text-[#1E4A3A]/50 mb-1.5">Revenue split</p>
                  <div className="flex gap-4 text-sm">
                    <div><p className="font-bold text-[#C9A066]">₹{stats.revenue.services.toLocaleString()}</p><p className="text-[9px] text-[#1E4A3A]/50">Services booked</p></div>
                    <div><p className="font-bold text-[#1E4A3A]">₹{stats.revenue.total.toLocaleString()}</p><p className="text-[9px] text-[#1E4A3A]/50">Total earned</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── QUESTS TAB (gamified) ── */}
        {tab === "quests" && (
          <div className="space-y-4">
            {celebrate && (
              <div className="fixed inset-x-0 top-20 z-50 flex justify-center pointer-events-none">
                <div className="rounded-full px-6 py-3 text-lg font-bold text-white shadow-2xl animate-bounce" style={{ background: "linear-gradient(135deg,#E89B8B,#C9A55C)" }}>{celebrate}</div>
              </div>
            )}

            {/* Person toggle */}
            <div className="flex gap-2 rounded-2xl bg-white/70 p-1.5 shadow-sm">
              <button onClick={() => setQuestTrack("urvashi")} className={`flex-1 rounded-xl py-2.5 text-[12px] font-bold transition-all ${isU ? "text-white shadow" : "text-[#1A5A54]/55"}`} style={isU ? { background: "linear-gradient(135deg,#E89B8B,#C9A55C)" } : undefined}>🌸 Urvashi</button>
              <button onClick={() => setQuestTrack("piyush")} className={`flex-1 rounded-xl py-2.5 text-[12px] font-bold transition-all ${!isU ? "text-white shadow" : "text-[#1A5A54]/55"}`} style={!isU ? { background: "linear-gradient(135deg,#2E8B83,#3AA395)" } : undefined}>🚀 Piyush</button>
            </div>

            {/* Score banner */}
            <div className="rounded-3xl p-5 text-center text-white shadow-md" style={{ background: isU ? "linear-gradient(120deg,#2E8B83 0%,#5FB3A3 40%,#E89B8B 100%)" : "linear-gradient(120deg,#1A5A54 0%,#2E8B83 50%,#3AA395 100%)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/90">{isU ? "Urvashi's Growth Score 🌸" : "Piyush's Hustle Score 🚀"}</p>
              <p className="mt-1 text-5xl font-extrabold drop-shadow">{totalPoints}<span className="text-lg"> pts</span></p>
              <p className="mt-1 text-[11px] text-white/85">{totalDone} of {trackQuests.length} quests complete · {isU ? "keep going, you're doing amazing 💪" : "build the future, one quest at a time 💪"}</p>
            </div>

            {/* Reward ladder */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {trackPhases.map(ph => {
                const phaseQuests = trackQuests.filter(q => q.phase === ph.phase);
                const phaseDone = phaseQuests.filter(q => done[q.id]).length;
                const unlocked = phaseDone >= ph.unlockAt;
                const pct = phaseQuests.length ? Math.round((phaseDone / phaseQuests.length) * 100) : 0;
                const phaseTints = ["#F7D6C6", "#CFE9DF", "#F3CDD3", "#DFD5EE"];
                const phaseBar = ["#E89B8B", "#2E8B83", "#E09BA6", "#A593C9"];
                return (
                  <div key={ph.phase} className="rounded-2xl border-2 p-4 transition-all" style={{ borderColor: unlocked ? "#C9A55C" : "rgba(46,139,131,0.18)", background: unlocked ? "#FBF0DA" : phaseTints[ph.phase - 1] + "55" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A5A54]/55">Phase {ph.phase}</span>
                      <span className="text-lg">{unlocked ? "🎁" : ph.rewardEmoji}</span>
                    </div>
                    <p className="mt-1 text-[13px] font-bold text-[#1A5A54]">{ph.name}</p>
                    <div className="mt-2 h-2 rounded-full bg-white/70">
                      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: phaseBar[ph.phase - 1] }} />
                    </div>
                    <p className="mt-1.5 text-[9px] text-[#1A5A54]/55">{phaseDone}/{phaseQuests.length} done</p>
                    <div className={`mt-2 rounded-lg px-2 py-1.5 text-[10px] font-semibold ${unlocked ? "text-white" : "bg-white/60 text-[#1A5A54]/70"}`} style={unlocked ? { background: "linear-gradient(135deg,#C9A55C,#E89B8B)" } : undefined}>
                      {unlocked ? `UNLOCKED: ${ph.reward}` : `Reward: ${ph.reward}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quest list grouped by phase */}
            {trackPhases.map(ph => {
              const phaseQuests = trackQuests.filter(q => q.phase === ph.phase);
              const phaseDone = phaseQuests.filter(q => done[q.id]).length;
              const unlocked = phaseDone >= ph.unlockAt;
              return (
                <div key={ph.phase} className="rounded-2xl bg-white p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-bold text-[#1E4A3A]">Phase {ph.phase} · {ph.name}</p>
                      <p className="text-[10px] text-[#1E4A3A]/50">{ph.theme}</p>
                    </div>
                    {unlocked && <span className="rounded-full bg-[#C9A066] px-3 py-1 text-[9px] font-bold text-white">REWARD UNLOCKED 🎉</span>}
                  </div>
                  <div className="space-y-2">
                    {phaseQuests.map(q => {
                      const isDone = done[q.id];
                      return (
                        <button key={q.id} onClick={() => toggleQuest(q)} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${isDone ? "border-[#C9A066]/40 bg-[#C9A066]/5" : "border-[#1E4A3A]/10 bg-[#F5EDD8] hover:border-[#1E4A3A]/25"}`}>
                          <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${isDone ? "border-[#C9A066] bg-[#C9A066]" : "border-[#1E4A3A]/30"}`}>
                            {isDone && <span className="text-[10px] text-white">✓</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[12px] font-semibold ${isDone ? "text-[#1E4A3A]/50 line-through" : "text-[#1E4A3A]"}`}>{q.title}</p>
                            <p className="text-[10px] text-[#1E4A3A]/50">{q.desc}</p>
                            <div className="mt-1 flex gap-1.5">
                              <span className="rounded-full bg-[#1E4A3A]/10 px-2 py-0.5 text-[8px] font-bold uppercase text-[#1E4A3A]/60">{q.who}</span>
                              <span className="rounded-full bg-[#1E4A3A]/10 px-2 py-0.5 text-[8px] font-bold text-[#1E4A3A]/60">{q.est}</span>
                            </div>
                          </div>
                          <span className="shrink-0 text-[11px] font-bold text-[#C9A066]">+{q.points}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <p className="text-center text-[10px] text-[#1A5A54]/50">{isU ? "Tip from Piyush: finish a phase, get your reward 🥰 Tap a quest to mark it done." : "Both engines, one team. Tap a quest to mark it done 🚀"}</p>
          </div>
        )}

        {/* ── REPUTATION TAB ── */}
        {tab === "reputation" && (
          <div className="space-y-4">
            {rep ? (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl p-4 text-center col-span-1 text-white shadow-md" style={{ background: "linear-gradient(135deg,#2E8B83,#E89B8B)" }}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-white/90">Rep Score</p>
                    <p className="mt-1 text-4xl font-extrabold drop-shadow">{rep.score}</p>
                    <p className="text-[10px] text-white/85">{rep.grade}</p>
                  </div>
                  <Chip label="Google" value={`${rep.google.rating}★`} sub={`${rep.google.total} reviews`} tint="gold" />
                  <Chip label="Instagram" value={rep.instagram.followers} sub={`${rep.instagram.posts} posts`} tint="rose" />
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">This week — highest impact actions</p>
                  <div className="space-y-2">
                    {rep.priorityActions.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-[#F5EDD8] p-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E4A3A] text-[10px] font-bold text-[#C9A066]">{i + 1}</span>
                        <div className="flex-1">
                          <p className="text-[12px] font-semibold text-[#1E4A3A]">{a.title}</p>
                          <p className="text-[10px] text-[#1E4A3A]/50">{a.why}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase ${a.impact === "high" ? "bg-[#C9A066]/20 text-[#9A6E3A]" : "bg-[#1E4A3A]/10 text-[#1E4A3A]/60"}`}>{a.impact} impact</span>
                          <span className="rounded-full bg-[#1E4A3A]/10 px-2 py-0.5 text-[8px] font-bold uppercase text-[#1E4A3A]/60">{a.effort} effort</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Presence across platforms</p>
                  <div className="space-y-1.5">
                    {rep.presence.map((p, i) => {
                      const color = p.status === "strong" ? "bg-green-100 text-green-800" : p.status === "weak" ? "bg-[#C9A066]/20 text-[#9A6E3A]" : p.status === "missing" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
                      return (
                        <div key={i} className="flex items-center gap-3 rounded-xl bg-[#F5EDD8] px-3 py-2.5">
                          <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase shrink-0 ${color}`}>{p.status}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-[#1E4A3A]">{p.platform}</p>
                            <p className="text-[9px] text-[#1E4A3A]/50 truncate">{p.action}</p>
                          </div>
                          <span className="text-[9px] text-[#1E4A3A]/40 shrink-0 hidden md:block">{p.detail}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl bg-white p-8 text-center text-[12px] text-[#1E4A3A]/50">Loading reputation audit…</div>
            )}
          </div>
        )}

        {/* ── VIDEO STUDIO TAB ── */}
        {tab === "studio" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Step 1 — Generate video script</p>
              <p className="text-[10px] text-[#1E4A3A]/50 mb-4">Claude writes the hook, overlays, end card, ad copy and WhatsApp opener — matching The Square Salon style.</p>
              <div className="flex gap-2 mb-4">
                {["Bridal Makeup", "Party Makeup", "Nail Extensions", "Nail Art"].map(t => (
                  <button key={t} onClick={() => setScriptType(t)} className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold border transition-all ${scriptType === t ? "bg-[#1E4A3A] text-[#C9A066] border-[#1E4A3A]" : "bg-white text-[#1E4A3A]/60 border-[#1E4A3A]/20"}`}>{t}</button>
                ))}
              </div>
              <button onClick={generateScript} disabled={generating} className="rounded-xl bg-[#1E4A3A] px-5 py-2.5 text-[11px] font-bold text-[#C9A066] disabled:opacity-50">
                {generating ? "Writing script…" : `✨ Generate ${scriptType} Script`}
              </button>
              {script && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["Hook text", script.hook_text],
                    ["Hook accent", script.hook_sub || "—"],
                    ["Overlay 1", script.overlay_1],
                    ["Overlay 2", script.overlay_2],
                    ["Overlay 3", script.overlay_3],
                    ["End card line 1", script.end_card_line1],
                    ["End card line 2", script.end_card_line2],
                    ["End card CTA", script.end_card_cta],
                    ["Ad headline", script.ad_headline],
                    ["Ad body", script.ad_body],
                    ["WhatsApp opener", script.whatsapp_opener],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-[#F5EDD8] p-3">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#1E4A3A]/40 mb-1">{label}</p>
                      <p className="text-[11px] font-semibold text-[#1E4A3A]">{value}</p>
                    </div>
                  ))}
                  <div className="col-span-2 rounded-xl bg-[#F5EDD8] p-3">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-[#1E4A3A]/40 mb-1">Instagram caption</p>
                    <p className="text-[11px] text-[#1E4A3A] leading-relaxed whitespace-pre-wrap">{script.instagram_caption}</p>
                    <button onClick={() => navigator.clipboard.writeText(script.instagram_caption ?? "")} className="mt-2 rounded-lg bg-[#1E4A3A]/10 px-3 py-1 text-[9px] font-semibold text-[#1E4A3A]">Copy caption</button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Step 2 — Auto-render the video (Shotstack)</p>
              <p className="text-[10px] text-[#1E4A3A]/50 mb-3">Urvashi shares raw clips via WhatsApp → Piyush pastes URLs below → tool renders the finished Reel in ~2 minutes. No CapCut needed.</p>
              <div className="space-y-2 mb-3">
                {[0, 1, 2].map(i => (
                  <input key={i} type="url" placeholder={`Raw clip ${i + 1} URL (Google Drive / WhatsApp CDN link)`} className="w-full rounded-xl border border-[#1E4A3A]/20 bg-[#F5EDD8] px-3 py-2 text-[11px] text-[#1E4A3A] outline-none" />
                ))}
              </div>
              <div className="flex gap-2">
                <button disabled={!script || renderStatus === "rendering"} onClick={() => { setRenderStatus("rendering"); setRenderId("demo-id"); }} className="rounded-xl bg-[#1E4A3A] px-5 py-2.5 text-[11px] font-bold text-[#C9A066] disabled:opacity-40">
                  {renderStatus === "rendering" ? "Rendering…" : "🎬 Render Video"}
                </button>
                {renderStatus === "done" && videoUrl && (
                  <a href={videoUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#C9A066] px-5 py-2.5 text-[11px] font-bold text-white">Download Reel →</a>
                )}
              </div>
              {renderStatus === "rendering" && (
                <div className="mt-3 rounded-xl bg-[#F5EDD8] p-3 text-[11px] text-[#1E4A3A]/70">
                  Rendering via Shotstack… usually 90–120 seconds. You will see the download button when ready.
                  <p className="mt-1 text-[9px] text-[#1E4A3A]/40">Add SHOTSTACK_API_KEY to .env.local to enable live rendering. Free stage environment available at shotstack.io</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Weekly Instagram captions</p>
                  <p className="text-[10px] text-[#1E4A3A]/50 mt-0.5">Mon / Wed / Fri / Sun — ready to copy-paste</p>
                </div>
                <button onClick={generateCaptions} disabled={genCaps} className="rounded-xl bg-[#1E4A3A]/10 px-4 py-2 text-[10px] font-bold text-[#1E4A3A] disabled:opacity-50">{genCaps ? "Generating…" : "Generate week"}</button>
              </div>
              {captions.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {captions.map((cap, i) => (
                    <div key={i} className="rounded-xl bg-[#F5EDD8] p-3">
                      <p className="text-[11px] leading-relaxed text-[#1E4A3A] whitespace-pre-wrap">{cap}</p>
                      <button onClick={() => navigator.clipboard.writeText(cap)} className="mt-2 rounded-lg bg-[#1E4A3A]/10 px-3 py-1 text-[9px] font-semibold text-[#1E4A3A]">Copy</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ADS MANAGER TAB ── */}
        {tab === "ads" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Chip label="Nails CPL" value={stats.ads.cpl_nails ? `₹${stats.ads.cpl_nails}` : "—"} sub="Target: <₹400" />
              <Chip label="Makeup CPL" value={stats.ads.cpl_makeup ? `₹${stats.ads.cpl_makeup}` : "—"} sub="Target: <₹600" gold />
              <Chip label="Total Spend" value={`₹${stats.ads.spend}`} sub="This month" />
            </div>

            <div className="rounded-2xl bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Create new campaign</p>
                <p className="text-[9px] text-[#1E4A3A]/40">Geo: 5km Ramesh Nagar · Women 20–45</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wide text-[#1E4A3A]/50 block mb-1">Service type</label>
                  <select value={adForm.service} onChange={e => setAdForm(f => ({ ...f, service: e.target.value }))} className="w-full rounded-xl border border-[#1E4A3A]/20 bg-[#F5EDD8] px-3 py-2 text-[11px] text-[#1E4A3A] outline-none">
                    <option value="nails">Nail Art & Extensions (studio)</option>
                    <option value="bridal">Bridal Makeup (Urvashi travels)</option>
                    <option value="party">Party / Roka / Engagement Makeup</option>
                    <option value="beauty">Beauty — keratin, hair spa, laser facial</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wide text-[#1E4A3A]/50 block mb-1">Daily budget (₹)</label>
                  <input type="number" value={adForm.daily_budget} onChange={e => setAdForm(f => ({ ...f, daily_budget: Number(e.target.value) }))} className="w-full rounded-xl border border-[#1E4A3A]/20 bg-[#F5EDD8] px-3 py-2 text-[11px] text-[#1E4A3A] outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-wide text-[#1E4A3A]/50 block mb-1">Ad headline</label>
                  <input type="text" value={adForm.headline} onChange={e => setAdForm(f => ({ ...f, headline: e.target.value }))} placeholder="Use script from Video Studio tab" className="w-full rounded-xl border border-[#1E4A3A]/20 bg-[#F5EDD8] px-3 py-2 text-[11px] text-[#1E4A3A] outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-wide text-[#1E4A3A]/50 block mb-1">Ad body copy</label>
                  <textarea value={adForm.body} onChange={e => setAdForm(f => ({ ...f, body: e.target.value }))} rows={2} placeholder="Use script from Video Studio tab" className="w-full rounded-xl border border-[#1E4A3A]/20 bg-[#F5EDD8] px-3 py-2 text-[11px] text-[#1E4A3A] outline-none resize-none" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={createAd} disabled={adCreating} className="rounded-xl bg-[#1E4A3A] px-5 py-2.5 text-[11px] font-bold text-[#C9A066] disabled:opacity-50">
                  {adCreating ? "Creating…" : "Launch Campaign (Paused for review)"}
                </button>
                <button onClick={runOptimize} disabled={optimizing} className="rounded-xl bg-[#C9A066]/20 px-4 py-2.5 text-[11px] font-bold text-[#9A6E3A] disabled:opacity-50">
                  {optimizing ? "Running…" : "⚡ Auto-Optimize"}
                </button>
              </div>
              {adResult && (
                <div className="mt-3 rounded-xl bg-[#F5EDD8] p-3 text-[10px] text-[#1E4A3A]">
                  {adResult.error ? <span className="text-red-600">{JSON.stringify(adResult.error)}</span> : <span>Campaign created — review in Meta Ads Manager before activating. IDs: {JSON.stringify(adResult)}</span>}
                </div>
              )}
              {optResult && (
                <div className="mt-3 rounded-xl bg-[#F5EDD8] p-3 text-[10px] text-[#1E4A3A]">
                  <p className="font-bold">Optimized {optResult.optimized} ads</p>
                  {optResult.results?.map((r, i) => <p key={i} className="mt-1">{r.action === "paused" ? "⏸" : "↑"} {r.reason}</p>)}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Active campaigns</p>
              {campaigns.length === 0 ? (
                <p className="text-[11px] text-[#1E4A3A]/40">No campaigns yet. Create one above or connect Meta API in .env.local.</p>
              ) : campaigns.map(c => (
                <div key={c.id} className="flex items-center justify-between rounded-xl bg-[#F5EDD8] px-4 py-3 mb-2">
                  <span className="text-[11px] font-semibold text-[#1E4A3A]">{c.name}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LEAD INTELLIGENCE TAB ── */}
        {tab === "leads" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5">
              <p className="mb-4 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Leads by service (qualified)</p>
              <div className="space-y-3">
                <Bar label="Bridal Makeup" value={seg.makeup_bridal} max={segTotal} color="bg-[#C9A066]" pct />
                <Bar label="Party / Roka / Engagement" value={seg.makeup_party} max={segTotal} color="bg-[#C9A066]/70" pct />
                <Bar label="Nail Art & Extensions" value={seg.nails} max={segTotal} color="bg-[#1E4A3A]" pct />
                <Bar label="Beauty (keratin, spa, facial)" value={seg.beauty} max={segTotal} color="bg-[#2A6355]" pct />
                <Bar label="Other" value={seg.other} max={segTotal} color="bg-[#1E4A3A]/30" pct />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F5EDD8] p-3">
                  <p className="text-[9px] font-bold uppercase text-[#1E4A3A]/50 mb-1">Makeup avg ticket</p>
                  <p className="text-xl font-bold text-[#C9A066]">₹8,000–25,000</p>
                  <p className="text-[9px] text-[#1E4A3A]/50">Bridal · Party · Travel</p>
                </div>
                <div className="rounded-xl bg-[#F5EDD8] p-3">
                  <p className="text-[9px] font-bold uppercase text-[#1E4A3A]/50 mb-1">Nail avg ticket</p>
                  <p className="text-xl font-bold text-[#1E4A3A]">₹800–3,000</p>
                  <p className="text-[9px] text-[#1E4A3A]/50">Studio · Ramesh Nagar</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Geo target zones</p>
              <div className="space-y-2">
                {[
                  { name: "Ramesh Nagar (studio)", r: "5km", intent: "Nail work — walk-in" },
                  { name: "Rajouri Garden", r: "3km", intent: "Nails + Party makeup" },
                  { name: "Tilak Nagar", r: "3km", intent: "Nails + Party makeup" },
                  { name: "Subhash Nagar", r: "3km", intent: "Nails + Party makeup" },
                  { name: "Delhi NCR (bridal)", r: "40km", intent: "Bridal — Urvashi travels" },
                ].map(({ name, r, intent }) => (
                  <div key={name} className="flex items-center justify-between rounded-xl bg-[#F5EDD8] px-4 py-2.5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#1E4A3A]">{name}</p>
                      <p className="text-[9px] text-[#1E4A3A]/50">{intent}</p>
                    </div>
                    <span className="text-[9px] font-bold text-[#C9A066] bg-[#C9A066]/15 px-2 py-0.5 rounded-full">{r} radius</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#1E4A3A]/50">Weekly manual log</p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {["New followers", "DMs received", "Appointments", "Revenue (₹)"].map(label => (
                  <div key={label}>
                    <label className="text-[9px] font-bold uppercase tracking-wide text-[#1E4A3A]/50 block mb-1">{label}</label>
                    <input type="number" defaultValue={0} className="w-full rounded-xl border border-[#1E4A3A]/20 bg-[#F5EDD8] px-3 py-2 text-sm font-bold text-[#1E4A3A] outline-none" />
                  </div>
                ))}
              </div>
              <button className="mt-3 rounded-xl bg-[#1E4A3A] px-5 py-2 text-[11px] font-bold text-[#C9A066]">Save week →</button>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-[9px] text-[#1E4A3A]/30">BB Command Center · {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
