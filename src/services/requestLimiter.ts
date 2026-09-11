interface QueuedRequest {
  start: () => void;
}

export const createRequestLimiter = (maxConcurrent: number) => {
  if (!Number.isInteger(maxConcurrent) || maxConcurrent < 1) {
    throw new Error('maxConcurrent must be a positive integer');
  }

  let activeCount = 0;
  const queue: QueuedRequest[] = [];

  const startNext = () => {
    while (activeCount < maxConcurrent) {
      const request = queue.shift();
      if (!request) return;

      activeCount += 1;
      request.start();
    }
  };

  const schedule = <Result>(request: () => Promise<Result>): Promise<Result> =>
    new Promise<Result>((resolve, reject) => {
      queue.push({
        start: () => {
          Promise.resolve()
            .then(request)
            .then(resolve, reject)
            .finally(() => {
              activeCount -= 1;
              startNext();
            });
        },
      });
      startNext();
    });

  return {
    schedule,
    get activeCount() {
      return activeCount;
    },
    get pendingCount() {
      return queue.length;
    },
  };
};
