'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/apply', label: 'Apply' },
  { href: '/updates', label: 'Updates' },
  { href: '/team', label: 'Team' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(201,168,76,0.18)] bg-[rgba(13,31,60,0.97)] backdrop-blur-sm">
      <div className="site-container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-white" aria-label="Ignite360 home">
          <Image 
            src="/ignite360-logo.svg" 
            alt="Ignite360" 
            width={48} 
            height={48}
            sizes="48px"
            className="h-12 w-12 object-contain"
            priority={false}
          />
          <div>
            <p className="font-serif text-2xl leading-none">
              Ignite<span className="text-[var(--gold)]">360</span>
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-white/60">Youth Empowerment</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-[var(--gold-dark)] text-white shadow-[0_10px_24px_rgba(139,105,20,0.28)]'
                    : 'text-[var(--gold-light)] hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/apply" className="btn-primary px-5 py-3 text-sm">
            Start application
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-2xl border border-white/10 p-3.5 text-white hover:bg-white/8 hover:border-white/15 active:opacity-80 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current transition-all" />
            <span className="block h-0.5 w-5 bg-current transition-all" />
            <span className="block h-0.5 w-5 bg-current transition-all" />
          </div>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-[var(--navy)] lg:hidden">
          <div className="site-container space-y-4 py-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-[var(--gold-light)]">Most used</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Link href="/apply" className="btn-primary w-full">
                  Apply now
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/12 active:opacity-80"
                >
                  Browse programs
                </Link>
              </div>
            </div>

            <nav className="grid gap-2" aria-label="Mobile primary">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-2xl px-4 py-4 text-base transition ${
                      active ? 'bg-white/10 font-semibold text-white' : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
