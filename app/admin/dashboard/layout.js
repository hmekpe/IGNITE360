import { requireAdminSession } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminDashboardLayout({ children }) {
  await requireAdminSession();

  return (
    <div className="min-h-screen bg-[var(--sand)]">
      <div className="site-container py-8">
        <div className="mb-6 rounded-[1.75rem] border border-[var(--border)] bg-white px-5 py-4 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--gold-dark)]">HCI-optimized workspace</p>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
            The dashboard is structured for fast scanning, fewer decisions per screen, and clearer feedback after every action.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          <AdminSidebar />
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
