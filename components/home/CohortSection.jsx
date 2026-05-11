'use client';

export default function CohortSection() {
  const features = [
    {
      title: 'Cohort-Based Learning',
      description: 'Move through the curriculum alongside a committed group of peers from diverse backgrounds.',
    },
    {
      title: 'Expert Facilitators',
      description: 'Sessions led by seasoned practitioners with lived experience in their fields.',
    },
    {
      title: 'Live & Recorded Sessions',
      description: 'Attend live for maximum engagement or catch up via recordings at your own pace.',
    },
    {
      title: 'Mentorship Access',
      description: 'Paired mentorship with sector leaders throughout your programme journey.',
    },
    {
      title: 'Certificate of Completion',
      description: 'Earn a recognised Ignite360 certificate upon successfully completing your cohort.',
    },
    {
      title: 'Alumni Network',
      description: 'Access to our thriving community of changemakers for ongoing support and collaboration.',
    },
  ];

  return (
    <section className="section bg-[var(--navy)] text-white">
      <div className="container">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="section-tag text-[var(--gold)] flex items-center gap-3">
            <div className="h-px w-8 bg-[var(--gold)]"></div>
            Cohort Sessions
          </div>
          <h2 className="section-head text-white mb-4">Learn Together. Grow Together.</h2>
          <p className="section-sub text-white/70 mb-8 max-w-2xl">
            Our cohort model creates powerful peer networks and accountability structures that amplify learning and long-term impact.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white/5 border border-[var(--gold)]/30 rounded-lg p-8 md:p-10 backdrop-blur">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Next Cohort Intake</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Applications are open for our upcoming multi-programme cohort. Spaces are limited to ensure quality engagement and personalized support.
            </p>

            {/* Intake Info */}
            <div className="bg-[var(--gold)]/10 border-l-4 border-[var(--gold)] p-4 md:p-6 rounded-r mb-6">
              <p className="text-white/80 text-sm mb-3">
                <strong className="text-[var(--gold)]">Application Deadline:</strong> Rolling admissions · Limited spots
              </p>
              <p className="text-white/80 text-sm">
                <strong className="text-[var(--gold)]">Format:</strong> Online · Live sessions · Weekends
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <a href="#apply" className="btn-primary w-full text-center block">
                Apply for a Cohort
              </a>
              <a href="#programs" className="btn-outline w-full text-center block border-[var(--gold)]/50 text-white hover:bg-[var(--gold)] hover:text-[var(--navy)]">
                View All Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
