import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';

export default function UpdatesFeed({ posts }) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          {post.image ? (
            <SmartImage image={post.image} alt={post.title} wrapperClassName="rounded-none" className="h-full w-full" aspectRatio="16 / 10" />
          ) : null}
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="badge">{post.category}</span>
              <span className="text-sm text-[var(--text-muted)]">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <h3 className="text-2xl text-[var(--navy)]">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{post.excerpt}</p>
            </div>
            <Link href={`/updates/${post.slug}`} className="inline-flex text-sm font-semibold text-[var(--gold-dark)]">
              Read update
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
