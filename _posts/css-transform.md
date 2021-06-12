---
title: 'CSS 变换背后的线性变换原理'
date: '2020-03-26 18:29:00'
cover: '/assets/blog/css-transform/cover.png'
excerpt: '在看似简单，并被我们习以为常的 css 变换背后，隐藏着复杂的矩阵变换，本文尝试解释其中的数学原理'
---

`CSS` 的 `transform` 属性允许开发者无需借助 `SVG`、`Canvas`、`Javascript` 等方式，仅仅通过 `CSS` 便能以尽可能简单的方式实现对指定标签元素的旋转（`rotate`）、缩放（`scale`）、倾斜（`skew`）、平移（`translate`）等操作，大大丰富了前端页面布局及动画效果的可能性。但更深层次而言，在这些直观易懂的属性背后却是更为高阶的 `matrix` 属性发挥着作用。如果能够正确理解 `matrix` 属性及其背后的线性变换原理，那么再回头看 `matrix` 属性时，便会有拨开云雾见青天的快感。

![transform 示例](/assets/blog/css-transform/transform.png)

## 1. 我们为什么需要理解 matrix 属性

### 1.1 形式简洁

在我们的实际使用场景中，对目标对象的变换往往不是单一的，即一次变换通常是旋转、缩放、平移等变换的多次组合。例如，在一次 `2D` 平面的变换中，先水平和垂直方向各平移 `100px`，然后水平方向缩放 `2` 倍，垂直方向缩放 `4` 倍，那么常用的实现方式如下所示：

```css
div {
  transform: translate(100px, 100px) scale(2, 4)
}
```

使用以上这种表示方法，固然十分清晰的描述了整个**变换过程**，但当我们的变换需要完成十次八次乃至更多次类似的基础变换才能完成时，如此书写便会略显冗长。同时，变换的书写顺序也至关重要，相同的两次变换，相反的顺序，结果也有可能千差万别。此时，如果使用 `matrix` 属性描述相同的变换组合，形式上便会显得更加简洁。当然，这是以牺牲可读性为代价。

```css
div {
  transform: matrix(2, 0, 0, 4, 100, 100); 
}
```

如上所示，如果简单从形式上看 `matrix` 属性隐藏了变换的细节，更加强调了最终的**变换结果**。关于表述形式上的差异，我们可以拿 `css` 中字体颜色的设置做类比。同样是将字体颜色设置为白色，我们经常使用的有十六进制表示法和 `RGB` 表示法，两者的最终结果是一致，但 `RGB` 表示法更加 `Human Friendly`，可以很清晰的看出 `RGB` 分量值。相对的，十六进制表示法则更加 `Machine Friendly`。`matrix` 属性便是 `transform` 诸多属性中 「`Machine Friendly`」 的那一个。

```css
/* 十六进制表示法 */
h1 {
  color: #FFFFFF;
}
/* RGB表示法 */
h2 {
  color: rgb(255, 255, 255);
}
```

### 1.2 JavaScript 解析计算

目前，在所有支持 `CSS transform` 属性的的浏览器中，当我们使用 `window.getComputedStyle` 方法获取元素所有最终应用的 `CSS` 属性值时，细心的你肯定早已发现，所有的 `translate`、`rotate`、`skew` 都被解析成了 `matrix` 属性。例如，`xscroll` 模拟滚动实现方案的原理便是使用了 `transform` 的 `translate` 属性，浏览器会将其转换成等价的 `matrix` 属性。如果不理解 `matrix` 属性，那么获取从 `computedStyle` 中获取当前滚动值就会比较困难。

![图2. translate 最终会被转化为 matrix](/assets/blog/css-transform/translate-to-matrix.png)

### 1.3 矩阵变换实现图形变换

如果说从上述两个角度解释为什么我们需要理解看似复杂的 `matrix` 属性是站在更加上层的应用层角度做出的解释。那么从更根本的层面上而言，是因为计算机对图形图像的处理过程，需要用到各种各样的几何变换，而这些变换基本都是由平移、缩放、旋转等基本变换组合而来（其实，这也解释了为什么 `css transform` 提供了 `translate`、`rotate`、`scale`、`skew` 等属性，因为这些属性恰恰正是这些基础变换的语法糖）。对于一个指定空间中的指定图形图像，为了便于精确描述，通常会将其放入一个坐标系统中，这样图形图像上的每一个点都有一个唯一的坐标。对图形图像的变换实际就是图形图像上的每一个点进行坐标变换，如果使用传统的解析几何描述这些坐标变换，计算会变得非常复杂，显然不符合「大道至简」自然法则。矩阵的出现则在形式上更加简洁优美，同时将各种变换通过矩阵乘法运算进行了语言表达的统一，具体而言，二维平面内 `css transform` 基础变换均可以统一为如下所示的三行三列的矩阵乘法：

