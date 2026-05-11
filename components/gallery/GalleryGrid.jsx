'use client';

import SmartImage from '@/components/ui/SmartImage';

export default function GalleryGrid({ images = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <SmartImage
          key={index}
          image={image}
          alt={`Gallery ${index + 1}`}
          wrapperClassName="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
          className="h-full w-full"
          aspectRatio="16 / 9"
        />
      ))}
    </div>
  );
}
