'use client';

import Card from '../ui/Card';

export default function MissionGrid() {
  const missions = [
    {
      title: 'Empower',
      description: 'Empowering youth with skills and opportunities for growth.',
    },
    {
      title: 'Connect',
      description: 'Connecting communities and fostering meaningful relationships.',
    },
    {
      title: 'Transform',
      description: 'Transforming lives through education and mentorship.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {missions.map((mission, index) => (
        <Card key={index}>
          <h3 className="text-xl font-bold text-secondary mb-2">{mission.title}</h3>
          <p className="text-gray-600">{mission.description}</p>
        </Card>
      ))}
    </div>
  );
}
