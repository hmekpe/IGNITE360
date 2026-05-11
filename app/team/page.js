import { getTeam } from '@/lib/content-store';
import TeamGrid from '@/components/site/TeamGrid';
import Reveal from '@/components/site/Reveal';

export const metadata = {
  title: 'Team',
};

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <div className="section-shell">
      <div className="site-container">
        <Reveal className="rounded-[2.2rem] bg-white p-8 shadow-sm md:p-10">
          <p className="section-tag">Our Team</p>
          <h1 className="section-head max-w-4xl">Meet the people shaping Ignite360&apos;s vision and delivery.</h1>
          <p className="section-sub max-w-3xl">
            Team profiles are fully managed from the admin dashboard, including images, bios, display order,
            and social links for partnership visibility.
          </p>
        </Reveal>
        <div className="mt-10">
          <TeamGrid members={members} />
        </div>
      </div>
    </div>
  );
}
