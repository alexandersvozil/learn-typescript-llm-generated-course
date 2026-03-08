import { describe, expect, it } from 'vitest';

import {
  applyAttention,
  attentionWeights,
  causalMask,
  selfAttention,
} from '../../src/microgpt/03_attention';

describe('microgpt step 3 - attention', () => {
  it('causalMask builds lower-triangular mask', () => {
    expect(causalMask(4)).toEqual([
      [true, false, false, false],
      [true, true, false, false],
      [true, true, true, false],
      [true, true, true, true],
    ]);
  });

  it('causalMask throws for invalid sequence length', () => {
    expect(() => causalMask(0)).toThrow(RangeError);
  });

  it('attentionWeights applies causal masking', () => {
    const q = [[1], [1], [1]];
    const k = [[1], [1], [1]];

    const w = attentionWeights(q, k, true);

    expect(w[0]![0]).toBeCloseTo(1, 8);
    expect(w[0]![1]).toBeCloseTo(0, 8);
    expect(w[0]![2]).toBeCloseTo(0, 8);

    expect(w[1]![0]).toBeCloseTo(0.5, 8);
    expect(w[1]![1]).toBeCloseTo(0.5, 8);
    expect(w[1]![2]).toBeCloseTo(0, 8);

    expect(w[2]![0]).toBeCloseTo(1 / 3, 8);
    expect(w[2]![1]).toBeCloseTo(1 / 3, 8);
    expect(w[2]![2]).toBeCloseTo(1 / 3, 8);
  });

  it('applyAttention multiplies weights with values', () => {
    const weights = [
      [1, 0],
      [0.25, 0.75],
    ];

    const v = [
      [2, 4],
      [10, 20],
    ];

    expect(applyAttention(weights, v)).toEqual([
      [2, 4],
      [8, 16],
    ]);
  });

  it('selfAttention combines attentionWeights + applyAttention', () => {
    const q = [[1], [1], [1]];
    const k = [[1], [1], [1]];
    const v = [[10], [20], [40]];

    const out = selfAttention(q, k, v, true);

    expect(out[0]![0]).toBeCloseTo(10, 8);
    expect(out[1]![0]).toBeCloseTo(15, 8);
    expect(out[2]![0]).toBeCloseTo(70 / 3, 8);
  });

  it('throws on shape mismatch', () => {
    expect(() => attentionWeights([[1, 2]], [[1]], true)).toThrow(RangeError);
    expect(() =>
      applyAttention(
        [
          [1, 0],
          [0, 1],
        ],
        [[1]],
      ),
    ).toThrow(RangeError);
  });
});
