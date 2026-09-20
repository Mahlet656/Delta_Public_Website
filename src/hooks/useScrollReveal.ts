import { useEffect } from 'react';

/**
 * Adds `.is-visible` to any element carrying the `.reveal` class once it
 * scrolls into view. Pair with the `.reveal` styles in index.css.
 *
 * Uses a MutationObserver so sections that render later (after an API call
 * resolves) are picked up automatically — callers don't need to pass deps.
 *
 * Includes a time-based safety net: if a `.reveal` element hasn't triggered
 * within REVEAL_FALLBACK_MS (e.g. an edge case in observer timing, or the
 * element sits in a layout the observer never quite catches), it's forced
 * visible anyway. Content should never stay permanently hidden because an
 * animation didn't fire.
 */
const REVEAL_FALLBACK_MS = 1800;

export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const showAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    };

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    };

    observeAll();

    // Catch sections mounted after data loads.
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net — never leave content permanently invisible.
    const fallback = window.setTimeout(showAll, REVEAL_FALLBACK_MS);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
