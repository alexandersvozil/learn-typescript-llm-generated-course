import { describe, expect, it } from 'vitest';

import {
  chunk,
  groupBy,
  indexBy,
} from '../../src/challenges/02_collections';

describe('challenge 02 - collections', () => {
  describe('chunk', () => {
    it('chunks arrays by size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk(['a', 'b', 'c'], 3)).toEqual([['a', 'b', 'c']]);
      expect(chunk([], 4)).toEqual([]);
    });

    it('throws for invalid size', () => {
      expect(() => chunk([1, 2], 0)).toThrow(RangeError);
      expect(() => chunk([1, 2], -1)).toThrow(RangeError);
    });
  });

  describe('groupBy', () => {
    it('groups by key function', () => {
      const users = [
        { id: 1, role: 'admin' as const },
        { id: 2, role: 'user' as const },
        { id: 3, role: 'admin' as const },
      ];

      expect(groupBy(users, (u) => u.role)).toEqual({
        admin: [
          { id: 1, role: 'admin' },
          { id: 3, role: 'admin' },
        ],
        user: [{ id: 2, role: 'user' }],
      });
    });
  });

  describe('indexBy', () => {
    it('indexes by key and lets last duplicate win', () => {
      const rows = [
        { id: 1, name: 'first' },
        { id: 2, name: 'second' },
        { id: 1, name: 'last' },
      ];

      expect(indexBy(rows, (r) => r.id)).toEqual({
        1: { id: 1, name: 'last' },
        2: { id: 2, name: 'second' },
      });
    });
  });
});
