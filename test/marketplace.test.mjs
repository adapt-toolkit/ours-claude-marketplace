import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

test('marketplace pins the published ours npm plugin', () => {
  const value = JSON.parse(readFileSync(join(root, '.claude-plugin/marketplace.json'), 'utf8'));
  assert.equal(value.name, 'ours.network');
  assert.deepEqual(value.plugins.map((plugin) => plugin.name), ['ours']);
  assert.deepEqual(value.plugins[0].source, {
    source: 'npm',
    package: '@ours.network/claude-code',
    version: '0.17.0',
  });
  assert.match(value.plugins[0].source.version, /^\d+\.\d+\.\d+$/, 'marketplace packages must use an exact published version');
});
