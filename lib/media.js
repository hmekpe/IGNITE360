export function normalizeImage(value) {
  if (!value) {
    return {
      src: '',
      alt: '',
      fit: 'cover',
      focalX: 50,
      focalY: 50,
      aspectRatio: '4 / 3',
      zoom: 1,
    };
  }

  if (typeof value === 'string') {
    return {
      src: value,
      alt: '',
      fit: 'cover',
      focalX: 50,
      focalY: 50,
      aspectRatio: '4 / 3',
      zoom: 1,
    };
  }

  return {
    src: value.src || '',
    alt: value.alt || '',
    fit: value.fit || 'cover',
    focalX: Number.isFinite(Number(value.focalX)) ? Number(value.focalX) : 50,
    focalY: Number.isFinite(Number(value.focalY)) ? Number(value.focalY) : 50,
    aspectRatio: value.aspectRatio || '4 / 3',
    zoom: Number.isFinite(Number(value.zoom)) ? Number(value.zoom) : 1,
  };
}

export function createImagePayload(value) {
  const image = normalizeImage(value);

  if (!image.src) {
    return '';
  }

  return {
    src: image.src,
    alt: image.alt,
    fit: image.fit,
    focalX: image.focalX,
    focalY: image.focalY,
    aspectRatio: image.aspectRatio,
    zoom: image.zoom,
  };
}
