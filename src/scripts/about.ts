const pointerBlurWords = document.querySelectorAll<HTMLElement>('[data-pointer-blur]');
const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (precisePointer.matches && !reducedMotion.matches) {
  pointerBlurWords.forEach(word => {
    const updateBlurPosition = (event: PointerEvent) => {
      const bounds = word.getBoundingClientRect();
      word.style.setProperty('--blur-x', `${event.clientX - bounds.left}px`);
      word.style.setProperty('--blur-y', `${event.clientY - bounds.top}px`);
    };

    word.addEventListener('pointerenter', event => {
      updateBlurPosition(event);
      word.classList.add('is-pointer-blurred');
    });
    word.addEventListener('pointermove', updateBlurPosition);
    word.addEventListener('pointerleave', () => word.classList.remove('is-pointer-blurred'));
  });
}
