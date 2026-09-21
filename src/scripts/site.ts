const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const menuTrigger = document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let menuCloseTimer: number | undefined;

const closeMenu = (afterClose?: () => void) => {
  if (!menu?.open || menu.classList.contains('is-closing')) return;

  const finish = () => {
    window.clearTimeout(menuCloseTimer);
    if (menu.open) menu.close();
    afterClose?.();
  };

  if (reducedMotion.matches) {
    finish();
    return;
  }

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== menu || event.propertyName !== 'opacity') return;
    menu.removeEventListener('transitionend', handleTransitionEnd);
    finish();
  };

  menu.classList.add('is-closing');
  menu.addEventListener('transitionend', handleTransitionEnd);
  menuCloseTimer = window.setTimeout(() => {
    menu.removeEventListener('transitionend', handleTransitionEnd);
    finish();
  }, 450);
};

document.querySelectorAll<HTMLElement>('[data-open-dialog]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.openDialog || '');
    if (!(dialog instanceof HTMLDialogElement)) return;
    dialog.classList.remove('is-closing');
    dialog.showModal();
    if (dialog === menu) menuTrigger?.setAttribute('aria-expanded', 'true');
  });
});

document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog => {
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')].filter(element => element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  dialog.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (dialog === menu) {
        event.preventDefault();
        closeMenu(() => { window.location.href = link.href; });
        return;
      }
      dialog.close();
      // Native dialog close restores focus to its trigger; move it to the destination.
      requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(link.hash);
        if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
      });
    });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog || dialog === menu) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

menu?.querySelector<HTMLFormElement>('form[method="dialog"]')?.addEventListener('submit', event => {
  event.preventDefault();
  closeMenu();
});
menu?.addEventListener('cancel', event => {
  event.preventDefault();
  closeMenu();
});
menu?.addEventListener('close', () => {
  window.clearTimeout(menuCloseTimer);
  menu.classList.remove('is-closing');
  menuTrigger?.setAttribute('aria-expanded', 'false');
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', event => {
  if (event.matches && menu?.open) menu.close();
});

const preview = document.querySelector<HTMLDialogElement>('#project-preview');
document.querySelectorAll<HTMLButtonElement>('[data-project-preview]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    if (!preview) return;
    const image = preview.querySelector<HTMLImageElement>('#preview-image');
    const title = preview.querySelector('#preview-title');
    const category = preview.querySelector('#preview-category');
    if (!image || !title || !category) return;
    image.src = trigger.dataset.image || '';
    image.alt = trigger.dataset.alt || '';
    title.textContent = trigger.dataset.title || '';
    category.textContent = `${trigger.dataset.category} · Referência visual`;
    preview.showModal();
  });
});

document.querySelectorAll<HTMLElement>('[data-rail-group]').forEach(group => {
  const rail = group.querySelector<HTMLElement>('.project-rail');
  const pagination = [...group.querySelectorAll<HTMLButtonElement>('[data-rail-page]')];
  const previous = group.querySelector<HTMLButtonElement>('[data-direction="-1"]');
  const next = group.querySelector<HTMLButtonElement>('[data-direction="1"]');
  if (!rail || !previous || !next) return;
  const update = () => {
    previous.disabled = rail.scrollLeft < 2;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    const card = rail.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap) : 1;
    const activeIndex = Math.max(0, Math.min(pagination.length - 1, Math.round(rail.scrollLeft / step)));
    pagination.forEach((bullet, index) => {
      if (index === activeIndex) bullet.setAttribute('aria-current', 'true');
      else bullet.removeAttribute('aria-current');
    });
  };
  const move = (direction: number) => {
    const card = rail.firstElementChild;
    if (!card) return;
    const distance = card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap);
    rail.scrollBy({ left: distance * direction, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  pagination.forEach((bullet, index) => bullet.addEventListener('click', () => {
    const card = rail.firstElementChild;
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap);
    rail.scrollTo({ left: step * index, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }));
  rail.addEventListener('keydown', event => {
    if (event.target !== rail) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
  });
  rail.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(rail);
  update();
});

const scrollProgress = document.querySelector<HTMLElement>('.site-scroll-progress-bar');
let progressScheduled = false;
const updateScrollProgress = () => {
  progressScheduled = false;
  if (!scrollProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollProgress.style.inlineSize = `${Math.min(1, Math.max(0, progress)) * 100}%`;
};
const scheduleScrollProgress = () => {
  if (progressScheduled) return;
  progressScheduled = true;
  requestAnimationFrame(updateScrollProgress);
};
window.addEventListener('scroll', scheduleScrollProgress, { passive: true });
window.addEventListener('resize', scheduleScrollProgress);
scheduleScrollProgress();
