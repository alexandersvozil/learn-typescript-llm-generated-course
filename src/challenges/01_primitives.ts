/**
 * Challenge 1: primitives + unions
 */

/**
 * Return value clamped to [min, max].
 * Throw RangeError if min > max.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError('min must be <= max');
  }

  throw new Error('Not implemented');
}

/**
 * Parse a TCP port from string.
 *
 * Rules:
 * - trim whitespace
 * - digits only
 * - valid range: 1..65535
 * - return null for invalid input
 */
export function parsePort(input: string): number | null {
  throw new Error('Not implemented');
}
