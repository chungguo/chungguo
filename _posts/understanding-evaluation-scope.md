---
title: '一图看懂 JavaScript 执行上下文'
date: '2020/02/29'
cover: 'assets/blog/understanding-evaluation-scope/cover.png'
excerpt: '根据 `ECMAScript 2015` 语言规范的定义，执行上下文是抽象概念上的代码执行环境，`ECMAScript` 实现（通常来说就是浏览器，更具体而言就是 `V8` 引擎）用来记录代码运行时的值。一言以蔽之，`JavaScript` 无论何时都是在执行上下文中运行，且代码运行时，最多只能存在一个执行上下文。'
---


根据 `ECMAScript 2015` 语言规范的定义，执行上下文是抽象概念上的代码执行环境，`ECMAScript` 实现（通常来说就是浏览器，更具体而言就是 `V8` 引擎）用来记录代码运行时的值。一言以蔽之，`JavaScript` 无论何时都是在执行上下文中运行，且代码运行时，最多只能存在一个执行上下文。

首先，我们以 `Chrome` 浏览器为例，看下 `V8` 是如何执行 `JavaScript` 代码的。如下图所示，`V8` 引擎在生成字节码之后，会生成该段代码对应的执行上下文。

![98ebda19251fe6dbd3ff4bd56a187de2.jpg](https://i.loli.net/2020/05/14/mUyhqu4Ja5eHZFT.png)

在 `JavaScript` 中，我们常见的通常有 `3` 种执行上下文，分别是：
- 全局执行上下文
  
  我们知道，`JavaScript` 在执行的时候，默认会有一个基础的全局环境，里面存放着全局对象，在浏览器中有我们熟悉 `window` 对象，在 `Node.js` 中便是 `global` 对象。除此默认的全局对象之外，任何我们声明的全局变量，或者任何不在函数内的代码均是定义或运行在该全局执行上下文中。且在一段代码中，有且只有一个全局执行上下文，直至整个程序退出。

- 函数执行上下文

  在 `JavaScript` 中，函数是一等「公民」。每一个函数都有其自己的执行上下文，每次函数在调用时，随即新的函数执行上下文也会被创建，并在函数执行结束后被销毁。

- `eval` 函数执行上下文

  `eval` 函数被调用时，在其中运行的代码也会有一个专属的执行上下文。但是因为 `eval` 因安全性和性能问题并不被推荐使用，所以下文将不会对其进行介绍（主要是没有找到相关资料，但既然都属于执行上下文，其定义与其他执行上下文应无较大差异）。

如图所示，每一个执行上下文均包含 `3` 个内部的状态组件：

- `Code Evaluation State`

  顾名思义，该组件表示任何和该执行上下文执行、暂停、恢复代码运行相关的状态

- `Function`

  如果这个执行环境正在执行函数对象的代码，那么这个组件的值就是该函数对象。如果上下文执行脚本或模块的代码，则该值为 `null`

- `Realm`

  所有的 `ECMAScript` 代码在执行前必须关联一个 `Realm`。可以简单理解为，一个 `Realm` 表示着该段代码能够访问哪些资源，如全局对象和全局环境。

除此之外，执行上下文还会包含两个可选的状态组件：词法环境（`LexicalEnvironment`） 和 变量环境（`VariableEnvironment`）。词法环境由三部分组成：

![2cfa09e883aacb61204c0470a8800acf.jpg](https://i.loli.net/2020/05/14/D6VEAaswy2UCJB4.jpg)

- `Environment Record`

  我们使用 `var`、`let`、`const`、`function` 定义的变量及函数便存储在该环境记录中。只不过，根据执行上下文的不同，分为对象环境记录和声明环境记录两种。在全局执行上下文中便是对象环境记录，其中记录着全局对象、全局变量、全局函数。在函数执行上下文中存储中变量和函数声明，同时函数的参数对象 argument 也存储在其中。

- `Outer`

  `outer` 记录着作用域查找的外部对象，当当前作用域找不到变量时，便会从 `outer` 指向的外部对象查找，同理类似，直至最外层作用域。`outer` 所指向的外部对象在代码定义时确定，而非像 `this` 一样在运行时确定。下面这个例子中，`foo` 函数在执行时，其函数执行上下文中 `outer` 所指向的外部对象是 `foo` 函数定义时所在的全局对象。

  ```js
  var str = 'global'

  function foo () {
    console.log(str)
  }

  function bar () {
    var str = 'bar'
    foo()
  }
  bar() // global
  ```

- `This binding`
  
  在全局执行上下文中，`this` 绑定的便是全局对象。而在函数执行上下文中，`this` 值绑定根据调用方式的不同而不同，所以说 `this` 的值是动态绑定的。

说完 `LexicalEnvironment`，再说 `VariableEnvironment`。 根据 `ECMAScript` 的标准定义，本质上`VariableEnvironment` 和 `LexicalEnvironment` 都是 `LexicalEnvironment`，并且他们拥有相同的初始值。这也是图中除了 `Environment Record` 处稍有不同外，其他均相等的原因。

  > The LexicalEnvironment and VariableEnvironment components of an execution context are always Lexical Environments. When an execution context is created its LexicalEnvironment and VariableEnvironment components initially have the same value.

> http://ecma-international.org/ecma-262/6.0/#sec-execution-contexts

我们知道，`ES5` 中是没有块级作用域概念的，在 `ES6` 中才引入了块级作用域，同时也多了 `let` 和 `const` 的块级作用域变量声明方式。`ECMAScript` 便是通过词法环境和变量环境中的 `Environment Record`  环境记录做到同时兼容 `var` 和 `let`，`const` 声明的。`ES6` 中函数及 `let`，`const`声明的函数或变量会被保存在词法环境的环境记录中，而 var 声明的函数或变量便会保存在变量环境的环境记录中，当需要寻值时，先从词法环境的环境记录中查找，再去变量环境的环境记录中查找。

如上，熟悉一张执行上下文组成图，便能够清晰搞懂执行上下文相关的概念、用途。

参考资料：
- https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0
- http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf