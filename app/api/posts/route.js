import { getPosts } from '@/lib/content-store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get('includeDrafts') === 'true';
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let posts = await getPosts({ includeDrafts });

  if (category && category !== 'All') {
    posts = posts.filter((item) => item.category === category);
  }

  if (search) {
    posts = posts.filter((item) =>
      [item.title, item.excerpt, item.content, item.category].some((value) =>
        value?.toLowerCase().includes(search)
      )
    );
  }

  return Response.json(posts);
}
