# 高项冲刺刷题

一个纯静态的手机刷题页面。

## 本地打开

推荐使用本地静态服务打开：

```bash
python3 -m http.server 8765
```

然后访问：

```text
http://127.0.0.1:8765/
```

## 数据

题库原始备份保留在 `questions.json` 中，不需要每次运行 PDF 抽取脚本。

页面读取并维护的是 `data/` 目录中的拆分数据：

- `data/index.json`：章节索引
- `data/chapter-01.json` 等：按章节拆分后的题目

页面会优先加载 `data/` 中的拆分数据；如果失败，再回退到 `questions.json`。后续修正 OCR 问题时，优先直接改对应章节文件。

当 `questions.json` 更新后，运行下面的命令重新生成拆分数据：

```bash
node scripts/split-questions.js
```

## 部署

仓库包含 GitHub Actions 工作流。推送到 `main` 分支后，工作流会把静态文件发布到 `gh-pages` 分支。

第一次部署后，到 GitHub 仓库的 `Settings` -> `Pages`，把 `Build and deployment` 设置为：

- Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`
