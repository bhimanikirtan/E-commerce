import { useEffect } from "react";

function useIntersectionObserver({ target, onIntersect, enabled = true }) {
  useEffect(() => {
    if (!enabled || !target?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    const el = target.current;
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [target?.current, onIntersect, enabled]);
}

export default useIntersectionObserver;
