import { cookies } from 'next/headers';
import { createAdminToken, getAdminCookieName, getAdminEmail, validateAdminCredentials } from '@/lib/admin-auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const isValid = await validateAdminCredentials(body.email, body.password);

    if (!isValid) {
      return Response.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = createAdminToken({ email: await getAdminEmail(), role: 'admin' });
    cookies().set(getAdminCookieName(), token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to login.' }, { status: 500 });
  }
}
