---
title: "NeoVim的安装与扩展配置"
date: 2023-01-22T00:00:00+00:00
weight: 1
tags: ["neovim"]
categories: ["neovim"]
author: "Yichao"
draft: false
description: "简单记录NeoVim的安装与扩展配置过程"
---
## 1. 安装 neovim

```bash
brew install neovim
```
官方仓库地址：
[GitHub - neovim/neovim](https://github.com/neovim/neovim)

<!--more-->

## 2. 安装后检查事项

```bash
nvim # 打开nvim

:checkhealth # 检查健康，是否有不正常项

:ehco has('python3')	# return 0 or 1
```
> 如果出现 `python` 相关的 warning 如provider，下图是正常的状态：

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/972D8306-B01B-4665-99B5-DC2A76EAEB6B/37CF0403-0B65-4621-B551-080594393D67_2/d1QYMxxHsSWSUyJQK8LiLLMIg6INadPWcGbzPRmI4d0z/Image.png)

> 那么可以通过 `conda`  的方式给它配置 `python` 环境

```bash
conda install -c conda-forge neovim
```

## 3. 了解 nvim 插件
官方仓库地址：
[GitHub - rockerBOO/awesome-neovim: Collections of awesome neovim plugins.](https://github.com/rockerBOO/awesome-neovim)

## 4. 了解一个 UP 主的客制化
   - B站 地址
     [NVIM系列 第1篇 lua配置简单入门+packer.nvim插件管理思路_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1vv4y1D7mu/?spm_id_from=pageDriver&vd_source=4acd0002587c68d48e302a17df092fe9)

   - Github地址
     [GitHub - yaocccc/nvim](https://github.com/yaocccc/nvim)

   - Blog 地址
     [cc](https://yaocc.cc)

## 5. 安装 packer 包管理工具

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

## 6. 安装 JetBrains-mono-nerd-font 字体

```bash
brew tap homebrew/cask-fonts
brew install --cask font-jetbrains-mono-nerd-font
```

```bash
git clone https://github.com/ryanoasis/nerd-fonts.git --depth 1

cd nerd-fonts
 
./install.sh
```

安装完成之后 `终端` 设置中更换字体

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/972D8306-B01B-4665-99B5-DC2A76EAEB6B/3462E238-A221-4FDD-857E-25AEF613DF5E_2/PCtNeZ8SgF74q856rtrhvTmM1uNwKdH2zMVgR2cKOSMz/Image.png)

## 7. 安装 nodejs

```bash
asdf add plugin nodejs

asdf list all nodejs

asdf install nodejs 19.4.0

asdf global nodejs 19.4.0

node -v
```

## 8. 克隆 up主 仓库

```bash
cd ~/.config/

git clone https://github.com/yaocccc/nvim
```

## 9. 打开 nvim 执行包同步

```bash
nvim

:PackerSync
```

## 10. 查看完成效果

![Image.png](https://res.craft.do/user/full/0911179a-5ddb-abdb-9353-a5ee6fd2eac7/doc/972D8306-B01B-4665-99B5-DC2A76EAEB6B/2EC81812-DDD5-4E9B-9144-F9C544B50986_2/MY5kuG2qr2UCecstd8kSuAecy0T1gtDlbf9eVAJcY9sz/Image.png)


