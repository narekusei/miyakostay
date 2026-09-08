import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test } from 'vitest';

const readProjectFile = (path: string) =>
  readFile(resolve(path), 'utf8');

test('repository metadata consistently advertises the MIT license', async () => {
  const [license, readme, packageSource, lockfileSource] = await Promise.all([
    readProjectFile('LICENSE'),
    readProjectFile('README.md'),
    readProjectFile('package.json'),
    readProjectFile('package-lock.json'),
  ]);
  const packageJson = JSON.parse(packageSource);
  const lockfile = JSON.parse(lockfileSource);

  expect(license).toMatch(/^MIT License/);
  expect(license).toMatch(/Copyright \(c\) 2026 Aleksei Nesterov/);
  expect(readme).toMatch(/\[MIT License\]\(\.\/LICENSE\)/);
  expect(packageJson.license).toBe('MIT');
  expect(lockfile.packages?.['']?.license).toBe(packageJson.license);
  expect(packageJson.homepage).toBe('https://miyakostay.vercel.app');
  expect(packageJson.repository?.url).toBe(
    'git+https://github.com/narekusei/miyakostay.git',
  );
});
