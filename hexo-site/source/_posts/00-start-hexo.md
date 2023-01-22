---
title: Hexo博客部署与NexT主题的使用
date: 2023-01-21 03:00:00
categories: 博客
tags: 博客
---
## 安装 Hexo
```bash
# 1. global (my choice)
npm install -g hexo-cli
# 2. local
npm install hexo
# choose 1 or 2 -> install
# 3. uninstall
npm uninstall hexo
```
官方参考：
[Hexo官方文档](https://hexo.io/zh-cn/docs/)
<!--more-->
## 初始化仓库

```bash
hexo init [blog-repo-name]

cd [blog-repo-name]

git init

git add .

git commit -m "first commit"

git branch -M master

git remote add origin git@github.com:[user-name]/[repo-name].git

git push -u origin master
```

## 下载 NexT 主题

```bash
cd [blog-dir]

git clone https://github.com/theme-next/hexo-theme-next themes/next
```
官方指引：
[hexo-theme-next](https://github.com/theme-next/hexo-theme-next/blob/master/docs/INSTALLATION.md)

## 配置 NexT 主题

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/1EC76D1D-2C9E-4339-99F6-7E767E14D422/45D8388D-7E23-426C-B5B0-46258AA83FF6_2/QMKgGCf0zoc16Kxhxtq1vuuVFTuymv6mKLthCy5NVHAz/Image.png)

```bash
hexo clean

hexo g

hexo s

# use webbrowser visit http://localhost:4000
```

## 设置部署站点

   编辑 _`config.yml`

```other
deploy:
	type: git
  	repo:
		github: git@github.com:[user-name]/[user-name].github.io.git
  	branch: master
```

## 拷贝并修改主题配置文件

```bash
cp _config.yml ../../_config.next.yml


# use editor to modify your custom settins
```

## 安装部署插件

```bash
npm install --save hexo-deployer-git

hexo d
```

