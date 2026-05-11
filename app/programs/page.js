import { getPrograms } from '@/lib/content-store';
import ProgramsExplorer from '@/components/site/ProgramsExplorer';
import Reveal from '@/components/site/Reveal';

export const metadata = {
  title: 'Programs',
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="section-shell">
      <div className="site-container">
        <Reveal className="rounded-[2.2rem] bg-white p-8 shadow-sm md:p-10">
          <p className="section-tag">Programs</p>
          <h1 className="section-head max-w-4xl">
            Skills development, leadership, mentorship, and career growth in one platform.
          </h1>
          <p className="section-sub max-w-3xl">
            Filter by category, search by topic, and open programme quick views without losing your place.
            The catalogue is content-driven, so Ignite360 can keep adding and updating offerings from the admin dashboard.
          </p>
        </Reveal>
        <ProgramsExplorer programs={programs} />
      </div>
    </div>
  );
}
