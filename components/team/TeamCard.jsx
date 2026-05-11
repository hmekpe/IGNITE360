'use client';

import Card from '../ui/Card';
import SmartImage from '@/components/ui/SmartImage';

export default function TeamCard({ member, onClick }) {
  return (
    <Card
      className="text-center cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
      onClick={onClick}
    >
      {member.image && (
        <div className="overflow-hidden rounded-[1rem] -mx-6 -mt-6 mb-4">
          <SmartImage
            image={member.image}
            alt={member.name}
            wrapperClassName="h-40"
            className="w-full"
            aspectRatio="4 / 3"
          />
        </div>
      )}
      <h3 className="text-lg font-bold leading-tight mb-1">{member.name}</h3>
      <p className="text-secondary font-semibold mb-2 text-sm">{member.role}</p>
      <p className="text-gray-600 text-xs leading-5">{member.bio}</p>
    </Card>
  );
}
