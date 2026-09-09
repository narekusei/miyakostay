import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test } from 'vitest';

test('Vercel sends client-side routes to the SPA entry point', async () => {
  const config = JSON.parse(
    await readFile(resolve('vercel.json'), 'utf8'),
  ) as { rewrites?: Array<{ source: string; destination: string }> };
  const rewrite = config.rewrites?.find(
    ({ destination }) => destination === '/index.html',
  );

  expect(rewrite, 'Expected an index.html SPA rewrite').toBeDefined();

  const routePattern = new RegExp(`^${rewrite?.source}$`);
  expect(routePattern.test('/hotel/hilton-okinawa-miyako-island-resort')).toBe(true);
  expect(routePattern.test('/assets/index.js')).toBe(false);
});
