import { describe, expect, it } from 'vitest';

import {
  mapResult,
  parseJsonObject,
  unwrapOr,
  type Result,
} from '../../src/challenges/03_unions';

describe('challenge 03 - unions', () => {
  it('mapResult maps ok values', () => {
    const input: Result<number, string> = { ok: true, value: 21 };
    const out = mapResult(input, (x) => x * 2);
    expect(out).toEqual({ ok: true, value: 42 });
  });

  it('mapResult preserves error values', () => {
    const input: Result<number, string> = { ok: false, error: 'boom' };
    const out = mapResult(input, (x) => x * 2);
    expect(out).toEqual({ ok: false, error: 'boom' });
  });

  it('unwrapOr returns fallback on errors', () => {
    expect(unwrapOr({ ok: true, value: 1 }, 999)).toBe(1);
    expect(unwrapOr({ ok: false, error: 'x' }, 999)).toBe(999);
  });

  it('parseJsonObject handles valid object JSON', () => {
    const out = parseJsonObject('{"x":1,"y":"ok"}');
    expect(out.ok).toBe(true);
    if (out.ok) {
      expect(out.value).toEqual({ x: 1, y: 'ok' });
    }
  });

  it('parseJsonObject rejects invalid JSON', () => {
    expect(parseJsonObject('{')).toEqual({ ok: false, error: 'Invalid JSON' });
  });

  it('parseJsonObject rejects non-object JSON values', () => {
    expect(parseJsonObject('42')).toEqual({
      ok: false,
      error: 'JSON value is not an object',
    });

    expect(parseJsonObject('null')).toEqual({
      ok: false,
      error: 'JSON value is not an object',
    });

    expect(parseJsonObject('[1,2,3]')).toEqual({
      ok: false,
      error: 'JSON value is not an object',
    });
  });
});
