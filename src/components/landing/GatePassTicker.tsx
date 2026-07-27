'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MapPin, Package, User, Wheat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { GATE_PASSES } from '@/lib/data';
import { prefersReducedMotion } from '@/lib/helpers';

function HeroSummaryField({
  label,
  value,
  icon: Icon,
  valueClassName,
  className,
  truncate = true,
}: {
  label: string;
  value: string;
  icon?: typeof User;
  valueClassName?: string;
  className?: string;
  truncate?: boolean;
}) {
  return (
    <div className={cn('min-w-0 space-y-1', className)}>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p
        className={cn(
          'text-foreground flex min-w-0 items-center gap-1.5 text-sm font-semibold',
          valueClassName,
        )}
        title={value}
      >
        {Icon ? <Icon className="text-muted-foreground size-3.5 shrink-0" aria-hidden /> : null}
        <span className={truncate ? 'truncate' : undefined}>{value}</span>
      </p>
    </div>
  );
}

export function GatePassTicker() {
  const passCardRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const [passIndex, setPassIndex] = useState(0);
  const pass = GATE_PASSES[passIndex];

  useEffect(() => {
    const id = window.setInterval(() => {
      setPassIndex((i) => (i + 1) % GATE_PASSES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (prefersReducedMotion() || !passCardRef.current) return;
    gsap.fromTo(
      passCardRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
    );
  }, [passIndex]);

  return (
    <div className="space-y-3 p-5">
      <div ref={passCardRef}>
        <Card className="card-hover border-border/60 overflow-hidden border">
          <CardHeader className="border-border/40 bg-muted/10 flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="bg-primary size-2 rounded-full" />
                IGP{' '}
                <span className="text-primary font-mono tabular-nums">#{pass.gatePassNo}</span>
              </CardTitle>
              <CardDescription className="text-xs">{pass.createdAt}</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
              <Badge variant="outline" className="bg-background text-xs" title={pass.variety}>
                {pass.variety}
              </Badge>
              <Badge variant="outline" className="bg-background text-xs tabular-nums">
                {pass.bags.toLocaleString('en-IN')} Bags
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              <HeroSummaryField label="Farmer" value={pass.farmer} icon={User} />
              <HeroSummaryField
                label="Account"
                value={pass.account}
                valueClassName="font-mono tabular-nums"
              />
              <HeroSummaryField label="Variety" value={pass.variety} icon={Package} />
              <HeroSummaryField
                label="Lot No"
                value={pass.lotNo}
                valueClassName="font-mono tabular-nums"
              />
              <HeroSummaryField
                label="Location"
                value={pass.location}
                icon={MapPin}
                className="col-span-2 sm:col-span-2"
                truncate={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card size="sm" className="border-border/60 gap-0 border shadow-none ring-0">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium tracking-wider uppercase">
              Total Inventory (Current)
            </CardDescription>
            <CardAction>
              <div className="bg-primary/10 flex size-9 items-center justify-center rounded-xl">
                <Package className="text-primary size-4" aria-hidden />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            <p className="font-heading text-primary text-2xl font-semibold tracking-tight tabular-nums">
              76,954
            </p>
            <p className="text-muted-foreground text-sm">Bags in storage</p>
          </CardContent>
        </Card>

        <Card size="sm" className="border-border/60 gap-0 border shadow-none ring-0">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium tracking-wider uppercase">
              Top Variety
            </CardDescription>
            <CardAction>
              <div className="bg-primary/10 flex size-9 items-center justify-center rounded-xl">
                <Wheat className="text-primary size-4" aria-hidden />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            <p className="font-heading text-foreground text-2xl font-semibold tracking-tight">
              Chipsona 1
            </p>
            <p className="text-muted-foreground text-sm">24,810 bags</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/40 rounded-lg border p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Warehouse occupancy</span>
          <span className="font-semibold tabular-nums">76,954 / 90,000 bags · 85.5%</span>
        </div>
        <div className="bg-border mt-2.5 h-2 overflow-hidden rounded-full">
          <div data-anim="occupancy" className="bg-primary h-full w-[85.5%] rounded-full" />
        </div>
      </div>
    </div>
  );
}
