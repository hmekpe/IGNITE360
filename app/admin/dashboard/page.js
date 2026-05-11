import Link from 'next/link';
import { getDashboardSummary } from '@/lib/content-store';

const metricDescriptions = {
  Posts: 'Published stories and draft updates',
  Programs: 'Live and archived programme entries',
  'Team members': 'Profiles shown on the public site',
  Applications: 'Submissions waiting for follow-up',
};

export default async function AdminDashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="section-tag">Overview</p>
            <h1 className="mt-3 text-4xl text-[var(--navy)]">Dashboard snapshot</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
              Review the most important signals first, then jump directly into the area you want to update. This
              keeps the workflow recognition-based instead of memory-based.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href="/admin/dashboard/posts" className="action-chip">Add post</Link>
            <Link href="/admin/dashboard/programs" className="action-chip">Add program</Link>
            <Link href="/admin/dashboard/team" className="action-chip">Add team member</Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Posts', summary.posts],
          ['Programs', summary.programs],
          ['Team members', summary.team],
          ['Applications', summary.applications],
        ].map(([label, value]) => (
          <div key={label} className="surface-card p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-dark)]">{label}</p>
            <p className="mt-4 font-serif text-5xl text-[var(--navy)]">{value}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{metricDescriptions[label]}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl text-[var(--navy)]">Recent applications</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Newest interest first so follow-up stays fast.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge">{summary.applications} total</span>
              <Link href="/admin/dashboard/applications" className="action-chip">Open applications</Link>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {summary.recentApplications.length ? (
              summary.recentApplications.map((application) => (
                <div key={application.id} className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--sand)] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-semibold text-[var(--navy)]">{application.name}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {application.email} &bull; {application.phone}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--gold-dark)]">
                        {application.organization || 'Independent applicant'}
                      </p>
                    </div>
                    <span className="badge">{application.courseSelection}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[var(--gold-dark)]">
                    <span className="rounded-full bg-white px-3 py-1">Status: {application.status}</span>
                    <span className="rounded-full bg-white px-3 py-1">
                      Submitted: {new Date(application.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-muted)]">No applications submitted yet.</p>
            )}
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="text-2xl text-[var(--navy)]">Operator shortcuts</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-muted)]">
            <div className="rounded-[1.2rem] bg-[var(--sand)] p-4">
              <p className="font-semibold text-[var(--navy)]">Press <span className="badge bg-white">N</span> in content screens</p>
              <p className="mt-2">Starts a new record so you do not need to move to the form manually.</p>
            </div>
            <div className="rounded-[1.2rem] bg-[var(--sand)] p-4">
              <p className="font-semibold text-[var(--navy)]">Use bulk select for cleanup</p>
              <p className="mt-2">Posts, programs, and team screens now support multi-select actions for faster maintenance.</p>
            </div>
            <div className="rounded-[1.2rem] bg-[var(--sand)] p-4">
              <p className="font-semibold text-[var(--navy)]">Image preview is now interactive</p>
              <p className="mt-2">Set crop mode, aspect ratio, and focal point directly inside the form before publishing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
