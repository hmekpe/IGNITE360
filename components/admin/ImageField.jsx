'use client';

import { useMemo, useRef, useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import { createImagePayload, normalizeImage } from '@/lib/media';

const aspectOptions = [
  { value: '1 / 1', label: 'Square' },
  { value: '4 / 3', label: 'Landscape' },
  { value: '3 / 4', label: 'Portrait' },
  { value: '16 / 9', label: 'Wide' },
];

export default function ImageField({ label = 'Image', value, onChange }) {
  const image = useMemo(() => normalizeImage(value), [value]);
  const [dragging, setDragging] = useState(false);
  const focalRef = useRef(null);

  function updateImage(patch) {
    onChange(createImagePayload({ ...image, ...patch }));
  }

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateImage({ src: reader.result });
    reader.readAsDataURL(file);
  }

  function syncFocalPoint(clientX, clientY) {
    if (!focalRef.current) return;

    const bounds = focalRef.current.getBoundingClientRect();
    const focalX = Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100));
    const focalY = Math.min(100, Math.max(0, ((clientY - bounds.top) / bounds.height) * 100));
    updateImage({ focalX: Math.round(focalX), focalY: Math.round(focalY) });
  }

  return (
    <div className="space-y-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--sand)] p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <label className="block text-sm font-semibold text-[var(--navy)]">{label}</label>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Set crop behavior, focal point, and aspect ratio so images stay readable on every screen.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-[var(--border)] bg-white p-1">
          {['cover', 'contain'].map((fit) => (
            <button
              key={fit}
              type="button"
              onClick={() => updateImage({ fit })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                image.fit === fit ? 'bg-[var(--navy)] text-white' : 'text-[var(--text-muted)]'
              }`}
            >
              {fit === 'cover' ? 'Crop to frame' : 'Contain'}
            </button>
          ))}
        </div>
      </div>

      <input
        type="url"
        value={image.src}
        onChange={(event) => updateImage({ src: event.target.value })}
        placeholder="Paste an image URL or upload a file below"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-3">
          <div
            ref={focalRef}
            className="relative cursor-crosshair overflow-hidden rounded-[1.25rem] border border-dashed border-[var(--border)] bg-white p-3"
            onMouseDown={(event) => {
              setDragging(true);
              syncFocalPoint(event.clientX, event.clientY);
            }}
            onMouseMove={(event) => {
              if (dragging) syncFocalPoint(event.clientX, event.clientY);
            }}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchStart={(event) => {
              const touch = event.touches[0];
              syncFocalPoint(touch.clientX, touch.clientY);
            }}
            onTouchMove={(event) => {
              const touch = event.touches[0];
              syncFocalPoint(touch.clientX, touch.clientY);
            }}
          >
            <SmartImage
              image={image}
              alt="Preview"
              wrapperClassName="rounded-[1rem]"
              className="h-full w-full rounded-[1rem] bg-[var(--sand)] transition-none"
              aspectRatio={image.aspectRatio}
            />
            {image.src ? (
              <div
                className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--gold)]/90 shadow-lg"
                style={{ left: `${image.focalX}%`, top: `${image.focalY}%` }}
              />
            ) : null}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Drag on the preview to set the focal point. This keeps faces and key details visible in cropped cards.
          </p>
        </div>

        <div className="space-y-4">
          <input type="file" accept="image/*" onChange={handleFile} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-[var(--navy)]">Aspect ratio</span>
              <select value={image.aspectRatio} onChange={(event) => updateImage({ aspectRatio: event.target.value })}>
                {aspectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-[var(--navy)]">Alt text</span>
              <input
                type="text"
                value={image.alt}
                onChange={(event) => updateImage({ alt: event.target.value })}
                placeholder="Short descriptive alt text"
              />
            </label>
          </div>

          <div className="grid gap-3">
            <label className="space-y-2 rounded-[1.1rem] border border-[var(--border)] bg-white px-4 py-3">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[var(--navy)]">
                <span>Zoom</span>
                <span className="text-xs text-[var(--gold-dark)]">{image.zoom.toFixed(2)}x</span>
              </span>
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={image.zoom}
                onChange={(event) => updateImage({ zoom: Number(event.target.value) })}
              />
            </label>

            <label className="space-y-2 rounded-[1.1rem] border border-[var(--border)] bg-white px-4 py-3">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[var(--navy)]">
                <span>Horizontal focus</span>
                <span className="text-xs text-[var(--gold-dark)]">{image.focalX}%</span>
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={image.focalX}
                onChange={(event) => updateImage({ focalX: Number(event.target.value) })}
              />
            </label>

            <label className="space-y-2 rounded-[1.1rem] border border-[var(--border)] bg-white px-4 py-3">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[var(--navy)]">
                <span>Vertical focus</span>
                <span className="text-xs text-[var(--gold-dark)]">{image.focalY}%</span>
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={image.focalY}
                onChange={(event) => updateImage({ focalY: Number(event.target.value) })}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
