'use client';

import { useState } from 'react';

export default function AdminPasswordPanel({ email }) {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: 'info', message: 'Updating password...' });

    const response = await fetch('/admin/api/auth/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: data.error || 'Unable to update password.' });
      return;
    }

    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setStatus({ type: 'success', message: 'Admin password updated successfully.' });
  }

  const feedbackClassName = status
    ? status.type === 'success'
      ? 'feedback-success'
      : status.type === 'error'
        ? 'feedback-error'
        : 'feedback-info'
    : '';

  return (
    <div className="surface-card p-6 md:p-8">
      <p className="section-tag">Account settings</p>
      <h1 className="mt-3 text-4xl text-[var(--navy)]">Change admin password</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
        The admin email stays fixed for this workspace. Only the password can be changed from here.
      </p>

      <div className="mt-6 rounded-[1.2rem] border border-[var(--border)] bg-[var(--sand)] p-4">
        <p className="text-sm font-semibold text-[var(--navy)]">Admin email</p>
        <p className="mt-2 text-sm text-[var(--gold-dark)]">{email}</p>
      </div>

      {status ? <div className={`mt-6 ${feedbackClassName}`}>{status.message}</div> : null}

      <form onSubmit={handleSubmit} autoComplete="off" className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="field-shell md:col-span-2">
          <label className="field-label" htmlFor="current-password">Current password</label>
          <input
            id="current-password"
            type="password"
            value={form.currentPassword}
            autoComplete="off"
            onChange={(event) => setForm((current) => ({ ...current, currentPassword: event.target.value }))}
            placeholder="Current password"
          />
        </div>

        <div className="field-shell">
          <label className="field-label" htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={form.newPassword}
            autoComplete="new-password"
            onChange={(event) => setForm((current) => ({ ...current, newPassword: event.target.value }))}
            placeholder="At least 8 characters"
          />
        </div>

        <div className="field-shell">
          <label className="field-label" htmlFor="confirm-password">Confirm new password</label>
          <input
            id="confirm-password"
            type="password"
            value={form.confirmPassword}
            autoComplete="new-password"
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
            placeholder="Repeat the new password"
          />
        </div>

        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="btn-secondary w-full md:w-auto">
            {saving ? 'Saving...' : 'Save new password'}
          </button>
        </div>
      </form>
    </div>
  );
}
