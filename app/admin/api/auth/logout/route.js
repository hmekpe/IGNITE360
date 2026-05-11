import { cookies } from 'next/headers';
import { getAdminCookieName } from '@/lib/admin-auth';

export async function POST() {
  cookies().set(getAdminCookieName(), '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return Response.json({ success: true });
}
