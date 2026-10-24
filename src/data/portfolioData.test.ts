import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHAPTERS,
  PROJECT_STATISTICS,
  calculateTotalCreations,
  filterStatisticsByCategory,
  getChapterCameraTransform,
  stepChapterIndex,
  validateCommissionInquiry,
} from './portfolioData';

test('calculateTotalCreations sums all 19 authentic portfolio project statistics to 1214', () => {
  assert.equal(PROJECT_STATISTICS.length, 19);
  assert.equal(calculateTotalCreations(PROJECT_STATISTICS), 1214);
});

test('filterStatisticsByCategory filters by category and search query accurately', () => {
  const allStats = filterStatisticsByCategory('all', '');
  assert.equal(allStats.length, 19);

  const hardwareStats = filterStatisticsByCategory('hardware', '');
  assert.equal(hardwareStats.length, 4);
  assert.equal(hardwareStats.some((s) => s.label === 'Wokwi IoT Simulations'), true);

  const unrealSearch = filterStatisticsByCategory('all', 'unreal');
  assert.equal(unrealSearch.length, 1);
  assert.equal(unrealSearch[0].count, 50);
});

test('getChapterCameraTransform returns deterministic world coordinates and pulls back when exploded', () => {
  const assembled = getChapterCameraTransform('origin', 'gallery', 0);
  const exploded = getChapterCameraTransform('origin', 'gallery', 1);

  assert.equal(assembled.cameraPosition[0], -2.8);
  assert.equal(exploded.cameraPosition[2] > assembled.cameraPosition[2], true);

  const systemsMacro = getChapterCameraTransform('systems', 'macro', 0);
  assert.equal(systemsMacro.cameraPosition[0], 13.4);
});

test('stepChapterIndex wraps around chapter bounds cleanly', () => {
  assert.equal(stepChapterIndex(0, -1, CHAPTERS.length), 4);
  assert.equal(stepChapterIndex(4, 1, CHAPTERS.length), 0);
  assert.equal(stepChapterIndex(2, 1, CHAPTERS.length), 3);
});

test('validateCommissionInquiry rejects invalid fields and accepts complete submissions', () => {
  const invalid = validateCommissionInquiry({
    name: 'A',
    email: 'invalid-email',
    domain: '',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.domain);
  assert.ok(invalid.errors.message);

  const valid = validateCommissionInquiry({
    name: 'Amina Al-Mansoor',
    email: 'amina@luxuryatelier.ae',
    domain: 'Full-Stack & 3D Architecture',
    message: 'We would love to commission a bespoke 3D product platform for our Dubai flagship.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
