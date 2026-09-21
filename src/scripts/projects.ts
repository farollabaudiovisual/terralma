interface GalleryImage { src: string; alt: string; }

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

const updateUrl = (slug?: string) => {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('projeto', slug);
  else url.searchParams.delete('projeto');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
};

const renderGalleryImage = () => {
  const current = gallery[galleryIndex];
  if (!current || !galleryImage || !galleryTitle || !galleryCategory || !galleryCounter) return;
  const update = () => {
    galleryImage.src = current.src;
    galleryImage.alt = current.alt;
    galleryCounter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
    galleryImage.classList.remove('is-changing');
  };
  galleryImage.classList.add('is-changing');
  galleryTitle.textContent = activeTrigger?.dataset.projectTitle || '';
  galleryCategory.textContent = activeTrigger?.dataset.projectCategory || '';
  if (reducedMotion.matches) update();
  else window.setTimeout(update, 140);
};

const moveGallery = (direction: number) => {
  if (!gallery.length) return;
  galleryIndex = (galleryIndex + direction + gallery.length) % gallery.length;
  renderGalleryImage();
};

const openGallery = (card: HTMLElement) => {
  if (!dialog) return;
  try { gallery = JSON.parse(card.dataset.projectGallery || '[]') as GalleryImage[]; } catch { gallery = []; }
  if (!gallery.length) return;
  activeTrigger = card.querySelector<HTMLElement>('.project-tile-trigger');
  galleryIndex = 0;
  renderGalleryImage();
  updateUrl(card.dataset.projectSlug);
  if (!dialog.open) dialog.showModal();
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

cards.forEach(card => card.querySelector<HTMLButtonElement>('.project-tile-trigger')?.addEventListener('click', () => openGallery(card)));
previous?.addEventListener('click', () => moveGallery(-1));
next?.addEventListener('click', () => moveGallery(1));

dialog?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); moveGallery(1); }
});
dialog?.addEventListener('close', () => {
  updateUrl();
  activeTrigger?.focus();
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
    openGallery(card);
  }
}
