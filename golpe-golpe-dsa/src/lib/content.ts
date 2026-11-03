import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Locale } from './i18n/config';

export interface ChapterFrontmatter {
  order: number;
  slug: string;
  title: string;
  storyHook: string;
  status: 'ready' | 'soon';
}

export interface ChapterData {
  frontmatter: ChapterFrontmatter;
  content: string;
  slug: string;
  lang: Locale;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getChapterFileBySlug(lang: Locale, slug: string): ChapterData | null {
  const langDir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(langDir)) return null;

  const files = fs.readdirSync(langDir);
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const filePath = path.join(langDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    if (data.slug === slug) {
      return {
        frontmatter: data as ChapterFrontmatter,
        content,
        slug,
        lang,
      };
    }
  }

  return null;
}

export function getAllChapterSlugs(): string[] {
  // Read bn directory as canonical slug source
  const bnDir = path.join(CONTENT_DIR, 'bn');
  if (!fs.existsSync(bnDir)) return ['what-is-a-data-structure'];

  const files = fs.readdirSync(bnDir);
  const slugs: string[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const filePath = path.join(bnDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    if (data.slug) {
      slugs.push(data.slug);
    }
  }

  return slugs;
}

