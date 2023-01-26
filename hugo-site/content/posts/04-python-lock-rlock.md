---
title: "Python的threading模块中Lock和RLock区别"
date: 2023-01-27T01:02:33+08:00
categories: ["Python"]
tags: ["Python"]
author: "Yichao"
draft: false
description: "摘自：https://www.cnblogs.com/olivertian/p/11295031.html"
---

> 首先了解两者分别是什么, 以下说明参考自python官网

+ Lock：Lock被称为 `①原始锁`，原始锁是一个 `②在锁定时不属于特定线程` 的同步基元组件，它是能用的最低级的同步基元组件。原始锁处于 "锁定" 或者 "非锁定" 两种状态之一。它被创建时为非锁定状态。它有两个基本方法， `acquire()` 和 `release()` 。当状态为非锁定时， `acquire()` 将状态改为锁定并立即返回。当状态是锁定时， `acquire()` 将阻塞至其他线程调用 `release()` 将其改为非锁定状态，然后 `acquire()` 调用重置其为锁定状态并返回。 `release()` 只在锁定状态下调用； 它将状态改为非锁定并立即返回。如果尝试释放一个非锁定的锁，则会引发 `RuntimeError`  异常。锁支持 上下文管理协议，即支持 `with` 语句，下文例子中会用到。

+ RLock：RLock被称为 `重入锁` ，若要锁定锁，线程调用其 `acquire()` 方法；一旦线程拥有了锁，方法将返回。若要解锁，线程调用 `release()` 方法。  `③ acquire()/release()` 对可以嵌套，重入锁必须由获取它的线程释放。一旦线程获得了重入锁，同一个线程再次获取它将不阻塞。只有最终 `release()` (最外面一对的 `release()` ) 将锁解开，才能让其他线程继续处理 `acquire()` 阻塞。；线程必须在每次获取它时释放一次。


两者使用的方法大部分还是相同的，下面根据以上红色强调部分描述一下二者的区别
- ① 是名称的区别，一个叫原始锁，一个叫重入锁，这没啥好说的
- ② Lock在锁定时不属于特定线程，也就是说，Lock可以在一个线程中上锁，在另一个线程中解锁。而对于RLock来说，只有当前线程才能释放本线程上的锁，即解铃还须系铃人：


```python
import threading
import time

lock = threading.Lock()
lock.acquire()

def func():
    lock.release()
    print("lock is released")

t = threading.Thread(target=func)
t.start()

# 输出结果为：lock is released
```

上面代码中，在主线程中创建锁，并上锁，但是是在t线程中释放锁，结果正常输出，说明一个线程上的锁，可以由另外线程解锁。如果把上面的锁改为RLock则报错

③也是这两者最大的区别了，RLock允许在 ***同一线程*** 中被多次acquire。而Lock却不允许这种情况。也就是说，下面的情况对于RLock是允许的：

```python
import threading

rlock = threading.RLock()

def func():
    if rlock.acquire():   # 第一把锁
        print("first lock")
        if rlock.acquire():  # 第一把锁没解开的情况下接着上第二把锁
            print("second lock")
            rlock.release()  # 解开第二把锁
        rlock.release()  # 解开第一把锁


t = threading.Thread(target=func)
t.start()

# 输出结果： first lock  /  second lock
```

注意上面强调的 ***同一线程中*** ，因为对于RLock来说只有当前线程才能释放本线程上的锁，并不能在t1线程中已经执行 `rlock.acquire`，且未释放锁的情况下，在另一个t2线程中还能执行 `rlock.acquire`（这种情况会导致t2阻塞）

那么，既然一个线程可以通过Lock来获得一把锁，干嘛还要使用RLock去锁上加锁？考虑一下这种情况：

```python
import threading
import time

lock1 = threading.RLock()

def inner():
    with lock1:
        print("inner1 function:%s" % threading.current_thread())

def outer():
    print("outer function:%s" % threading.current_thread())
    with lock1:
        inner()

if __name__ == "__main__":
    t1 = threading.Thread(target=outer)
    t2 = threading.Thread(target=outer)
    t1.start()
    t2.start()

"""
结果：
　　 outer  function:<Thread(Thread-1, started 12892)>　　
    inner1 function:<Thread(Thread-1, started 12892)>　　
    outer  function:<Thread(Thread-2, started 7456)>　　
    inner1 function:<Thread(Thread-2, started 7456)>
"""
```

首先只看 `t1线程` ，当执行到 `outer` 函数时，首先打印 `outer function:<Thread(Thread-1, started 12892)>` ，然后用 `lock1` 给当前线程上了一把锁，然后执行 `inner` 函数，在 `inner` 里面又需要用 `lock1` 来上一把锁，如果此时用Lock的话，由于已经上了一把锁，程序会因为第二次无法获得锁而导致 `t1` 阻塞，程序阻塞之后又没法释放锁，所以会导致程序死锁。这种情况下，RLock就派上用场了。`t2` 线程执行过程和 `t1` 一样，这里只是多加个线程看起来酷炫一些    


> 总结：
> 1. 同一个线程可以对RLock请求多次，且RLock必须是本线程；
> 2. 如果用lock = threading.Lock()，则自动构成死锁，因为Lock只能被请求一次，所以第二次会一直等待下去。