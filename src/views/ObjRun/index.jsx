import React, { useEffect, useRef } from 'react'

import './index.css'
export default function
    (props) {
    // 在hooks函数组件中面向对象来开发多个小球碰撞
    let canvas
    let ballArr = []
    let timerC
    let fireWords = '你的眼睛|像星星|美丽|日月冬夏|晴雨山川|欣欣相融|我的眼睛|因为|有你|所以更好'
    let textArr = fireWords.split('|')
    // 0，初始化
    const draw = (ctx) => {
        // 小球的个数
        for (let index = 0; index < 10; index++) {
            var ball = new Ball()
            ballArr.push(ball)
            // show(ctx, ball)
        }
        console.log(ballArr, 'ballArr')
        // 小球进行膨胀
        timerC = setInterval(() => {
            // 清除画布
            ctx.clearRect(0, 0, 375, 750)
            for (let index = 0; index < ballArr.length; index++) {
                var ball = ballArr[index]
                show(ctx, ball, textArr[index])
                // 画连接的直线
                for (let j = 0; j < index; j++) {
                    const preBall = ballArr[j]
                    drawLine(ctx, preBall.x, preBall.y, ball.x, ball.y, ball.color)
                }
            }
            console.log(112)
        }, 20)
    }
    // 3，小球展示
    const show = function (ctx, ball, text) {
        // 每次展示的时候先运行一下
        run(ball)
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false)
        ctx.fillStyle = ball.color
        ctx.fill()
        console.log(text, 'text')
        text && drawText(ctx, text, ball.x, ball.y, ball.r, ball.color)
    }
    // 2，小球运行
    const run = function (ball) {
        if (ball.x - ball.r < 0 || ball.x + ball.r > ball.w) {
            ball.xSpeed = -ball.xSpeed
        }
        if (ball.y - ball.r < 0 || ball.y + ball.r > ball.h) {
            ball.ySpeed = -ball.ySpeed
        }
        ball.x = ball.x + ball.xSpeed
        ball.y = ball.y + ball.ySpeed
    }
    // 设置一个随机数
    const randMod = (number) => {
        return Math.random() * number
    }
    // 1,创建小球
    function Ball() {
        this.w = 375
        this.h = 750
        this.x = randMod(5) + 60
        this.y = randMod(5) + 60
        this.r = randMod(50) + 10 //[10,60]
        // this.color = '#' + parseInt(Math.random() * 0xffffff).toString(16)
        this.color = "rgb(" + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ")"
        this.xSpeed = randMod(2) + 3// [3,5]
        this.ySpeed = randMod(3) + 1// [1,4]
    }
    // 5,画直线
    const drawLine = (ctx, x1, y1, x2, y2, color) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.closePath()
        ctx.stroke();
        ctx.strokeStyle = color
    }
    // 6,画文字
    const drawText = (ctx, text, x, y, r, color) => {
        ctx.fillText(text, x + r, y)
        ctx.fillStyle = color
        ctx.textAlign = 'left'
    }

    useEffect(() => {
        canvas = document.getElementById('tutorial');
        let ctx = canvas.getContext('2d');
        draw(ctx)
        return () => { clearInterval(timerC) }
    }, [])

    return (
        <canvas id="tutorial" width="375" height="750">
            你的浏览器不支持canvas,请升级你的浏览器
        </canvas>
    )
}
