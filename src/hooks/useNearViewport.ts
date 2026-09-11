import { useCallback, useEffect, useState } from 'react';

const DEFAULT_ROOT_MARGIN = '300px';

export const useNearViewport = (rootMargin = DEFAULT_ROOT_MARGIN) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );
  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element || isNearViewport || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, isNearViewport, rootMargin]);

  return { ref, isNearViewport };
};
