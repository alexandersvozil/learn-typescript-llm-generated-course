/**
 * MicroGPT Challenge - Step 5 (model assembly)
 */

export type HiddenState = readonly (readonly number[])[];

/**
 * Lookup embeddings for token IDs.
 *
 * embeddingTable shape: [vocabSize][dModel]
 * output shape: [T][dModel]
 */
export function embeddingLookup(
  tokenIds: readonly number[],
  embeddingTable: readonly (readonly number[])[],
): number[][] {
  throw new Error('Not implemented');
}

/**
 * Add token and positional embeddings.
 *
 * tokenEmbeddings shape: [T][dModel]
 * positionEmbeddings shape: [T][dModel]
 */
export function addPositionEmbeddings(
  tokenEmbeddings: readonly (readonly number[])[],
  positionEmbeddings: readonly (readonly number[])[],
): number[][] {
  throw new Error('Not implemented');
}

/**
 * Project hidden states to logits using tied embeddings.
 *
 * hiddenStates shape: [T][dModel]
 * embeddingTable shape: [vocabSize][dModel]
 * output logits shape: [T][vocabSize]
 */
export function projectLogits(
  hiddenStates: readonly (readonly number[])[],
  embeddingTable: readonly (readonly number[])[],
): number[][] {
  throw new Error('Not implemented');
}

/**
 * Run transformer blocks in sequence.
 */
export function runBlocks(
  hiddenStates: readonly (readonly number[])[],
  blocks: readonly ((x: readonly (readonly number[])[]) => number[][])[],
): number[][] {
  throw new Error('Not implemented');
}

/**
 * End-to-end tiny forward pass:
 * tokens -> token emb lookup -> + pos emb -> blocks -> logits
 */
export function forwardTinyGpt(
  tokenIds: readonly number[],
  tokenEmbeddingTable: readonly (readonly number[])[],
  positionEmbeddingTable: readonly (readonly number[])[],
  blocks: readonly ((x: readonly (readonly number[])[]) => number[][])[],
): number[][] {
  throw new Error('Not implemented');
}
