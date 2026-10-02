import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site.ts';

const MAINTAINER_WORDS = /\b(API|APIs|build[ -]time|push|pushed|snapshots?|placeholders?|pulled from|prototypes?)\b/i;

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const TEMPLATE_DIRS = ['src/components', 'src/layouts', 'src/pages'];
const templates = TEMPLATE_DIRS.flatMap((dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith('.astro'))
    .map((f) => join(dir, f)),
);

function templateCopy(source: string): string[] {
  const markup = source
    .replace(/^---[\s\S]*?\n---/, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');
  const attributes = [...markup.matchAll(/\s(?:alt|aria-label|title|content|placeholder)="([^"]*)"/g)].map((m) => m[1]!);
  const text = markup
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  return [...attributes, ...text];
}

describe('A4: the site’s own UI copy is written for visitors', () => {
  it('site.ts has no maintainer vocabulary', () => {
    const copy = strings(site).filter((s) => !/^https?:\/\//.test(s));
    expect(copy.filter((s) => MAINTAINER_WORDS.test(s))).toEqual([]);
  });

  it.each(templates)('%s has no maintainer vocabulary in its text or attributes', (file) => {
    expect(templateCopy(readFileSync(file, 'utf8')).filter((s) => MAINTAINER_WORDS.test(s))).toEqual([]);
  });
});
