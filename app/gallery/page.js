import { getGalleryItems } from '@/lib/content-store';
import GalleryExperience from '@/components/site/GalleryExperience';
import Reveal from '@/components/site/Reveal';

export const metadata = {
  title: 'Gallery',
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="section-shell">
      <div className="site-container">
        <Reveal className="rounded-[2.2rem] bg-white p-8 shadow-sm md:p-10">
          <p className="section-tag">Gallery and Media</p>
          <h1 className="section-head max-w-4xl">Photos and video moments organised around programmes and events.</h1>
          <p className="section-sub max-w-3xl">
            The gallery automatically surfaces media from published updates, giving Ignite360 a simple way
            to show community impact over time.
          </p>
        </Reveal>
        <div className="mt-10">
          <GalleryExperience items={items} />
        </div>
      </div>
    </div>
  );
}
