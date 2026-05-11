import { getAdminSession } from '@/lib/admin-auth';
import { changeAdminPassword } from '@/lib/admin-auth';

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.currentPassword || !body.newPassword || !body.confirmPassword) {
      return Response.json({ error: 'Please complete all password fields.' }, { status: 400 });
    }

    if (body.newPassword !== body.confirmPassword) {
      return Response.json({ error: 'New password and confirmation do not match.' }, { status: 400 });
    }

    const result = await changeAdminPassword(body.currentPassword, body.newPassword);
    return Response.json({
      success: true,
      email: result.email,
      updatedAt: result.updatedAt,
    });
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to update password.' }, { status: 400 });
  }
}
