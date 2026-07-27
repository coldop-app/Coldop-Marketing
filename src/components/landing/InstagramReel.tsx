'use client';

import { useEffect, useRef, useState } from 'react';

const INSTAGRAM_REEL_EMBED_URL = 'https://www.instagram.com/reel/DRrlfr1CfB5/embed';

export function InstagramReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {shouldLoad ? (
        <iframe
          src={INSTAGRAM_REEL_EMBED_URL}
          title="Coldop Instagram Reel — Real-time WhatsApp Alert"
          className="h-full w-full border-0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-full w-full flex-col items-center justify-center gap-2 transition-colors"
        >
          <span className="text-sm font-medium">Load Instagram Reel</span>
          <span className="text-xs">Click or scroll into view</span>
        </button>
      )}
    </div>
  );
}
