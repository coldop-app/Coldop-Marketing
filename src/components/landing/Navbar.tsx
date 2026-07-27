'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowRight, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/data';
import { BrandMark } from '@/components/landing/BrandMark';

interface NavbarProps {
  isLoggedIn?: boolean;
}

export function Navbar({ isLoggedIn = false }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header
      data-anim="nav"
      className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="relative"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>

          {isLoggedIn ? (
            <Button render={<Link href="/daybook" />} nativeButton={false}>
              Dashboard <ArrowUpRight data-icon="inline-end" />
            </Button>
          ) : (
            <Button render={<Link href="/login" />} nativeButton={false}>
              Sign In <ArrowRight data-icon="inline-end" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
