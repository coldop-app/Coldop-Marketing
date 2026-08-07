import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { THEME_HYDRATE_SCRIPT } from '@/lib/theme-persistence';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const SITE_URL = 'https://coldop.in';

const GOOGLE_VERIFICATION = 'NGnHHg9XTTPDYBQEVyz8Jn0xzA7s566QoGyU1PJSeHM';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: GOOGLE_VERIFICATION,
  },
  title: {
    default: 'Coldop — Cold Storage Management Software',
    template: '%s | Coldop',
  },
  description:
    'Coldop is complete cold storage software for gate passes, chamber-wise stock, farmer ledgers, daybook, and PDF/Excel reports in one system. Built for warehouse-floor operations across multiple commodities.',
  applicationName: 'Coldop',
  authors: [{ name: 'Coldop', url: SITE_URL }],
  creator: 'Coldop',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Coldop',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Coldop — Cold Storage Management Software',
    description:
      'Gate passes, chamber-wise stock, farmer ledgers, daybook, and reports in one system for multiple commodities. No hardware required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coldop — Cold Storage Management Software',
    description:
      'Gate passes, chamber-wise stock, farmer ledgers, daybook, and reports in one system for multiple commodities. No hardware required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#1a7a4c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="flex min-h-full flex-col">
        {/* Shared coldop-theme cookie → localStorage + dark class before paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_HYDRATE_SCRIPT }} />
        {/* Reveal animations are gated behind this class so content stays visible without JS (crawlers, no-JS users). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
