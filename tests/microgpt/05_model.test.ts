import { describe, expect, it } from 'vitest';

import {
  addPositionEmbeddings,
  embeddingLookup,
  forwardTinyGpt,
  projectLogits,
  runBlocks,
} from '../../src/microgpt/05_model';

describe('microgpt step 5 - model assembly', () => {
  it('embeddingLookup returns embedding rows for token ids', () => {
    const table = [
      [10, 11],
      [20, 21],
      [30, 31],
    ];

    expect(embeddingLookup([2, 0, 1], table)).toEqual([
      [30, 31],
      [10, 11],
      [20, 21],
    ]);
  });

  it('embeddingLookup throws on invalid token id', () => {
    expect(() => embeddingLookup([0, 99], [[1], [2]])).toThrow(RangeError);
  });

  it('addPositionEmbeddings adds elementwise', () => {
    expect(
      addPositionEmbeddings(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [10, 20],
          [30, 40],
        ],
      ),
    ).toEqual([
      [11, 22],
      [33, 44],
    ]);
  });

  it('projectLogits performs tied embedding projection', () => {
    const hidden = [
      [1, 2],
      [3, 4],
    ];

    const table = [
      [1, 0],
      [0, 1],
      [1, 1],
    ];

    expect(projectLogits(hidden, table)).toEqual([
      [1, 2, 3],
      [3, 4, 7],
    ]);
  });

  it('runBlocks applies blocks in sequence', () => {
    const x = [[1, 2]];
    const blocks = [
      (h: readonly (readonly number[])[]) => h.map((row) => row.map((v) => v + 1)),
      (h: readonly (readonly number[])[]) => h.map((row) => row.map((v) => v * 2)),
    ];

    expect(runBlocks(x, blocks)).toEqual([[4, 6]]);
  });

  it('forwardTinyGpt composes embed + pos + blocks + projection', () => {
    const tokenIds = [0, 1];
    const tokenTable = [
      [1, 0],
      [0, 1],
    ];
    const posTable = [
      [0, 0],
      [1, 1],
    ];

    const blocks = [
      (h: readonly (readonly number[])[]) => h.map((row) => row.map((v) => v + 1)),
      (h: readonly (readonly number[])[]) => h.map((row) => row.map((v) => v * 2)),
    ];

    expect(forwardTinyGpt(tokenIds, tokenTable, posTable, blocks)).toEqual([
      [4, 2],
      [4, 6],
    ]);
  });
});
