import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;
    let frame: number | null = null;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
      frame = null;
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}
