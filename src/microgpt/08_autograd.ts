/**
 * MicroGPT Challenge - Step 8 (scalar autograd)
 */

export class Value {
  data: number;
  grad: number;
  private readonly _children: readonly Value[];
  private readonly _localGrads: readonly number[];

  constructor(
    data: number,
    children: readonly Value[] = [],
    localGrads: readonly number[] = [],
  ) {
    this.data = data;
    this.grad = 0;
    this._children = children;
    this._localGrads = localGrads;
  }

  add(other: Value | number): Value {
    void other;
    throw new Error('Not implemented');
  }

  mul(other: Value | number): Value {
    void other;
    throw new Error('Not implemented');
  }

  pow(exponent: number): Value {
    void exponent;
    throw new Error('Not implemented');
  }

  exp(): Value {
    throw new Error('Not implemented');
  }

  log(): Value {
    throw new Error('Not implemented');
  }

  relu(): Value {
    throw new Error('Not implemented');
  }

  neg(): Value {
    throw new Error('Not implemented');
  }

  sub(other: Value | number): Value {
    void other;
    throw new Error('Not implemented');
  }

  div(other: Value | number): Value {
    void other;
    throw new Error('Not implemented');
  }

  backward(): void {
    throw new Error('Not implemented');
  }
}
