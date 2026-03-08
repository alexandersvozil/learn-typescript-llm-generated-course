import { describe, expect, it } from 'vitest';

import { buildCharTokenizer, encode, surroundWithBos } from '../../src/microgpt/07_tokenizer';
import { Value } from '../../src/microgpt/08_autograd';
import { createAdamState } from '../../src/microgpt/09_optimizer';
import type { KarpathyMicroGpt } from '../../src/microgpt/10_karpathy_model';
import {
  generate,
  initMicroGpt,
  modelParameters,
  sequenceLoss,
  trainStep,
} from '../../src/microgpt/11_final_micro_gpt';

function values(rows: readonly (readonly number[])[]): Value[][] {
  return rows.map((row) => row.map((x) => new Value(x)));
}

describe('microgpt step 11 - final micro gpt', () => {
  it('initMicroGpt creates correctly shaped parameter matrices', () => {
    const model = initMicroGpt(
      {
        vocabSize: 3,
        blockSize: 4,
        nLayer: 2,
        nEmbd: 6,
        nHead: 2,
      },
      () => 0,
    );

    expect(model.wte).toHaveLength(3);
    expect(model.wte[0]).toHaveLength(6);
    expect(model.wpe).toHaveLength(4);
    expect(model.wpe[0]).toHaveLength(6);
    expect(model.lmHead).toHaveLength(3);
    expect(model.lmHead[0]).toHaveLength(6);
    expect(model.layers).toHaveLength(2);
    expect(model.layers[0]!.attnWq).toHaveLength(6);
    expect(model.layers[0]!.attnWq[0]).toHaveLength(6);
    expect(model.layers[0]!.mlpFc1).toHaveLength(24);
    expect(model.layers[0]!.mlpFc1[0]).toHaveLength(6);
    expect(model.layers[0]!.mlpFc2).toHaveLength(6);
    expect(model.layers[0]!.mlpFc2[0]).toHaveLength(24);
  });

  it('modelParameters flattens all matrices into a stable list', () => {
    const model: KarpathyMicroGpt = {
      wte: values([[1, 2]]),
      wpe: values([[3, 4]]),
      lmHead: values([[5, 6]]),
      layers: [
        {
          attnWq: values([[7]]),
          attnWk: values([[8]]),
          attnWv: values([[9]]),
          attnWo: values([[10]]),
          mlpFc1: values([[11]]),
          mlpFc2: values([[12]]),
        },
      ],
      nHead: 1,
    };

    expect(modelParameters(model).map((p) => p.data)).toEqual([
      1, 2,
      3, 4,
      5, 6,
      7,
      8,
      9,
      10,
      11,
      12,
    ]);
  });

  it('sequenceLoss matches uniform-logit loss on a zero-layer model', () => {
    const tokenizer = buildCharTokenizer(['a']);
    const tokenIds = surroundWithBos(encode('a', tokenizer), tokenizer.bosId);

    const model: KarpathyMicroGpt = {
      wte: values([
        [0, 0],
        [0, 0],
      ]),
      wpe: values([
        [0, 0],
        [0, 0],
        [0, 0],
      ]),
      lmHead: values([
        [0, 0],
        [0, 0],
      ]),
      layers: [],
      nHead: 1,
    };

    expect(sequenceLoss(model, tokenIds).data).toBeCloseTo(Math.log(2), 8);
  });

  it('trainStep decreases loss on a tiny repeated sequence', () => {
    const tokenizer = buildCharTokenizer(['a']);
    const tokenIds = surroundWithBos(encode('a', tokenizer), tokenizer.bosId);

    const model: KarpathyMicroGpt = {
      wte: values([
        [1, 0],
        [0, 1],
      ]),
      wpe: values([
        [0, 0],
        [0, 0],
        [0, 0],
      ]),
      lmHead: values([
        [0, 0],
        [0, 0],
      ]),
      layers: [],
      nHead: 1,
    };

    const optimizerState = createAdamState(modelParameters(model).length);
    const initialLoss = sequenceLoss(model, tokenIds).data;

    for (let step = 0; step < 20; step++) {
      trainStep(model, optimizerState, tokenIds, step, 20, 0.1);
    }

    const finalLoss = sequenceLoss(model, tokenIds).data;
    expect(finalLoss).toBeLessThan(initialLoss);
  });

  it('generate samples until BOS is produced again', () => {
    const tokenizer = buildCharTokenizer(['a']);

    const model: KarpathyMicroGpt = {
      wte: values([
        [0, 1],
        [1, 0],
      ]),
      wpe: values([
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ]),
      lmHead: values([
        [1, 0],
        [0, 1],
      ]),
      layers: [],
      nHead: 1,
    };

    expect(generate(model, tokenizer, 4, 1, [0, 0, 0, 0])).toBe('a');
  });
});
