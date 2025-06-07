// hooks/useInfiniteScroll.ts
import { useEffect, useRef, useState } from "react";

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
};

export function useInfiniteScroll({ hasMore, onLoadMore, threshold = 1.0 }: UseInfiniteScrollOptions) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasMore, onLoadMore, threshold]);

  return { loaderRef: ref, isIntersecting };
}
