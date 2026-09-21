const accordion = document.querySelector<HTMLElement>('[data-services-accordion]');

if (accordion) {
  const panels = [...accordion.querySelectorAll<HTMLElement>('[data-service-panel]')];
  const tabs = [...accordion.querySelectorAll<HTMLButtonElement>('[data-service-tab]')];

  const activate = (index: number) => {
    panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === index;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('aria-hidden', String(!isActive));
    });

    tabs.forEach((tab, tabIndex) => tab.setAttribute('aria-expanded', String(tabIndex === index)));
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));

    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'Home' ? -1 : 1;
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + direction + tabs.length) % tabs.length;
      tabs[nextIndex]?.focus();
      activate(nextIndex);
    });
  });
}
