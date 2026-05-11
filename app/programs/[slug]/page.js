import Link from 'next/link';
import { notFound } from 'next/navigation';
import SmartImage from '@/components/ui/SmartImage';
import { getProgramBySlug } from '@/lib/content-store';

export async function generateMetadata({ params }) {
  const program = await getProgramBySlug(params.slug);
  return {
    title: program ? program.title : 'Programme',
  };
}

export default async function ProgramDetailPage({ params }) {
  const program = await getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="section-shell">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <span className="badge">{program.category}</span>
              <h1 className="mt-5 text-5xl text-[var(--navy)]">{program.title}</h1>
              <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">{program.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="info-card"><p className="info-label">Duration</p><p>{program.duration}</p></div>
              <div className="info-card"><p className="info-label">Format</p><p>{program.format}</p></div>
              <div className="info-card"><p className="info-label">Location</p><p>{program.location}</p></div>
            </div>
            <div className="surface-card p-8">
              <p className="section-tag">Participant Outcomes</p>
              <ul className="mt-5 space-y-3 text-base leading-8 text-[var(--text-muted)]">
                {program.outcomes?.map((outcome) => (
                  <li key={outcome}>&bull; {outcome}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary">Apply for this program</Link>
              <Link href="/programs" className="btn-secondary">Back to programs</Link>
            </div>
          </div>

          <div className="surface-card p-5">
            <SmartImage image={program.image} alt={program.title} wrapperClassName="rounded-[1.6rem]" className="h-full w-full" aspectRatio="4 / 4.1" />
            <div className="mt-5 rounded-[1.5rem] bg-[var(--sand)] p-5">
              <p className="font-semibold text-[var(--navy)]">Programme summary</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{program.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
