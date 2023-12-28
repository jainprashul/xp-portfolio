// create a hook to observe the size of a DOM element

import { useEffect, useRef, useState } from 'react';

// Hook
export default function useResizeObserver<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      setDimensions(entries[0].contentRect);
    });

    const { current } = ref;

    if (current) {
      observer.current.observe(current);
    }

    return () => {
      if (current) {
        observer.current?.unobserve(current);
      }
    };
  }, [ref]);

  return dimensions;
}