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

题库数据已经固定在 `questions.json` 中，页面会自动加载该文件，不需要每次运行 PDF 抽取脚本。

## 部署

仓库包含 GitHub Actions 工作流。推送到 `main` 分支后，工作流会把静态文件发布到 `gh-pages` 分支。

第一次部署后，到 GitHub 仓库的 `Settings` -> `Pages`，把 `Build and deployment` 设置为：

- Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`
