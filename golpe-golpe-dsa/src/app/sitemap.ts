import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { CHAPTERS } from '@/lib/chapters';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://golpe-golpe-dsa.vercel.app';
  const readyChapters = CHAPTERS.filter((c) => c.status === 'ready');
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Home/Cover pages
  for (const lang of locales) {
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          bn: `${baseUrl}/bn`,
          en: `${baseUrl}/en`,
        },
      },
    });
  }

  // Chapter pages
  for (const chapter of readyChapters) {
    for (const lang of locales) {
      entries.push({
        url: `${baseUrl}/${lang}/chapter/${chapter.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            bn: `${baseUrl}/bn/chapter/${chapter.slug}`,
            en: `${baseUrl}/en/chapter/${chapter.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