![图3. rotate、skew、scale、translate 变换的 matrix 表示法，将所有变换统一为了矩阵的乘法运算](/assets/blog/css-transform/matrix-formula.png)

从上列各式，我们引入了矩阵的简单概念及形式，但因**矩阵本质上描述的是向量空间（线性空间）中的线性变换**。所以，了解矩阵之前，首先需要了解什么是向量、向量空间以及什么是线性变换。

## 2. 向量与向量空间

向量是一个同时具有大小和方向，且满足平行四边形法则的几何对象，我们高中物理力学及解析几何中称之为矢量。更形象而言，从物理学的角度来看，我们习惯于使用一个有方向的箭头表示，且物理中的向量是可以随意移动的，只要向量的大小和方向不变，无论如何移动，均为同一向量，如图：

![图4. 向量表示](/assets/blog/css-transform/vector.png)

而站在数字化的计算机角度，向量则表示的是一有序的列表，类似数组。因数学是高度抽象的，所以从数学的角度出发，只要满足一定的规则，向量可以是一个具体的函数，也可以是经抽象后更一般的向量概念，使用向量符号，如 $\vec v$

而所谓空间，我们最熟悉的莫过于每天生活的这个三维空间（牛顿绝对时空观）。在这个空间中，有草木虫鱼，有人及人类活动，有位置坐标，以及看不见摸不着的空间中每个个体之间的联系，且这个三维空间中的一切在指定参考系下，都按照一定的自然规律运转。所以类似的，对于向量空间，也称线性空间，我们可以这样简单的类比理解：向量空间中的任何一个对象，在数学上通过选取基（参考系）和坐标的办法，都可以表达为向量的形式，而可加性和数乘性是这个空间的「自然规律」，线性变换便是发生在向量空间中符合「自然规律」的「运动」。

## 3. 线性变换

线性空间（向量空间）中对象的「运动」被称作线性变换。换言之，线性空间中的任意一点的运动都可以用线性变换来完成，而点汇聚成线，线展开成面，面旋转成体。从而，我们可以说线性变换描述了线性空间中对象的变换，进而实现图形图像的变换操作。

### 3.1 线性

「线性」直观印象可能就是一条直线，对于如何描述直线，我们初中就学过——一次函数，不失一般性，形如：$y = kx + b$。其中$k$，$b$是常数且 $k \neq 0$ 。但是，从代数层面上而言，线性要满足以下两条性质。

1. **可加性**：$f(x_{1} + x_{2}) = f(x_{1}) + f(x_{2})$，即自变量单独作用的结果与自变量共同作用的结果相同。
2. **数乘性**：$f(ax) = af(x)$，其中$a$为常数。即因变量与自变量等比例变化。

**可加性和数乘性是线性变换的基础，因为矩阵加法、矩阵数乘运算基本构成了线性变换的全部，所以理解可加性和数乘性至关重要。**

如果同时满足可加性与数乘性（比例性），我们就认为是线性的。所以从代数层面上看$ y= kx + b$并不是严格的线性函数，因为如果
$$ f(x) = kx + b $$
则：
$$f(x_{1} + x_{2}) = k(x_{1} + x_{2}) + b $$
$$f(x_{1}) + f(x_{2}) = k(x_{1} + x_{2}) + 2b $$

显然，当$b \neq 0$时，$f(x_1 + x_2) \neq f(x_1) + f(x_2) $，不满足可加性。再看数乘性：

$$ f(ax) = akx + b $$
$$ af(x) = a(kx + b) = akx + ab $$

显然，当$ a \neq 1$ 时，不满足数乘性。故而，正比例函数 $ y= kx $ 才是最简单的线性函数。

## 4. 变换

变换（transformation）指的是空间中从一个点/元素到另一个点/元素的运动，但它不是微积分中的连续性的**运动**，而是瞬间发生的变化。以我们熟知的函数做类比，函数接收一个输入，得到一个输出。类似的，变换亦如此。之所以没有使用「函数」的概念，也许正是想让我们抛开代数式的理解方式，以运动的眼光看变换。

![图5. 变换](/assets/blog/css-transform/transform-diagram.png)

至此，一言以蔽之，**向量是线性空间的基本元素，所有满足可加性与数乘性的向量集合构成了向量空间，我们用向量坐标表示矩阵，通过矩阵运算描述线性变换。**

