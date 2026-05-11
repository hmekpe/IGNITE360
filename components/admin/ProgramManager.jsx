'use client';

import { useEffect, useMemo, useState } from 'react';
import ImageField from '@/components/admin/ImageField';

const initialForm = {
  title: '',
  slug: '',
  category: 'Leadership',
  summary: '',
  description: '',
  duration: '',
  format: '',
  location: '',
  outcomesText: '',
  image: '',
  featured: false,
  active: true,
};

function createSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

export default function ProgramManager({ initialPrograms }) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState([]);

  const filteredPrograms = useMemo(() => {
    const search = query.toLowerCase();
    return programs.filter((program) =>
      !search ||
      [program.title, program.summary, program.category, program.location]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search))
    );
  }, [programs, query]);

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
    setStatus({ type: 'info', message: 'Ready to create a new programme.' });
  }

  function openEdit(program) {
    setEditing(program);
    setForm({
      ...initialForm,
      ...program,
      outcomesText: (program.outcomes || []).join('\n'),
    });
    setStatus({ type: 'info', message: `Editing "${program.title}".` });
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
      slug: name === 'title' ? createSlug(value) : current.slug,
    }));
  }

  function toggleSelection(id) {
    setSelection((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: 'info', message: editing ? 'Updating programme...' : 'Creating programme...' });

    const payload = {
      ...form,
      id: editing?.id,
      slug: form.slug || createSlug(form.title),
      outcomes: form.outcomesText.split('\n').map((item) => item.trim()).filter(Boolean),
    };
    delete payload.outcomesText;

    const response = await fetch('/admin/api/programs', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: data.error || 'Unable to save programme.' });
      return;
    }

    if (editing) {
      setPrograms((current) => current.map((item) => (item.id === editing.id ? data : item)));
    } else {
      setPrograms((current) => [data, ...current]);
    }

    setForm(initialForm);
    setEditing(null);
    setStatus({ type: 'success', message: 'Programme saved successfully.' });
  }

  async function remove(ids) {
    const normalizedIds = Array.isArray(ids) ? ids : [ids];
    const response = await fetch(`/admin/api/programs?id=${normalizedIds.join(',')}`, { method: 'DELETE' });
    if (!response.ok) {
      setStatus({ type: 'error', message: 'Unable to delete selected programme(s).' });
      return;
    }

    setPrograms((current) => current.filter((item) => !normalizedIds.includes(item.id)));
    setSelection((current) => current.filter((item) => !normalizedIds.includes(item)));
    setStatus({ type: 'success', message: normalizedIds.length > 1 ? 'Selected programmes deleted.' : 'Programme deleted.' });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-4">
        <div className="surface-card p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl text-[var(--navy)]">Programs</h1>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                Keep the catalogue clear and current with visibility controls, faster editing, and outcome chunking.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={openCreate} className="btn-primary">New program</button>
              {selection.length ? (
                <button type="button" onClick={() => remove(selection)} className="btn-danger">
                  Delete selected ({selection.length})
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="field-shell">
              <label className="field-label" htmlFor="program-admin-search">Search programmes</label>
              <input
                id="program-admin-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, category, location, or summary"
              />
            </div>
            <div className="rounded-full bg-[var(--sand)] px-4 py-3 text-sm text-[var(--text-muted)]">
              {filteredPrograms.length} visible
            </div>
          </div>

          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Keyboard shortcut: press N to start a new programme</p>
        </div>

        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="surface-card p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selection.includes(program.id)}
                      onChange={() => toggleSelection(program.id)}
                      className="mt-2 h-5 w-5"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge">{program.category}</span>
                        {program.featured ? <span className="badge">Featured</span> : null}
                        <span className={`badge ${program.active ? '' : 'bg-[rgba(21,35,63,0.08)] text-[var(--text-muted)]'}`}>
                          {program.active ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                      <h2 className="mt-3 text-2xl text-[var(--navy)]">{program.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{program.summary}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => openEdit(program)} className="action-chip">Edit</button>
                    <button type="button" onClick={() => remove(program.id)} className="action-chip text-rose-700">Delete</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 border-t border-[var(--border)] pt-4 text-sm text-[var(--text-muted)]">
                  <span>Duration: <strong className="text-[var(--navy)]">{program.duration || 'Not set'}</strong></span>
                  <span>Format: <strong className="text-[var(--navy)]">{program.format || 'Not set'}</strong></span>
                  <span>Location: <strong className="text-[var(--navy)]">{program.location || 'Not set'}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={save} className="surface-card space-y-5 p-6">
        <div>
          <h2 className="text-2xl text-[var(--navy)]">{editing ? 'Edit program' : 'Create program'}</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Each programme feeds the public catalogue and the application form.</p>
        </div>

        {status.message ? (
          <div className={status.type === 'success' ? 'feedback-success' : status.type === 'error' ? 'feedback-error' : 'feedback-info'}>
            {status.message}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="field-shell md:col-span-2">
            <label className="field-label">Program title</label>
            <input name="title" value={form.title} onChange={updateField} placeholder="Program title" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Slug</label>
            <input name="slug" value={form.slug} onChange={updateField} placeholder="program-slug" />
          </div>
          <div className="field-shell">
            <label className="field-label">Duration</label>
            <input name="duration" value={form.duration} onChange={updateField} placeholder="8 weeks" />
          </div>
          <div className="field-shell">
            <label className="field-label">Format</label>
            <input name="format" value={form.format} onChange={updateField} placeholder="Hybrid cohort" />
          </div>
          <div className="field-shell">
            <label className="field-label">Location</label>
            <input name="location" value={form.location} onChange={updateField} placeholder="Accra + online" />
          </div>
          <div className="field-shell">
            <label className="field-label">Category</label>
            <select name="category" value={form.category} onChange={updateField}>
              {['Leadership', 'Digital Skills', 'Entrepreneurship', 'Career', 'Personal Development', 'Vocational'].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Short summary</label>
            <textarea name="summary" value={form.summary} onChange={updateField} placeholder="Short summary for cards and previews" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Detailed description</label>
            <textarea name="description" value={form.description} onChange={updateField} placeholder="Detailed description for the programme page" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Participant outcomes</label>
            <textarea name="outcomesText" value={form.outcomesText} onChange={updateField} placeholder="One outcome per line" />
          </div>
        </div>

        <ImageField value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} />

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl bg-[var(--sand)] p-4 text-sm font-semibold text-[var(--navy)]">
            <input type="checkbox" name="featured" checked={form.featured} onChange={updateField} />
            Featured on home page
          </label>
          <label className="flex items-center gap-3 rounded-2xl bg-[var(--sand)] p-4 text-sm font-semibold text-[var(--navy)]">
            <input type="checkbox" name="active" checked={form.active} onChange={updateField} />
            Visible to visitors
          </label>
        </div>

        <button type="submit" disabled={saving} className="btn-secondary w-full">
          {saving ? 'Saving...' : editing ? 'Update program' : 'Create program'}
        </button>
      </form>
    </div>
  );
}
