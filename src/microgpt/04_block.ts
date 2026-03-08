/**
 * MicroGPT Challenge - Step 4 (transformer block)
 */

/**
 * Elementwise residual add between two [T][D] tensors.
 * Throw RangeError on shape mismatch.
 */
export function residualAdd(
  x: readonly (readonly number[])[],
  delta: readonly (readonly number[])[],
): number[][] {
  throw new Error('Not implemented');
}

/**
 * Position-wise MLP over each token row:
 * linear -> GELU -> linear
 */
export function mlp(
  x: readonly (readonly number[])[],
  fcWeight: readonly (readonly number[])[],
  fcBias: readonly number[],
  projWeight: readonly (readonly number[])[],
  projBias: readonly number[],
): number[][] {
  throw new Error('Not implemented');
}

export type BlockParams = {
  ln1Gain: readonly number[];
  ln1Bias: readonly number[];
  ln2Gain: readonly number[];
  ln2Bias: readonly number[];
  fcWeight: readonly (readonly number[])[];
  fcBias: readonly number[];
  projWeight: readonly (readonly number[])[];
  projBias: readonly number[];
};

/**
 * Pre-norm transformer block:
 * 1) ln1 -> attention -> residual
 * 2) ln2 -> mlp -> residual
 */
export function transformerBlock(
  x: readonly (readonly number[])[],
  params: BlockParams,
  attentionFn: (normalized: readonly (readonly number[])[]) => number[][],
): number[][] {
  throw new Error('Not implemented');
}
