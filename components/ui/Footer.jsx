import Link from 'next/link';
import { socialLinks } from '@/lib/seed-content';

const primaryLinks = [
  { href: '/programs', label: 'Programs' },
  { href: '/apply', label: 'Apply' },
  { href: '/updates', label: 'Updates' },
  { href: '/team', label: 'Team' },
  { href: '/about', label: 'About' },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07.02C5.53.02.21 5.34.21 11.88c0 2.09.55 4.13 1.58 5.93L0 24l6.38-1.67a11.82 11.82 0 0 0 5.69 1.45h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.24-6.15-3.42-8.44Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.78.99 1.01-3.68-.24-.38a9.9 9.9 0 0 1-1.52-5.24c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.91 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.19.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.19 1.86.11.57-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.17-1.44-.08-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M18.9 3h2.95l-6.44 7.36L23 21h-6.01l-4.7-6.14L6.92 21H3.96l6.89-7.88L1 3h6.16l4.25 5.61L18.9 3Zm-1.05 16.21h1.64L6.28 4.7H4.52l13.33 14.51Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.331.012 7.052.07 2.696.278.278 2.579.07 7.052.012 8.331 0 8.756 0 12c0 3.244.011 3.668.07 4.948.207 4.474 2.6 6.88 7.072 7.088 1.28.058 1.704.07 4.948.07 3.243 0 3.668-.012 4.947-.07 4.471-.208 6.882-2.61 7.089-7.087.058-1.28.07-1.704.07-4.948 0-3.244-.011-3.668-.07-4.948-.207-4.474-2.599-6.778-7.072-6.987C15.668.012 15.243 0 12 0z"/><circle cx="12" cy="12" r="3.6"/><path d="M18.406 5.594a.889.889 0 1 1 1.778 0 .889.889 0 0 1-1.778 0z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M13.44 21v-7.4h2.48l.37-2.88h-2.85V8.88c0-.83.23-1.4 1.42-1.4h1.52V4.91c-.26-.03-1.17-.11-2.23-.11-2.21 0-3.72 1.35-3.72 3.82v2.1H8v2.88h2.43V21h3.01Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M14.85 3c.28 1.58 1.21 2.88 2.62 3.63.82.44 1.76.66 2.71.64v2.98a8.45 8.45 0 0 1-3.31-.66v5.69a5.28 5.28 0 1 1-5.28-5.28c.33 0 .66.03.97.09v3.04a2.41 2.41 0 1 0 1.29 2.15V3h3Z" />
    </svg>
  );
}

const socialColors = {
  whatsapp: { bg: 'bg-[#25D366]', hover: 'hover:bg-[#20BA5A]', text: 'text-white' },
  x: { bg: 'bg-[#000000]', hover: 'hover:bg-[#1a1a1a]', text: 'text-white' },
  instagram: { bg: 'bg-[#E4405F]', hover: 'hover:bg-[#d63447]', text: 'text-white' },
  facebook: { bg: 'bg-[#1877F2]', hover: 'hover:bg-[#166FE5]', text: 'text-white' },
  tiktok: { bg: 'bg-[#000000]', hover: 'hover:bg-[#1a1a1a]', text: 'text-white' },
};

const socialIcons = {
  whatsapp: <WhatsAppIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  tiktok: <TikTokIcon />,
};

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.18)] bg-[var(--navy)] py-16 text-white">
      <div className="site-container space-y-10">
        <div className="surface-card overflow-hidden border-[rgba(139,105,20,0.18)] bg-[linear-gradient(145deg,#fffaf0_0%,#f3dfab_100%)] p-6 text-[var(--navy)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="font-serif text-3xl">
                Ignite<span className="text-[var(--gold)]">360</span>
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--navy-mid)] md:text-base">
                Skills development, mentorship, leadership training, and career guidance designed to move young
                people from uncertainty to practical progress.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link href="/apply" className="btn-primary">
                Apply for a cohort
              </Link>
              <Link href="/programs" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 font-semibold text-white hover:bg-white/12 hover:border-white/30 active:opacity-80">
                Explore programs
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr_1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-light)]">Quick access</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-3 text-sm text-white/78 hover:bg-white/5 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-light)]">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-white/76">
              <a href="mailto:hello@ignite360.org" className="block hover:text-white">hello@ignite360.org</a>
              <a href="tel:+233501234567" className="block hover:text-white">+233 50 123 4567</a>
              <p>Accra, Ghana</p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-light)]">Community</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(socialLinks).map(([key, item]) => {
                const colors = socialColors[key] || socialColors.x;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${colors.bg} ${colors.hover} ${colors.text}`}
                    title={item.label}
                  >
                    {socialIcons[key]}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-light)]">Admin</p>
            <div className="mt-4 space-y-3 text-sm text-white/76">
              <p>Manage content, team profiles, and programme updates from one dashboard.</p>
              <Link href="/admin/login" className="inline-flex rounded-full border border-white/12 px-4 py-3 font-semibold text-[var(--gold-light)] hover:bg-white/5">
                Open admin dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} Ignite360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
