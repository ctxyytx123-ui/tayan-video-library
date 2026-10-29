import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const catalog = JSON.parse(await readFile(path.join(root, 'source/catalog.json'), 'utf8'));
const template = await readFile(path.join(root, 'source/library-template.html'), 'utf8');
await writeFile(path.join(root, 'source/prepared.html'), template.replaceAll('__FAN_BASE_PATH__', basePath));

let origin = process.env.SITE_ORIGIN || '';
if (!origin && process.env.GITHUB_REPOSITORY && basePath) {
  const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
  origin = `https://${owner}.github.io`;
}
if (origin && !/^https?:\/\/[a-zA-Z0-9.-]+(?::\d+)?\/?$/.test(origin)) {
  throw new Error('SITE_ORIGIN must be an HTTP(S) origin without a path.');
}
origin = origin.replace(/\/$/, '');
const home = `${origin}${basePath}/`;

for (const asset of catalog.textTemplates) {
  const original = await readFile(path.join(root, 'source/text-assets', asset), 'utf8');
  const updated = original.replace(/http:\/\/(?:127\.0\.0\.1|localhost):9432\/(?:总览|%E6%80%BB%E8%A7%88)\.html/gi, home);
  await writeFile(path.join(root, 'public/assets', asset), updated);
}

await mkdir(path.join(root, 'public'), { recursive: true });
await writeFile(path.join(root, 'public/.nojekyll'), '');
await writeFile(path.join(root, 'public/总览.html'), `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>打开素材库</title></head><body><a href="./">打开素材库</a><script>location.replace('./'+location.search+location.hash)</script></body></html>`);
console.log(`已准备 ${catalog.videos} 条视频、${catalog.referenceImages} 张参考图，路径：${basePath || '/'}`);
