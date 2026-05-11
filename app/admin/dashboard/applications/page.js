import ApplicationManager from '@/components/admin/ApplicationManager';
import { getApplications } from '@/lib/content-store';

export default async function AdminApplicationsPage() {
  const applications = await getApplications();
  return <ApplicationManager initialApplications={applications} />;
}
