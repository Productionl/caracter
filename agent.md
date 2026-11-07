# agent.md

CARACTER（车格）官网的项目说明与协作约定。给在此仓库工作的 AI 代理 / 开发者参考。

## 项目概览

- CARACTER 是汽车记录 + 社交产品，官网为**单页**。
- 站点是**纯静态**（`index.html` + `styles.css`），另加一块用 Vite 预构建的 React / WebGL **生成式渐变**作为整页背景。
- 部署：GitHub 仓库 `Productionl/caracter`，**GitHub Pages 从 `main` 根目录托管**（无 GitHub Actions）。提交并 push 即发布，约 1 分钟生效。

## 目录结构

```
index.html                     页面（顶栏 + 8 段 + 页脚）
styles.css                     全部样式与设计 token
assets/
  caracter-logo.svg            英文 Logo（由 .ai 转 SVG）
  chege-logo.svg               中文 Logo「车格」
  wechat-qr.jpg                微信二维码
  icons/ ...                   平台图标（Material Design Icons PNG）
  icons/sections/ ...          各板块图标（已烘焙成红色）
  gradient.js                  ← Vite 构建产物（IIFE，含 React），需提交
gradient-src/                  渐变背景的 React 源码 + Vite 构建
  src/FeralGradient.jsx        FeralUI 生成物，勿手改
  src/mount.jsx                挂载入口
  vite.config.js               lib 模式（iife）输出 ../assets/gradient.js
  package.json / package-lock.json
  .gitignore                   忽略 node_modules
agent.md                       本文件
```

## 构建（渐变背景）

```sh
cd gradient-src
npm.cmd install
npm.cmd run build   # 输出 ../assets/gradient.js（IIFE，React 已打包并压缩）
```

- 产物必须是**普通脚本（IIFE）**，`index.html` 用 `<script defer src="assets/gradient.js">` 引入。
  **不要改回 `type="module"`** —— `file://` 直接打开时 ES module 会被拦截，渐变不显示。
- 修改了 `gradient-src` 后，必须重新 build 并提交 `assets/gradient.js`。
- `gradient-src/src/FeralGradient.jsx` 顶部写着 "Generated ... Do not edit"，请勿直接改它。

## 本地预览

- 直接双击 `index.html` 即可（渐变是 IIFE，无需服务器）。
- 也行：任意静态服务器指向仓库根目录。

## 设计体系（重要约定）

- 画布纯黑 `--ink-000 #000000`；文字为骨白 / 灰阶。
- 强调色：赛车红 `--signal #C8102E`（亮态 `--signal-bright #E8384F`）。仅用于：在线状态点、键盘焦点、主 CTA、COMING SOON、板块图标。
- 字体：`Noto Sans SC`（中文）、`Archivo`（拉丁）、`IBM Plex Mono`（数据，tabular）。
- **零圆角、零阴影**，以 1px hairline 组织结构；**唯一例外**：03 段淡黄 Demo 卡（`--demo-bg #F2EBD3`，圆角）。
- 大量留白、文档式左对齐。避免 AI 常见套路：全大写 eyebrow、按钮加「→」、统一圆角卡片、柔和灰色阴影、装饰性编号。

## 页面结构

顶栏 → 01 Hero → 02 为什么 → 03 车格（Demo 卡）→ 04 时间线 → 05 性格 → 06 愿景 → 07 上线 / 加入（平台 + 二维码）→ 页脚。

## 关键交互 / 行为

- **顶栏**：`position:sticky`，背景透明。
  - 滚过约 `0.85` 屏 → `<html>` 加 `is-scrolled` → `.topbar::after` 显示「黑→透明」渐变（避免与正文打架）。
  - 滚过约 1 屏 → `<html>` 加 `is-docked` → 顶栏小 Logo `opacity` + `scale(1.6→1)` 缩小淡入。初始顶栏不显示 Logo。
- **Hero**：整屏 `min-height:calc(100svh - var(--topbar-h))`；logo + slogan 组在「顶栏下沿 → 解释/CTA 区上沿」之间水平+垂直居中。
  - 进场动画：logo 先完全居中 → 停顿 → 上移并淡入 slogan；`prefers-reduced-motion` 下无动画、直接终态。
- **JS 实测**：`index.html` 底部脚本测量 `--topbar-h`（顶栏高）与 `--logo-shift`（logo 居中偏移）。改字号/间距后无需手改数值。
- **背景**：`.site-bg`（`z-index:-2`，React 渐变）+ `.site-scrim`（`z-index:-1`，黑遮罩，随滚动 `0.38 → 0.70`）。渐变全程保留（WebGL 持续动画）。
- 板块/平台图标来自 Material Design Icons（PNG，`filter:invert(1)` 或预先上色）。

## 提交 / 发布

- 直接在 `main` 提交并 `git push origin main` 即触发 Pages 更新。
- 提交前用 `git status` 检查；**不要提交** `gradient-src/node_modules`（已被 `.gitignore` 忽略）。
- 网络偶发 `Failed to connect to github.com:443`，重试即可。

## 已知注意点

- 布局强依赖 `100svh` 与 `position:sticky`，改动后请在小屏 / iOS 上确认。
- 渐变组件会向 `document.head` 注入一批 Google Fonts（Anton 等），作背景其实用不到，属可优化项。
- Logo 来自 `.ai`（PostScript）转换出的 SVG；如换新 Logo，替换 `assets/*-logo.svg` 即可（会同时用于字标位）。
