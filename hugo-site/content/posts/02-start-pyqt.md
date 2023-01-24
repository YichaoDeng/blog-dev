---
title: "MacOS安装与配置PyQt5"
date: 2023-01-24T15:28:17+08:00
categories: ["PyQt"]
tags: ["MacOS", "PyQt"]
author: "Yichao"
draft: false
description: "简单记录MacOS安装与配置PyQt5"
---

## 1. 首先使用 homebrew 包管理工具安装 pyqt@5

```bash
brew install pyqt@5
```

## 2. 安装完成后记录一下安装路径

```bash
==> Pouring qt@5--5.15.8_1.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/qt@5/5.15.8_1: 10,840 files, 344.4MB
==> Installing pyqt@5
==> Pouring pyqt@5--5.15.7_2.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/pyqt@5/5.15.7_2: 3,966 files, 102MB
```

## 3. 把 PyQt5 拓展拷贝到需要开发的虚拟环境中去
   > 因为 Mac 用 pip 无法直接安装 PyQt5，所以可以使用这种南水北调的方式

```bash
# 进入安装位置的包目录
cd opt/homebrew/Cellar/pyqt@5/5.15.7_2/lib/python3.10/site-packages

# 执行拷贝到虚拟环境
cp -r * /opt/homebrew/Caskroom/miniconda/base/envs/PyQt/lib/python3.10/site-packages
```

## 4. 验证迁移是否成功

   如使用 `PyCharm` 时，等待 `indexing` 索引重新建立完成时，`import PyQt5` 变成了可以选中的状态

## 5. Pycharm 配置外部扩展工具 External Tools

### 5.1 配置 Qt Designer

- 找到你 `Designer.app` 所处位置，设置为 `Program` 路径
- `Working directory` 设置为 `$ProjectFileDir$`

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/6B6E8675-8C5C-4364-B8A3-4769EE4FBC31/EB836F4F-090A-46CB-8028-AFA11791DBCA_2/05yKVy0H20EiPfvgnfBqrIed5lPMOtdyg8Tvxi14i1cz/Image.png)

### 5.2 配置 Qt PyUIC

- 找到 `pyuic` 所处位置，设置为 `Program` 路径，图中为第一项 `pyuic5`
![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/6B6E8675-8C5C-4364-B8A3-4769EE4FBC31/BB650392-67C8-4EF0-A48A-7F5368728ED2_2/CEA4Vg4XalOXkZBZCOd47JBYcydizVWzzijYD1FeFfoz/Image.png)

- Program 参数设置为如下：

```bash
/opt/homebrew/Cellar/pyqt@5/5.15.7_2/bin/pyuic5
```

- Arguments 参数设置为如下：

```bash
$FileName$ -o $FileNameWithoutExtension$.py
```

- Working Directory 参数设置仍为：

```bash
$ProjectFileDir$
```

- 详情如图所示：

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/6B6E8675-8C5C-4364-B8A3-4769EE4FBC31/DA0713C5-E291-422E-91E1-C6C33DE9311D_2/KlbyWAkfUMfW3ZX0SozRbAaowYxcbPILkovefgx53Bwz/Image.png)

### 5.3 配置 Qt PyRRC

- 路径同上

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/6B6E8675-8C5C-4364-B8A3-4769EE4FBC31/A67227F7-B107-4A14-AD4F-2C541DDDE10F_2/gMOxHOQTh4vGPJEknShTMUFcxOt7Hj5ERYBi5pAT1MEz/Image.png)

- Program 参数设置为如下：
```bash
/opt/homebrew/Cellar/pyqt@5/5.15.7_2/bin/pyrrc5
```

- Arguments 参数设置为如下：

```bash
$FileName$ -o $FileNameWithoutExtension$.py
```

- Working Directory 参数设置仍为：

```bash
$ProjectFileDir$
```

- 详情如图所示：

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/6B6E8675-8C5C-4364-B8A3-4769EE4FBC31/5F9CE9C4-328D-4250-8959-C6DB9788077B_2/ydk5f0yxpjbvhaldPyEotYfx7zfCnLJyOkSl0eOqJnwz/Image.png)



