/**
 * MicroGPT Challenge - Step 9 (optimizer helpers)
 */

import { Value } from './08_autograd'

export type ValueMatrix = readonly (readonly Value[])[];
export type ValueStateDict = Readonly<Record<string, ValueMatrix>>;

export type AdamState = {
  m: number[];
  v: number[];
};

/**
 * Flatten a state dict of matrices into a single parameter list.
 * Preserve object insertion order, then row order, then column order.
 */
export function flattenParams(stateDict: ValueStateDict): Value[] {
  throw new Error('Not implemented');
}

/**
 * Allocate zero-filled Adam buffers for a parameter list of the given size.
 */
export function createAdamState(paramCount: number): AdamState {
  throw new Error('Not implemented');
}

/**
 * Linear learning-rate decay used by the microgpt gist.
 *
 * lr_t = baseLearningRate * (1 - step / numSteps)
 */
export function learningRateAtStep(
  baseLearningRate: number,
  step: number,
  numSteps: number,
): number {
  throw new Error('Not implemented');
}

/**
 * One Adam update step over all parameters.
 *
 * - step is zero-based
 * - update params in place via param.data
 * - use param.grad as the current gradient
 * - reset param.grad to 0 after the update
 */
export function adamStep(
  params: readonly Value[],
  state: AdamState,
  step: number,
  learningRate: number,
  beta1 = 0.85,
  beta2 = 0.99,
  eps = 1e-8,
): void {
  void params;
  void state;
  void step;
  void learningRate;
  void beta1;
  void beta2;
  void eps;
  throw new Error('Not implemented');
}
