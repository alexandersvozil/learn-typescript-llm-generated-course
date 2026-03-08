import { describe, expect, it } from 'vitest';

import { Value } from '../../src/microgpt/08_autograd';
import {
  adamStep,
  createAdamState,
  flattenParams,
  learningRateAtStep,
} from '../../src/microgpt/09_optimizer';

describe('microgpt step 9 - optimizer', () => {
  it('flattenParams flattens matrices in insertion and row-major order', () => {
    const stateDict = {
      a: [[new Value(1), new Value(2)]],
      b: [[new Value(3)], [new Value(4)]],
    };

    expect(flattenParams(stateDict).map((p) => p.data)).toEqual([1, 2, 3, 4]);
  });

  it('createAdamState allocates zero-filled buffers', () => {
    expect(createAdamState(3)).toEqual({
      m: [0, 0, 0],
      v: [0, 0, 0],
    });
  });

  it('learningRateAtStep applies linear decay', () => {
    expect(learningRateAtStep(0.1, 0, 10)).toBeCloseTo(0.1, 8);
    expect(learningRateAtStep(0.1, 5, 10)).toBeCloseTo(0.05, 8);
  });

  it('adamStep updates parameters opposite the gradient and clears grads', () => {
    const p = new Value(1);
    p.grad = 2;

    const state = createAdamState(1);
    adamStep([p], state, 0, 0.1);

    expect(p.data).toBeCloseTo(0.9, 6);
    expect(p.grad).toBeCloseTo(0, 8);
  });

  it('adamStep leaves a zero-gradient parameter unchanged', () => {
    const p = new Value(1);

    const state = createAdamState(1);
    adamStep([p], state, 0, 0.1);

    expect(p.data).toBeCloseTo(1, 8);
    expect(p.grad).toBeCloseTo(0, 8);
  });
});
