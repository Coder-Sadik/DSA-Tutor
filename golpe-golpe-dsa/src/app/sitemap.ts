import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { CHAPTERS } from '@/lib/chapters';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const readyChapters = CHAPTERS.filter((c) => c.status === 'ready');
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Home/Cover pages
  for (const lang of locales) {
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          bn: `${SITE_URL}/bn`,
          en: `${SITE_URL}/en`,
          'x-default': `${SITE_URL}/bn`,
        },
      },
    });
  }

  // Chapter pages
  for (const chapter of readyChapters) {
    for (const lang of locales) {
      entries.push({
        url: `${SITE_URL}/${lang}/chapter/${chapter.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            bn: `${SITE_URL}/bn/chapter/${chapter.slug}`,
            en: `${SITE_URL}/en/chapter/${chapter.slug}`,
            'x-default': `${SITE_URL}/bn/chapter/${chapter.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
