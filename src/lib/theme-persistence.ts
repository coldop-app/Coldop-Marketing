/** Shared with coldop.in / app.coldop.in via parent-domain cookie. */
export const THEME_COOKIE_NAME = 'coldop-theme';

/** next-themes default localStorage key */
export const THEME_STORAGE_KEY = 'theme';

export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type ThemePreference = 'light' | 'dark' | 'system';

function isThemePreference(value: string | null | undefined): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

function cookieDomain(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return undefined;
  if (hostname === 'coldop.in' || hostname.endsWith('.coldop.in')) return '.coldop.in';
  return undefined;
}

export function readThemeCookie(): ThemePreference | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${THEME_COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return null;

  const value = decodeURIComponent(match[1]);
  return isThemePreference(value) ? value : null;
}

export function writeThemeCookie(theme: string): void {
  if (typeof document === 'undefined' || !isThemePreference(theme)) return;

  const parts = [
    `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}`,
    'path=/',
    `max-age=${THEME_COOKIE_MAX_AGE}`,
    'SameSite=Lax',
  ];

  const domain = cookieDomain();
  if (domain) {
    parts.push(`domain=${domain}`);
  }

  document.cookie = parts.join('; ');
}

/** Copy shared cookie into localStorage so next-themes can read it. */
export function hydrateThemeStorageFromCookie(): ThemePreference | null {
  if (typeof window === 'undefined') return null;

  const cookieTheme = readThemeCookie();
  if (!cookieTheme) return null;

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored !== cookieTheme) {
      window.localStorage.setItem(THEME_STORAGE_KEY, cookieTheme);
    }
  } catch {
    // ignore quota / private mode errors
  }

  return cookieTheme;
}

/** Inline script for root layout — keep in sync with app.coldop.in index.html */
export const THEME_HYDRATE_SCRIPT = `
(function () {
  try {
    var cookieName = '${THEME_COOKIE_NAME}';
    var storageKey = '${THEME_STORAGE_KEY}';
    var match = document.cookie.match(
      new RegExp('(?:^|; )' + cookieName + '=([^;]*)'),
    );
    var cookieTheme = match ? decodeURIComponent(match[1]) : null;
    var stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (e) {}
    var theme = cookieTheme || stored;
    if (
      cookieTheme &&
      cookieTheme !== stored &&
      (cookieTheme === 'light' ||
        cookieTheme === 'dark' ||
        cookieTheme === 'system')
    ) {
      try {
        localStorage.setItem(storageKey, cookieTheme);
      } catch (e) {}
      theme = cookieTheme;
    }
    var prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark =
      theme === 'dark' || ((theme === 'system' || !theme) && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`.trim();
