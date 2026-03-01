import { describe, expect, it, vi } from 'vitest';

import {
  retry,
  sleep,
  TimeoutError,
  withTimeout,
} from '../../src/challenges/04_async';

describe('challenge 04 - async', () => {
  it('sleep resolves after the requested time', async () => {
    vi.useFakeTimers();
    try {
      let done = false;
      const p = sleep(100).then(() => {
        done = true;
      });

      await vi.advanceTimersByTimeAsync(99);
      expect(done).toBe(false);

      await vi.advanceTimersByTimeAsync(1);
      expect(done).toBe(true);

      await p;
    } finally {
      vi.useRealTimers();
    }
  });

  it('withTimeout resolves when promise is fast enough', async () => {
    vi.useFakeTimers();
    try {
      const fast = sleep(20).then(() => 123);
      const p = withTimeout(fast, 100);

      await vi.advanceTimersByTimeAsync(20);
      await expect(p).resolves.toBe(123);
    } finally {
      vi.useRealTimers();
    }
  });

  it('withTimeout rejects with TimeoutError when promise is too slow', async () => {
    vi.useFakeTimers();
    try {
      const slow = sleep(100).then(() => 123);
      const p = withTimeout(slow, 10);

      await vi.advanceTimersByTimeAsync(10);
      await expect(p).rejects.toBeInstanceOf(TimeoutError);
    } finally {
      vi.useRealTimers();
    }
  });

  it('retry retries until success', async () => {
    vi.useFakeTimers();
    try {
      let attempts = 0;
      const p = retry(async () => {
        attempts += 1;
        if (attempts < 3) {
          throw new Error(`fail #${attempts}`);
        }
        return 'ok';
      }, 5, 50);

      let resolved: string | undefined;
      let rejected: unknown;
      p.then((value) => {
        resolved = value;
      }).catch((error) => {
        rejected = error;
      });

      await vi.runAllTimersAsync();

      expect(rejected).toBeUndefined();
      expect(resolved).toBe('ok');
      expect(attempts).toBe(3);
    } finally {
      vi.useRealTimers();
    }
  });

  it('retry throws after last attempt', async () => {
    vi.useFakeTimers();
    try {
      let attempts = 0;
      const p = retry(async () => {
        attempts += 1;
        throw new Error('always fails');
      }, 3, 25);

      let rejected: unknown;
      p.catch((error) => {
        rejected = error;
      });

      await vi.runAllTimersAsync();

      expect(rejected).toBeInstanceOf(Error);
      expect((rejected as Error).message).toContain('always fails');
      expect(attempts).toBe(3);
    } finally {
      vi.useRealTimers();
    }
  });

  it('retry throws RangeError for invalid attempts', async () => {
    await expect(retry(async () => 1, 0, 10)).rejects.toThrow(RangeError);
  });
});
