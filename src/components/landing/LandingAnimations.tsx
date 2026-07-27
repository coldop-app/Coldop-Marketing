'use client';

import { useRef, type ReactNode } from 'react';
import { useLandingAnimations } from '@/hooks/use-landing-animations';

export function LandingAnimations({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingAnimations(rootRef);

  return (
    <div ref={rootRef} className="bg-background text-foreground min-h-screen font-sans">
      {children}
    </div>
  );
}
