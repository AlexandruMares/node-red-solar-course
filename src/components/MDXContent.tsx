import Link from "next/link";

export default function MDXContent({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <Link href="/" className="text-xs text-neutral-500 hover:text-white mb-4 inline-block">← Înapoi la curs</Link>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="prose-dark">{children}</div>
    </div>
  );
}
