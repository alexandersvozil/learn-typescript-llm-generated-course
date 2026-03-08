/**
 * MicroGPT Challenge - Step 3 (attention building blocks)
 */

/**
 * Create a lower-triangular causal mask.
 *
 * mask[t][s] is true when token position t may attend to source position s.
 * For causal attention this means s <= t.
 */
export function causalMask(seqLen: number): boolean[][] {
  if (seqLen < 1) {
    throw new RangeError('seqLen must be >= 1');
  }

  throw new Error('Not implemented');
}

/**
 * Compute scaled dot-product attention weights.
 *
 * q shape: [T][D]
 * k shape: [T][D]
 * output shape: [T][T]
 *
 * If causal=true, future positions must have probability 0.
 */
export function attentionWeights(
  q: readonly (readonly number[])[],
  k: readonly (readonly number[])[],
  causal = true,
): number[][] {
  throw new Error('Not implemented');
}

/**
 * Apply attention weights to values.
 *
 * weights shape: [T][T]
 * v shape: [T][Dv]
 * output shape: [T][Dv]
 */
export function applyAttention(
  weights: readonly (readonly number[])[],
  v: readonly (readonly number[])[],
): number[][] {
  throw new Error('Not implemented');
}

/**
 * Full single-head self-attention helper:
 * attentionWeights(q, k, causal) -> applyAttention(weights, v)
 */
export function selfAttention(
  q: readonly (readonly number[])[],
  k: readonly (readonly number[])[],
  v: readonly (readonly number[])[],
  causal = true,
): number[][] {
  throw new Error('Not implemented');
}
