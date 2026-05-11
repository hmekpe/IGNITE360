'use client';

export default function HeroSection({ title, subtitle }) {
  return (
    <div className="relative w-full h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{subtitle}</p>
      </div>
    </div>
  );
}
