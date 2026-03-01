/**
 * Challenge 2: generics + collections
 */

/**
 * Split items into chunks of `size`.
 * Throw RangeError if size <= 0.
 */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new RangeError('size must be > 0');
  }

  throw new Error('Not implemented');
}

/**
 * Group items by a computed key.
 */
export function groupBy<T, K extends PropertyKey>(
  items: readonly T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  throw new Error('Not implemented');
}

/**
 * Build an object index by key.
 * If duplicate keys exist, last item wins.
 */
export function indexBy<T, K extends PropertyKey>(
  items: readonly T[],
  keyFn: (item: T) => K,
): Record<K, T> {
  throw new Error('Not implemented');
}
