'use client';

import { useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';

export default function Lightbox({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setCurrentIndex(index)}
          className="overflow-hidden rounded-lg transition hover:opacity-80"
        >
          <SmartImage
            image={image}
            alt={`Gallery ${index}`}
            wrapperClassName="h-64"
            className="w-full"
            aspectRatio="16 / 9"
          />
        </button>
      ))}
    </div>
  );
}
