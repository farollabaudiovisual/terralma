interface GalleryImage { src: string; alt: string; }
interface ScrollPosition { x: number; y: number; }

const grid = document.querySelector<HTMLElement>('[data-project-grid]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-project-card]')];
const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const dialog = document.querySelector<HTMLDialogElement>('#project-gallery');
const galleryImage = document.querySelector<HTMLImageElement>('#gallery-image');
const galleryTitle = document.querySelector<HTMLElement>('#gallery-title');
const galleryCategory = document.querySelector<HTMLElement>('#gallery-category');
const galleryCounter = document.querySelector<HTMLElement>('#gallery-counter');
const previous = document.querySelector<HTMLButtonElement>('.gallery-previous');
const next = document.querySelector<HTMLButtonElement>('.gallery-next');
const figure = document.querySelector<HTMLElement>('.gallery-figure');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let activeTrigger: HTMLElement | null = null;
let gallery: GalleryImage[] = [];
let galleryIndex = 0;
let touchStartX: number | null = null;
let filterTimer = 0;
let gallerySwapId = 0;
let galleryScrollPosition: ScrollPosition | null = null;

const updateUrl = (slug?: string) => {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('projeto', slug);
  else url.searchParams.delete('projeto');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
};

const saveGalleryScrollPosition = () => {
  galleryScrollPosition = { x: window.scrollX, y: window.scrollY };
};

const restoreGalleryScrollPosition = () => {
  const savedPosition = galleryScrollPosition;
  galleryScrollPosition = null;
  if (!savedPosition) return;

  requestAnimationFrame(() => {
    activeTrigger?.focus({ preventScroll: true });
    window.scrollTo({ left: savedPosition.x, top: savedPosition.y, behavior: 'instant' });
  });
};

const preloadGalleryImage = (src: string) => new Promise<void>(resolve => {
  const image = new Image();
  const finish = () => resolve();
  image.addEventListener('load', finish, { once: true });
  image.addEventListener('error', finish, { once: true });
  image.src = src;
  if (image.complete) finish();
});

const waitForImageFade = (image: HTMLImageElement) => new Promise<void>(resolve => {
  let timeout = 0;
  const finish = () => {
    window.clearTimeout(timeout);
    image.removeEventListener('transitionend', onTransitionEnd);
    resolve();
  };
  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target === image && event.propertyName === 'opacity') finish();
  };
  image.addEventListener('transitionend', onTransitionEnd);
  timeout = window.setTimeout(finish, 300);
});

const renderGalleryImage = async (animate = true): Promise<boolean> => {
  const current = gallery[galleryIndex];
  if (!current || !galleryImage || !galleryTitle || !galleryCategory || !galleryCounter) return false;
  const swapId = ++gallerySwapId;
  const update = () => {
    galleryImage.src = current.src;
    galleryImage.alt = current.alt;
    galleryCounter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
    galleryImage.classList.remove('is-changing');
  };
  galleryTitle.textContent = activeTrigger?.dataset.projectTitle || '';
  galleryCategory.textContent = activeTrigger?.dataset.projectCategory || '';
  galleryCounter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
  if (!animate || reducedMotion.matches) {
    if (!reducedMotion.matches) await preloadGalleryImage(current.src);
    if (swapId !== gallerySwapId) return false;
    update();
    return true;
  }

  galleryImage.classList.remove('is-changing');
  await preloadGalleryImage(current.src);
  if (swapId !== gallerySwapId) return false;

  galleryImage.classList.add('is-changing');
  await waitForImageFade(galleryImage);
  if (swapId !== gallerySwapId) return false;

  galleryImage.src = current.src;
  galleryImage.alt = current.alt;
  try { await galleryImage.decode(); } catch { /* The preloaded image can still render normally. */ }
  if (swapId !== gallerySwapId) return false;
  galleryImage.classList.remove('is-changing');
  return true;
};

const moveGallery = (direction: number) => {
  if (!gallery.length) return;
  galleryIndex = (galleryIndex + direction + gallery.length) % gallery.length;
  void renderGalleryImage();
};

const openGallery = async (card: HTMLElement) => {
  if (!dialog) return;
  try { gallery = JSON.parse(card.dataset.projectGallery || '[]') as GalleryImage[]; } catch { gallery = []; }
  if (!gallery.length) return;
  activeTrigger = card.querySelector<HTMLElement>('.project-tile-trigger');
  galleryIndex = 0;
  if (!await renderGalleryImage(false)) return;
  updateUrl(card.dataset.projectSlug);
  if (!dialog.open) {
    saveGalleryScrollPosition();
    dialog.showModal();
  }
};

const applyFilter = (value: string) => {
  window.clearTimeout(filterTimer);
  cards.forEach(card => card.classList.add('is-filtering'));
  filterTimer = window.setTimeout(() => {
    cards.forEach(card => {
      const visible = value === 'todos' || card.dataset.projectCategory === value;
      card.hidden = !visible;
      card.classList.remove('is-filtering');
    });
  }, reducedMotion.matches ? 0 : 220);
};

filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => {
    const active = item === filter;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  applyFilter(filter.dataset.filter || 'todos');
}));

cards.forEach(card => card.querySelector<HTMLButtonElement>('.project-tile-trigger')?.addEventListener('click', () => void openGallery(card)));
previous?.addEventListener('click', () => moveGallery(-1));
next?.addEventListener('click', () => moveGallery(1));

dialog?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); moveGallery(1); }
});
dialog?.addEventListener('close', () => {
  updateUrl();
  restoreGalleryScrollPosition();
});

figure?.addEventListener('pointerdown', event => { touchStartX = event.clientX; });
figure?.addEventListener('pointerup', event => {
  if (touchStartX === null) return;
  const distance = event.clientX - touchStartX;
  touchStartX = null;
  if (Math.abs(distance) < 44) return;
  moveGallery(distance < 0 ? 1 : -1);
});

const initialSlug = new URLSearchParams(window.location.search).get('projeto');
if (initialSlug) {
  const card = cards.find(item => item.dataset.projectSlug === initialSlug);
  if (card) {
    const category = card.dataset.projectCategory || 'todos';
    filters.find(item => item.dataset.filter === category)?.click();
    void openGallery(card);
  }
}