## 5. 矩阵

从数学定义而言，矩阵是一系列复数或者实数的集合，最早是由方程组的系数和常数项构造而来。

$$ \begin{cases} x+y+z = 6 \\\\ 0x + 2y+5z = -4 \\\\ 2x + 5y - z = 27  \end{cases} \Rightarrow \begin{bmatrix} 1 & 1 & 1 \\\\ 0 &  2  & 5 \\\\ 2 & 5  & -1 \end{bmatrix} \begin{bmatrix}  x  \\\\  y  \\\\  z \end{bmatrix} = \begin{bmatrix} 6  \\\\ -4  \\\\ 27 \end{bmatrix}$$

既然有了$x, y, z$的出现，那么从代数未知数$x, y, z$到三维几何空间中某一个点的坐标$(x, y, z)$的联想便显得非常自然而然。在线性代数中，所有的向量必须从坐标原点出发，那么向量的终点坐标$(x, y)$便唯一确定了该向量，为了与坐标表示做区分，向量使用$ \begin{bmatrix} x \\\\ y \end{bmatrix} $表示。那么从矩阵的角度看上述方程组，就相当于在问：空间中的一向量$ \begin{bmatrix} x  \\\\ y  \\\\ z \end{bmatrix}$ 经矩阵$\begin{bmatrix} 1 & 1 & 1 \\\\ 0 &  2  & 5 \\\\ 2 & 5  & -1 \\\\ \end{bmatrix}$变换后，转换为了向量$ \begin{bmatrix} 6  \\\\ -4  \\\\ 27  \\\\ \end{bmatrix}$，求该向量。先不论该问题到底如何求解，但由此，我们至少说明了矩阵是如何描述向量空间中的线性变换——矩阵乘法。又如，对于空间中向量$\begin{bmatrix} x  \\\\ y  \\\\ z \end{bmatrix}$先进行$A$变换，再进行$B$变换，我们可以表示为

![transform](/assets/blog/css-transform/transform.svg)

只不过形式上，变换的顺序是从右到左的，与我们常见的函数形式做类似，则形如$g(f(x))$，我们会先计算$f(x)$，然后才是$g(t)$，变换$A$则相当于函数$f$，变换$B$则相当于函数$g$。如此从形式上做对比，便更利于理解。当我们完成从代数到几何的思维转换之后，接下来我们就需要在几何中确定一组单位向量（基向量）以便于表示和理解矩阵计算。众所周知，我们定义沿着坐标轴方向，长度为单位长度的向量为该方向的单位向量（基向量），如$x$轴的基向量为$\overrightarrow{OA}$，记作$\overrightarrow{i}$，$y$轴的基向量为$\overrightarrow{OB}$，记作$\overrightarrow{j}$。那么在确定一组基向量后，由该组基向量所构成的线性空间内的所有向量均可用该组基向量的线性组合表示。由于变换是线性的，所以我们只需要知道该组基向量经线性变换后被变换到了哪里，就可以知道任何一个向量经变换后的坐标表示。

![图6. 基向量及其组合而来的其他向量](/assets/blog/css-transform/vector-composition.png)

那么举例而言$\overrightarrow{OC}$的坐标计算如下：

$$ \overrightarrow{OC} = 2 \overrightarrow{OA} + 2 \overrightarrow{OB} = 2 \begin{bmatrix}1  \\\\ 0 \end{bmatrix} + 2 \begin{bmatrix} 0  \\\\ 1 \end{bmatrix} = \begin{bmatrix} 2 \times 1 + 2 \times 0  \\\\ 2 \times 0 + 2 \times 1 \end{bmatrix} = \begin{bmatrix} 2 \\\\ 2 \end{bmatrix} = 2 \begin{bmatrix} 1 \\\\ 1 \end{bmatrix} $$

