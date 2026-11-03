const THEME_KEY = 'golpe-theme';
const PROGRESS_KEY = 'golpe-progress';

export interface ReadingProgress {
  completedChapters: string[];
  lastReadChapter: string | null;
}

export function getSavedTheme(): 'light' | 'dark' | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(THEME_KEY);
    if (val === 'light' || val === 'dark') return val;
  } catch (err) {
    console.warn('Unable to access localStorage for theme:', err);
  }
  return null;
}

export function setSavedTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.warn('Unable to save theme to localStorage:', err);
  }
}

export function getReadingProgress(): ReadingProgress {
  const fallback: ReadingProgress = { completedChapters: [], lastReadChapter: null };
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
        lastReadChapter: typeof parsed.lastReadChapter === 'string' ? parsed.lastReadChapter : null,
      };
    }
  } catch (err) {
    console.warn('Unable to read progress from localStorage:', err);
  }
  return fallback;
}

export function saveReadingProgress(slug: string, completed = false): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getReadingProgress();
    const updatedChapters = new Set(current.completedChapters);
    if (completed) {
      updatedChapters.add(slug);
    }
    const updated: ReadingProgress = {
      completedChapters: Array.from(updatedChapters),
      lastReadChapter: slug,
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Unable to save progress to localStorage:', err);
  }
}

