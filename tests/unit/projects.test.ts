import { existsSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { featured, projects } from '../../src/data/projects.ts';

const OLD_SITE = [
  'Gloam',
  'Saltancy Website',
  'VOETutor',
  'WSMath',
  'Notes API',
  'DBridger',
  'LeadingOnes DAC',
  'AI Search Algorithms',
  'NullVector',
  'Jungle Game & JunGUI',
  'Overthrow Synthetica',
  'ECS Platformer Demo',
];
const IMAGES = readdirSync('src/assets/projects');

describe('E6: every old-site project is migrated with its image', () => {
  it('has all 12 entries from the audit table', () => {
    expect(projects.map((p) => p.name).sort()).toEqual([...OLD_SITE].sort());
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it.each(projects.map((p) => [p.name, p] as const))('%s has an image file and descriptive alt text', (_name, p) => {
    expect(p.image).toBeDefined();
    expect(IMAGES.some((f) => f.replace(/\.[a-z]+$/, '') === p.image!.src)).toBe(true);
    expect(p.image!.alt.length).toBeGreaterThan(30);
    expect(p.image!.alt).not.toMatch(/screenshot$/i);
  });

  it.each(projects.map((p) => [p.name, p] as const))('%s has a one-sentence summary and a real link', (_name, p) => {
    expect(p.summary.trim().split(/(?<=[.!?])\s+/)).toHaveLength(1);
    expect(p.url ?? p.repo).toBeTruthy();
    if (p.url) expect(p.url).toMatch(/^https:\/\//);
  });

  it('features Gloam, DBridger and VOETutor in that order', () => {
    expect(featured.map((p) => p.name)).toEqual(['Gloam', 'DBridger', 'VOETutor']);
  });

  it('keeps the old image files only under src/assets/projects', () => {
    expect(existsSync('public/projects')).toBe(false);
    expect(IMAGES).toHaveLength(12);
  });
});
