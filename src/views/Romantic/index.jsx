import React, { useEffect, useRef } from 'react'

import './index.css'
import ImgLoader from './js/other/imgLoader'
import imgList from './config/imgList'
import { Button } from 'antd-mobile'
import Canvas from './js/canvas'
import util from './config/util'
import config from './config/global'
// import drawLK from './js'
export default function
    (props) {

    let canvas
    let canvasArray = []
    const draw = (ctx) => {
        drawImage(ctx)
    }
    const drawImage = (ctx) => {
        var img = new Image();   // 创建img元素
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 400, 200)
        }
        img.src = 'https://cdn.staticaly.com/gh/creatliukun/picx@master/images/react.599bxp7794k0.jpg'; // 设置图片源地址
    }
    function dealImgs(imgs) {
        const obj = {};
        imgs.forEach(item => {
            obj[item.key] = item.img;
        });

        return obj;
    }
    // vite在useEffect中不能加？来进行判断是否有数据
    useEffect(() => {
        // canvas = document.getElementById('map');
        // let ctx = canvas.getContext('2d');
        // draw(ctx)
        // 
        //fall、bg、fireworks、mb
        config.canvases.forEach(canvasId => {
            canvasArray[`${canvasId}Ctx`] = document.querySelector(`#${canvasId}`).getContext('2d');
            console.log(canvasArray,'canvasArray')
        });
        // 加载图片
        ImgLoader.load(imgList).then(imgs => {
            document.querySelector('#loadingText').style.display = 'none';
            const btn = document.querySelector('#loadingBtn')
            btn.style.display = 'block';
            btn.addEventListener('click', function () {
                document.querySelector('#loading').style.display = 'none';
                new Canvas(dealImgs(imgs),canvasArray);
            })

            //bg
            // this.imgs = this.dealImgs(imgs);
            // this.init();
        }).catch(err => {
            console.log(err);
        });
    }, [])

    return (
        <div>
            <span className='on' id='music'></span>
            <canvas id='bg'>您的浏览器不支持Canvas元素</canvas>
            <canvas id='firework'>您的浏览器不支持Canvas元素</canvas>
            <canvas id='fall'>您的浏览器不支持Canvas元素</canvas>
            <canvas id='dialogue'>您的浏览器不支持Canvas元素</canvas>
            <div className="loader" id='loading'>
                <div className="loader-inner">
                    <div className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                </div>
                <div className="loader-text" id="loadingText">加载中...</div>
                <div className="loader-btn" id="loadingBtn">进入</div>
            </div>
            {/* <canvas id="map" width="375" height="750">
                你的浏览器不支持canvas,请升级你的浏览器
            </canvas> */}
        </div>

    )
}
