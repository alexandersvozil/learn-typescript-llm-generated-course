/**
 * MicroGPT Challenge - Step 7 (tokenizer + BOS handling)
 */

export type CharTokenizer = {
  chars: readonly string[];
  stoi: Readonly<Record<string, number>>;
  bosId: number;
  vocabSize: number;
};

/**
 * Build a character-level tokenizer from documents.
 *
 * - chars should be sorted ascending
 * - token ids for chars are 0..chars.length-1
 * - bosId is chars.length
 * - vocabSize is chars.length + 1
 */
export function buildCharTokenizer(docs: readonly string[]): CharTokenizer {
  throw new Error('Not implemented');
}

/**
 * Encode a string into token ids using the tokenizer.
 * Throw RangeError if a character is unknown.
 */
export function encode(doc: string, tokenizer: CharTokenizer): number[] {
  throw new Error('Not implemented');
}

/**
 * Decode token ids back into a string.
 *
 * BOS tokens should be ignored.
 * Throw RangeError on invalid token ids.
 */
export function decode(tokenIds: readonly number[], tokenizer: CharTokenizer): string {
  throw new Error('Not implemented');
}

/**
 * Add BOS on both sides of a token sequence.
 *
 * Example: [2, 3] with bosId=9 -> [9, 2, 3, 9]
 */
export function surroundWithBos(
  tokenIds: readonly number[],
  bosId: number,
): number[] {
  throw new Error('Not implemented');
}
