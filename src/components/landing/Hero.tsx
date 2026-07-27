import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GatePassTicker } from '@/components/landing/GatePassTicker';

interface HeroProps {
  isLoggedIn?: boolean;
}

export function Hero({ isLoggedIn = false }: HeroProps) {
  const accountCta = isLoggedIn ? (
    <Button render={<Link href="/daybook" />} nativeButton={false} size="lg">
      Go to Dashboard <ArrowUpRight data-icon="inline-end" />
    </Button>
  ) : (
    <Button render={<Link href="/login" />} nativeButton={false} size="lg">
      Access Account <ArrowRight data-icon="inline-end" />
    </Button>
  );

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute -top-32 -left-32 size-[480px] rounded-full blur-[120px]" />
        <div className="bg-chart-3/10 absolute -right-40 bottom-0 size-[420px] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)] opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '26px 26px',
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center gap-6 text-center lg:col-span-6 lg:items-start lg:self-center lg:text-left">
            <span
              data-anim="hero-item"
              className="border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            >
              <ShieldCheck className="size-3.5" /> Enterprise-grade Cold Storage ERP
            </span>

            <h1
              data-anim="hero-item"
              className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              The Complete <span className="text-primary">Cold Storage</span> Management Platform
            </h1>

            <div
              data-anim="hero-item"
              className="border-primary bg-primary/5 max-w-lg rounded-r-lg border-l-2 px-4 py-2.5 text-left"
            >
              <p className="text-sm font-semibold">
                ਪੰਜਾਬ ਦੇ ਆਲੂ ਉਤਪਾਦਕਾਂ ਅਤੇ ਕੋਲਡ ਸਟੋਰਾਂ ਲਈ ਸਭ ਤੋਂ ਭਰੋਸੇਮੰਦ ਸਾਫਟਵੇਅਰ।
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                The most trusted digital ledger &amp; real-time telemetry for potato storages.
              </p>
            </div>

            <p
              data-anim="hero-item"
              className="text-muted-foreground max-w-lg text-base text-pretty sm:text-lg"
            >
              Replace manual reporting with Coldop — real-time analytics, instant PDF and Excel
              exports, live stock ledgers, and precise location tracking by chamber, floor, and row.
            </p>

            <div
              data-anim="hero-item"
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              {accountCta}
              <Button
                render={<a href="#in-the-field" />}
                nativeButton={false}
                variant="outline"
                size="lg"
              >
                <Play data-icon="inline-start" /> Watch Operation Reels
              </Button>
            </div>

            <div
              data-anim="hero-item"
              className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="text-primary size-3.5" /> No hardware required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="text-primary size-3.5" /> Works on any device
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-6 lg:self-center">
            <div data-anim="hero-visual" className="relative w-full max-w-[540px]">
              <div
                aria-hidden
                className="bg-primary/10 absolute -inset-8 -z-10 rounded-full blur-3xl"
              />

              <div className="bg-card rounded-2xl border shadow-xl">
                <div className="flex items-center justify-between border-b px-5 py-3.5">
                  <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs font-semibold tracking-wider">
                    <span className="relative flex size-2">
                      <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                      <span className="bg-primary relative inline-flex size-2 rounded-full" />
                    </span>
                    LIVE DAYBOOK
                  </span>
                  <span className="border-primary/20 bg-primary/10 text-primary rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide">
                    GATE PASS STREAM
                  </span>
                </div>

                <GatePassTicker />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
