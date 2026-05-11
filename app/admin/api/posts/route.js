import { deletePost, getPosts, savePost } from '@/lib/content-store';
import { getAdminSession } from '@/lib/admin-auth';

async function ensureAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  return Response.json(await getPosts({ includeDrafts: true }));
}

export async function POST(request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const saved = await savePost(body);
  return Response.json(saved, { status: 201 });
}

export async function PUT(request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const saved = await savePost(body);
  return Response.json(saved);
}

export async function DELETE(request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get('id') || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  await Promise.all(ids.map((id) => deletePost(id)));
  return Response.json({ success: true });
}
