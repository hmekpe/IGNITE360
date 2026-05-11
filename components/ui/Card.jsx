'use client';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-[1.75rem] shadow-sm border border-[var(--border)] p-5 md:p-6 lg:p-7 transition-shadow duration-300 hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}
