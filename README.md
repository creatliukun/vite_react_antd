### 感觉

vite 搭建的项目比较清爽，和之前的 index.html 不一样，vite 将 index.html 放在了根组件

---

因为我本地的 node 版本是 18.2,而我的项目里面的 react 版本也是 18.2,是不是可以理解为这个 react 版本是通过 node 版本来决定的呢？

---

热加载真的很快

---

不过为什么原生的组件用起来感觉很奇怪，样式受到了改变，尤其是我的 mac 在夜间模式下，按钮变成了黑色,因为做了全局配置

---

配置 antd 组件
yarn add antd-mobile

- antd-mobile 按需加载

---

注意： vite 引入插件方式是 import，require 导入方式是不行的

---

开发方式，mdd，金钱驱动开发

---

threejs 进行开发，还是会用到图形的

---

x,y 相对当于一个原点坐标，该坐标原点在盒子左上角

### canvas 提供了三种方法绘制矩形：

1,fillRect(x, y, width, height) 绘制一个填充的矩形
2,strokeRect(x, y, width, height) 绘制一个矩形的边框
3,clearRect(x, y, width, height) 清除指定的矩形区域，然后这块区域会变的完全透明。

### 2，因为 canvas 只能绘制矩形，所以如果想绘制其他图形，就需要用到绘制路径(path) 图形的基本元素是路径

​ 路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。
​ 一个路径，甚至一个子路径，都是闭合的。

- 使用路径绘制图形需要一些额外的步骤：
  - 1，创建路径起始点
  - 2.调用绘制方法去绘制出路径
  - 3，把路径封闭
  - 4，一旦路径生成，通过描边或填充路径区域来渲染图形。
- 下面是需要用到的方法：
  - 1，beginPath()
    新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
  - 2，moveTo(x, y)
    把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标。
  - 3，closePath()
    闭合路径之后，图形绘制命令又重新指向到上下文中
  - 4，stroke()
    通过线条来绘制图形轮廓
  - 5，fill()
    通过填充路径的内容区域生成实心的图形

### 3,绘制圆弧

有两个方法可以绘制圆弧：

- 1,arc(x, y, r, startAngle, endAngle, anticlockwise)
  以(x, y)为圆心，以 r 为半径，从 startAngle 弧度开始到 endAngle 弧度结束。anticlosewise 是布尔值，true 表示逆时针，false 表示顺时针。(默认是顺时针)
  这里的度数都是弧度。
  0 弧度是指的 x 轴正方形

```js
radians = (Math.PI / 180) * degrees;
```

- 2,arcTo(x1, y1, x2, y2, radius):
  根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。
  arcTo 方法的说明：

​ 这个方法可以这样理解。绘制的弧形是由两条切线所决定。

​ 第 1 条切线：起始点和控制点 1 决定的直线。

​ 第 2 条切线：控制点 1 和控制点 2 决定的直线。

### 4,绘制贝塞尔曲线

- quadraticCurveTo(cp1x, cp1y, x, y):
  ​ 参数 1 和 2：控制点坐标
  ​ 参数 3 和 4：结束点坐标

### 5,绘制三次贝塞尔曲线

​ 参数 1 和 2：控制点 1 的坐标

​ 参数 3 和 4：控制点 2 的坐标

​ 参数 5 和 6：结束点的坐标

### 6,添加样式和颜色

- 1,fillStyle = color

  设置图形的填充颜色

- 2,strokeStyle = color

  设置图形轮廓的颜色

1. `color` 可以是表示 `css` 颜色值的字符串、渐变对象或者图案对象。
2. 默认情况下，线条和填充颜色都是黑色。
3. 一旦您设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置 `fillStyle` 或 `strokeStyle` 的值。

### 7,Transparency(透明度)

globalAlpha = transparencyValue
这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。
globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为使用 rgba()设置透明度更加好一些。

### 8,line style

- 1,lineWidth = value
  线宽。只能是正值。默认是 1.0。
  起始点和终点的连线为中心，上下各占线宽的一半
- 2,lineCap = type
  线条末端样式。

共有 3 个值：
1,butt：线段末端以方形结束

2,round：线段末端以圆形结束

3,square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

- 3,lineJoin = type
  同一个 path 内，设定线条与线条间接合处的样式。

共有 3 个值 round, bevel 和 miter：
1,round

通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。

2,bevel

在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。

3,miter(默认)

通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

### 9,虚线

用 setLineDash 方法和 lineDashOffset 属性来制定虚线样式. setLineDash 方法接受一个数组，来指定线段与间隙的交替；lineDashOffset 属性设置起始偏移量.
备注：

​ getLineDash():返回一个包含当前虚线样式，长度为非负偶数的数组。

### 10、绘制文本

绘制文本的两个方法
canvas 提供了两种方法来渲染文本:

- 1，fillText(text, x, y [, maxWidth])

在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.

- 2，strokeText(text, x, y [, maxWidth])

在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

给文本添加样式

- 1,font = value

当前我们用来绘制文本的样式。这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。

- 2,textAlign = value

文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。

- 3,textBaseline = value

基线对齐选项，可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。

- 4,direction = value

文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit

