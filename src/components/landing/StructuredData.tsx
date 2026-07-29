import { FAQ_ITEMS } from '@/lib/data';
import { APP_LOGIN_URL, CONTACT, SITE_URL } from '@/lib/urls';

/**
 * Single source of truth for all schema.org data on the landing page.
 * Rendered once from the server component tree — never duplicate these
 * entities elsewhere (the previous site shipped two divergent copies).
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Coldop',
      legalName: 'Coldop',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: CONTACT.email,
      telephone: '+91-98770-69258',
      foundingDate: '2023',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
      sameAs: [CONTACT.youtubeStory, CONTACT.instagramReel],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Coldop',
      url: SITE_URL,
      description:
        'Coldop is complete cold storage software for gate passes, chamber-wise stock, farmer ledgers, daybook, and reports in one system.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'Coldop',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Cold Storage Management Software',
      operatingSystem: 'Web',
      url: SITE_URL,
      installUrl: APP_LOGIN_URL,
      description:
        'Cold storage software platform for gate passes, chamber-wise stock, farmer ledgers, daybook, and PDF/Excel reports across multiple commodities.',
      featureList: [
        'Gate pass management',
        'Chamber and floor inventory tracking',
        'Farmer stock ledgers',
        'Daybook operations',
        'Stock transfers between accounts',
        'Occupancy analytics by chamber, floor, and row',
        'PDF and Excel report exports',
        'Multi-commodity inventory support',
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        description: 'Custom pricing per cold storage — contact for a quote and onboarding.',
      },
      provider: { '@id': `${SITE_URL}/#organization` },
      slogan: 'From gate pass to chamber stock — one system.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
