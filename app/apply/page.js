import { getPrograms } from '@/lib/content-store';
import ApplicationWizard from '@/components/site/ApplicationWizard';
import Reveal from '@/components/site/Reveal';

export const metadata = {
  title: 'Apply',
};

export default async function ApplyPage() {
  const programs = await getPrograms();

  return (
    <div className="section-shell">
      <div className="site-container grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
        <Reveal className="surface-card xl:sticky xl:top-28 overflow-hidden bg-[linear-gradient(160deg,#0d1f3c_0%,#173468_100%)] p-8 text-white shadow-2xl">
          <p className="section-tag text-[var(--gold-light)]">Application Flow</p>
          <h1 className="mt-4 text-5xl text-white">Start your Ignite360 journey.</h1>
          <p className="mt-5 text-lg leading-8 text-white/74">
            The form is broken into smaller steps to reduce typing fatigue, avoid preventable errors, and make the
            process easier on mobile.
          </p>
          <div className="mt-8 space-y-4">
            {[
              ['Short form', 'Only the information needed for the first review round.'],
              ['Auto-save', 'Your draft stays in the browser if you pause and return later.'],
              ['Clear review step', 'Confirm everything before submitting to reduce mistakes.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-7 text-white/72">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--gold-light)]">Available programmes</p>
            <p className="mt-2 text-3xl font-semibold text-white">{programs.length}</p>
          </div>
        </Reveal>
        <ApplicationWizard programs={programs} />
      </div>
    </div>
  );
}
