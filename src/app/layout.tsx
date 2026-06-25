import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="bg-dark-900 text-white font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-800/90 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <Link href="/" className="font-semibold text-sm tracking-tight">
                ← Curs Node-RED
              </Link>
              <nav className="flex items-center gap-4 text-xs text-neutral-400">
                <Link href="/modul-1" className="hover:text-white">M1</Link>
                <Link href="/modul-2" className="hover:text-white">M2</Link>
                <Link href="/modul-3" className="hover:text-white">M3</Link>
                <Link href="/modul-4" className="hover:text-white">M4</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-white/5 py-8 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Curs Node-RED & AI pentru Smart Home. Toate drepturile rezervate.
          </footer>
        </div>
      </body>
    </html>
  );
}
