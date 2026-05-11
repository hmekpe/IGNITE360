'use client';

import { useEffect, useMemo, useState } from 'react';
import ImageField from '@/components/admin/ImageField';

const initialForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  videoUrl: '',
  category: 'Updates',
  author: 'Ignite360 Team',
  published: true,
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
};

function createSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

export default function PostManager({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState([]);

  const filteredPosts = useMemo(() => {
    const search = query.toLowerCase();
    return posts.filter((post) =>
      !search ||
      [post.title, post.excerpt, post.category, post.author]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search))
    );
  }, [posts, query]);

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
    setStatus({ type: 'info', message: 'Ready to create a new post.' });
  }

  function openEdit(post) {
    setEditing(post);
    setForm({
      ...initialForm,
      ...post,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : initialForm.publishedAt,
    });
    setStatus({ type: 'info', message: `Editing "${post.title}".` });
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
    setStatus({ type: 'info', message: editing ? 'Updating post...' : 'Creating post...' });

    const method = editing ? 'PUT' : 'POST';
    const payload = {
      ...form,
      id: editing?.id,
      slug: form.slug || createSlug(form.title),
      publishedAt: new Date(form.publishedAt).toISOString(),
    };

    const response = await fetch('/admin/api/posts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: data.error || 'Unable to save post.' });
      return;
    }

    if (editing) {
      setPosts((current) => current.map((item) => (item.id === editing.id ? data : item)));
    } else {
      setPosts((current) => [data, ...current]);
    }

    setForm(initialForm);
    setEditing(null);
    setStatus({ type: 'success', message: 'Post saved successfully.' });
  }

  async function remove(ids) {
    const normalizedIds = Array.isArray(ids) ? ids : [ids];
    const response = await fetch(`/admin/api/posts?id=${normalizedIds.join(',')}`, { method: 'DELETE' });
    if (!response.ok) {
      setStatus({ type: 'error', message: 'Unable to delete selected post(s).' });
      return;
    }

    setPosts((current) => current.filter((item) => !normalizedIds.includes(item.id)));
    setSelection((current) => current.filter((item) => !normalizedIds.includes(item)));
    setStatus({ type: 'success', message: normalizedIds.length > 1 ? 'Selected posts deleted.' : 'Post deleted.' });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-4">
        <div className="surface-card p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl text-[var(--navy)]">Posts and updates</h1>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                Shorten publishing time with search, bulk actions, and a single form that supports both creating and editing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={openCreate} className="btn-primary">New post</button>
              {selection.length ? (
                <button type="button" onClick={() => remove(selection)} className="btn-danger">
                  Delete selected ({selection.length})
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="field-shell">
              <label className="field-label" htmlFor="post-search">Search posts</label>
              <input
                id="post-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, category, author, or summary"
              />
            </div>
            <div className="rounded-full bg-[var(--sand)] px-4 py-3 text-sm text-[var(--text-muted)]">
              {filteredPosts.length} visible
            </div>
          </div>

          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Keyboard shortcut: press N to start a new post</p>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="surface-card p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selection.includes(post.id)}
                      onChange={() => toggleSelection(post.id)}
                      className="mt-2 h-5 w-5"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge">{post.category}</span>
                        {post.featured ? <span className="badge">Featured</span> : null}
                        <span className={`badge ${post.published ? '' : 'bg-[rgba(21,35,63,0.08)] text-[var(--text-muted)]'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <h2 className="mt-3 text-2xl text-[var(--navy)]">{post.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => openEdit(post)} className="action-chip">Edit</button>
                    <button type="button" onClick={() => remove(post.id)} className="action-chip text-rose-700">Delete</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 border-t border-[var(--border)] pt-4 text-sm text-[var(--text-muted)]">
                  <span>Author: <strong className="text-[var(--navy)]">{post.author}</strong></span>
                  <span>Date: <strong className="text-[var(--navy)]">{new Date(post.publishedAt).toLocaleDateString()}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={save} className="surface-card space-y-5 p-6">
        <div>
          <h2 className="text-2xl text-[var(--navy)]">{editing ? 'Edit post' : 'Create post'}</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Changes appear across the updates feed and gallery.</p>
        </div>

        {status.message ? (
          <div className={status.type === 'success' ? 'feedback-success' : status.type === 'error' ? 'feedback-error' : 'feedback-info'}>
            {status.message}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="field-shell md:col-span-2">
            <label className="field-label">Title</label>
            <input name="title" value={form.title} onChange={updateField} placeholder="Post title" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Slug</label>
            <input name="slug" value={form.slug} onChange={updateField} placeholder="post-slug" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Short summary</label>
            <textarea name="excerpt" value={form.excerpt} onChange={updateField} placeholder="Short summary that appears in cards" />
          </div>
          <div className="field-shell md:col-span-2">
            <label className="field-label">Full content</label>
            <textarea name="content" value={form.content} onChange={updateField} placeholder="Full post content" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="field-shell">
            <label className="field-label">Category</label>
            <select name="category" value={form.category} onChange={updateField}>
              {['Announcements', 'Events', 'Trainings', 'Updates', 'General'].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="field-shell">
            <label className="field-label">Publish date</label>
            <input type="date" name="publishedAt" value={form.publishedAt} onChange={updateField} />
          </div>
          <div className="field-shell">
            <label className="field-label">Author</label>
            <input name="author" value={form.author} onChange={updateField} placeholder="Author" />
          </div>
          <div className="field-shell">
            <label className="field-label">Video embed URL</label>
            <input name="videoUrl" value={form.videoUrl} onChange={updateField} placeholder="Optional YouTube embed URL" />
          </div>
        </div>

        <ImageField value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} />

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl bg-[var(--sand)] p-4 text-sm font-semibold text-[var(--navy)]">
            <input type="checkbox" name="published" checked={form.published} onChange={updateField} />
            Published
          </label>
          <label className="flex items-center gap-3 rounded-2xl bg-[var(--sand)] p-4 text-sm font-semibold text-[var(--navy)]">
            <input type="checkbox" name="featured" checked={form.featured} onChange={updateField} />
            Featured
          </label>
        </div>

        <button type="submit" disabled={saving} className="btn-secondary w-full">
          {saving ? 'Saving...' : editing ? 'Update post' : 'Create post'}
        </button>
      </form>
    </div>
  );
}
