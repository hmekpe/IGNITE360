'use client';

import { useState } from 'react';

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 1,
      badge: 'Leadership',
      title: 'Emerging Leaders Accelerator',
      description: 'Build the mindset, tools, and networks to lead with confidence in complex environments.',
      duration: '8 weeks',
      format: 'Cohort-based',
    },
    {
      id: 2,
      badge: 'Entrepreneurship',
      title: 'Social Enterprise Foundations',
      description: 'From idea to impact — launch a venture that solves real community problems.',
      duration: '10 weeks',
      format: 'Cohort-based',
    },
    {
      id: 3,
      badge: 'Digital Skills',
      title: 'Digital Literacy & Innovation',
      description: 'Master essential digital tools, data fluency, and technology for the modern workplace.',
      duration: '6 weeks',
      format: 'Cohort-based',
    },
    {
      id: 4,
      badge: 'Advocacy',
      title: 'Policy & Community Advocacy',
      description: 'Understand systems, amplify voices, and drive sustainable policy change from the ground up.',
      duration: '6 weeks',
      format: 'Cohort-based',
    },
    {
      id: 5,
      badge: 'Finance',
      title: 'Financial Empowerment Programme',
      description: 'Practical financial literacy, budgeting, and wealth-building strategies for individuals and organisations.',
      duration: '4 weeks',
      format: 'Cohort-based',
    },
    {
      id: 6,
      badge: 'Communication',
      title: 'Public Speaking & Storytelling',
      description: 'Craft compelling narratives and speak with authority to influence, inspire, and inform.',
      duration: '5 weeks',
      format: 'Cohort-based',
    },
    {
      id: 7,
      badge: 'Mental Health',
      title: 'Wellbeing & Resilience',
      description: 'Evidence-based approaches to mental wellness, burnout prevention, and sustainable high performance.',
      duration: '4 weeks',
      format: 'Cohort-based',
    },
    {
      id: 8,
      badge: 'Project Management',
      title: 'NGO & Project Management',
      description: 'Equip yourself with the frameworks and tools to design, manage, and evaluate impactful projects.',
      duration: '8 weeks',
      format: 'Cohort-based',
    },
    {
      id: 9,
      badge: 'Gender & Inclusion',
      title: 'Gender Equity & Inclusion',
      description: 'Frameworks for building inclusive organisations and advancing gender justice in communities.',
      duration: '5 weeks',
      format: 'Cohort-based',
    },
    {
      id: 10,
      badge: 'Climate',
      title: 'Climate Action & Sustainability',
      description: 'Understand climate realities and learn practical tools to lead green, community-driven solutions.',
      duration: '6 weeks',
      format: 'Cohort-based',
    },
  ];

  return (
    <section id="programs" className="section bg-[var(--offwhite)]">
      <div className="container">
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="section-tag">Programmes</div>
            <h2 className="section-head">10 Transformational Courses</h2>
          </div>
          <p className="section-sub max-w-md">
            Each course is designed for real-world application, delivered by expert facilitators and industry practitioners.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="card card-hover cursor-pointer group"
              onClick={() => setSelectedProgram(program)}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--gold)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>

              {/* Badge */}
              <div className="mb-4">
                <span className="badge text-xs">{program.badge}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg md:text-xl font-bold text-[var(--navy)] mb-3 group-hover:text-[var(--gold)] transition-colors">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-6">
                {program.description}
              </p>

              {/* Meta */}
              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[var(--text-muted)] font-medium">{program.duration}</span>
                  <span className="text-xs text-[var(--text-muted)]">{program.format}</span>
                </div>
                <div className="text-[var(--gold)] font-semibold group-hover:translate-x-2 transition-transform">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-[var(--text-muted)] mb-6">Ready to start your transformation?</p>
          <a href="#apply" className="btn-primary text-sm md:text-base">
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  );
}
