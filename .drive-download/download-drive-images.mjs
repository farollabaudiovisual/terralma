import { createWriteStream } from "node:fs";
import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const rootId = "1TRhn4L9u1SbC-j9J0ZjScJXsGaAMupsj";
const imagesRoot = path.resolve("images");

const categoryFor = (name) => {
  const key = normalize(name);
  if (key.startsWith("casa")) return "Arquitetura";
  if (key.startsWith("espaco")) return "Comercial";
  return "Interiores Residenciais";
};

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function safeName(value) {
  return value.replace(/[<>:"/\\|?*]/g, "_").replace(/[. ]+$/, "");
}

function parseRows(html) {
  const rows = [];
  for (const chunk of html.split('<tr data-selectable').slice(1)) {
    const id = chunk.match(/data-id="([A-Za-z0-9_-]+)"/)?.[1];
    const name = chunk.match(/<strong class="DNoYtb">([^<]+)<\/strong>/)?.[1];
    const folder = chunk.includes("Shared folder");
    const image = chunk.includes("<title>Image</title>");
    if (id && name) rows.push({ id, name: decodeHtml(name), folder, image });
  }
  return rows;
}

async function fetchFolder(id) {
  const response = await fetch(`https://drive.google.com/drive/folders/${id}`);
  if (!response.ok) throw new Error(`Folder ${id}: HTTP ${response.status}`);
  return parseRows(await response.text());
}

async function localProjectDir(remoteName) {
  const category = categoryFor(remoteName);
  const categoryDir = path.join(imagesRoot, category);
  await mkdir(categoryDir, { recursive: true });
  const existing = await readdir(categoryDir, { withFileTypes: true });
  const wanted = normalize(remoteName);
  const match = existing.find((entry) => entry.isDirectory() && normalize(entry.name) === wanted);
  const projectName = match?.name ?? remoteName.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const projectDir = path.join(categoryDir, safeName(projectName));
  await mkdir(projectDir, { recursive: true });
  return projectDir;
}

async function newPath(dir, filename, occurrence = 1) {
  const parsed = path.parse(safeName(filename));
  const localName = occurrence === 1
    ? parsed.base
    : `${parsed.name}-${occurrence}${parsed.ext}`;
  const candidate = path.join(dir, localName);
  try {
    await stat(candidate);
    return null;
  } catch {
    return candidate;
  }
}

async function downloadFile(file, dir, occurrence) {
  const destination = await newPath(dir, file.name, occurrence);
  if (!destination) return null;
  const url = `https://drive.usercontent.google.com/download?id=${file.id}&export=download&confirm=t`;
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !response.body) {
    throw new Error(`${file.name}: HTTP ${response.status}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    throw new Error(`${file.name}: o Drive retornou uma página em vez da imagem`);
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destination));
  return destination;
}

async function downloadFolder(folderId, destination) {
  const rows = await fetchFolder(folderId);
  const occurrences = new Map();
  let count = 0;
  for (const row of rows) {
    if (row.folder) {
      const nested = path.join(destination, safeName(row.name));
      await mkdir(nested, { recursive: true });
      try {
        count += await downloadFolder(row.id, nested);
      } catch (error) {
        console.error(`SKIP_FOLDER\t${row.name}\t${error.message}`);
      }
    } else if (row.image) {
      const occurrence = (occurrences.get(row.name) ?? 0) + 1;
      occurrences.set(row.name, occurrence);
      const saved = await downloadFile(row, destination, occurrence);
      if (saved) count += 1;
      if (saved) console.log(`OK\t${path.relative(imagesRoot, saved)}`);
    }
  }
  return count;
}

const rootHtmlPath = path.resolve(".drive-download", "folder.html");
let rootRows;
try {
  rootRows = parseRows(await readFile(rootHtmlPath, "utf8"));
} catch {
  rootRows = await fetchFolder(rootId);
}

const projects = rootRows.filter((row) => row.folder);
let total = 0;
for (const project of projects) {
  const destination = await localProjectDir(project.name);
  console.log(`PROJECT\t${project.name}\t${path.relative(imagesRoot, destination)}`);
  try {
    total += await downloadFolder(project.id, destination);
  } catch (error) {
    console.error(`SKIP_PROJECT\t${project.name}\t${error.message}`);
  }
}

console.log(`TOTAL\t${projects.length} projetos\t${total} imagens`);
