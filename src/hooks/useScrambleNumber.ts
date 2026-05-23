import { useState, useEffect, useRef } from 'react';

export function useScrambleNumber(target: number, isVisible: boolean) {
  const [value, setValue] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;

    let progress = 0;
    const step = target / 60;

    intervalRef.current = setInterval(() => {
      progress += step;

      if (Math.random() > 0.5 && progress < target * 0.8) {
        // Show random digit during scramble phase
        setValue(Math.floor(Math.random() * target));
      } else {
        setValue(Math.min(Math.floor(progress), target));
      }

      if (progress >= target) {
        setValue(target);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, target]);

  return value;
}
