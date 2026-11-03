export const locales = ['bn', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'bn';

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

