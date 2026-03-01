/**
 * MicroGPT Challenge - Step 1 (math building blocks)
 *
 * These are core numerical utilities you'll need later.
 */

/**
 * Numerically stable softmax.
 */
export function softmax(logits: readonly number[]): number[] {
  throw new Error('Not implemented');
}

/**
 * Sample index from a probability distribution using randomValue in [0, 1).
 *
 * Example: probs [0.1, 0.2, 0.7]
 * - randomValue 0.05 -> 0
 * - randomValue 0.25 -> 1
 * - randomValue 0.95 -> 2
 */
export function sampleFromDistribution(
  probs: readonly number[],
  randomValue: number,
): number {
  throw new Error('Not implemented');
}

/**
 * Matrix multiply A (m x n) * B (n x p) -> (m x p)
 * Throw RangeError on shape mismatch.
 */
export function matMul(
  a: readonly (readonly number[])[],
  b: readonly (readonly number[])[],
): number[][] {
  throw new Error('Not implemented');
}
