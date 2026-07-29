import type { MetadataRoute } from 'next';

/**
 * All crawlers are welcome, including AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot) — being readable by answer engines is a goal, not a risk.
 * The application lives on app.coldop.in, which ships its own robots.txt
 * disallowing everything.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://coldop.in/sitemap.xml',
  };
}
