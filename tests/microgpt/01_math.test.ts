import { describe, expect, it } from 'vitest';

import {
  matMul,
  sampleFromDistribution,
  softmax,
} from '../../src/microgpt/01_math';

describe('microgpt step 1 - math', () => {
  it('softmax returns positive probs that sum to ~1', () => {
    const probs = softmax([1, 2, 3]);

    expect(probs.length).toBe(3);
    for (const p of probs) {
      expect(p).toBeGreaterThan(0);
    }

    const sum = probs.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 8);
    expect(probs[2]).toBeGreaterThan(probs[1]);
    expect(probs[1]).toBeGreaterThan(probs[0]);
  });

  it('sampleFromDistribution picks expected bucket', () => {
    const probs = [0.1, 0.2, 0.7];

    expect(sampleFromDistribution(probs, 0.05)).toBe(0);
    expect(sampleFromDistribution(probs, 0.1)).toBe(1);
    expect(sampleFromDistribution(probs, 0.29999)).toBe(1);
    expect(sampleFromDistribution(probs, 0.3)).toBe(2);
    expect(sampleFromDistribution(probs, 0.9999)).toBe(2);
  });

  it('matMul multiplies matrices', () => {
    const a = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const b = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];

    expect(matMul(a, b)).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  it('matMul throws on invalid shapes', () => {
    expect(() =>
      matMul(
        [
          [1, 2],
          [3, 4],
        ],
        [[1, 2, 3]],
      ),
    ).toThrow(RangeError);
  });
});
