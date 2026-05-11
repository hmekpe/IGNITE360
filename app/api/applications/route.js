import { getApplications, saveApplication, updateApplicationStatus } from '@/lib/content-store';
import { getAdminSession } from '@/lib/admin-auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const applications = await getApplications();
  return Response.json(applications);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.courseSelection || !body.motivation) {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    const application = await saveApplication({
      name: body.name,
      email: body.email,
      phone: body.phone,
      courseSelection: body.courseSelection,
      motivation: body.motivation,
      organization: body.organization || '',
      source: 'website',
    });

    return Response.json(application, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to submit application.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const allowedStatuses = ['pending', 'reviewed', 'approved', 'rejected'];

    if (!body.id || !allowedStatuses.includes(body.status)) {
      return Response.json({ error: 'Provide a valid application id and status.' }, { status: 400 });
    }

    const application = await updateApplicationStatus(body.id, body.status);
    if (!application) {
      return Response.json({ error: 'Application not found.' }, { status: 404 });
    }

    return Response.json(application);
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to update application.' }, { status: 500 });
  }
}
