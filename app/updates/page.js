import { getPosts } from '@/lib/content-store';
import UpdatesFeed from '@/components/site/UpdatesFeed';
import Reveal from '@/components/site/Reveal';

export const metadata = {
  title: 'Updates',
};

export default async function UpdatesPage() {
  const posts = await getPosts();

  return (
    <div className="section-shell">
      <div className="site-container">
        <Reveal className="rounded-[2.2rem] bg-white p-8 shadow-sm md:p-10">
          <p className="section-tag">Activities and Updates</p>
          <h1 className="section-head max-w-4xl">News, trainings, announcements, and moments from the field.</h1>
          <p className="section-sub max-w-3xl">
            This feed is powered by the admin dashboard, so Ignite360 can keep its community informed with
            fresh programme stories, event recaps, and calls for participation.
          </p>
        </Reveal>
        <UpdatesFeed posts={posts} />
      </div>
    </div>
  );
}
