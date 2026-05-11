'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('setup');
  const [isChecking, setIsChecking] = useState(true);
  const [form, setForm] = useState({ email: 'admin@ignite360.org', password: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkSetupStatus();
  }, []);

  async function checkSetupStatus() {
    try {
      const response = await fetch('/admin/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@ignite360.org', password: 'ChangeMe@123' }),
      });
      if (response.ok) {
        setMode('setup');
      } else {
        setMode('login');
      }
    } catch {
      setMode('login');
    }
    setIsChecking(false);
  }

  async function handleSetupSubmit(event) {
    event.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    const response = await fetch('/admin/api/auth/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, newPassword: form.newPassword, confirmPassword: form.confirmPassword }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Unable to set password.');
      return;
    }

    setError('');
    setForm({ ...form, newPassword: '', confirmPassword: '' });
    setMode('login');
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/admin/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Unable to login.');
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  if (isChecking) {
    return <div className="section-shell flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="section-shell">
      <div className="site-container max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="surface-card bg-[linear-gradient(160deg,#0d1f3c_0%,#173468_100%)] p-8 text-white">
            <p className="section-tag text-[var(--gold-light)]">Admin access</p>
            <h1 className="mt-4 text-5xl text-white">Manage Ignite360 content with less friction.</h1>
            <p className="mt-5 text-lg leading-8 text-white/74">
              Posts, programmes, team profiles, and image settings are all grouped for faster scanning and fewer repeated steps.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'One dashboard for public content and internal updates',
                'Inline status feedback after save, delete, and logout actions',
                'Bulk maintenance and keyboard shortcuts for faster editing',
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 text-sm leading-7 text-white/74">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-8">
            {mode === 'setup' ? (
              <>
                <p className="section-tag">First time setup</p>
                <h2 className="mt-3 text-4xl text-[var(--navy)]">Set your password</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  Create a secure password to protect your admin dashboard.
                </p>
                {error ? <div className="feedback-error mt-6">{error}</div> : null}
                <form onSubmit={handleSetupSubmit} className="mt-6 space-y-5">
                  <div className="field-shell">
                    <label className="field-label" htmlFor="setup-password">New Password</label>
                    <input
                      id="setup-password"
                      type="password"
                      value={form.newPassword}
                      onChange={(event) => setForm((current) => ({ ...current, newPassword: event.target.value }))}
                      placeholder="Enter a strong password"
                      required
                      minLength="6"
                    />
                  </div>
                  <div className="field-shell">
                    <label className="field-label" htmlFor="setup-confirm">Confirm Password</label>
                    <input
                      id="setup-confirm"
                      type="password"
                      value={form.confirmPassword}
                      onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                      placeholder="Confirm your password"
                      required
                      minLength="6"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-secondary w-full">
                    {loading ? 'Setting up...' : 'Set Password'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="section-tag">Secure sign in</p>
                <h2 className="mt-3 text-4xl text-[var(--navy)]">Open the dashboard</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  Enter your credentials to access the admin panel.
                </p>
                {error ? <div className="feedback-error mt-6">{error}</div> : null}
                <form onSubmit={handleLoginSubmit} autoComplete="off" className="mt-6 space-y-5">
                  <div className="field-shell">
                    <label className="field-label" htmlFor="admin-email">Email</label>
                    <input
                      id="admin-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="admin@ignite360.org"
                      required
                    />
                  </div>
                  <div className="field-shell">
                    <label className="field-label" htmlFor="admin-password">Password</label>
                    <input
                      id="admin-password"
                      type="password"
                      value={form.password}
                      onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-secondary w-full">
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
