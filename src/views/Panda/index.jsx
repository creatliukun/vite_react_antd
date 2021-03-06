import React, { useEffect, useRef } from 'react'

import './index.css'
export default function
    (props) {
    let canvas
    let timer
    const draw = (ctx) => {
        // drawMoreRadians(ctx)
        drawCra(ctx)
    }
    // 碰撞检测
    const drawCra = (ctx) => {
        let x = 100
        let y = 100
        let r = 20
        let xSpeed = 3
        let ySpeed = 6
        let w = 375
        let h = 750
        timer = setInterval(() => {
            drawCircle(ctx, x, y, r, w, h)
            if (x - r < 0 || x + r > w) {
                xSpeed = -xSpeed
            }
            if (y - r < 0 || y + r > h) {
                ySpeed = -ySpeed
            }
            x = x + xSpeed
            y = y + ySpeed
        }, 10)
    }
    const drawCircle = (ctx, x, y, r, w, h) => {
        // 清除画布
        ctx.clearRect(0, 0, w, h)
        // 新建路径，不要一笔画成，不然会连在一块儿
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI, false)
        ctx.fillStyle = '#' + parseInt(Math.random() * 0xffffff).toString(16)
        ctx.fill()
    }

    useEffect(() => {
        canvas = document.getElementById('map');
        let ctx = canvas.getContext('2d');
        draw(ctx)
        // console.log(window.onmousemove,'window.onmousemove()')
        return () => { clearInterval(timer) }
    }, [])

    return (
        <canvas id="map" width="375" height="750">
            你的浏览器不支持canvas,请升级你的浏览器
        </canvas>
    )
}
