'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';

const ALL = 'All';

export default function ProgramsExplorer({ programs, compact = false }) {
  const categories = useMemo(
    () => [ALL, ...new Set(programs.map((item) => item.category).filter(Boolean))],
    [programs]
  );
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [query, setQuery] = useState('');
  const [activeProgram, setActiveProgram] = useState(null);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory = selectedCategory === ALL || program.category === selectedCategory;
      const search = query.toLowerCase();
      const matchesSearch =
        !search ||
        [program.title, program.summary, program.description, program.location, program.format]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search));
      return matchesCategory && matchesSearch;
    });
  }, [programs, query, selectedCategory]);

  return (
    <div className="mt-10 space-y-6">
      <div className="surface-card p-5 md:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="field-shell">
              <label className="field-label" htmlFor="program-search">Search programmes</label>
              <input
                id="program-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by skill, format, or location"
                className="w-full"
              />
            </div>
            <div className="field-shell lg:min-w-[240px]">
              <label className="field-label" htmlFor="program-category">Category</label>
              <select id="program-category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-[var(--sand)] px-4 py-3 text-sm text-[var(--text-muted)]">
              Showing <span className="font-semibold text-[var(--navy)]">{filteredPrograms.length}</span> programme{filteredPrograms.length === 1 ? '' : 's'}
            </div>
            {(query || selectedCategory !== ALL) ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory(ALL);
                }}
                className="action-chip"
              >
                Reset filters
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {filteredPrograms.length ? (
        <div className={`grid gap-6 ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {filteredPrograms.map((program) => (
            <article
              key={program.id}
              className="group overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-[rgba(201,168,76,0.3)]"
            >
              <SmartImage
                image={program.image}
                alt={program.title}
                wrapperClassName="rounded-none"
                className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                aspectRatio="16 / 10"
              />
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="badge">{program.category}</span>
                  <span className="text-xs text-[var(--text-muted)] font-medium">{program.duration}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--navy)] leading-tight">{program.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{program.summary}</p>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveProgram(program)}
                    className="text-sm font-semibold text-[var(--gold-dark)]"
                  >
                    Quick view
                  </button>
                  <Link href={`/programs/${program.slug}`} className="text-sm font-semibold text-[var(--navy)]">
                    Full details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center">
          <h3 className="text-2xl text-[var(--navy)]">No programmes match these filters.</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            Clear the search or switch back to all categories to see the full catalogue.
          </p>
          <button type="button" onClick={() => {
            setQuery('');
            setSelectedCategory(ALL);
          }} className="btn-secondary mt-6">
            Show all programmes
          </button>
        </div>
      )}

      {activeProgram ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(9,18,36,0.72)] p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-6 md:p-8">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="badge">{activeProgram.category}</span>
                    <h3 className="mt-4 text-3xl text-[var(--navy)] break-words">{activeProgram.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProgram(null)}
                    className="action-chip sm:shrink-0"
                  >
                    Close
                  </button>
                </div>
                <SmartImage
                  image={activeProgram.image}
                  alt={activeProgram.title}
                  wrapperClassName="rounded-[1.5rem]"
                  className="h-full w-full"
                  aspectRatio="4 / 3"
                />
              </div>

              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="info-card">
                    <p className="info-label">Duration</p>
                    <p>{activeProgram.duration}</p>
                  </div>
                  <div className="info-card">
                    <p className="info-label">Format</p>
                    <p>{activeProgram.format}</p>
                  </div>
                  <div className="info-card">
                    <p className="info-label">Location</p>
                    <p>{activeProgram.location}</p>
                  </div>
                </div>
                <p className="text-base leading-8 text-[var(--text-muted)]">{activeProgram.description}</p>
                <div className="rounded-[1.4rem] bg-[var(--sand)] p-5">
                  <p className="font-semibold text-[var(--navy)]">What participants gain</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                    {activeProgram.outcomes?.map((outcome) => (
                      <li key={outcome}>&bull; {outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/apply" className="btn-primary">
                    Apply now
                  </Link>
                  <Link href={`/programs/${activeProgram.slug}`} className="btn-secondary">
                    Open programme page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
