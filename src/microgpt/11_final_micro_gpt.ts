/**
 * MicroGPT Challenge - Step 11 (full micro GPT assembly)
 */

import type { CharTokenizer } from './07_tokenizer'
import { Value } from './08_autograd'
import type { AdamState } from './09_optimizer'
import type { KarpathyMicroGpt } from './10_karpathy_model'

export type MicroGptConfig = {
  vocabSize: number;
  blockSize: number;
  nLayer: number;
  nEmbd: number;
  nHead: number;
};

/**
 * Initialize all model weights with randomNormal(std).
 *
 * Shapes should follow the Karpathy gist:
 * - wte: [vocabSize][nEmbd]
 * - wpe: [blockSize][nEmbd]
 * - lmHead: [vocabSize][nEmbd]
 * - per layer:
 *   - attnWq/attnWk/attnWv/attnWo: [nEmbd][nEmbd]
 *   - mlpFc1: [4 * nEmbd][nEmbd]
 *   - mlpFc2: [nEmbd][4 * nEmbd]
 */
export function initMicroGpt(
  config: MicroGptConfig,
  randomNormal: (std: number) => number,
  std = 0.08,
): KarpathyMicroGpt {
  void config;
  void randomNormal;
  void std;
  throw new Error('Not implemented');
}

/**
 * Flatten all model parameters into one list.
 *
 * Order:
 * - all of `wte`
 * - all of `wpe`
 * - all of `lmHead`
 * - for each layer in order:
 *   - `attnWq`
 *   - `attnWk`
 *   - `attnWv`
 *   - `attnWo`
 *   - `mlpFc1`
 *   - `mlpFc2`
 */
export function modelParameters(model: KarpathyMicroGpt): Value[] {
  void model;
  throw new Error('Not implemented');
}

/**
 * Average next-token cross-entropy over a token sequence.
 *
 * tokenIds should typically already include BOS on both sides.
 * The loss averages predictions for tokenIds[t] -> tokenIds[t + 1].
 */
export function sequenceLoss(
  model: KarpathyMicroGpt,
  tokenIds: readonly number[],
): Value {
  void model;
  void tokenIds;
  throw new Error('Not implemented');
}

/**
 * Full training step:
 * - compute sequence loss
 * - backward pass
 * - Adam update with linear lr decay
 * - return the scalar loss value before the update
 */
export function trainStep(
  model: KarpathyMicroGpt,
  optimizerState: AdamState,
  tokenIds: readonly number[],
  step: number,
  numSteps: number,
  baseLearningRate: number,
): number {
  void model;
  void optimizerState;
  void tokenIds;
  void step;
  void numSteps;
  void baseLearningRate;
  throw new Error('Not implemented');
}

/**
 * Autoregressively generate text until BOS is sampled again or maxLen is reached.
 *
 * randomValues supplies deterministic sampling values in [0, 1).
 */
export function generate(
  model: KarpathyMicroGpt,
  tokenizer: CharTokenizer,
  maxLen: number,
  temperature: number,
  randomValues: readonly number[],
): string {
  void model;
  void tokenizer;
  void maxLen;
  void temperature;
  void randomValues;
  throw new Error('Not implemented');
}