### 11,绘制图片

- 1 由零开始创建图片
  创建<img>元素

```md
var img = new Image(); // 创建一个<img>元素
img.src = 'myImage.png'; // 设置图片源地址
```

脚本执行后图片开始装载

绘制 img

```md
//参数 1：要绘制的 img 参数 2、3：绘制的 img 在 canvas 中的坐标
ctx.drawImage(img,0,0);
```

注意：

​ 考虑到图片是从网络加载，如果 drawImage 的时候图片还没有完全加载完成，则什么都不做，个别浏览器会抛异常。所以我们应该保证在 img 绘制完成之后再 drawImage。

### 12,绘制 img 标签元素中的图片

img 可以 new 也可以来源于我们页面的 <img>标签

- 1 缩放图片
  这个方最后多了 2 个参数：width 和 height，这两个参数用来控制 当像 canvas 画入时应该缩放的大小。
  ctx.drawImage(img, 0, 0, 400, 200)

- 切片(slice)
  drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ​ 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。

其他 8 个参数：

​ 前 4 个是定义图像源的切片位置和大小，

​ 后 4 个则是定义切片的目标显示位置和大小

### 13,状态的保存和恢复

Saving and restoring state 是绘制复杂图形时必不可少的操作。
save()和 restore()

​ save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。
​ Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

- 1,关于 save()
  Canvas 状态存储在栈中，每当 save()方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：
  - 当前应用的变形（即移动，旋转和缩放）
  - strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值
  - 当前的裁切路径（clipping path）
  - 可以调用任意多次 save 方法。(类似数组的 push())
- 2,关于 restore()
  - 每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。(类似数组的 pop())

### 14, 变形

- 1 translate
  translate(x, y)

​ 用来移动 canvas 的原点到指定的位置
translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量

### 15,rotate 旋转

rotate(angle)

​ 旋转坐标轴
​ 这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

​ 旋转的中心是坐标原点

### 16,scale 缩放

scale(x, y)
​ 我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大
scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩 小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
​ 默认情况下，canvas 的 1 单位就是 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。同理，设置为 2.0 时，1 个单位就对应变成了 2 像素，绘制的结果就是图形放大了 2 倍。

### 17，transform(变形矩阵）

transform(a, b, c, d, e, f)
[
a,c,e
b,d,f
0,0,1
]

### 18,合成
​ 在前面的所有例子中、，我们总是将一个图形画在另一个之上，对于其他更多的情况，仅仅这样是远远不够的。比如，对合成的图形来说，绘制顺序会有限制。不过，我们可以利用 globalCompositeOperation 属性来改变这种状况
globalCompositeOperation = type
注：下面的展示中，蓝色是原有的，红色是新的。
type `是下面 13 种字符串值之一：
+ 1, source-over(default)
这是默认设置，新图像会覆盖在原有图像。
+ 2, source-in
仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。(包括其他的老图像区域也会透明)
+ 3,source-out
仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。(老图像也不显示)
+ 4,source-atop
新图像仅仅显示与老图像重叠区域。老图像仍然可以显示。
+ 5,destination-over
新图像会在老图像的下面。
+ 6,destination-in
仅仅新老图像重叠部分的老图像被显示，其他区域全部透明。
+ 7,destination-out
仅仅老图像与新图像没有重叠的部分。 注意显示的是老图像的部分区域。
+ 8,destination-atop
老图像仅仅仅仅显示重叠部分，新图像会显示在老图像的下面
+ 9,lighter
新老图像都显示，但是重叠区域的颜色做加处理
+ 10,darken
保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)
blue: #0000ff
red: #ff0000
所以重叠部分的颜色：#000000
+ 11,lighten
保证重叠部分最亮的像素。(每个颜色位进行比较，得到最大的)
blue: #0000ff
red: #ff0000
所以重叠部分的颜色：#ff00ff
+ 12,xor
重叠部分会变成透明
+ 13,copy
只有新图像会被保留，其余的全部被清除

### 19，裁剪路径
clip()
把已经创建的路径转换成裁剪路径。
裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。
注意：clip()只能遮罩在这个方法调用之后绘制的图像，如果是clip()方法调用之前绘制的图像，则无法实现遮罩。

## 二，动画
### 动画的基本步骤
+ 1，清空canvas
再绘制每一帧动画之前，需要清空所有。清空所有最简单的做法就是clearRect()方法
+ 2，保存canvas状态
如果在绘制的过程中会更改canvas的状态(颜色、移动了坐标原点等),又在绘制每一帧时都是原始状态的话，则最好保存下canvas的状态
+ 3，绘制动画图形
这一步才是真正的绘制动画帧
+ 4，恢复canvas状态
如果你前面保存了canvas状态，则应该在绘制完成一帧之后恢复canvas状态。
### 控制动画
我们可用通过canvas的方法或者自定义的方法把图像绘制到canvas上。正常情况，我们能看到绘制的结果是在脚本执行结束之后。例如，我们不可能在一个 for 循环内部完成动画
也就是，为了执行动画，我们需要一些可以定时执行重绘的方法。
一般用到下面三个方法：
+ setInterval()
+ setTimeout()
+ requestAnimationFrame()