'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/admin/LogoutButton';

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', hint: 'Summary and recent applications' },
  { href: '/admin/dashboard/applications', label: 'Applications', hint: 'Review submissions and export PDFs' },
  { href: '/admin/dashboard/posts', label: 'Posts', hint: 'Publish updates and stories' },
  { href: '/admin/dashboard/programs', label: 'Programs', hint: 'Manage the public catalogue' },
  { href: '/admin/dashboard/team', label: 'Team', hint: 'Edit profiles and social links' },
  { href: '/admin/dashboard/settings', label: 'Settings', hint: 'Change the admin password' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="surface-card sticky top-28 overflow-hidden bg-[var(--navy)] text-white">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Image
            src="/ignite360-logo.svg"
            alt="Ignite360"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            sizes="40px"
            priority={true}
          />
          <div>
            <p className="font-serif text-2xl">
              Ignite<span className="text-[var(--gold)]">360</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-white/62">Content management dashboard</p>
      </div>

      <div className="space-y-2 p-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-[1.2rem] px-4 py-3 ${
                active ? 'bg-white/12 text-white' : 'text-white/78 hover:bg-white/6 hover:text-white'
              }`}
            >
              <p className="font-semibold">{item.label}</p>
              <p className="mt-1 text-sm text-white/58">{item.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-[1.25rem] bg-white/6 p-4 backdrop-blur">
          <p className="text-sm font-semibold text-[var(--gold-light)]">Quick actions</p>
          <div className="mt-3 grid gap-2">
            <Link href="/admin/dashboard/applications" className="block rounded-full border border-white/10 px-4 py-3 text-sm text-white/84 hover:bg-white/8 hover:border-white/12">
              Review applications
            </Link>
            <Link href="/admin/dashboard/posts" className="block rounded-full border border-white/10 px-4 py-3 text-sm text-white/84 hover:bg-white/8 hover:border-white/12">
              Add a new post
            </Link>
            <Link href="/admin/dashboard/programs" className="block rounded-full border border-white/10 px-4 py-3 text-sm text-white/84 hover:bg-white/8 hover:border-white/12">
              Create a program
            </Link>
            <Link href="/admin/dashboard/team" className="block rounded-full border border-white/10 px-4 py-3 text-sm text-white/84 hover:bg-white/8 hover:border-white/12">
              Update team details
            </Link>
            <Link href="/admin/dashboard/settings" className="block rounded-full border border-white/10 px-4 py-3 text-sm text-white/84 hover:bg-white/8 hover:border-white/12">
              Change password
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
