import { getPrograms } from '@/lib/content-store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get('includeInactive') === 'true';
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let programs = await getPrograms({ includeInactive });

  if (category && category !== 'All') {
    programs = programs.filter((item) => item.category === category);
  }

  if (search) {
    programs = programs.filter((item) =>
      [item.title, item.summary, item.description, item.category].some((value) =>
        value?.toLowerCase().includes(search)
      )
    );
  }

  return Response.json(programs);
}
