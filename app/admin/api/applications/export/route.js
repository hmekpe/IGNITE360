import { getAdminSession } from '@/lib/admin-auth';
import { getApplications } from '@/lib/content-store';
import { createApplicationsPdf } from '@/lib/pdf';

function sanitizeFileName(value) {
  return String(value || 'application')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const applications = await getApplications();
  const selected = id ? applications.filter((item) => item.id === id) : applications;

  if (!selected.length) {
    return Response.json({ error: 'Application not found.' }, { status: 404 });
  }

  const pdf = createApplicationsPdf(selected);
  const fileName = id
    ? `ignite360-${sanitizeFileName(selected[0].name)}-application.pdf`
    : `ignite360-applications-${new Date().toISOString().slice(0, 10)}.pdf`;

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': String(pdf.length),
    },
  });
}
