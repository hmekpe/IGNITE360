import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_PATH = path.join(process.cwd(), 'data', 'admin.json');
const DEFAULT_EMAIL = 'admin@ignite360.org';

async function ensureAdminFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    // If no password provided, create with a temporary one
    const passwordHash = await bcrypt.hash('ChangeMe@123', 10);
    await fs.writeFile(
      DATA_PATH,
      JSON.stringify(
        {
          email: process.env.ADMIN_EMAIL || DEFAULT_EMAIL,
          passwordHash,
          updatedAt: new Date().toISOString(),
          isFirstLogin: true,
        },
        null,
        2
      ),
      'utf8'
    );
  }
}

export async function getAdminCredentials() {
  await ensureAdminFile();
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);

  return {
    email: data.email || process.env.ADMIN_EMAIL || DEFAULT_EMAIL,
    passwordHash: data.passwordHash,
    updatedAt: data.updatedAt || null,
    isFirstLogin: data.isFirstLogin || false,
  };
}

export async function updateAdminPassword(password) {
  await ensureAdminFile();
  const current = await getAdminCredentials();
  const passwordHash = await bcrypt.hash(password, 10);

  const next = {
    email: current.email,
    passwordHash,
    updatedAt: new Date().toISOString(),
    isFirstLogin: false,
  };

  await fs.writeFile(DATA_PATH, JSON.stringify(next, null, 2), 'utf8');
  return { email: next.email, updatedAt: next.updatedAt };
}

export function getDefaultAdminEmail() {
  return process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
}
