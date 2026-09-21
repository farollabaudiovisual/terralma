import { test, expect } from '@playwright/test';

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`Home responsiva em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    // Load all below-fold images before taking the full-page screenshot.
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      const images = [...document.images].filter(img => img.getAttribute('src'));
      images.forEach(img => { img.loading = 'eager'; });
      await Promise.all(images.map(img => img.complete ? Promise.resolve() : new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      })));
    });
    await expect(page.locator('h1')).toHaveText('arquiteturaque se sente');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(await page.evaluate(() => document.fonts.check('16px "Poiret One"') && document.fonts.check('16px Questrial'))).toBe(true);
    for (const rail of await page.locator('.project-rail').all()) {
      const cardCount = await rail.locator('.project-card').count();
      expect(await rail.evaluate((el, shouldOverflow) => shouldOverflow ? el.scrollWidth > el.clientWidth : el.scrollWidth >= el.clientWidth, cardCount > 3)).toBe(true);
    }
    expect(await page.locator('a[href^="#"]').evaluateAll(links => links.every(link => document.getElementById(link.hash.slice(1))))).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('menu mobile: teclado, Escape, âncora e redimensionamento', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Abrir menu' });
  const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Projetos', exact: false }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#projetos$/);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(dialog).not.toBeVisible();
});

test('trilhos, prévia, serviços e contato demonstrativo', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const rail = page.locator('#arquitetura-rail');
  await page.getByRole('button', { name: 'Próximos projetos de Arquitetura' }).click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
  const card = page.getByRole('button', { name: 'Ver projeto casa aconchego' });
  await card.click();
  const preview = page.getByRole('dialog', { name: 'casa aconchego' });
  await expect(preview).toBeVisible();
  await expect(preview).toContainText('Projeto da Terralma');
  await page.keyboard.press('Escape');
  await expect(card).toBeFocused();
  await page.locator('summary').first().click();
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await expect(page.locator('#contato').getByRole('link', { name: 'Iniciar um projeto' })).toHaveAttribute('href', /wa\.me\/5511988217611/);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.getByRole('link', { name: 'Conversar com a Terralma no WhatsApp (abre nova aba)' })).toHaveAttribute('href', /wa\.me\/5511988217611/);
});

test('movimento reduzido e página legível sem JavaScript', async ({ browser, page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto('http://127.0.0.1:4321');
  await expect(staticPage.locator('h1')).toBeVisible();
  await expect(staticPage.locator('.project-card')).toHaveCount(23);
  await context.close();
});

for (const width of [390, 1440]) {
  test(`Serviços: SEO e composição responsiva em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/servicos');
    await expect(page).toHaveTitle('Serviços de Arquitetura e Interiores em Atibaia | Terralma Arquitetura');
    await expect(page.locator('h1')).toHaveText('Arquitetura para espaços que fazem sentido viver.');
    await expect(page.locator('.services-page h2')).toHaveCount(7);
    await expect(page.locator('body')).toContainText('arquitetura em Atibaia');
    await expect(page.locator('body')).toContainText('Acompanhamento de obra');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(await page.locator('.service-editorial')).toHaveCount(4);
    expect(await page.locator('.process-timeline li')).toHaveCount(4);
  });
}
