import { describe, expect, it } from 'vitest';

import {
  averageSequenceLoss,
  crossEntropyFromLogits,
  greedyTokenFromLogits,
  sampleTokenFromLogits,
} from '../../src/microgpt/06_train';

describe('microgpt step 6 - loss + token selection', () => {
  it('crossEntropyFromLogits matches known values', () => {
    expect(crossEntropyFromLogits([0, 0], 0)).toBeCloseTo(Math.log(2), 8);
    expect(crossEntropyFromLogits([0, 0], 1)).toBeCloseTo(Math.log(2), 8);
    expect(crossEntropyFromLogits([10, 0], 0)).toBeLessThan(1e-4);
  });

  it('crossEntropyFromLogits throws on invalid target index', () => {
    expect(() => crossEntropyFromLogits([0, 1], -1)).toThrow(RangeError);
    expect(() => crossEntropyFromLogits([0, 1], 2)).toThrow(RangeError);
  });

  it('averageSequenceLoss averages per-step losses', () => {
    const logits = [
      [0, 0],
      [0, 0],
      [0, 0],
    ];

    expect(averageSequenceLoss(logits, [0, 1, 0])).toBeCloseTo(Math.log(2), 8);
  });

  it('averageSequenceLoss throws on length mismatch', () => {
    expect(() => averageSequenceLoss([[0, 0]], [0, 1])).toThrow(RangeError);
  });

  it('sampleTokenFromLogits samples according to softmax distribution', () => {
    const logits = [Math.log(0.1), Math.log(0.2), Math.log(0.7)];

    expect(sampleTokenFromLogits(logits, 0.05)).toBe(0);
    expect(sampleTokenFromLogits(logits, 0.1)).toBe(1);
    expect(sampleTokenFromLogits(logits, 0.29999)).toBe(1);
    expect(sampleTokenFromLogits(logits, 0.3)).toBe(2);
    expect(sampleTokenFromLogits(logits, 0.9999)).toBe(2);
  });

  it('greedyTokenFromLogits returns argmax and uses first index for ties', () => {
    expect(greedyTokenFromLogits([1, 5, 3])).toBe(1);
    expect(greedyTokenFromLogits([2, 2, 1])).toBe(0);
  });
});
