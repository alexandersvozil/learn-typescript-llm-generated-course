/**
 * MicroGPT Challenge - Step 10 (Karpathy-style model pieces)
 */

import { Value } from './08_autograd'

export type LayerWeights = {
  attnWq: Value[][];
  attnWk: Value[][];
  attnWv: Value[][];
  attnWo: Value[][];
  mlpFc1: Value[][];
  mlpFc2: Value[][];
};

export type KarpathyMicroGpt = {
  wte: Value[][];
  wpe: Value[][];
  lmHead: Value[][];
  layers: LayerWeights[];
  nHead: number;
};

export type LayerCache = {
  keys: Value[][];
  values: Value[][];
};

export type AttentionCache = LayerCache[];

/**
 * Bias-free linear layer for Value vectors.
 *
 * w shape: [outFeatures][inFeatures]
 */
export function linearNoBias(
  x: readonly Value[],
  w: readonly (readonly Value[])[],
): Value[] {
  void x;
  void w;
  throw new Error('Not implemented');
}

/**
 * Numerically stable softmax over Value logits.
 */
export function softmaxValues(logits: readonly Value[]): Value[] {
  void logits;
  throw new Error('Not implemented');
}

/**
 * RMSNorm for a single vector.
 *
 * y[i] = x[i] * (mean(x^2) + eps)^-0.5
 */
export function rmsNorm(x: readonly Value[], eps = 1e-5): Value[] {
  void x;
  void eps;
  throw new Error('Not implemented');
}

/**
 * Split a flat embedding vector into heads.
 * Throw RangeError if x.length is not divisible by nHead.
 */
export function splitHeads(
  x: readonly Value[],
  nHead: number,
): Value[][] {
  void x;
  void nHead;
  throw new Error('Not implemented');
}

/**
 * Concatenate head vectors back into one flat vector.
 */
export function concatHeads(
  heads: readonly (readonly Value[])[],
): Value[] {
  void heads;
  throw new Error('Not implemented');
}

/**
 * Create one empty key/value cache entry per layer.
 */
export function createEmptyCache(nLayer: number): AttentionCache {
  void nLayer;
  throw new Error('Not implemented');
}

/**
 * One autoregressive GPT step.
 *
 * - look up token + position embeddings
 * - apply the Karpathy-style transformer layers
 * - append current keys/values into the cache
 * - return logits over the vocabulary
 */
export function gptStep(
  tokenId: number,
  posId: number,
  model: KarpathyMicroGpt,
  cache: AttentionCache,
): Value[] {
  void tokenId;
  void posId;
  void model;
  void cache;
  throw new Error('Not implemented');
}
