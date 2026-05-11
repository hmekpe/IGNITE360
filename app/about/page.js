import Link from 'next/link';
import Reveal from '@/components/site/Reveal';

export const metadata = {
  title: 'About Ignite360',
};

export default function AboutPage() {
  return (
    <div className="section-shell">
      <div className="site-container">
        <Reveal className="rounded-[2.25rem] bg-[linear-gradient(155deg,#0d1f3c_0%,#173468_100%)] px-6 py-14 text-white md:px-10">
          <p className="section-tag text-[var(--gold-light)]">About</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-tight text-white md:text-6xl">
            Ignite360 exists to unlock youth potential through practical skills and purposeful support.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/74">
            We are a Ghana-based initiative building opportunities around skills development, leadership
            training, mentorship, career guidance, and personal development so young people can move toward
            self-reliance and meaningful contribution.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            ['Vision', 'To raise a generation of skilled, confident, and purpose-driven young people who contribute meaningfully to national and global development.'],
            ['Mission approach', 'We combine cohort learning, mentoring, and practical guidance to reduce youth unemployment and expand entrepreneurial thinking.'],
            ['Partnership mindset', 'Ignite360 welcomes collaboration from corporate organisations, individuals, and institutions committed to youth development.'],
          ].map(([title, text]) => (
            <Reveal key={title} className="admin-card">
              <h2 className="text-2xl text-[var(--navy)]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
          <p className="section-tag">Core Areas</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {['Vocational skills', 'Digital skills', 'Leadership training', 'Mentorship', 'Career guidance'].map((item) => (
              <div key={item} className="rounded-[1.5rem] bg-[var(--sand)] p-5 text-center font-semibold text-[var(--navy)]">
                {item}
              </div>
            ))}
          </div>
          <Link href="/apply" className="btn-primary mt-8">
            Join the next cohort
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
