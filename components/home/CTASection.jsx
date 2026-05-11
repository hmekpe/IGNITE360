'use client';

export default function CTASection() {
  return (
    <section id="contact" className="section bg-gradient-to-r from-[var(--navy)] to-[var(--navy-mid)] text-white relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)] rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-10 text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Ready to Ignite Your Potential?
        </h2>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12">
          Join thousands of changemakers who have taken the next step. Apply for a cohort or get in touch with our team today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="mailto:hello@ignite360.org" className="btn-primary text-sm md:text-base">
            Get in Touch
          </a>
          <a href="#programs" className="btn-outline text-sm md:text-base border-white text-white hover:bg-white hover:text-[var(--navy)]">
            Explore Courses
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/10 flex justify-center gap-6 md:gap-8">
          <a
            href="https://whatsapp.com/channel/0029Vb7Mgdz2UPBEXogXHT32"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[var(--gold)] transition-colors"
          >
            <span className="text-2xl">📱</span>
          </a>
          <a
            href="https://x.com/Ignite360_gh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[var(--gold)] transition-colors"
          >
            <span className="text-2xl">𝕏</span>
          </a>
          <a
            href="https://instagram.com/ign.ite360"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[var(--gold)] transition-colors"
          >
            <span className="text-2xl">📸</span>
          </a>
          <a
            href="https://facebook.com/ignite360"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[var(--gold)] transition-colors"
          >
            <span className="text-2xl">f</span>
          </a>
          <a
            href="https://tiktok.com/@ignite.360.0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[var(--gold)] transition-colors"
          >
            <span className="text-2xl">♪</span>
          </a>
        </div>
      </div>
    </section>
  );
}