由上式可知，向量$\overrightarrow{OC}$可以看作是$\overrightarrow{oa}$在$X$和$Y$轴方向放大两倍之后的结果，也就是保持坐标原点位置及坐标不动，将$X$轴和$Y$轴放大为原来的 2 倍，此时与正好相等。放大后，原来的基向量$\overrightarrow{i}$与$ \overrightarrow{j} $坐标分别变为了$\begin{bmatrix} 2 \\\\ 0 \end{bmatrix}$和$\begin{bmatrix} 0 \\\\ 2 \end{bmatrix}$，这个变换过程可以用矩阵表示为$\overrightarrow{OC} =  \begin{bmatrix} 2 \\\\ 2 \end{bmatrix} = \begin{bmatrix} 2  & 0  \\\\ 0  & 2 \end{bmatrix} \begin{bmatrix} 1 \\\\ 1 \end{bmatrix}$，即向量$\overrightarrow{oa} = \begin{bmatrix} 1 \\\\ 1 \end{bmatrix}$，经过矩阵$\begin{bmatrix} 2  & 0  \\\\ 0  & 2 \end{bmatrix}$变换由原坐标$\begin{bmatrix} 1 \\\\ 1 \end{bmatrix}$变成了$\begin{bmatrix} 2 \\\\ 2 \end{bmatrix}$，变换矩阵$\begin{bmatrix} 2  & 0  \\\\ 0  & 2 \end{bmatrix}$的第一列正好为变换后$\overrightarrow{i}$的坐标，第二列则为$\overrightarrow{j}$的坐标。我们追踪基向量的变化过程,$i: \begin{bmatrix} 1  \\\\ 0 \end{bmatrix}  => \begin{bmatrix} 2  \\\\ 0 \end{bmatrix}$，$j: \begin{bmatrix} 0  \\\\ 1 \end{bmatrix}  => \begin{bmatrix} 0  \\\\ 2 \end{bmatrix}$，所以此处，由变换后$\overrightarrow{i}$和$\overrightarrow{j}$向量坐标组成的矩阵$\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \end{bmatrix}$表示放大 2 倍的缩放变换矩阵。
$$ \overrightarrow{OC} = \begin{bmatrix} 2  & 0  \\\\ 0  & 2 \end{bmatrix} \begin{bmatrix} 1 \\\\ 1 \end{bmatrix} = 1 \begin{bmatrix} 2 \\\\ 0 \end{bmatrix} + 1 \begin{bmatrix} 0 \\\\ 2 \end{bmatrix} = \begin{bmatrix} 1 \times 2 + 1 \times 0  \\\\ 1 \times 0 + 1 \times 2 \end{bmatrix} = \begin{bmatrix}2 \\\\ 2 \end{bmatrix} $$ **（该计算过程非常重要，是可加性与数乘性的体现，也是其他复杂计算的基础）**

## 6. CSS 中基础变换的 matrix 表示推导

至此，我们回过头来看，上文图 3 中的基础变换为何可以与复杂的 matrix 对应。但在此之前，首先要解释一下，为何在二维坐标中矩阵变换会需要三维坐标表示。其实，这里主要引入了齐次坐标的概念，也就是用 N+1 维来代表 N 维坐标。还记得上一节缩放矩阵的例子吗？在缩放时，我们并没有改变原点的位置，因为线性变换要求变换前后坐标原点不能发生变化，平移变化移动了原点，所以不能称之为线性变化。把现有的二维空间升纬到三维空间去看，而多出的那一维度对于二维空间而言并用不到，所以并不会有任何影响，升维之后便可以在高维度通过线性变换完成低维度的仿射变换。

![图 7 仿射变换](/assets/blog/css-transform/affine-transformation.png)

