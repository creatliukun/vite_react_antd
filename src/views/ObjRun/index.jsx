import React, { useEffect, useRef } from 'react'

import './index.css'
export default function
    (props) {
    // 在hooks函数组件中面向对象来开发多个小球碰撞
    let canvas
    let ballArr = []
    let timerC
    // 0，初始化
    const draw = (ctx) => {
        for (let index = 0; index < 100; index++) {
            var ball = new Ball()
            ballArr.push(ball)
            show(ctx, ball)
        }
        console.log(ballArr, 'ballArr')
        timerC = setInterval(() => {
            ctx.clearRect(0, 0, 375, 750)
            for (let index = 0; index < ballArr.length; index++) {
                var ball = ballArr[index]
                show(ctx, ball)
            }
            console.log(112)
        }, 20)
    }
    // 3，小球展示
    const show = function (ctx, ball) {
        run(ball)
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false)
        ctx.fillStyle = ball.color
        ctx.fill()
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
        this.color = '#' + parseInt(Math.random() * 0xffffff).toString(16)
        this.xSpeed = randMod(2) + 3// [3,5]
        this.ySpeed = randMod(3) + 1// [1,4]
    }

    useEffect(() => {
        canvas = document.getElementById('tutorial');
        let ctx = canvas.getContext('2d');
        draw(ctx)
        return () => {clearInterval(timerC)}
    }, [])

    return (
        <canvas id="tutorial" width="375" height="750">
            你的浏览器不支持canvas,请升级你的浏览器
        </canvas>
    )
}
