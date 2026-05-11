'use client';

export default function ImpactSection() {
  const stats = [
    { number: '500+', label: 'Programme Graduates', highlight: true },
    { number: '12', label: 'Countries Reached' },
    { number: '10+', label: 'Active Courses', highlight: true },
    { number: '95%', label: 'Satisfaction Rate', highlight: true },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="section-tag justify-center">Our Impact</div>
          <h2 className="section-head mb-4 max-w-3xl mx-auto">Numbers That Tell a Bigger Story</h2>
          <p className="section-sub max-w-2xl mx-auto">
            Every statistic represents a life changed, a leader equipped, a community strengthened.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-8 text-center rounded-lg border transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] ${
                stat.highlight
                  ? 'bg-[var(--navy)] border-[var(--gold)]/30 text-white'
                  : 'bg-[var(--offwhite)] border-[var(--border)]'
              }`}
            >
              <div className={`font-serif text-3xl md:text-5xl font-bold mb-2 ${
                stat.highlight ? 'text-[var(--gold)]' : 'text-[var(--navy)]'
              }`}>
                {stat.number}
              </div>
              <p className={`text-xs md:text-sm uppercase tracking-widest font-semibold ${
                stat.highlight ? 'text-white/70' : 'text-[var(--text-muted)]'
              }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            Want to be part of this impact?
          </p>
          <a href="#apply" className="btn-primary text-sm md:text-base">
            Join the Next Cohort
          </a>
        </div>
      </div>
    </section>
  );
}
