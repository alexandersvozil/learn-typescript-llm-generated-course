/**
 * MicroGPT Challenge - Step 2 (NN layers)
 */

/**
 * GELU approximation used in GPT-style models.
 */
export function gelu(x: number): number {
  throw new Error('Not implemented');
}

/**
 * LayerNorm for a single vector.
 *
 * y[i] = gain[i] * ((x[i] - mean(x)) / sqrt(var(x) + eps)) + bias[i]
 */
export function layerNorm(
  x: readonly number[],
  gain: readonly number[],
  bias: readonly number[],
  eps = 1e-5,
): number[] {
  throw new Error('Not implemented');
}

/**
 * Linear layer for a single input vector.
 *
 * weight shape: [outFeatures][inFeatures]
 * bias shape: [outFeatures]
 *
 * output[o] = dot(weight[o], x) + bias[o]
 */
export function linear(
  x: readonly number[],
  weight: readonly (readonly number[])[],
  bias: readonly number[],
): number[] {
  throw new Error('Not implemented');
}
