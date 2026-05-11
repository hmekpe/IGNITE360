'use client';

import Card from '../ui/Card';
import SmartImage from '@/components/ui/SmartImage';

export default function ProgramCard({ program }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      {program.image && (
        <div className="overflow-hidden rounded-[1rem] -mx-6 -mt-6 mb-4">
          <SmartImage
            image={program.image}
            alt={program.title}
            wrapperClassName="h-40"
            className="w-full"
            aspectRatio="4 / 3"
          />
        </div>
      )}
      <h3 className="text-lg font-bold leading-tight mb-2">{program.title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-6">{program.description}</p>
      <a href={`/programs/${program.slug}`} className="text-secondary hover:text-primary font-semibold text-sm transition-colors duration-300">
        Learn More →
      </a>
    </Card>
  );
}
