import { mkdir, copyFile, writeFile, access } from 'node:fs/promises';
import sharp from 'sharp';

// Originals remain in fonts/, logo/ and images/. Only generated copies go to public/.
for (const folder of ['public/fonts', 'public/logo', 'public/icons', 'public/images/placeholders', 'public/images/brand']) {
  await mkdir(folder, { recursive: true });
}
await mkdir('public/images/a-terralma', { recursive: true });
for (const name of ['PoiretOne-Regular.ttf', 'Questrial-Regular.ttf']) {
  await copyFile(`fonts/${name}`, `public/fonts/${name}`);
}
await copyFile('images/icons/instagram-svgrepo-com.svg', 'public/icons/instagram.svg');
await copyFile('images/icons/brand-tiktok-svgrepo-com.svg', 'public/icons/tiktok.svg');
await copyFile('images/icons/whatsapp-svgrepo-com (1).svg', 'public/icons/whatsapp.svg');
await sharp('logo/logo marrom sem fundo.png').trim().resize({ width: 640 }).webp({ quality: 95 }).toFile('public/logo/terralma.webp');
await sharp('logo/ícone bege sem fundo.png').trim().resize({ width: 240 }).webp({ quality: 95 }).toFile('public/logo/symbol-light.webp');
await sharp('logo/pattern_terralma.png').png().toFile('public/logo/pattern_terralma.png');
await sharp('images/Camila_Terralma-35-scaled.jpg').resize({ width: 1100, withoutEnlargement: true }).webp({ quality: 84 }).toFile('public/images/brand/camila.webp');
await sharp('images/Camila_Terralma-35-scaled.jpg').resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 86 }).toFile('public/images/brand/camila-hero.webp');
await sharp('images/Camila_Terralma-35-scaled.jpg').resize({ width: 800, height: 1100, fit: 'cover', position: 'centre' }).webp({ quality: 84 }).toFile('public/images/brand/camila-hero-mobile.webp');
await sharp('images/Camila/Camila_Terralma-40.jpg').resize({ width: 1100, withoutEnlargement: true }).webp({ quality: 86 }).toFile('public/images/brand/camila-borges.webp');
await sharp('images/Camila/Camila_Terralma-40.jpg').resize({ width: 760, withoutEnlargement: true }).webp({ quality: 84 }).toFile('public/images/brand/camila-borges-mobile.webp');
await sharp('images/Camila/Camila_Terralma-32.jpg').resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 84 }).toFile('public/images/a-terralma/camila-32.webp');
await sharp('images/Camila/Camila_Terralma-56.jpg').resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 84 }).toFile('public/images/brand/camila-process.webp');
await sharp('images/Camila/Camila_Terralma-56.jpg').resize({ width: 760, withoutEnlargement: true }).webp({ quality: 82 }).toFile('public/images/brand/camila-process-mobile.webp');
await sharp('images/a-terralma/camila-principal.jpg').resize({ width: 1100, withoutEnlargement: true }).jpeg({ quality: 86, progressive: true }).toFile('public/images/a-terralma/camila-principal.jpg');
await sharp('images/a-terralma/processo-arquitetura.jpg').resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 84, progressive: true }).toFile('public/images/a-terralma/processo-arquitetura.jpg');
await sharp('images/a-terralma/detalhe-terralma.jpg').resize({ width: 760, withoutEnlargement: true }).jpeg({ quality: 82, progressive: true }).toFile('public/images/a-terralma/detalhe-terralma.jpg');
await sharp('images/a-terralma/biofilia_sketch.png').resize({ width: 1800, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile('public/images/a-terralma/biofilia.png');

const photos = [
  ['hero', 'photo-1600607687920-4e2a09cf159d'],
  ['architecture-01', 'photo-1600585154340-be6161a56a0c'],
  ['architecture-02', 'photo-1600566753086-00f18fb6b3ea'],
  ['architecture-03', 'photo-1600047509782-20d39509f26d'],
  ['interiors-01', 'photo-1600210492486-724fe5c67fb0'],
  ['interiors-02', 'photo-1600607687939-ce8a6c25118c'],
  ['interiors-03', 'photo-1616486338812-3dadae4b4ace'],
  ['commercial-01', 'photo-1552566626-52f8b828add9'],
  ['commercial-02', 'photo-1554118811-1e0d58224f24'],
  ['commercial-03', 'photo-1559339352-11d035aa65de'],
  ['biophilia', 'photo-1613977257363-707ba9348227'],
  ['material', 'photo-1490312278390-ab64016e0aa9'],
];
const manifest = [];
for (const [name, id] of photos) {
  const source = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=85`;
  const output = `public/images/placeholders/${name}.webp`;
  manifest.push({ name, source, output, status: 'Referência visual; não é projeto da Terralma.' });
  try { await access(output); console.log(`Exists: ${name}`); continue; } catch {}
  const response = await fetch(source, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input).resize({ width: name === 'hero' || name === 'biophilia' ? 1920 : 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
  if (name === 'hero') {
    await sharp(input).resize({ width: 800, height: 1100, fit: 'cover', position: 'centre' }).webp({ quality: 84 }).toFile('public/images/placeholders/hero-mobile.webp');
  }
  console.log(`Prepared: ${name}`);
}
await writeFile('public/images/placeholders/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
