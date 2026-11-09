import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const progressRef = useRef(null);
  useEffect(() => {
    let frame = null;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progressRef.current.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
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
