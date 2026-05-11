'use client';

import { useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';

export default function TeamGrid({ members }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {members.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setActive(member)}
            className="overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <SmartImage image={member.image} alt={member.name} wrapperClassName="rounded-none" className="h-full w-full" aspectRatio="4 / 4.2" />
            <div className="p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-dark)]">{member.role}</p>
              <h3 className="mt-2 text-2xl text-[var(--navy)]">{member.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{member.shortBio}</p>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(9,18,36,0.72)] p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-tag">Leadership Profile</p>
                <h3 className="text-3xl text-[var(--navy)]">{active.name}</h3>
                <p className="mt-2 text-lg text-[var(--gold-dark)]">{active.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="action-chip"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-6">
              <SmartImage image={active.image} alt={active.name} wrapperClassName="rounded-[1.5rem]" className="h-full w-full mx-auto max-w-md" aspectRatio="4 / 5" />
              <div>
                <p className="text-base leading-8 text-[var(--text-muted)]">{active.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  {Object.entries(active.socials || {})
                    .filter(([, href]) => href)
                    .map(([key, href]) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="action-chip"
                      >
                        {key}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
