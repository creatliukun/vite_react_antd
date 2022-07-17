import React, { useEffect, useRef } from 'react'

import './index.css'
export default function
    (props) {

    let canvas
    const draw = (ctx) => {
        drawImage1(ctx)
    }

    const drawImage1 = (ctx) => {
        var img = new Image();   // 创建img元素
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 400, 300)
        }
        img.src = 'https://img0.baidu.com/it/u=543636398,1697717959&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=750'; // 设置图片源地址
    }
    useEffect(() => {
        canvas = document.getElementById('tutorial');
        let ctx = canvas.getContext('2d');
        draw(ctx)
    }, [])

    return (
        <canvas id="tutorial" width="375" height="750">
            你的浏览器不支持canvas,请升级你的浏览器
        </canvas>
    )
}
