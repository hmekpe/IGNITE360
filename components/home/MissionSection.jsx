'use client';

export default function MissionSection() {
  const pillars = [
    {
      title: 'Holistic Development',
      description: '360-degree growth across mindset, skills, character, and community impact.',
      icon: 'Time',
    },
    {
      title: 'Community-Centred',
      description: 'Rooted in local realities and connected to global opportunities.',
      icon: 'People',
    },
    {
      title: 'Measurable Impact',
      description: 'Data-informed programmes that track real-world outcomes.',
      icon: 'Impact',
    },
  ];

  return (
    <section id="mission" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="relative overflow-hidden rounded-lg bg-[var(--navy)] p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)] to-transparent opacity-10" />
            <div className="relative z-10 space-y-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-light)]">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">{pillar.title}</h4>
                    <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-tag">Our Mission</div>
            <h2 className="section-head mb-6">Lighting the Path to Purposeful Leadership</h2>
            <p className="section-sub mb-8">
              We believe every person deserves access to knowledge, mentorship, and opportunity regardless of
              their starting point. Ignite360 closes that gap through cohort-based learning, mentorship, and
              practical skills training.
            </p>

            <div className="rounded-r-lg border-l-4 border-[var(--gold)] bg-[var(--sand)] p-6">
              <p className="font-serif text-lg italic text-[var(--navy-mid)] md:text-xl">
                We do not just train individuals. We ignite movements.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a href="#programs" className="btn-primary text-sm md:text-base">
                Explore Programs
              </a>
              <a href="#contact" className="btn-outline text-sm md:text-base">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
