import { getTeam } from '@/lib/content-store';
import TeamManager from '@/components/admin/TeamManager';

export default async function AdminTeamPage() {
  const team = await getTeam();
  return <TeamManager initialTeam={team} />;
}
