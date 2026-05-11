'use client';

import Card from '../ui/Card';
import SmartImage from '@/components/ui/SmartImage';

export default function PostCard({ post }) {
  return (
    <Card>
      {post.image && (
        <SmartImage
          image={post.image}
          alt={post.title}
          wrapperClassName="overflow-hidden rounded-lg mb-4"
          className="h-full w-full"
          aspectRatio="16 / 9"
        />
      )}
      <div className="mb-3">
        <span className="badge text-xs">{post.category || 'General'}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 mb-2 text-sm">By {post.author || 'Ignite360'} • {new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <a href={`/updates/${post.slug}`} className="text-[var(--gold-dark)] hover:text-[var(--gold)] font-semibold">
        Read More →
      </a>
    </Card>
  );
}
