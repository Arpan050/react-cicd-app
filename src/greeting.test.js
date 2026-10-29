import test from 'node:test';
import assert from 'node:assert';
import { greeting } from './greeting.js';

test('greeting includes the name', () => {
  assert.ok(greeting('Arpan').includes('Arpan'));
});
