/**
 * MicroGPT Challenge - Step 6 (loss + token selection)
 */

/**
 * Cross-entropy loss for one step.
 *
 * logits shape: [vocabSize]
 * targetIndex in [0, vocabSize)
 */
export function crossEntropyFromLogits(
  logits: readonly number[],
  targetIndex: number,
): number {
  throw new Error('Not implemented');
}

/**
 * Average cross-entropy over sequence.
 *
 * logitsPerStep shape: [T][vocabSize]
 * targets shape: [T]
 */
export function averageSequenceLoss(
  logitsPerStep: readonly (readonly number[])[],
  targets: readonly number[],
): number {
  throw new Error('Not implemented');
}

/**
 * Sample a token index from logits + random value in [0, 1).
 */
export function sampleTokenFromLogits(
  logits: readonly number[],
  randomValue: number,
): number {
  throw new Error('Not implemented');
}

/**
 * Greedy decode: argmax(logits), first index wins ties.
 */
export function greedyTokenFromLogits(logits: readonly number[]): number {
  throw new Error('Not implemented');
}
