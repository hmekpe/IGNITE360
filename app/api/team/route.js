import { getTeam } from '@/lib/content-store';

export async function GET() {
  const team = await getTeam();
  return Response.json(team);
}
