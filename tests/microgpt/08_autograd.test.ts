import { describe, expect, it } from 'vitest';

import { Value } from '../../src/microgpt/08_autograd';

describe('microgpt step 8 - autograd', () => {
  it('add computes data and propagates unit gradients', () => {
    const x = new Value(2);
    const y = new Value(3);
    const z = x.add(y);

    expect(z.data).toBe(5);

    z.backward();

    expect(x.grad).toBeCloseTo(1, 8);
    expect(y.grad).toBeCloseTo(1, 8);
  });

  it('mul computes data and product-rule gradients', () => {
    const x = new Value(2);
    const y = new Value(3);
    const z = x.mul(y);

    expect(z.data).toBe(6);

    z.backward();

    expect(x.grad).toBeCloseTo(3, 8);
    expect(y.grad).toBeCloseTo(2, 8);
  });

  it('accumulates gradients when a node is reused', () => {
    const x = new Value(4);
    const y = x.mul(x);

    y.backward();

    expect(x.grad).toBeCloseTo(8, 8);
  });

  it('applies the chain rule through composed expressions', () => {
    const x = new Value(2);
    const y = new Value(3);
    const z = x.mul(y).add(x);

    z.backward();

    expect(x.grad).toBeCloseTo(4, 8);
    expect(y.grad).toBeCloseTo(2, 8);
  });

  it('relu blocks gradients for negative inputs', () => {
    const x = new Value(-2);
    const y = x.relu();

    expect(y.data).toBe(0);

    y.backward();

    expect(x.grad).toBeCloseTo(0, 8);
  });

  it('exp and log compose back to the identity on positive inputs', () => {
    const x = new Value(2);
    const y = x.exp().log();

    expect(y.data).toBeCloseTo(2, 8);

    y.backward();

    expect(x.grad).toBeCloseTo(1, 8);
  });
});
