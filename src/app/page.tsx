import dynamic from 'next/dynamic';
import { LandingAnimations } from '@/components/landing/LandingAnimations';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Clients } from '@/components/landing/Clients';
import { Stats } from '@/components/landing/Stats';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { Faq } from '@/components/landing/Faq';
import { CtaBand } from '@/components/landing/CtaBand';
import { Footer } from '@/components/landing/Footer';
import { StructuredData } from '@/components/landing/StructuredData';

const ChamberMap = dynamic(
  () => import('@/components/landing/ChamberMap').then((m) => m.ChamberMap),
  {
    loading: () => (
      <section className="border-b py-20" aria-hidden>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-muted/40 h-96 animate-pulse rounded-2xl" />
        </div>
      </section>
    ),
  },
);

const InTheField = dynamic(
  () => import('@/components/landing/InTheField').then((m) => m.InTheField),
  {
    loading: () => (
      <section className="border-b py-20" aria-hidden>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-muted/40 h-64 animate-pulse rounded-2xl" />
        </div>
      </section>
    ),
  },
);

export default function LandingPage() {
  return (
    <LandingAnimations>
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:px-3 focus:py-2 focus:ring-2 focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Clients />
        <Stats />
        <HowItWorks />
        <ChamberMap />
        <Features />
        <InTheField />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <StructuredData />
    </LandingAnimations>
  );
}
