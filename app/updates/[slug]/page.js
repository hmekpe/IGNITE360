import { notFound } from 'next/navigation';
import SmartImage from '@/components/ui/SmartImage';
import { getPostBySlug } from '@/lib/content-store';

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post ? post.title : 'Update',
  };
}

export default async function UpdateDetailPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="section-shell">
      <article className="site-container max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
        <span className="badge">{post.category}</span>
        <h1 className="mt-5 text-5xl text-[var(--navy)]">{post.title}</h1>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
          <span>{post.author}</span>
          <span>&bull;</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        {post.image ? (
          <SmartImage image={post.image} alt={post.title} wrapperClassName="mt-8 rounded-[1.75rem]" className="h-full w-full" aspectRatio="16 / 9" />
        ) : null}
        <p className="mt-8 text-lg leading-8 text-[var(--text-muted)]">{post.excerpt}</p>
        <div className="mt-8 text-base leading-8 text-[var(--text)]">{post.content}</div>
        {post.videoUrl ? (
          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
            <iframe
              src={post.videoUrl}
              title={post.title}
              className="h-[360px] w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </article>
    </div>
  );
}
