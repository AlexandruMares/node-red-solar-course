import Link from "next/link";

const modules = [
  { slug: "modul-1", title: "Modulul 1 — Baze Node-RED", lessons: 7, color: "blue" },
  { slug: "modul-2", title: "Modulul 2 — Node-RED pentru Panouri Solare", lessons: 10, color: "amber" },
  { slug: "modul-3", title: "Modulul 3 — AI în Node-RED", lessons: 9, color: "violet" },
  { slug: "modul-4", title: "Modulul 4 — Smart Home & Agent AI", lessons: 10, color: "emerald" },
];

export async function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export default function ModulPage({ params }: { params: { slug: string } }) {
  const mod = modules.find((m) => m.slug === params.slug);
  if (!mod) return <div>Nu a fost găsit</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/" className="text-xs text-neutral-500 hover:text-white mb-6 inline-block">← Înapoi la curs</Link>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 mb-6">
        {mod.lessons} lecții practice
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">{mod.title}</h1>
      <div className={`rounded-3xl border border-${mod.color}-400/20 bg-${mod.color}-500/[0.06] p-6 md:p-8 mb-12`}>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Acest modul conține {mod.lessons} lecții practice cu cod complet, exemple reale și exerciții.
          Parcurge-le în ordine — fiecare lecție construiește pe cea anterioară.
        </p>
      </div>
      <LessonList slug={mod.slug} count={mod.lessons} />
    </div>
  );
}

function LessonList({ slug, count }: { slug: string; count: number }) {
  const lessons = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className="space-y-4">
      {lessons.map((n) => (
        <Link
          key={n}
          href={`/curs/${slug}/lectia-${n}`}
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 hover:border-white/20 hover:bg-white/[0.05] transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
            {n}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white">Lecția {n}</h3>
            <p className="text-xs text-neutral-500 mt-1">Vezi conținut complet →</p>
          </div>
          <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">→</span>
        </Link>
      ))}
    </div>
  );
}
