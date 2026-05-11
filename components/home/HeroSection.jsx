'use client';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[var(--navy)] text-white flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-radial-gradient from-[var(--gold)]/20 to-transparent"></div>
      </div>

      <div className="container relative z-10 py-12 md:py-20 lg:py-32 text-center">
        {/* Eyebrow */}
        <div className="mb-6 md:mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-8 md:w-12 bg-[var(--gold)]/60"></div>
          <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
            Empowering Communities
          </span>
          <div className="h-px w-8 md:w-12 bg-[var(--gold)]/60"></div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
          Ignite Every<br />
          <span className="text-[var(--gold)]">Dimension</span> of Change
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-xl text-white/70 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
          Ignite360 is a purpose-driven NGO delivering transformational learning, leadership development, and community-centred programmes across Africa and beyond.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16">
          <a href="#programs" className="btn-primary text-sm md:text-base">
            Explore Courses
          </a>
          <a href="#mission" className="btn-outline text-sm md:text-base">
            Our Mission
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-16 border-t border-[var(--gold)]/20">
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-serif font-bold text-[var(--gold)] mb-2">10+</div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-white/60">Programmes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-serif font-bold text-[var(--gold)] mb-2">500+</div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-white/60">Alumni</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-serif font-bold text-[var(--gold)] mb-2">12</div>
            <div className="text-xs md:text-sm uppercase tracking-widest text-white/60">Countries Reached</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse">
          <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
    </section>
  );
}
