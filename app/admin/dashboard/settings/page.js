import AdminPasswordPanel from '@/components/admin/AdminPasswordPanel';
import { getAdminEmail } from '@/lib/admin-auth';

export default async function AdminSettingsPage() {
  const email = await getAdminEmail();
  return <AdminPasswordPanel email={email} />;
}
