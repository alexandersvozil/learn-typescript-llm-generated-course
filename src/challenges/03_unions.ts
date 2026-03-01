/**
 * Challenge 3: discriminated unions + unknown
 */

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Map successful value, keep errors unchanged.
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  throw new Error('Not implemented');
}

/**
 * Return value if ok, otherwise fallback.
 */
export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  throw new Error('Not implemented');
}

/**
 * Parse JSON string into a plain object.
 *
 * Error messages:
 * - invalid JSON: "Invalid JSON"
 * - parsed value is not a non-null object OR is an array:
 *   "JSON value is not an object"
 */
export function parseJsonObject(
  input: string,
): Result<Record<string, unknown>, string> {
  throw new Error('Not implemented');
}
