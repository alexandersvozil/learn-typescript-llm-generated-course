import { describe, expect, it } from 'vitest';

import {
  buildCharTokenizer,
  decode,
  encode,
  surroundWithBos,
} from '../../src/microgpt/07_tokenizer';

describe('microgpt step 7 - tokenizer', () => {
  it('buildCharTokenizer creates sorted chars and BOS metadata', () => {
    const tokenizer = buildCharTokenizer(['cab', 'abba']);

    expect(tokenizer.chars).toEqual(['a', 'b', 'c']);
    expect(tokenizer.stoi).toEqual({ a: 0, b: 1, c: 2 });
    expect(tokenizer.bosId).toBe(3);
    expect(tokenizer.vocabSize).toBe(4);
  });

  it('encode and decode round-trip strings', () => {
    const tokenizer = buildCharTokenizer(['cab']);
    const tokenIds = encode('cab', tokenizer);

    expect(tokenIds).toEqual([2, 0, 1]);
    expect(decode(tokenIds, tokenizer)).toBe('cab');
  });

  it('decode ignores BOS tokens', () => {
    const tokenizer = buildCharTokenizer(['ab']);

    expect(decode([tokenizer.bosId, 0, 1, tokenizer.bosId], tokenizer)).toBe('ab');
  });

  it('surroundWithBos adds BOS on both sides', () => {
    expect(surroundWithBos([2, 5], 9)).toEqual([9, 2, 5, 9]);
  });

  it('throws on unknown chars or invalid token ids', () => {
    const tokenizer = buildCharTokenizer(['ab']);

    expect(() => encode('ac', tokenizer)).toThrow(RangeError);
    expect(() => decode([0, 99], tokenizer)).toThrow(RangeError);
  });
});
