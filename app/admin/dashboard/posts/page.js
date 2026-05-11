import { getPosts } from '@/lib/content-store';
import PostManager from '@/components/admin/PostManager';

export default async function AdminPostsPage() {
  const posts = await getPosts({ includeDrafts: true });
  return <PostManager initialPosts={posts} />;
}
