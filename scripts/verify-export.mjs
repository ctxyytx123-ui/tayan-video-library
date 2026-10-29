import assert from 'node:assert/strict';
import { readFile, stat, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const catalog = JSON.parse(await readFile(path.join(root, 'source/catalog.json'), 'utf8'));
const page = await readFile(path.join(root, 'out/index.html'), 'utf8');
const body = await readFile(path.join(root, 'source/prepared.html'), 'utf8');
assert(!body.includes('127.0.0.1') && !body.includes('localhost:'), '页面还有本机链接');
assert(!body.includes('__FAN_BASE_PATH__'), '部署路径没有替换');
assert.equal((body.match(/class="library-card"/g) || []).length, catalog.videos);
assert.equal((body.match(/class="ap-reference-visual"/g) || []).length, catalog.referenceImages);
assert(page.includes('video-7510219028309265710'), '视频定位锚点缺失');
assert(page.includes('ap-script-S10-references'), '参考图定位锚点缺失');
assert(page.includes('library-runtime.js'), '页面交互没有加载');
let bytes = 0;
for (const asset of catalog.assets) {
  const info = await stat(path.join(root, 'out/assets', asset.path));
  if (!catalog.textTemplates.includes(asset.path)) assert.equal(info.size, asset.bytes, `素材不完整：${asset.path}`);
}
async function size(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await size(filename);
    else bytes += (await stat(filename)).size;
  }
}
await size(path.join(root, 'out'));
assert(bytes < 1024 ** 3, '构建产物超过 GitHub Pages 的 1 GB 限制');
console.log(JSON.stringify({ videos: catalog.videos, playable: catalog.playable, referenceImages: catalog.referenceImages, checkedAssets: catalog.assets.length, exportedMiB: +(bytes / 1024 ** 2).toFixed(1) }));
