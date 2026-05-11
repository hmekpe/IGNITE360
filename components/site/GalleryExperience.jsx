'use client';

import { useMemo, useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';

export default function GalleryExperience({ items }) {
  const categories = useMemo(() => ['All', ...new Set(items.map((item) => item.category))], [items]);
  const [category, setCategory] = useState('All');
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () => items.filter((item) => category === 'All' || item.category === category),
    [category, items]
  );

  return (
    <>
      <div className="surface-card p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                  category === item
                    ? 'bg-[var(--navy)] text-white'
                    : 'border border-[var(--border)] bg-white text-[var(--navy)] hover:border-[rgba(21,35,63,0.18)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            Showing <span className="font-semibold text-[var(--navy)]">{filtered.length}</span> media item{filtered.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            {item.image ? <SmartImage image={item.image} alt={item.title} wrapperClassName="rounded-none" className="h-full w-full" aspectRatio="4 / 3" /> : null}
            <div className="p-5">
              <span className="badge">{item.category}</span>
              <h2 className="mt-3 text-2xl text-[var(--navy)]">{item.title}</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(9,18,36,0.72)] p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="badge">{active.category}</span>
                <h3 className="mt-3 text-3xl text-[var(--navy)]">{active.title}</h3>
              </div>
              <button type="button" onClick={() => setActive(null)} className="action-chip">
                Close
              </button>
            </div>
            {active.videoUrl ? (
              <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-[var(--border)]">
                <iframe
                  src={active.videoUrl}
                  title={active.title}
                  className="h-[420px] w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : active.image ? (
              <SmartImage
                image={active.image}
                alt={active.title}
                wrapperClassName="mt-6 rounded-[1.6rem]"
                className="h-full w-full"
                aspectRatio="16 / 10"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
