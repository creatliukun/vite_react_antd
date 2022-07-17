import React, { useEffect, useRef } from 'react'

import './index.css'
export default function
    (props) {
    let canvas
    const draw = (ctx) => {
        drawMoreRadians(ctx)
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
    useEffect(() => {
        canvas = document.getElementById('map');
        let ctx = canvas.getContext('2d');
        draw(ctx)
    }, [])

    return (
        <canvas id="map" width="375" height="750">
            你的浏览器不支持canvas,请升级你的浏览器
        </canvas>
    )
}
