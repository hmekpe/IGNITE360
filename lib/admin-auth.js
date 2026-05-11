import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { getAdminCredentials, getDefaultAdminEmail, updateAdminPassword } from '@/lib/admin-store';

const COOKIE_NAME = 'ignite360_admin';
const SECRET = process.env.JWT_SECRET || 'ignite360-dev-secret';

export async function validateAdminCredentials(email, password) {
  const credentials = await getAdminCredentials();
  const emailMatches = email?.toLowerCase() === credentials.email.toLowerCase();
  const passwordMatches = await bcrypt.compare(password || '', credentials.passwordHash || '');
  return emailMatches && passwordMatches;
}

export async function getAdminEmail() {
  const credentials = await getAdminCredentials();
  return credentials.email || getDefaultAdminEmail();
}

export async function changeAdminPassword(currentPassword, nextPassword) {
  const credentials = await getAdminCredentials();
  const currentPasswordMatches = await bcrypt.compare(currentPassword || '', credentials.passwordHash || '');

  if (!currentPasswordMatches) {
    throw new Error('Current password is incorrect.');
  }

  if (!nextPassword || nextPassword.length < 8) {
    throw new Error('New password must be at least 8 characters long.');
  }

  if (currentPassword === nextPassword) {
    throw new Error('Choose a new password that is different from the current one.');
  }

  return updateAdminPassword(nextPassword);
}

export function createAdminToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}
