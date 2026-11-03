export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dsa-tutor-cs.vercel.app';

export function getFullUrl(path = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

