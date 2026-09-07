import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('repository metadata consistently advertises the MIT license', async () => {
  const [license, readme, packageSource] = await Promise.all([
    readProjectFile('LICENSE'),
    readProjectFile('README.md'),
    readProjectFile('package.json'),
  ]);
  const packageJson = JSON.parse(packageSource);

  assert.match(license, /^MIT License/);
  assert.match(license, /Copyright \(c\) 2026 Aleksei Nesterov/);
  assert.match(readme, /\[MIT License\]\(\.\/LICENSE\)/);
  assert.equal(packageJson.license, 'MIT');
  assert.equal(packageJson.homepage, 'https://miyakostay.vercel.app');
  assert.equal(
    packageJson.repository?.url,
    'git+https://github.com/narekusei/miyakostay.git',
  );
});
