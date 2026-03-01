/**
 * Challenge 4: async + errors + retries
 */

export class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Resolve after ms milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  throw new Error('Not implemented');
}

/**
 * Resolve/reject with `promise`, but reject with TimeoutError if it does not
 * settle within `timeoutMs`.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  throw new Error('Not implemented');
}

/**
 * Retry async operation up to `attempts` times.
 *
 * - attempts must be >= 1 (throw RangeError otherwise)
 * - wait delayMs between failed attempts
 * - if all attempts fail, rethrow the last error
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number,
  delayMs: number,
): Promise<T> {
  if (attempts < 1) {
    throw new RangeError('attempts must be >= 1');
  }

  throw new Error('Not implemented');
}
