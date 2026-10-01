'use client';

import Image from 'next/image';
import { images, type ImageKey } from '@/data/images';
import { useState } from 'react';

interface ProjectImageProps {
  imageKey: ImageKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  aspectRatio?: string;
}

export function ProjectImage({
  imageKey,
  className = '',
  priority = false,
  sizes,
  objectPosition,
  aspectRatio,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);
  const entry = images[imageKey];

  if (!entry) return null;

  const src = hasError ? entry.placeholderSrc : entry.src;
  const isPlaceholder = src.endsWith('.svg');

  const responsiveSizes =
    sizes ||
    '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw';

  const containerStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio }
    : { aspectRatio: entry.aspectRatio };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      <Image
        src={src}
        alt={entry.alt}
        fill
        priority={priority}
        sizes={responsiveSizes}
        style={{
          objectFit: 'cover',
          objectPosition: objectPosition || 'center',
        }}
        onError={() => setHasError(true)}
      />
      {isPlaceholder && (
        <div
          aria-hidden="true"
          className="absolute bottom-2 right-2 bg-black/20 text-white/70 text-[10px] tracking-wide px-2 py-0.5 rounded select-none pointer-events-none"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          placeholder
        </div>
      )}
    </div>
  );
}
