# 风扇视频与广告脚本素材库

Next.js 静态网站，保留 109 条素材记录、可播放原片、原文/中文字幕、发布文案、48 版广告口播、30 张参考抽帧及编号定位。原本待补的 6 条原片仍按原资料标记。

## 本机预览

安装 Node.js 22 或以上版本，进入此文件夹后运行：

```sh
npm ci
npm run dev
```

## GitHub Pages 自动发布

1. 将整个项目推送到新建的 GitHub 仓库 `main` 分支。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 在 **Actions → Publish video library** 查看部署结果。以后更新 `main` 就会自动重新发布。
4. 使用部署结果中的正式网址访问。编号锚点（例如 `#video-7510219028309265710`）可直接附在网址后面。

GitHub Actions 会自动读取仓库的 Pages 路径，支持 `用户名.github.io/仓库名/`，无需手改图片、视频或字幕地址。

旧的 `总览.html#video-...` 链接也能使用，会跳转到同一视频。飞书文档里的 `127.0.0.1` 链接需要在正式网址确定后统一更换。

## 构建与检查

```sh
npm run build
npm run verify
```

静态产物位于 `out/`。检查包括素材文件完整性、109 条记录、30 张参考图、编号锚点和 GitHub Pages 的体积上限。

## 文件与更新

- `source/library-template.html`：页面内容；保留原布局与编号。
- `source/library.css`：页面样式。
- `public/library-runtime.js`：搜索、字幕、复制、展开与视频定位。
- `public/assets/`：页面实际引用的视频、图片、字幕及下载文件。
- `source/catalog.json`：素材清单。

只复制页面所引用的素材，没有加入原文件夹的备份和临时工作记录。当前为完整素材版本，含约 900 MiB 的文件；以后增加视频前先检查体积。GitHub Pages 网站上限为 1 GB，后续可将视频迁移至独立存储。

参考：[Next.js 静态导出](https://nextjs.org/docs/app/guides/static-exports)、[GitHub Pages 限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)。
