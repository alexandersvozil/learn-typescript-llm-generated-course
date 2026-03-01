import { describe, expect, it } from 'vitest';

import { gelu, layerNorm, linear } from '../../src/microgpt/02_layers';

describe('microgpt step 2 - layers', () => {
  it('gelu matches common approximation values', () => {
    expect(gelu(0)).toBeCloseTo(0, 8);
    expect(gelu(1)).toBeCloseTo(0.8412, 3);
    expect(gelu(-1)).toBeCloseTo(-0.1588, 3);
  });

  it('layerNorm normalizes vector (with gain=1, bias=0)', () => {
    const y = layerNorm([1, 2, 3, 4], [1, 1, 1, 1], [0, 0, 0, 0]);

    const mean = y.reduce((a, b) => a + b, 0) / y.length;
    const variance = y.reduce((a, b) => a + (b - mean) ** 2, 0) / y.length;

    expect(mean).toBeCloseTo(0, 6);
    expect(variance).toBeCloseTo(1, 4);
  });

  it('linear computes Wx + b', () => {
    const x = [2, 3];
    const weight = [
      [1, 0],
      [0, 1],
      [1, 1],
    ];
    const bias = [10, 20, 30];

    expect(linear(x, weight, bias)).toEqual([12, 23, 35]);
  });

  it('linear throws on shape mismatch', () => {
    expect(() => linear([1, 2, 3], [[1, 2]], [0])).toThrow(RangeError);
    expect(() => linear([1, 2], [[1, 2]], [0, 1])).toThrow(RangeError);
  });
});
