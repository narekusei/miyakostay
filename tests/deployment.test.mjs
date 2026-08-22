import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const config = JSON.parse(
  await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
);

test('Vercel sends client-side routes to the SPA entry point', () => {
  const rewrite = config.rewrites?.find(
    ({ destination }) => destination === '/index.html',
  );

  assert.ok(rewrite, 'Expected an index.html SPA rewrite');

  const routePattern = new RegExp(`^${rewrite.source}$`);
  assert.equal(routePattern.test('/hotel/hilton-okinawa-miyako-island-resort'), true);
  assert.equal(routePattern.test('/assets/index.js'), false);
});
