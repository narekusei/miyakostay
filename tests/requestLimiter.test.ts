import { describe, expect, test, vi } from 'vitest';
import { createRequestLimiter } from '../src/services/requestLimiter';

const deferred = () => {
  let resolve!: () => void;
  const promise = new Promise<void>((complete) => {
    resolve = complete;
  });

  return { promise, resolve };
};

describe('request limiter', () => {
  test('never runs more requests than the configured limit', async () => {
    const limiter = createRequestLimiter(2);
    const first = deferred();
    const second = deferred();
    const third = deferred();
    const tasks = [first, second, third];
    const starts = tasks.map((task) => vi.fn(() => task.promise));

    const results = starts.map((start) => limiter.schedule(start));
    await Promise.resolve();

    expect(starts[0]).toHaveBeenCalledOnce();
    expect(starts[1]).toHaveBeenCalledOnce();
    expect(starts[2]).not.toHaveBeenCalled();
    expect(limiter.activeCount).toBe(2);
    expect(limiter.pendingCount).toBe(1);

    first.resolve();
    await first.promise;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(starts[2]).toHaveBeenCalledOnce();
    expect(limiter.activeCount).toBe(2);
    expect(limiter.pendingCount).toBe(0);

    second.resolve();
    third.resolve();
    await Promise.all(results);

    expect(limiter.activeCount).toBe(0);
  });

  test('rejects invalid limits', () => {
    expect(() => createRequestLimiter(0)).toThrow('positive integer');
  });
});
