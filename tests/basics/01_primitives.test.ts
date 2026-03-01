import { describe, expect, it } from 'vitest';

import { clamp, parsePort } from '../../src/challenges/01_primitives';

describe('challenge 01 - primitives', () => {
  describe('clamp', () => {
    it('returns min when below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('returns max when above range', () => {
      expect(clamp(999, 0, 10)).toBe(10);
    });

    it('returns value when in range', () => {
      expect(clamp(7, 0, 10)).toBe(7);
    });

    it('throws when min > max', () => {
      expect(() => clamp(1, 5, 4)).toThrow(RangeError);
    });
  });

  describe('parsePort', () => {
    it('parses valid ports', () => {
      expect(parsePort('80')).toBe(80);
      expect(parsePort(' 443 ')).toBe(443);
      expect(parsePort('00022')).toBe(22);
      expect(parsePort('65535')).toBe(65535);
    });

    it('returns null for invalid input', () => {
      expect(parsePort('')).toBeNull();
      expect(parsePort('0')).toBeNull();
      expect(parsePort('65536')).toBeNull();
      expect(parsePort('12.3')).toBeNull();
      expect(parsePort('abc')).toBeNull();
      expect(parsePort('-1')).toBeNull();
    });
  });
});
