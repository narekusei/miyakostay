import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const importTypeScriptModule = async (relativePath) => {
  const source = await readFile(new URL(relativePath, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

const { filterHotels } = await importTypeScriptModule('../src/domain/filterHotels.ts');
const { initialFilterState, toggleHotelTag } = await importTypeScriptModule('../src/domain/filterState.ts');

const hotels = [
  {
    slug: 'resort',
    name: 'Ocean Resort',
    nameJa: 'オーシャンリゾート',
    priceCategory: 'luxury',
    location: { area: 'Shigira', areaJa: 'シギラ', beachAccess: true },
    tags: ['beach', 'luxury'],
  },
  {
    slug: 'inn',
    name: 'Central Inn',
    nameJa: 'セントラルイン',
    priceCategory: 'budget',
    location: { area: 'Hirara', areaJa: '平良', beachAccess: false },
    tags: ['budget'],
  },
];

test('filters hotels by localized search text', () => {
  const result = filterHotels(hotels, { ...initialFilterState, search: '平良' });
  assert.deepEqual(result.map(({ slug }) => slug), ['inn']);
});

test('combines price category, beach, and tag filters', () => {
  const result = filterHotels(hotels, {
    ...initialFilterState,
    priceCategory: 'luxury',
    beachOnly: true,
    tags: ['luxury'],
  });
  assert.deepEqual(result.map(({ slug }) => slug), ['resort']);
});

test('tag state toggles without mutating the previous value', () => {
  const original = ['beach'];
  const added = toggleHotelTag(original, 'family');
  const removed = toggleHotelTag(added, 'beach');

  assert.deepEqual(original, ['beach']);
  assert.deepEqual(added, ['beach', 'family']);
  assert.deepEqual(removed, ['family']);
});