另外，引入齐次坐标也可以统一计算形式，因为平移变化在表示上为矩阵加法，如将矩阵$\overrightarrow{OC} = \begin{bmatrix} 2  & 0 \\\\ 0   & 2 \end{bmatrix}$向右平移一个单位长度，那么其计算方法为：$\overrightarrow{OC'} = \begin{bmatrix} 2  & 0 \\\\ 0   & 2 \end{bmatrix} + \begin{bmatrix} 1  & 0 \\\\ 0   & 1 \end{bmatrix} = \begin{bmatrix} 3  & 0 \\\\ 0   & 3 \end{bmatrix}$。但缩放、旋转却为矩阵乘法，如将$\overrightarrow{OC} = \begin{bmatrix} 2 \\\\ 2 \end{bmatrix}$放大 0.5 倍，其计算方法为 $\overrightarrow{OC''} =
\begin{bmatrix} 0.5  & 0 \\\\ 0   & 0.5 \end{bmatrix} \begin{bmatrix} 2  \\\\ 2 \end{bmatrix} = \begin{bmatrix} 1 \\\\ 1 \end{bmatrix} $ 这样在一次平移与缩放同时存在的复杂变换中，就会存在矩阵加法与乘法的同时存在，因加法与乘法的计算规则不同，势必会增添计算的复杂性。齐次坐标的引入，便是为了解决该问题，将矩阵加法统一成了矩阵乘法，描述和计算上更加简洁，是一种数学之美的体现。下面，我们来看图 3 中各式的推导过程： 

![图 8 旋转变换](/assets/blog/css-transform/rotate-tansform.png)

对于旋转变换，如果进行逆时针旋转$\theta$，那么基向量的变化过程,$i: \begin{bmatrix} 1  \\\\ 0 \end{bmatrix}  => \begin{bmatrix} cos(\theta) \\\\ sin(\theta) \end{bmatrix}$，$j: \begin{bmatrix} 0  \\\\ 1 \end{bmatrix}  => \begin{bmatrix} -sin(\theta)  \\\\ cos(\theta) \end{bmatrix}$，故而对于二维平面内任意向量，其旋转矩阵用笛卡尔坐标系表示则为：$\begin{bmatrix} cos(\theta) & -sin(\theta) \\\\ sin(\theta)  & cos(\theta)\end{bmatrix} $，引入齐次坐标后，则表示为$\begin{bmatrix} cos(\theta)  & -sin(\theta) & 0 \\\\ sin(\theta)  & cos(\theta) & 0 \\\\0 & 0 & 1 \end{bmatrix}$（引入$Z$轴基向量$\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \end{bmatrix}$，下同），所以对向量$\begin{bmatrix} x \\\\ y \\\\ 1\end{bmatrix}$进行旋转，矩阵可表示为$rotate(\theta) =  \begin{bmatrix} cos(\theta)  & -sin(\theta) & 0 \\\\ sin(\theta)  & cos(\theta)  & 0 \\\\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\\\ y \\\\ 1\end{bmatrix}$

对于缩放变换 (scale) 则很好理解，如果单纯对$\overrightarrow{i}$进行 $m$ 倍缩放，则的变换为$i: \begin{bmatrix} 1  \\\\ 0  \end{bmatrix}  => \begin{bmatrix} m \\\\ 0 \end{bmatrix}$，同理，当单纯对$\overrightarrow{j}$进行 $n$ 倍缩放，则的变换为$j: \begin{bmatrix} 0  \\\\ 1 \end{bmatrix}  => \begin{bmatrix} 0  \\\\ n \end{bmatrix}$，所以，缩放变换矩阵用笛卡尔坐标系表示则为：$\begin{bmatrix} m & 0 \\\\ 0 & n \end{bmatrix}$，引入齐次坐标后，则表示为$\begin{bmatrix} m & 0 & 0 \\\\ 0 & n & 0 \\\\ 0 & 0 & 1 \end{bmatrix}$。所以对向量$ \begin{bmatrix} x \\\\ y \\\\ 1 \end{bmatrix} $进行缩放，矩阵可表示为：

$$scale(m, n) = \begin{bmatrix} m & 0 & 0 \\\\ 0 & n  & 0 \\\\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\\\ y \\\\ 1 \end{bmatrix}$$

![图 9 斜切变换](/assets/blog/css-transform/skew-transform.png)

对于斜切变换，参照示意图，我们同样不难推导出斜切变换的矩阵表示：

$$skew(\alpha, \beta) = \begin{bmatrix} 1 & tan(\alpha) & 0 \\\\ tan(\beta) & 1  & 0 \\\\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\\\ y \\\\ 1 \end{bmatrix}$$

最后，对于二维空间的平移变换，我们通过仿射变换实现，参照图 8，变换过程中$\overrightarrow{i}$，$\overrightarrow{j}$基向量并未发生改变，仅仅是$Z$轴基向量发生了改变，因此平移变换的矩阵表示为：

$$translate(m, n) = \begin{bmatrix} 1 & 0 & m \\\\ 0 & 1  & n \\\\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\\\ y \\\\ 1 \end{bmatrix}$$

至此，希望当下次看到 matrix 属性时，对你而言，其中的数字并不仅仅是一堆数字，而代表着一种具体变换

## 7. 线性化的其他应用场景

目前火热的人脸识别技术便是通过线性化实现的。人可以很容易区分两张面容图是不是同一个人，而计算机只能将所有问题数字化，实现方案便是将人脸线性化。如果将人脸中较为重要的鼻子、眼睛、嘴巴等采样点数据通过某种算法数字化，并用坐标表示，那么当给出一张新的面容时，按照相同的方法算出当前面容图的坐标，通过结果坐标是否落在目标平面或平面附近，就可以判断是不是同一个人。

---
参考资料

1. [The CSS3 matrix() Transform for the Mathematically Challenged](https://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/)
2. [CSS Transforms Module Level 1](https://www.w3.org/TR/css-transforms-1/)
3. [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw)
