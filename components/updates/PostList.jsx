'use client';

import { useState } from 'react';
import PostCard from './PostCard';

const CATEGORIES = ['All', 'Events', 'Trainings', 'Announcements', 'Updates'];

export default function PostList({ posts }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
              ? 'bg-[var(--gold)] text-[var(--navy)]'
              : 'bg-white text-[var(--navy)] hover:bg-[var(--gold)]/10 border border-[var(--border)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[var(--text-muted)]">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}
