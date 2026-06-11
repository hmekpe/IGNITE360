'use client';

import { useMemo, useState } from 'react';

const statusOptions = ['pending', 'reviewed', 'approved', 'rejected'];

function formatDate(value) {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function ApplicationManager({ initialApplications }) {
  const [applications, setApplications] = useState(initialApplications);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(null);
  const [activeId, setActiveId] = useState('');

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return applications.filter((item) => {
      const haystack = [
        item.name,
        item.email,
        item.phone,
        item.courseSelection,
        item.organization,
        item.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [applications, query]);

  const counts = useMemo(() => {
    return statusOptions.reduce((result, item) => {
      result[item] = applications.filter((application) => application.status === item).length;
      return result;
    }, {});
  }, [applications]);

  async function handleStatusChange(id, nextStatus) {
    setActiveId(id);
    setStatus({ type: 'info', message: 'Updating application status...' });

    const response = await fetch('/api/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: nextStatus }),
    });
    const data = await response.json();
    setActiveId('');

    if (!response.ok) {
      setStatus({ type: 'error', message: data.error || 'Unable to update application status.' });
      return;
    }

    setApplications((current) => current.map((item) => (item.id === id ? data : item)));
    setStatus({ type: 'success', message: 'Application status updated.' });
  }

  const feedbackClassName = status
    ? status.type === 'success'
      ? 'feedback-success'
      : status.type === 'error'
        ? 'feedback-error'
        : 'feedback-info'
    : '';

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="section-tag">Applications desk</p>
            <h1 className="mt-3 text-4xl text-[var(--navy)]">Review submissions quickly</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
              Each record keeps the applicant details visible in the dashboard while the full essay stays available in the downloadable PDF.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/admin/api/applications/export" className="btn-secondary">
              Download all PDFs
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_repeat(4,minmax(0,1fr))]">
          <label className="field-shell">
            <span className="field-label">Search applications</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email, phone, programme, or status"
            />
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:col-span-4">
            {statusOptions.map((item) => (
              <div key={item} className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--sand)] px-4 py-3">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold-dark)]">{item}</p>
                <p className="mt-1 md:mt-2 font-serif text-2xl md:text-3xl text-[var(--navy)]">{counts[item] || 0}</p>
              </div>
            ))}
          </div>
        </div>

        {status ? <div className={`mt-5 ${feedbackClassName}`}>{status.message}</div> : null}
      </div>

      <div className="grid gap-4">
        {filteredApplications.length ? (
          filteredApplications.map((application) => (
            <div key={application.id} className="surface-card p-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                  <div>
                    <p className="info-label">Applicant</p>
                    <p className="mt-2 font-semibold text-[var(--navy)]">{application.name}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{application.email}</p>
                  </div>

                  <div>
                    <p className="info-label">Phone</p>
                    <p className="mt-2 text-sm text-[var(--navy)]">{application.phone}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--gold-dark)]">Organisation</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{application.organization || 'Not provided'}</p>
                  </div>

                  <div>
                    <p className="info-label">Programme</p>
                    <p className="mt-2 text-sm text-[var(--navy)]">{application.courseSelection}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--gold-dark)]">Submitted</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{formatDate(application.createdAt)}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 xl:min-w-[240px]">
                  <label className="field-shell">
                    <span className="field-label">Status</span>
                    <select
                      value={application.status}
                      disabled={activeId === application.id}
                      onChange={(event) => handleStatusChange(application.id, event.target.value)}
                    >
                      {statusOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>

                  <a href={`/admin/api/applications/export?id=${application.id}`} className="btn-tertiary justify-center">
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="surface-card p-6">
            <p className="text-sm text-[var(--text-muted)]">No applications matched your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
