import { getPrograms } from '@/lib/content-store';
import ProgramManager from '@/components/admin/ProgramManager';

export default async function AdminProgramsPage() {
  const programs = await getPrograms({ includeInactive: true });
  return <ProgramManager initialPrograms={programs} />;
}
