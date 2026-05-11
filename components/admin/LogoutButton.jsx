'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch('/admin/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="w-full rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/6 disabled:opacity-60"
    >
      {loading ? 'Signing out...' : 'Logout'}
    </button>
  );
}
