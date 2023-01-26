---
title: "Python中的__all__代表什么"
date: 2023-01-26T18:10:37+08:00
categories: ["Python"]
tags: ["Python"]
author: "Yichao"
draft: false
description: "摘自：https://blog.csdn.net/weixin_39922868/article/details/111069655"
---

## 1. 模块公开接口的一种约定
__all__可以在模块级别暴露接口，形式如下：

```python
__all__ = ["foo", "bar"]
```

- Python 没有原生的可见性控制，其可见性的维护是靠一套需要大家自觉遵守的”约定“，比如，下划线开头的变量对外部不可见。

- `__all__` 是针对模块公开接口的一种约定，以提供了”白名单“的形式暴露接口。如果定义了`__all__`，其他文件中使用 `from xxx import *` 导入该文件时，只会导入 `__all__` 列出的成员，可以其他成员都被排除在外。
    <br><br>
    如，test1.py,test2.py,test3.py三个文件：
```python
# test1.py
# __all__ = ['func']
def func():
    pass

# test2.py
import test1

__all__ = ['func2', 'test1']

def func2():
    pass  
def func22():
    pass

# test3.py
from test2 import *

func2() #能正常引用
test1.func() #能正常引用
func22() #不能正常引用
```


## 2. 控制 `from xxx import *` 的行为

python不提倡用 `from xxx import *` 这种写法。如果一个模块 `xxx` 没有定义 `__all__` ，执行 `from spam import *` 时会将 `xxx` 中所有非下划线开头的成员(包括该模块import的其他模块成员)都会导入当前命名空间，这样就可能弄脏当前的命名空间。显式声明了 `__all__` ，`import *` 就只会导入 `__all__` 列出的成员，如果 `__all__` 定义有误，还会明确地抛出异常，方便检查错误。

## 3. 为 lint 等代码检查工具提供辅助

编写库时，经常会在 `__init__.py` 中暴露整个包的 API，而这些 API 的实现可能是在包的其他模块中。如果仅仅这样写：`from xxx import a, b`，一些代码检查工具，如 pyflakes 会报错，认为变量 a 和 b import 了但没被使用。一个可行的方法是把这个警告压掉：`from xxx import a, b # noqa` (No Q/A，即无质量保证)，但更好的方法是显式定义 `__all__` ，这样代码检查工具就会理解，从而不再报 `unused variables 的警告`。

## 4. 定义 all 需要注意的地方 `__all__` 的形式都是 list 类型。如果写成其他类型， pyflakes 等 lint 工具可能无法识别。

 - 不能动态生成 `__all__`，如使用列表解析式。`__all__` 的作用是定义公开接口，需要以字面量的形式显式写出来。

- 即使定义了 `__all__`， 也不应该在非临时代码中使用 `from xxx import *` 语法，或用编程工具模拟 Ruby 的自动 import。Python 不像 Ruby，没有 Module 这类成员，模块就是命名空间隔离的执行者。如果打破了这一层，引入诸多动态因素，生产环境中跑的代码就可能充满不确定性，调试也会变得困难。

- 按照 PEP8 建议的风格，`__all__` 应该写在所有 import 语句下面，函数、常量等成员定义的上面。如果一个模块需要暴露的接口改动频繁，`__all__` 可以这样定义, 这样修改一个暴露的接口只修改一行，方便版本控制的时候看 `diff` 。最后多出的逗号在 Python 中是允许的，符合 `PEP8` 风格:
```python
__all__ = ["foo","bar","egg"]
```
