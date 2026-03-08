import { describe, expect, it } from 'vitest';

import { Value } from '../../src/microgpt/08_autograd';
import {
  concatHeads,
  createEmptyCache,
  gptStep,
  linearNoBias,
  rmsNorm,
  softmaxValues,
  splitHeads,
  type KarpathyMicroGpt,
} from '../../src/microgpt/10_karpathy_model';

function values(rows: readonly (readonly number[])[]): Value[][] {
  return rows.map((row) => row.map((x) => new Value(x)));
}

describe('microgpt step 10 - Karpathy model pieces', () => {
  it('linearNoBias computes Wx for Value vectors', () => {
    const out = linearNoBias(
      [new Value(2), new Value(3)],
      values([
        [1, 0],
        [0, 1],
        [1, 1],
      ]),
    );

    expect(out.map((v) => v.data)).toEqual([2, 3, 5]);
  });

  it('softmaxValues returns positive probabilities that sum to 1', () => {
    const probs = softmaxValues([new Value(1), new Value(2), new Value(3)]);
    const sum = probs.reduce((acc, p) => acc + p.data, 0);

    expect(sum).toBeCloseTo(1, 8);
    expect(probs[2]!.data).toBeGreaterThan(probs[1]!.data);
    expect(probs[1]!.data).toBeGreaterThan(probs[0]!.data);
  });

  it('rmsNorm normalizes a vector to unit RMS', () => {
    const out = rmsNorm([new Value(3), new Value(4)]);
    const meanSquare = out.reduce((acc, v) => acc + v.data ** 2, 0) / out.length;

    expect(meanSquare).toBeCloseTo(1, 6);
  });

  it('splitHeads and concatHeads round-trip a flat vector', () => {
    const x = [1, 2, 3, 4].map((v) => new Value(v));
    const heads = splitHeads(x, 2);

    expect(heads.map((head) => head.map((v) => v.data))).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(concatHeads(heads).map((v) => v.data)).toEqual([1, 2, 3, 4]);
  });

  it('createEmptyCache allocates empty key/value lists per layer', () => {
    expect(createEmptyCache(2)).toEqual([
      { keys: [], values: [] },
      { keys: [], values: [] },
    ]);
  });

  it('gptStep returns logits and appends the current key/value to cache', () => {
    const model: KarpathyMicroGpt = {
      wte: values([
        [1, 1],
        [0, 1],
      ]),
      wpe: values([
        [0, 0],
        [0, 0],
      ]),
      lmHead: values([
        [1, 0],
        [0, 1],
      ]),
      layers: [
        {
          attnWq: values([
            [0, 0],
            [0, 0],
          ]),
          attnWk: values([
            [0, 0],
            [0, 0],
          ]),
          attnWv: values([
            [0, 0],
            [0, 0],
          ]),
          attnWo: values([
            [0, 0],
            [0, 0],
          ]),
          mlpFc1: values([
            [0, 0],
            [0, 0],
          ]),
          mlpFc2: values([
            [0, 0],
            [0, 0],
          ]),
        },
      ],
      nHead: 1,
    };

    const cache = createEmptyCache(1);
    const logits = gptStep(0, 0, model, cache);

    expect(logits.map((v) => v.data)).toEqual([1, 1]);
    expect(cache[0]!.keys).toHaveLength(1);
    expect(cache[0]!.values).toHaveLength(1);
    expect(cache[0]!.keys[0]!.map((v) => v.data)).toEqual([0, 0]);
    expect(cache[0]!.values[0]!.map((v) => v.data)).toEqual([0, 0]);
  });
});
