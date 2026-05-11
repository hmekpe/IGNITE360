import Link from 'next/link';
import { getPosts, getPrograms, getTeam } from '@/lib/content-store';
import { socialLinks } from '@/lib/seed-content';
import ProgramsExplorer from '@/components/site/ProgramsExplorer';
import UpdatesFeed from '@/components/site/UpdatesFeed';
import TeamGrid from '@/components/site/TeamGrid';
import Reveal from '@/components/site/Reveal';

export default async function HomePage() {
  const [programs, posts, team] = await Promise.all([
    getPrograms(),
    getPosts(),
    getTeam(),
  ]);

  const featuredPrograms = programs.filter((item) => item.featured).slice(0, 6);
  const featuredPosts = posts.slice(0, 3);
  const featuredTeam = team.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.22),transparent_42%)]" />
        <div className="site-container relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="section-tag">Ignite360 Ghana</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] text-white md:text-6xl">
              Raising skilled, confident, and purpose-driven young people.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Ignite360 is a youth empowerment initiative focused on vocational and digital skills,
              leadership training, mentorship, career guidance, and personal development for the next
              generation of changemakers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary">
                Apply for a Program
              </Link>
              <Link href="/programs" className="btn-outline text-white hover:text-[var(--navy)]">
                Explore Programs
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ['6+', 'Active programmes'],
                ['500+', 'Young people reached'],
                ['1 mission', 'Youth self-reliance'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="font-serif text-3xl text-[var(--gold-light)]">{value}</p>
                  <p className="mt-2 text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="grid gap-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold-light)]">Vision</p>
              <p className="mt-4 text-2xl font-medium leading-9 text-white">
                To raise a generation of skilled, confident, and purpose-driven young people who contribute
                meaningfully to national and global development.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Skills development', 'Vocational and digital learning pathways that map to real opportunities.'],
                ['Mentorship and leadership', 'Support systems that help young people build confidence and direction.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.75rem] border border-white/10 bg-[#13284e] p-5">
                  <h2 className="text-xl text-white">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="panel-dark">
            <p className="section-tag">Our Focus</p>
            <div className="space-y-5">
              {[
                ['Reduce youth unemployment', 'Practical, market-relevant training for self-reliance and entrepreneurship.'],
                ['Strengthen confidence', 'Personal growth and leadership formation that equips young people to act.'],
                ['Create visible impact', 'Programmes shaped around communities, collaboration, and measurable outcomes.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className="section-tag">About Ignite360</p>
            <h2 className="section-head max-w-2xl">A dynamic NGO platform built for action, visibility, and growth.</h2>
            <p className="section-sub">
              Ignite360 is founded on the belief that empowering young people is a strategic pathway to national
              development. The platform now supports continuous content publishing, team storytelling, gallery
              updates, and a fast multi-step application journey that reduces friction for first-time applicants.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Leadership development',
                'Career guidance',
                'Vocational and digital skills',
                'Mentorship and personal development',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                  <p className="font-medium text-[var(--navy)]">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="programs" className="section-shell bg-white">
        <div className="site-container">
          <Reveal className="section-heading-row">
            <div>
              <p className="section-tag">Programs</p>
              <h2 className="section-head">Explore programmes that turn potential into progress.</h2>
            </div>
            <p className="section-sub max-w-xl">
              Search, filter, and preview courses instantly. Every card opens a quick-view modal, and each
              programme also has a dedicated detail page for deeper exploration.
            </p>
          </Reveal>
          <ProgramsExplorer programs={featuredPrograms} compact={false} />
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="section-tag">Apply Smarter</p>
            <h2 className="section-head">A shorter cohort application flow with saved progress.</h2>
            <p className="section-sub">
              Applicants move through a guided multi-step form with a clear progress indicator, saved local
              progress, and only the fields Ignite360 actually needs to start the review.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Step 1: Personal details',
                'Step 2: Programme selection',
                'Step 3: Motivation and final review',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy)]">
                    &bull;
                  </span>
                  <span className="font-medium text-[var(--navy)]">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/apply" className="btn-secondary mt-8">
              Start an Application
            </Link>
          </Reveal>

          <Reveal className="rounded-[2rem] bg-[linear-gradient(160deg,#0d1f3c_0%,#173468_100%)] p-8 text-white shadow-2xl">
            <p className="section-tag">Why It Works</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Less friction', 'Focused fields make it faster to complete on mobile.'],
                ['Clear next steps', 'Applicants know exactly where they are in the process.'],
                ['Admin-ready', 'Each submission lands in the dashboard for follow-up.'],
                ['Scalable', 'The same flow works across new programmes as Ignite360 grows.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/72">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <Reveal className="section-heading-row">
            <div>
              <p className="section-tag">Activities and Updates</p>
              <h2 className="section-head">Share real impact through events, trainings, and announcements.</h2>
            </div>
            <Link href="/updates" className="text-sm font-semibold text-[var(--gold-dark)]">
              View all updates
            </Link>
          </Reveal>
          <UpdatesFeed posts={featuredPosts} />
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="section-tag">Leadership Team</p>
            <h2 className="section-head">People behind the mission.</h2>
            <p className="section-sub">
              Every team profile includes a role, photo, bio, and social links, with an expanded modal for
              richer storytelling and partner visibility.
            </p>
            <Link href="/team" className="btn-secondary mt-8">
              Meet the full team
            </Link>
          </Reveal>
          <TeamGrid members={featuredTeam} />
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <Reveal className="section-heading-row">
            <div>
              <p className="section-tag">Stay Connected</p>
              <h2 className="section-head">Real social entry points for your community.</h2>
            </div>
            <p className="section-sub max-w-lg">
              Instead of inactive icons, the site now routes people directly to Ignite360&apos;s live social channels.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {Object.values(socialLinks).map((social) => (
              <Reveal
                key={social.label}
                className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--sand)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--gold-dark)]">{social.label}</p>
                <p className="mt-3 text-xl font-semibold text-[var(--navy)]">{social.handle}</p>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--navy)] underline decoration-[var(--gold)] underline-offset-4"
                >
                  Visit channel
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
