'use client';

import Image from 'next/image';
import { normalizeImage } from '@/lib/media';

export default function SmartImage({
  image,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
}) {
  const media = normalizeImage(image);
  const finalAlt = media.alt || alt;
  const finalAspectRatio = aspectRatio || media.aspectRatio;

  if (!media.src) {
    return (
      <div
        className={`flex items-center justify-center rounded-[inherit] bg-[var(--sand)] text-sm text-[var(--text-muted)] ${wrapperClassName}`}
        style={finalAspectRatio ? { aspectRatio: finalAspectRatio } : undefined}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] ${wrapperClassName}`}
      style={finalAspectRatio ? { aspectRatio: finalAspectRatio } : undefined}
    >
      <Image
        src={media.src}
        alt={finalAlt}
        priority={priority}
        fill
        className={className}
        style={{
          objectFit: media.fit,
          objectPosition: `${media.focalX}% ${media.focalY}%`,
          transform: `scale(${media.zoom || 1})`,
          transformOrigin: `${media.focalX}% ${media.focalY}%`,
        }}
      />
    </div>
  );
}
