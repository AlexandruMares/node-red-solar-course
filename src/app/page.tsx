import Link from "next/link";

const modules = [
  {
    slug: "modul-1",
    title: "Modul 1 — Baze Node-RED",
    lessons: 7,
    color: "blue",
    desc: "Iei Node-RED de la zero. Instalare, interfață, noduri esențiale, Function node, JSON, Dashboard. Fără hardware — totul rulează pe PC.",
    skills: ["Instalare Node-RED", "Noduri esențiale", "Function node (JS)", "JSON", "Dashboard UI"],
  },
  {
    slug: "modul-2",
    title: "Modul 2 — Panouri Solare",
    lessons: 10,
    color: "amber",
    desc: "Hardware real: senzori tensiune/curent, ADC, relee, Raspberry Pi. Monitorizează panou solar, calculează energie, controlează încărcare.",
    skills: ["Raspberry Pi", "ADC ADS1115", "Senzori", "Relee", "SQLite", "MQTT"],
  },
  {
    slug: "modul-3",
    title: "Modul 3 — AI în Node-RED",
    lessons: 9,
    color: "violet",
    desc: "Funcții avansate, API-uri externe, baze de date, anomaly detection, predicție producție solară, optimizare consum automată.",
    skills: ["Function node avansat", "HTTP API", "MySQL/PostgreSQL", "Anomaly detection", "Predicție", "Notificări"],
  },
  {
    slug: "modul-4",
    title: "Modul 4 — Smart Home & Agent AI",
    lessons: 10,
    color: "emerald",
    desc: "Divizori smart, scenelor automate, agent AI care ia decizii autonome, integrare vreme + preț energie, dashboard complet.",
    skills: ["Divizori WiFi", "Scenele smart", "Agent AI", "Integrări API", "Dashboard avansat"],
  },
];

const hardware = [
  "Raspberry Pi 4/5",
  "Modul ADC ADS1115",
  "Relee modul (1-4 canale)",
  "Senzor tensiune (divizor)",
  "Senzor curent ACS712/INA219",
  "Senzor temperatură DS18B20",
  "Divizor WiFi (Shelly/Meross)",
  "Panou solar (50W+)",
  "Cabluri Dupont, breadboard",
  "Alimentare 5V 3A",
];

const software = [
  "Node.js 18+",
  "Node-RED (ultima versiune)",
  "SQLite",
  "Mosquitto MQTT",
  "node-red-dashboard",
  "node-red-node-ads1x15",
  "node-red-contrib-modbus",
];

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-blue-200 mb-6">
          Curs practic · Română · Hardware real
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.06] mb-6">
          Curs Node-RED & AI
          <span className="block bg-gradient-to-r from-white via-neutral-200 to-blue-300 bg-clip-text text-transparent">
            pentru Smart Home
          </span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-3xl">
          4 module, 36 lecții practice. De la zero la un sistem complet de monitorizare panouri solare, control divizori smart și agent AI care optimizează consumul automat.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-2xl font-semibold">4</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Module</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-2xl font-semibold">36</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Lecții</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-2xl font-semibold">RO</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Română</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-2xl font-semibold">Real</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Hardware</div>
          </div>
        </div>
      </section>

      {/* Despre curs */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Despre curs</h2>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8 text-neutral-400 font-light leading-relaxed space-y-4">
          <p>Acest curs nu e teoretic. Nu e pentru programatori. E pentru instalatori solari, tehnicieni și firme mici care vor să automatizeze sisteme reale folosind Node-RED.</p>
          <p>Totul se face pe hardware real: senzori de tensiune și curent, modul ADC, relee, Raspberry Pi, divizori WiFi. La final, cursantul are un dashboard funcțional și poate automatiza monitorizarea.</p>
          <p>Cursul e 100% în limba română, cu exemple practice și flow-uri care pot fi importate direct în Node-RED.</p>
        </div>
      </section>

      {/* Module */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">Module curs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((m) => (
            <Link
              key={m.slug}
              href={`/curs/${m.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-mono uppercase tracking-[0.24em] text-${m.color}-300`}>
                  {m.lessons} lecții
                </span>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">→</span>
              </div>
              <h3 className="text-xl font-medium tracking-tight mb-3">{m.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">{m.desc}</p>
              <div className="flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-white/[0.04] border border-white/10 text-neutral-400">
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hardware & Software */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">Ce vei folosi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-500/[0.06] p-6 md:p-8">
            <h3 className="text-lg font-medium mb-4 text-amber-200">Hardware</h3>
            <ul className="space-y-2">
              {hardware.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-neutral-300">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-blue-400/20 bg-blue-500/[0.06] p-6 md:p-8">
            <h3 className="text-lg font-medium mb-4 text-blue-200">Software</h3>
            <ul className="space-y-2">
              {software.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-neutral-300">
                  <span className="text-blue-400 mt-0.5">▸</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Rezultat */}
      <section className="mb-12">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/[0.06] p-6 md:p-10">
          <h2 className="text-3xl font-medium tracking-tight mb-6">La finalul cursului</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-300">
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Instalează și configurează Node-RED</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Citește senzori tensiune/curent cu ADC</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Controlează relee și divizori din browser</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Afișează dashboard cu valori reale</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Programează acțiuni automate</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Publică date prin MQTT</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Detectează anomalii și trimite alerte</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Construiește un agent AI basic</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          href="/curs/modul-1"
          className="inline-flex items-center gap-2 h-14 px-10 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all text-sm"
        >
          Începe Modulul 1 →
        </Link>
      </section>
    </div>
  );
}
