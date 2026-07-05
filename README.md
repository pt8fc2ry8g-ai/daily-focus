# Daily Focus

Daily Focus 是一个纯前端小项目，用来管理今天最重要的任务，并配合 25 分钟专注计时器练习学习节奏。

这个项目不需要安装依赖，直接用浏览器打开 `index.html` 就能运行。

## 功能

- 25 分钟专注计时器
- 开始、暂停、重置计时
- 添加今日任务
- 勾选完成任务
- 删除任务
- 使用浏览器本地存储保存任务

## 文件结构

```text
daily-focus/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## 如何运行

进入项目目录：

```bash
cd daily-focus
```

用浏览器打开 `index.html`。

## GitHub 练习流程

第一次提交：

```bash
git status
git add .
git commit -m "create daily focus app"
```

如果你在 GitHub 上创建了同名仓库，可以连接远程仓库：

```bash
git remote add origin https://github.com/你的用户名/daily-focus.git
git push -u origin main
```

练习分支：

```bash
git switch -c improve-style
```

修改样式后：

```bash
git add .
git commit -m "improve page style"
git push -u origin improve-style
```

然后在 GitHub 页面创建 Pull Request。
