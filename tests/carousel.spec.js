import { test, expect } from '@playwright/test';

test('carrossel de projetos mostra três cards completos no desktop e avança um projeto', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const rail = page.locator('#arquitetura-rail');
  const firstThree = await rail.locator('.project-card').evaluateAll(cards => cards.slice(0, 3).map(card => {
    const rect = card.getBoundingClientRect();
    return { left: rect.left, right: rect.right, width: rect.width };
  }));
  const railBox = await rail.boundingBox();
  const fourthBox = await rail.locator('.project-card').nth(3).boundingBox();
  expect(railBox).not.toBeNull();
  expect(fourthBox).not.toBeNull();
  expect(firstThree).toHaveLength(3);
  expect(firstThree.every(card => card.left >= railBox.x && card.right <= railBox.x + railBox.width)).toBe(true);
  expect(fourthBox.x).toBeGreaterThan(railBox.x + railBox.width - 2);

  const cardStep = firstThree[1].left - firstThree[0].left;
  await page.getByRole('button', { name: 'Próximos projetos de Arquitetura' }).click();
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeGreaterThan(cardStep - 8);
});

test('carrossel de projetos mostra um card inteiro no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const rail = page.locator('#arquitetura-rail');
  const railBox = await rail.boundingBox();
  const first = await rail.locator('.project-card').first().boundingBox();
  const second = await rail.locator('.project-card').nth(1).boundingBox();
  expect(railBox).not.toBeNull();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(first.width).toBeGreaterThan(railBox.width - 24);
  expect(second.x).toBeGreaterThan(railBox.x + railBox.width - 2);
});
