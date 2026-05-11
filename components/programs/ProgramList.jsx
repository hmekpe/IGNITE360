'use client';

import ProgramCard from './ProgramCard';

export default function ProgramList({ programs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program._id} program={program} />
      ))}
    </div>
  );
}
