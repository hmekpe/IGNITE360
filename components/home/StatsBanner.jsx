'use client';

export default function StatsBanner() {
  const stats = [
    { number: '500+', label: 'People Reached' },
    { number: '50+', label: 'Programs' },
    { number: '20+', label: 'Team Members' },
  ];

  return (
    <div className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
