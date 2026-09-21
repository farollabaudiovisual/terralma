import { test, expect } from '@playwright/test';

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`A Terralma responsiva em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/a-terralma');
    await expect(page).toHaveTitle('Sobre a Terralma Arquitetura | Arquitetura e Interiores em Atibaia');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Arquitetura e interiores pensados para a vida real.');
    await expect(page.locator('.about-page img')).toHaveCount(4);
    await expect(page.locator('.about-camila-image img')).toHaveAttribute('src', '/images/brand/camila-borges.webp');
    await expect.poll(() => page.locator('.about-page img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('A Terralma: ordem editorial no mobile e links principais', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/a-terralma');
  const image = page.locator('.about-camila-image');
  const copy = page.locator('.about-camila-copy');
  expect(await image.boundingBox()).not.toBeNull();
  expect(await copy.boundingBox()).not.toBeNull();
  expect((await image.boundingBox()).y).toBeLessThan((await copy.boundingBox()).y);
  await expect(page.getByRole('link', { name: 'Conheça nossos serviços' })).toHaveAttribute('href', '/servicos');
  await expect(page.getByRole('link', { name: 'Quero começar meu projeto' })).toHaveAttribute('href', /wa\.me\/5511988217611/);
});
