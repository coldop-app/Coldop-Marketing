/** Marketing site origin (this app). */
export const SITE_URL = 'https://coldop.in';

/** Main application origin — auth and all operational screens live there. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.coldop.in';

export const APP_LOGIN_URL = `${APP_URL}/login`;
export const BOOK_DEMO_URL = process.env.NEXT_PUBLIC_CAL_BOOK_DEMO_URL ?? 'https://cal.com';

export const CONTACT = {
  email: 'support@coldop.in',
  phone: '+91 9877069258',
  phoneHref: 'tel:+919877069258',
  youtubeStory: 'https://www.youtube.com/watch?v=aCQ3rb-K_m0',
  instagramReel: 'https://www.instagram.com/reel/DRrlfr1CfB5/',
} as const;
