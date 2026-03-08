import { describe, expect, it } from 'vitest';

import {
  mlp,
  residualAdd,
  transformerBlock,
  type BlockParams,
} from '../../src/microgpt/04_block';

function geluApprox(x: number): number {
  return (
    0.5 *
    x *
    (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)))
  );
}

describe('microgpt step 4 - transformer block', () => {
  it('residualAdd adds elementwise', () => {
    expect(
      residualAdd(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [10, 20],
          [30, 40],
        ],
      ),
    ).toEqual([
      [11, 22],
      [33, 44],
    ]);
  });

  it('residualAdd throws on shape mismatch', () => {
    expect(() => residualAdd([[1, 2]], [[1]])).toThrow(RangeError);
  });

  it('mlp applies linear -> GELU -> linear per row', () => {
    const out = mlp(
      [[1, -1]],
      [
        [1, 0],
        [0, 1],
      ],
      [0, 0],
      [
        [1, 0],
        [0, 1],
      ],
      [0, 0],
    );

    expect(out[0]![0]).toBeCloseTo(geluApprox(1), 7);
    expect(out[0]![1]).toBeCloseTo(geluApprox(-1), 7);
  });

  it('transformerBlock preserves zeros with zero attention + zero mlp', () => {
    const x = [
      [0, 0],
      [0, 0],
    ];

    const params: BlockParams = {
      ln1Gain: [1, 1],
      ln1Bias: [0, 0],
      ln2Gain: [1, 1],
      ln2Bias: [0, 0],
      fcWeight: [
        [0, 0],
        [0, 0],
      ],
      fcBias: [0, 0],
      projWeight: [
        [0, 0],
        [0, 0],
      ],
      projBias: [0, 0],
    };

    const out = transformerBlock(x, params, (normalized) =>
      normalized.map((row) => row.map(() => 0)),
    );

    expect(out).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it('transformerBlock applies first residual from attention output', () => {
    const x = [
      [0, 0],
      [0, 0],
    ];

    const params: BlockParams = {
      ln1Gain: [1, 1],
      ln1Bias: [0, 0],
      ln2Gain: [1, 1],
      ln2Bias: [0, 0],
      fcWeight: [
        [0, 0],
        [0, 0],
      ],
      fcBias: [0, 0],
      projWeight: [
        [0, 0],
        [0, 0],
      ],
      projBias: [0, 0],
    };

    const out = transformerBlock(x, params, () => [
      [1, 2],
      [3, 4],
    ]);

    expect(out).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('transformerBlock throws if attention output shape mismatches x', () => {
    const params: BlockParams = {
      ln1Gain: [1, 1],
      ln1Bias: [0, 0],
      ln2Gain: [1, 1],
      ln2Bias: [0, 0],
      fcWeight: [
        [0, 0],
        [0, 0],
      ],
      fcBias: [0, 0],
      projWeight: [
        [0, 0],
        [0, 0],
      ],
      projBias: [0, 0],
    };

    expect(() => transformerBlock([[0, 0]], params, () => [[1]])).toThrow(
      RangeError,
    );
  });
});
