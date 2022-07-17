import React, { useEffect, useRef } from 'react'

import './index.css'
export default function
    (props) {

    let canvas
    const { currentTab } = props
    let canvasRef = useRef(null)
    const draw = (ctx, canvas, currentTab) => {


        if (currentTab == 'click') {
            ctx.fillStyle = '#ffffff';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log('click')
            drawClick(ctx)
        }
        if (currentTab == 'map') {
            ctx.fillStyle = '#ffffff';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log('climapck')

            drawImage(ctx)
        }
        if (currentTab == 'image') {
            console.log('image')
            ctx.fillStyle = '#ffffff';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // drawImage1(ctx)
            drawTranslate(ctx)

        }
        
        ctx.fillStyle = "rgb(200,0,0)";

        let color1 = "rgb(200,0,0)"
        let shape1 = [10, 10, 55, 50]
        let color2 = "rgba(0, 0, 200, 0.5)"
        let shape2 = [30, 30, 55, 50]
        //绘制矩形
        //  ctx.fillRect(10, 10, 55, 50);

        // drawStrokeRect(ctx)
        // drawFillRect(ctx, color2, shape2)
        // drawFillRect(ctx, color1, shape1)

        // drawStraightLine(ctx)
        // drawTriangle(ctx)

        // drawRadians(ctx)

        // drawFillTriangle(ctx)
        //有点像熊猫，根据坐标点来
        // drawMoreRadians(ctx)
        // drawTriangleRadians(ctx)
        // drawQuadraticCurve(ctx)
        // drawBezierCurve(ctx)
        // drawMoreColor(ctx)
        // drawNoFillColor(ctx)
        // drawLineWidth(ctx)
        // drawLineCap(ctx)
        // drawLineJoin(ctx)
        // drawDashLine(ctx)
        // drawText(ctx)
        // drawImage(ctx)
        // drawImageOnPage(ctx)
        // drawSaveAndRestore(ctx)
        // drawTranslate(ctx)
        // drawRotate(ctx)
        // drawTransform(ctx)
        // drawGlobalOperation(ctx)
        // drawClip(ctx)

    }
    const drawStrokeRect = (ctx) => {
        ctx.strokeRect(0, 0, 100, 50);
    }
    const drawFillRect = (ctx, color, shape) => {
        ctx.fillStyle = color
        ctx.fillRect(...shape);
    }
    // 绘制直线
    const drawStraightLine = (ctx) => {
        ctx.beginPath(); //新建一条path
        ctx.moveTo(50, 50); //把画笔移动到指定的坐标
        ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
        //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
        ctx.closePath();
        ctx.stroke(); //绘制路径。
    }
    // 绘制三角形
    const drawTriangle = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
        ctx.stroke();
    }
    // 绘制填充三角形
    const drawFillTriangle = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
    }

    // 画圆弧
    const drawRadians = (ctx) => {
        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
        ctx.stroke();
    }
    // 画多个圆弧
    const drawMoreRadians = (ctx) => {
        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(50, 150, 40, -Math.PI / 2, Math.PI / 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(150, 150, 40, 0, Math.PI, false);
        ctx.fill();
    }

    // 两点画圆弧
    const drawTriangleRadians = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(50, 50);
        //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
        ctx.arcTo(200, 50, 200, 200, 100);
        ctx.lineTo(200, 200)
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(50, 50, 10, 10);
        ctx.rect(200, 50, 10, 10)
        ctx.rect(200, 200, 10, 10)
        ctx.fill()
    }

    const drawQuadraticCurve = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(10, 200); //起始点
        var cp1x = 40, cp1y = 100;  //控制点
        var x = 200, y = 200; // 结束点
        //绘制二次贝塞尔曲线
        ctx.quadraticCurveTo(cp1x, cp1y, x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(10, 200, 10, 10);
        ctx.rect(cp1x, cp1y, 10, 10);
        ctx.rect(x, y, 10, 10);
        ctx.fill();
    }

    const drawBezierCurve = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(40, 200); //起始点
        var cp1x = 20, cp1y = 100;  //控制点1
        var cp2x = 100, cp2y = 120;  //控制点2
        var x = 200, y = 200; // 结束点
        //绘制二次贝塞尔曲线
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(40, 200, 10, 10);
        ctx.rect(cp1x, cp1y, 10, 10);
        ctx.rect(cp2x, cp2y, 10, 10);
        ctx.rect(x, y, 10, 10);
        ctx.fill();
    }

    const drawMoreColor = (ctx) => {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                    Math.floor(255 - 42.5 * j) + ',0)';
                ctx.fillRect(j * 50, i * 50, 50, 50);
            }
        }
    }

    const drawNoFillColor = (ctx) => {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                ctx.strokeStyle = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
                ctx.strokeRect(j * 50, i * 50, 40, 40);
            }
        }
    }

    const drawLineWidth = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(100, 10);
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(110, 10);
        ctx.lineTo(160, 10)
        ctx.lineWidth = 20;
        ctx.stroke()
    }

    const drawLineCap = (ctx) => {
        var lineCaps = ["butt", "round", "square"];

        for (var i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(20 + 30 * i, 30);
            ctx.lineTo(20 + 30 * i, 100);
            ctx.lineWidth = 20;
            ctx.lineCap = lineCaps[i];
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(300, 30);

        ctx.moveTo(0, 100);
        ctx.lineTo(300, 100)

        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();

    }

    const drawLineJoin = (ctx) => {
        var ctx = canvas.getContext("2d");

        var lineJoin = ['round', 'bevel', 'miter'];
        ctx.lineWidth = 20;

        for (var i = 0; i < lineJoin.length; i++) {
            ctx.lineJoin = lineJoin[i];
            ctx.beginPath();
            ctx.moveTo(50, 50 + i * 50);
            ctx.lineTo(100, 100 + i * 50);
            ctx.lineTo(150, 50 + i * 50);
            ctx.lineTo(200, 100 + i * 50);
            ctx.lineTo(250, 50 + i * 50);
            ctx.stroke();
        }
    }

    const drawDashLine = () => {
        var ctx = canvas.getContext("2d");

        ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
        ctx.lineDashOffset = -0;
        ctx.strokeRect(50, 50, 210, 210);
    }

    const drawText = (ctx) => {
        ctx = canvas.getContext("2d");
        ctx.font = "100px sans-serif"
        ctx.fillText("天若有情", 10, 100);
        ctx.strokeText("天若有情", 10, 200)
    }

    const drawImage = (ctx) => {
        var img = new Image();   // 创建img元素
        img.onload = function () {
            ctx.drawImage(img, 0, 0)
        }
        img.src = 'https://cdn.staticaly.com/gh/creatliukun/picx@master/images/react.599bxp7794k0.jpg'; // 设置图片源地址
    }
    const drawImage1 = (ctx) => {
        var img = new Image();   // 创建img元素
        img.onload = function () {
            ctx.drawImage(img, 0, 0)
        }
        img.src = 'https://img0.baidu.com/it/u=543636398,1697717959&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=750'; // 设置图片源地址
    }

    const drawImageOnPage = (ctx) => {
        var ctx = canvas.getContext("2d");
        var img = document.querySelector("img");
        ctx.drawImage(img, 0, 0, 150, 80, 80, 80, 60, 60);
    }

    const drawSaveAndRestore = (ctx) => {

        ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
        ctx.save();                  // 保存默认状态

        ctx.fillStyle = 'red'       // 在原有配置基础上对颜色做改变
        ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

        ctx.save();                  // 保存当前状态
        ctx.fillStyle = '#FFF'       // 再次改变颜色配置
        ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

        ctx.restore();               // 重新加载之前的颜色状态
        ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

        ctx.restore();               // 加载默认颜色配置
        ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形
    }

    const drawTranslate = (ctx) => {
        // ctx.save(); //保存坐原点平移之前的状态
        // ctx.translate(100, 100);
        // ctx.strokeRect(0, 0, 100, 100)
        // ctx.restore(); //恢复到最初状态
        // ctx.translate(220, 220);
        // ctx.fillRect(0, 0, 100, 100)
    }

    const drawRotate = (ctx) => {
        ctx.fillStyle = "red";
        ctx.save();

        ctx.translate(100, 100);
        ctx.rotate(Math.PI / 180 * 45);
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 100, 100);
        ctx.restore();

        ctx.save();
        ctx.translate(0, 0);
        ctx.fillRect(0, 0, 50, 50)
        ctx.restore();
    }

    const drawTransform = (ctx) => {
        ctx.transform(1, 1, 0, 1, 0, 1);
        ctx.fillRect(0, 0, 100, 100);
    }

    const drawGlobalOperation = (ctx) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 200, 200);

        ctx.globalCompositeOperation = "source-over"; //全局合成操作
        ctx.fillStyle = "red";
        ctx.fillRect(100, 100, 200, 200);
    }

    const drawClip = (ctx) => {
        ctx.beginPath();
        ctx.arc(20, 20, 100, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = "pink";
        ctx.fillRect(20, 20, 100, 100);
    }

    const drawClick = (ctx) => {
        requestAnimationFrame(function step() {
            drawDial(ctx); //绘制表盘
            drawAllHands(ctx); //绘制时分秒针
            requestAnimationFrame(step);
        });
    }
    /*绘制时分秒针*/
    function drawAllHands(ctx) {
        let time = new Date();

        let s = time.getSeconds();
        let m = time.getMinutes();
        let h = time.getHours();

        let pi = Math.PI;
        let secondAngle = pi / 180 * 6 * s;  //计算出来s针的弧度
        let minuteAngle = pi / 180 * 6 * m + secondAngle / 60;  //计算出来分针的弧度
        let hourAngle = pi / 180 * 30 * h + minuteAngle / 12;  //计算出来时针的弧度

        drawHand(hourAngle, 60, 6, "red", ctx);  //绘制时针
        drawHand(minuteAngle, 106, 4, "green", ctx);  //绘制分针
        drawHand(secondAngle, 129, 2, "blue", ctx);  //绘制秒针
    }
    /*绘制时针、或分针、或秒针
   * 参数1：要绘制的针的角度
   * 参数2：要绘制的针的长度
   * 参数3：要绘制的针的宽度
   * 参数4：要绘制的针的颜色
   * 参数4：ctx
   * */
    function drawHand(angle, len, width, color, ctx) {
        ctx.save();
        ctx.translate(150, 150); //把坐标轴的远点平移到原来的中心
        ctx.rotate(-Math.PI / 2 + angle);  //旋转坐标轴。 x轴就是针的角度
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(len, 0);  // 沿着x轴绘制针
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    /*绘制表盘*/
    function drawDial(ctx) {
        let pi = Math.PI;

        ctx.clearRect(0, 0, 300, 300); //清除所有内容
        ctx.save();

        ctx.translate(150, 150); //移动坐标原点到原来的中心
        ctx.beginPath();
        ctx.arc(0, 0, 148, 0, 2 * pi); //绘制圆周
        ctx.stroke();
        ctx.closePath();

        for (let i = 0; i < 60; i++) {//绘制刻度。
            ctx.save();
            ctx.rotate(-pi / 2 + i * pi / 30);  //旋转坐标轴。坐标轴x的正方形从 向上开始算起
            ctx.beginPath();
            ctx.moveTo(110, 0);
            ctx.lineTo(140, 0);
            ctx.lineWidth = i % 5 ? 2 : 4;
            ctx.strokeStyle = i % 5 ? "blue" : "red";
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }

    function randomInt(from, to) {
        return parseInt(Math.random() * (to - from + 1) + from);
    }
    useEffect(() => {
        canvas = document.getElementById('tutorial');
        let ctx = canvas.getContext('2d');
        draw(ctx, canvas, currentTab)
        console.log(1222)
    }, [currentTab])

    return (
        <div >
            <canvas id="tutorial" width="300" height="300">
                你的浏览器不支持canvas,请升级你的浏览器
            </canvas>
            {/* <img width={100} src='https://img0.baidu.com/it/u=543636398,1697717959&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=750' alt="" /> */}
        </div>
    )
}
