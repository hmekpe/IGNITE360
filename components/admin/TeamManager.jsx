'use client';

import { useEffect, useMemo, useState } from 'react';
import ImageField from '@/components/admin/ImageField';
import SmartImage from '@/components/ui/SmartImage';

const initialForm = {
  name: '',
  role: '',
  shortBio: '',
  bio: '',
  image: '',
  order: 0,
  socials: {
    linkedin: '',
    x: '',
    instagram: '',
    facebook: '',
    tiktok: '',
  },
};

export default function TeamManager({ initialTeam }) {
  const [members, setMembers] = useState(initialTeam);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState([]);

  const filteredMembers = useMemo(() => {
    const search = query.toLowerCase();
    return members
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .filter((member) =>
        !search ||
        [member.name, member.role, member.shortBio]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search))
      );
  }, [members, query]);

  useEffect(() => {
    function handleShortcut(event) {
      if (event.key.toLowerCase() === 'n' && !event.metaKey && !event.ctrlKey && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        openCreate();
      }
    }

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(initialForm);
    setStatus({ type: 'info', message: 'Ready to create a new team profile.' });
  }

  function openEdit(member) {
    setEditing(member);
    setForm({
      ...initialForm,
      ...member,
      socials: { ...initialForm.socials, ...(member.socials || {}) },
    });
    setStatus({ type: 'info', message: `Editing "${member.name}".` });
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'order' ? Number(value || 0) : value }));
  }

  function updateSocial(key, value) {
    setForm((current) => ({ ...current, socials: { ...current.socials, [key]: value } }));
  }

  function toggleSelection(id) {
    setSelection((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: 'info', message: editing ? 'Updating team profile...' : 'Creating team profile...' });

    const response = await fetch('/admin/api/team', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editing?.id }),
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: data.error || 'Unable to save team member.' });
      return;
    }

    if (editing) {
      setMembers((current) => current.map((item) => (item.id === editing.id ? data : item)));
    } else {
      setMembers((current) => [...current, data]);
    }

    setForm(initialForm);
    setEditing(null);
    setStatus({ type: 'success', message: 'Team member saved successfully.' });
  }

  async function remove(ids) {
    const normalizedIds = Array.isArray(ids) ? ids : [ids];
    const response = await fetch(`/admin/api/team?id=${normalizedIds.join(',')}`, { method: 'DELETE' });
    if (!response.ok) {
      setStatus({ type: 'error', message: 'Unable to delete selected team profile(s).' });
      return;
    }

    setMembers((current) => current.filter((item) => !normalizedIds.includes(item.id)));
    setSelection((current) => current.filter((item) => !normalizedIds.includes(item)));
    setStatus({ type: 'success', message: normalizedIds.length > 1 ? 'Selected team profiles deleted.' : 'Team profile deleted.' });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-4">
        <div className="surface-card p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl text-[var(--navy)]">Team members</h1>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                Manage leadership bios, profile photos, and social links with quick scanning and bulk cleanup.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={openCreate} className="btn-primary">Add member</button>
              {selection.length ? (
                <button type="button" onClick={() => remove(selection)} className="btn-danger">
                  Delete selected ({selection.length})
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="field-shell">
              <label className="field-label" htmlFor="team-search">Search team profiles</label>
              <input
                id="team-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, role, or short bio"
              />
            </div>
            <div className="rounded-full bg-[var(--sand)] px-4 py-3 text-sm text-[var(--text-muted)]">
              {filteredMembers.length} visible
            </div>
          </div>

          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Keyboard shortcut: press N to start a new profile</p>
        </div>

        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="surface-card p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selection.includes(member.id)}
                      onChange={() => toggleSelection(member.id)}
                      className="mt-2 h-5 w-5"
                    />
                    <div className="grid gap-4 md:grid-cols-[92px_1fr]">
                      <SmartImage image={member.image} alt={member.name} wrapperClassName="rounded-[1.25rem]" className="h-full w-full" aspectRatio="1 / 1" />
                      <div>
                        <h2 className="text-2xl text-[var(--navy)]">{member.name}</h2>
                        <p className="mt-1 font-semibold text-[var(--gold-dark)]">{member.role}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{member.shortBio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => openEdit(member)} className="action-chip">Edit</button>
                    <button type="button" onClick={() => remove(member.id)} className="action-chip text-rose-700">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={save} className="surface-card space-y-5 p-6">
        <div>
          <h2 className="text-2xl text-[var(--navy)]">{editing ? 'Edit team profile' : 'Create team profile'}</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Profiles show on the public leadership page and modal cards.</p>
        </div>

        {status.message ? (
          <div className={status.type === 'success' ? 'feedback-success' : status.type === 'error' ? 'feedback-error' : 'feedback-info'}>
            {status.message}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="field-shell">
            <label className="field-label">Full name</label>
            <input name="name" value={form.name} onChange={updateField} placeholder="Full name" />
          </div>
          <div className="field-shell">
            <label className="field-label">Role or title</label>
            <input name="role" value={form.role} onChange={updateField} placeholder="Role or title" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Short card bio</label>
            <input name="shortBio" value={form.shortBio} onChange={updateField} placeholder="Short card bio" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Full profile bio</label>
            <textarea name="bio" value={form.bio} onChange={updateField} placeholder="Full profile bio" />
          </div>
          <div className="field-shell">
            <label className="field-label">Display order</label>
            <input type="number" name="order" value={form.order} onChange={updateField} placeholder="Display order" />
          </div>
        </div>

        <ImageField value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} />

        <div className="grid gap-4 md:grid-cols-2">
          {['linkedin', 'x', 'instagram', 'facebook', 'tiktok'].map((social) => (
            <div key={social} className="field-shell">
              <label className="field-label">{social} URL</label>
              <input
                value={form.socials[social]}
                onChange={(event) => updateSocial(social, event.target.value)}
                placeholder={`${social} URL`}
              />
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="btn-secondary w-full">
          {saving ? 'Saving...' : editing ? 'Update profile' : 'Create profile'}
        </button>
      </form>
    </div>
  );
}
