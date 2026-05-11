'use client';

export default function ServeSection() {
  const audiences = [
    {
      icon: 'YP',
      title: 'Young Professionals',
      description: 'Early-career individuals seeking structured pathways to leadership and sector expertise.',
    },
    {
      icon: 'NGO',
      title: 'NGO & Civil Society',
      description: 'Organisations looking to upskill their teams and strengthen programme delivery capacity.',
    },
    {
      icon: 'CL',
      title: 'Community Leaders',
      description: 'Grassroots champions ready to amplify their impact with new tools and networks.',
    },
  ];

  return (
    <section className="section bg-[var(--offwhite)]">
      <div className="container">
        <div className="mb-12 text-center md:mb-16">
          <div className="section-tag justify-center">Who We Serve</div>
          <h2 className="section-head mx-auto mb-4 max-w-3xl">Built for Changemakers</h2>
          <p className="section-sub mx-auto max-w-2xl">
            Our programmes are designed for individuals and organisations ready to step into their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {audiences.map((audience) => (
            <div key={audience.title} className="card card-hover group">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--navy)] text-sm font-semibold tracking-[0.18em] text-white transition-colors group-hover:bg-[var(--gold)] md:h-20 md:w-20">
                {audience.icon}
              </div>

              <h3 className="mb-3 font-serif text-lg font-bold text-[var(--navy)] md:text-xl">
                {audience.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-16">
          <p className="mb-6 text-[var(--text-muted)]">
            Not sure if you&apos;re a good fit? Let&apos;s talk.
          </p>
          <a href="#contact" className="btn-outline text-sm md:text-base">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
