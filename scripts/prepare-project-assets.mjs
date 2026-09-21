import { access, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const roots = [
  { category: 'Arquitetura', directory: 'images/Arquitetura' },
  { category: 'Interiores', directory: 'images/Interiores Residenciais' },
  { category: 'Comercial', directory: 'images/Comercial' },
];
const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const excluded = /antes|levantamento|obra|planta|revis|proposta|outras|takes|vídeo|video|\.zip/i;

const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const galleryRank = file => {
  const name = file.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/fachada|hall|entrada|chegada|vista/.test(name)) return 0;
  if (/sala|social|gourmet|cozinha|jantar|estar/.test(name)) return 1;
  if (/lavanderia|servico|lavabo|banho|closet|escritorio/.test(name)) return 2;
  if (/quarto|dorm|suite|intimo|filho|bebe/.test(name)) return 3;
  if (/externa|jardim|piscina|lazer|terraco/.test(name)) return 4;
  return 5;
};
const collectFiles = async directory => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(fullPath));
    else if (validExtensions.has(path.extname(entry.name).toLowerCase()) && !excluded.test(fullPath)) files.push(fullPath);
  }
  return files;
};

const projects = [];
for (const { category, directory } of roots) {
  const projectEntries = (await readdir(directory, { withFileTypes: true })).filter(entry => entry.isDirectory());
  for (const entry of projectEntries) {
    const files = await collectFiles(path.join(directory, entry.name));
    if (!files.length) continue;
    const ranked = await Promise.all(files.map(async file => ({ file, size: (await stat(file)).size })));
    ranked.sort((a, b) => b.size - a.size);
    const cover = ranked[0].file;
    const categorySlug = slugify(category);
    const projectSlug = slugify(entry.name);
    const outputDirectory = path.join('public', 'assets', 'real-projects', categorySlug);
    await mkdir(outputDirectory, { recursive: true });
    const output = path.join(outputDirectory, `${projectSlug}.webp`);
    await sharp(cover).rotate().resize({ width: 1200, height: 900, fit: 'cover', position: 'centre' }).webp({ quality: 84 }).toFile(output);
    const galleryDirectory = path.join('public', 'assets', 'project-galleries', categorySlug, projectSlug);
    await mkdir(galleryDirectory, { recursive: true });
    const orderedFiles = [...files].sort((a, b) => galleryRank(a) - galleryRank(b) || a.localeCompare(b, 'pt-BR'));
    const coverIndex = orderedFiles.indexOf(cover);
    if (coverIndex > 0) { orderedFiles.splice(coverIndex, 1); orderedFiles.unshift(cover); }
    const gallery = [];
    for (const [index, file] of orderedFiles.entries()) {
      const galleryOutput = path.join(galleryDirectory, `${String(index + 1).padStart(2, '0')}.webp`);
      try { await access(galleryOutput); } catch { await sharp(file).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(galleryOutput); }
      gallery.push({ src: `/${galleryOutput.replaceAll('\\', '/').replace(/^public[\\/]?/, '')}`, alt: `${entry.name}, imagem ${index + 1} do projeto de ${category.toLowerCase()} da Terralma` });
    }
    projects.push({ id: projectSlug, name: entry.name.toLowerCase(), category, image: `/${output.replaceAll('\\', '/').replace(/^public[\\/]?/, '')}`, alt: `${entry.name}, projeto de ${category.toLowerCase()} da Terralma`, placeholder: false, source: cover.replaceAll('\\', '/'), imageCount: files.length, gallery });
  }
}

await writeFile('src/data/real-projects.json', `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
console.log(`Prepared ${projects.length} project covers.`);
