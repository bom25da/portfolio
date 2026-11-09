import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useScrollMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const textSelectors = [
      '.hero-intro > *', '.section-marker > span', '.statement-caption',
      '.statement-copy > *', '.section-heading > p',
      '.project-meta > div:first-child > *', '.project-tags > *', '.side-project-heading > *',
      '.about-copy > *', '.experience-row > :not(.experience-arrow)',
      '.capabilities > .row-label', '.capability-row > h3', '.stack-list > li',
      '.contact-prelude', '.contact-bottom > *', '.footer-name', '.footer-bottom > *',
    ];
    root.querySelectorAll(textSelectors.join(',')).forEach(el => el.classList.add('text-reveal'));
    root.querySelectorAll('.hero-intro,.section-marker,.statement-copy,.project-meta > div:first-child,.project-tags,.side-project-heading,.about-copy,.experience-row,.stack-list,.contact-bottom,.footer-bottom').forEach(group => {
      [...group.children].filter((el): el is HTMLElement => el instanceof HTMLElement && el.classList.contains('text-reveal')).forEach((el, index) => {
        el.dataset.motionDelay = String(Math.min(index, 4));
      });
    });
    const targets = [...root.querySelectorAll('.motion-title,.text-reveal,.project.reveal')];
    let observer: IntersectionObserver | undefined;
    function configure() {
      observer?.disconnect();
      document.body.classList.remove('has-motion');
      if (!('IntersectionObserver' in window) || reduceMotion.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (target.matches('.project.reveal')) {
            if (isIntersecting) { target.classList.add('is-visible'); observer?.unobserve(target); }
          } else {
            target.classList.toggle('is-visible', isIntersecting);
          }
        });
      }, { threshold: 0 });
      targets.forEach(el => {
        if (!el.matches('.project.reveal')) el.classList.remove('is-visible');
        observer?.observe(el);
      });
      document.body.classList.add('has-motion');
    }
    function exposeFocusedText(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      event.target.closest('.text-reveal,.motion-title')?.classList.add('is-visible');
      event.target.closest('.project.reveal')?.classList.add('is-visible');
    }
    configure();
    reduceMotion.addEventListener('change', configure);
    root.addEventListener('focusin', exposeFocusedText);
    return () => {
      observer?.disconnect();
      reduceMotion.removeEventListener('change', configure);
      root.removeEventListener('focusin', exposeFocusedText);
      document.body.classList.remove('has-motion');
    };
  }, [rootRef]);
}
