import { updateAdminPassword, getAdminCredentials } from '@/lib/admin-store';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, newPassword, confirmPassword } = body;
    const credentials = await getAdminCredentials();

    // Only allow setup if this is first login
    if (!credentials.isFirstLogin && credentials.email !== email) {
      return Response.json({ error: 'Invalid setup attempt.' }, { status: 403 });
    }

    if (!newPassword || newPassword.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return Response.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    await updateAdminPassword(newPassword);
    return Response.json({ success: true, message: 'Password set successfully. You can now login.' });
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to set password.' }, { status: 500 });
  }
}
