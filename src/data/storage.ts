// Resilient localStorage persistence (SDD §4.3). Every access is wrapped so the
// app stays fully functional when storage is unavailable (private mode, quota,
// SSR): reads return defaults, writes no-op. Nothing here throws.

import type { Language } from './types';

const PREFIX = 'pta:';
const LANGUAGES: readonly Language[] = ['javascript', 'ruby', 'python'];

function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* unavailable or over quota — silently skip */
  }
}

// --- Code per (problem, language) ----------------------------------------
const codeKey = (problemKey: string, lang: Language) =>
  `${PREFIX}code:${problemKey}:${lang}`;

export function loadCode(problemKey: string, lang: Language): string | null {
  return safeGet(codeKey(problemKey, lang));
}

export function saveCode(problemKey: string, lang: Language, code: string): void {
  safeSet(codeKey(problemKey, lang), code);
}

// --- Completion (set of solved languages per problem) --------------------
const solvedKey = (problemKey: string) => `${PREFIX}solved:${problemKey}`;

export function solvedLanguages(problemKey: string): Language[] {
  const raw = safeGet(solvedKey(problemKey));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isLanguage);
  } catch {
    return [];
  }
}

export function isSolved(problemKey: string): boolean {
  return solvedLanguages(problemKey).length > 0;
}

export function markSolved(problemKey: string, lang: Language): void {
  const current = solvedLanguages(problemKey);
  if (current.includes(lang)) return;
  safeSet(solvedKey(problemKey), JSON.stringify([...current, lang]));
}

// --- Hint reveal count ---------------------------------------------------
const hintsKey = (problemKey: string) => `${PREFIX}hints:${problemKey}`;

export function loadHintCount(problemKey: string): number {
  const raw = safeGet(hintsKey(problemKey));
  const n = raw === null ? 0 : Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function saveHintCount(problemKey: string, count: number): void {
  safeSet(hintsKey(problemKey), String(Math.max(0, count)));
}

// --- Global Vim preference -----------------------------------------------
const VIM_KEY = `${PREFIX}vim`;

export function loadVimPref(): boolean {
  return safeGet(VIM_KEY) === '1';
}

export function saveVimPref(enabled: boolean): void {
  safeSet(VIM_KEY, enabled ? '1' : '0');
}

// --- Last selected language (global; sticky across problems) -------------
const LANG_KEY = `${PREFIX}lang`;

export function lastLanguage(): Language | null {
  const raw = safeGet(LANG_KEY);
  return isLanguage(raw) ? raw : null;
}

export function saveLastLanguage(lang: Language): void {
  safeSet(LANG_KEY, lang);
}
