import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CONTACT } from '@/lib/urls';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Coldop collects, uses, and protects data for cold storage operators and the farmer records they manage.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    heading: '1. Who we are',
    body: 'Coldop ("we", "us") provides cold storage management and inventory software to cold storage operators in India, from coldop.in and app.coldop.in. This policy explains what data we collect and how we handle it.',
  },
  {
    heading: '2. Data we collect',
    body: 'Account data: the name, phone number, and email of the cold storage operator who signs up. Operational data: records that operators enter while running their storage — gate passes, farmer names and phone numbers, account balances, inventory by chamber, floor, and row, and reports. Usage data: standard analytics signals (pages visited, device type, approximate location) collected via cookies on the marketing site.',
  },
  {
    heading: '3. Farmer records',
    body: 'Farmer names, contact details, and stock records are entered by the cold storage operator, who is responsible for that data. We process it only to provide the service to the operator — we do not sell it, advertise against it, or share it with third parties beyond the service providers below.',
  },
  {
    heading: '4. How we use data',
    body: 'To operate the platform (ledgers, stock maps, reports), to support customers, to secure accounts, and to understand how the marketing site performs. We do not sell personal data.',
  },
  {
    heading: '5. Service providers',
    body: 'We rely on infrastructure providers for hosting, media storage (Cloudinary), and analytics (Google Tag Manager, Microsoft Clarity on the marketing site). These providers process data on our behalf under their own security commitments.',
  },
  {
    heading: '6. Retention',
    body: 'Operational records are retained while the operator maintains an account, since they form the storage’s books. Operators can request export or deletion of their data at any time.',
  },
  {
    heading: '7. Security',
    body: 'Access to operational data is restricted to the operator’s authenticated account. Data is transmitted over HTTPS. No method of storage is 100% secure, but we work to protect the registers your business depends on.',
  },
  {
    heading: '8. Your rights',
    body: 'In line with India’s Digital Personal Data Protection Act, 2023, you may request access to, correction of, or deletion of your personal data. Farmers whose records are held by a cold storage should contact that storage first; we will assist the operator in fulfilling such requests.',
  },
  {
    heading: '9. Contact',
    body: `For any privacy question or request, write to ${CONTACT.email} or call ${CONTACT.phone}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to coldop.in
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="text-muted-foreground mt-2 text-sm">Last updated: 29 July 2026</p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed text-pretty">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
