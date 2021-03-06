
// // 基础配置
import config from '../config/global'
import util from '../config/util'
// // 飘落装饰
import Snowflake from './fall/snowflake'
import Heart from './fall/heart'

// //烟花
import Firework from './fireworks/fireworks'
import ShapeMaker from './other/shape'

// //最后
import TitleParticle from './TitleParticle'
import audiosMp3 from "../audio/1.mp3"
class Canvas {
  constructor(imgs, canvasArray) {
    console.log(canvasArray, 'canvasArray')
    this.imgs = imgs
    this.canvasArray = canvasArray
    //初始化属性
    this.initProperty();

    this.initAudio();

    this.init()
  }
  initAudio() {
    const audio = new Audio();
    audio.src = audiosMp3;
    audio.loop = true;
    audio.play();
    audio.volume = 0.5;
    const music = document.querySelector('#music');
    console.log(music, 'music=====')

    music.onclick = function () {
      const cla = this.getAttribute('class');
      if (cla == 'on') {
        this.setAttribute('class', 'off');
        audio.pause();
      } else {
        this.setAttribute('class', 'on');
        audio.play();
      }
    }
  }
  //创建本例属性
  initProperty() {
    //画布宽高
    this.height = config.height;
    this.width = config.width;
    console.log(config,'config')

    //获取画笔
    //fall、bg、fireworks、mb
    config.canvases.forEach(canvasId => {
      this[canvasId + 'Ctx'] = this.canvasArray[canvasId + 'Ctx']
    });

    /*********通用*********/
    // 飘落微粒
    this.fallDots = [];
    // 飘落的类型('snow', 'heart', 'mix')
    this.fallType = config.fallType,
      //动画的时间
      this.time = 0;
    //当前执行的状态
    this.status = config.step;

    /*********阶段一（对话）*********/
    // 对话的参数
    this.dialogueOpt = util.extend({}, config.dialogueOpt);
    // 话的文字
    this.dialogue = config.dialogue.shift();

    /*********阶段二（天黑）*********/
    this.sunsetTime = config.sunset;

    /*********阶段三（烟花）*********/
    //天空颜色
    this.skyColor = {
      hue: 210,
      lightness: 0
    };
    //烟花的数组
    this.fireworks = [];
    console.log(config.fireworkInterval, 'config.fireworkInterval')
    this.fireworkTime = util.random(...config.fireworkInterval) | 0;

    this.fireWords = config.fireWords.split('|');
    console.log(this.fireWords, 'fireWords')
    this.fireOpt = util.extend({
      end: false,
      time: 600,
      showWords: false,
    }, config.fireOpt);

    /*********阶段四（点题）*********/
    this.titleOpt = {
      current: -1,
      start: false,
      ctx: [],
      end: false
    };
    //大标题
    this.titleWords = config.titleWords.split('|');
    //组成字的微粒数组
    this.titleDots = [];
  }
  go(currentStatus) {
    console.log(currentStatus, 'currentStatus')
    switch (currentStatus) {
      case 1:
        this.dialogueOpt = null;
        this.dialogue = null;
        // 清除第一部的画布
        this.dialogueCtx.clearRect(0, 0, config.width, config.height);
        // currentStatus为1时，status为2
        ++this.status;
        break;
      case 2:
        this.sunsetTime = null;
        // currentStatus为2时，status为3
        ++this.status;
        break;
      case 3:
        this.fireOpt = null;
        this.fireWords = null;
        ++this.status;
        // currentStatus为3时，status为4
        break;
      case 4:
        this.titleOpt = null;
        this.titleWords = null;
        this.titleDots = null;
        // currentStatus为4时，status为5
        ++this.status;
        break;
    }
  }
  init() {
    //文字形状maker
    this.shapeMaker = new ShapeMaker(this.width, this.height);


    // 循环体
    this.loop();

  }

  //动画效果
  loop() {
    //下一帧继续调用loop;
    requestAnimationFrame(this.loop.bind(this));
    // console.time('label');

    // 动画的时间1min后重置为0
    ++this.time >= 60000 ? 0 : this.time;

    // 渲染飘落装饰
    this.renderFall();

    switch (this.status) {
      case 1:  //对话阶段
        this.renderDialogue();
        break;
      case 2: //天黑过程
        this.sunset();
        break;
      case 3: // 放烟花
        // 飘落的装饰
        this.controlFire();
        // 渲染烟花
        this.renderFireworks();
        break;
      case 4:
        this.renderTitle();
        this.renderFireworks();
        break;
      case 5:
        this.end();
        this.renderFireworks();
        break;
    }
  }
  //飘落的装饰
  renderFall() {
    console.log(this.width,'this.width',this.height,'this.height')
    // 清除画布
    this.fallCtx.clearRect(0, 0, this.width, this.height);
    // 控制飘落装饰类型，飘落雪花还是爱心
    switch (this.fallType) {
      // 飘落雪花
      case 'snow': this.time % config.snowInterval == 0 && this.fallDots.push(new Snowflake(config.snow));
        break;
      // 飘落爱心
      case 'heart': this.time % config.heartInterval == 0 && this.fallDots.push(new Heart(config.heart));
        break;
      // 雪花爱心同时飘落
      case 'mix':

        this.time % config.snowInterval == 0 && this.fallDots.push(new Snowflake(config.snow));
        this.time % config.heartInterval == 0 && this.fallDots.push(new Heart(config.heart));
        break;
    }
    // 雪花飘落
    for (let i = this.fallDots.length - 1; i >= 0; --i) {
      !this.fallDots[i].render(this.fallCtx) && this.fallDots.splice(i, 1);
    }
  }

  // 渲染对话
  renderDialogue() {
    const ctx = this.dialogueCtx;
    // 清除指定的矩形区域，然后这块区域会变的完全透明。
    ctx.clearRect(0, 0, config.width, config.height);
    // 为画布添加样式和颜色
    ctx.fillStyle = this.dialogueOpt['color' + this.dialogue.type] || this.dialogueOpt.color1;
    // 给文本添加样式
    ctx.font = this.dialogueOpt['font' + this.dialogue.type] || this.dialogueOpt.font1;
    //说话
    this.dialogue.current = this.dialogue.current || 0;
    // 如果这个speed减少到0时
    if (--this.dialogueOpt.speed <= 0) {
      // 赋初始值速度config.dialogueOpt.speed 18
      this.dialogueOpt.speed = config.dialogueOpt.speed;
      ++this.dialogue.current;
    }
    // 绘制文本的两个方法，一个一个删除
    ctx.fillText(`${this.dialogue.name}：${this.dialogue.txt.slice(0, this.dialogue.current)}`, 20, 30);

    //下一段话
    if (this.dialogue.current >= this.dialogue.txt.length && --this.dialogueOpt.interval <= 0) {
      // 如果对话结束了，就进行第二步
      if (config.dialogue.length == 0) {
        return this.go(1);
      }
      // 删除头部
      this.dialogue = config.dialogue.shift();
      // 将interval赋初始值120
      this.dialogueOpt.interval = config.dialogueOpt.interval;
    }

  }
  // 天黑
  sunset() {
    // 默认600，如果sunsetTime小于等于0时，就走到第二步
    if (--this.sunsetTime <= 0) {
      return this.go(2);
    }
    // 添加样式颜色
    this.fireworkCtx.fillStyle = `hsla(210, 60%, 5%, ${0.01 * (20 - 20 * (this.sunsetTime / config.sunset))})`;
    // 填充矩阵
    this.fireworkCtx.fillRect(0, 0, config.width, config.height);
  }

  //控制烟花的逻辑
  controlFire() {
    // TODO: 问题出在这里，负的60的时候报错，还有就是负的420-负的438
    console.log(--this.fireOpt.time, '(--this')
    --this.fireOpt.time;
    // 默认600，fireOpt.time为0时，创建密集形的烟花
    if (this.fireOpt.time == 0) {
      this.createDenseFire();
    }
    // 默认600，fireOpt.time为-60时，刚好-1帧
    if (this.fireOpt.time == -60) {
      this.fireOpt.end && this.fireworks.push(new Firework({
        x: config.width / 2,
        yEnd: config.height / 8,
        count: 600,
        radius: 5
      }));
    }
    if (this.fireOpt.time <= -180) {
      !this.fireOpt.end && this.showFireworkWords();

    }
    if (this.fireOpt.time == -360) {
      this.fireOpt.end && this.go(3);
    }

  }
  //放文字烟花
  showFireworkWords() {
    if (this.fireWords.length == 0) {
      this.fireOpt.end = true;
      this.fireOpt.time = 180;
      return;
    }
    if (--this.fireOpt.wordInterval <= 0) {
      // 第二个参数控制是否产生烟花
      this.getDotsPostion(this.fireWords.shift(), true);
      this.fireOpt.wordInterval = config.fireOpt.wordInterval;
    }
  }
  //创建密集的烟花
  createDenseFire() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.fireworks.push(new Firework(config.fireworks));
      }, i * 100);
    }
  }
  //渲染烟花
  renderFireworks() {
    this.fireworkCtx.fillStyle = config.skyColor.replace('{lightness}', 5 + this.skyColor.lightness * 15).replace('{hue}', this.skyColor.hue);
    this.fireworkCtx.fillRect(0, 0, this.width, this.height);
    //随机创建烟花
    this.createFireworks();

    this.skyColor = {
      lightness: 0,
      hue: 210
    };
    for (let i = this.fireworks.length - 1; i >= 0; --i) {
      this.skyColor = this.skyColor.lightness >= this.fireworks[i].getSkyColor().lightness ? this.skyColor : this.fireworks[i].getSkyColor();
      !this.fireworks[i].render(this.fireworkCtx) && this.fireworks.splice(i, 1);
    }
  }

  // 随机创建烟花
  createFireworks() {
    if (--this.fireworkTime <= 0) {
      this.fireworks.push(new Firework(config.fireworks));
      console.log(config.fireworkInterval, '2config.fireworkInterval')
      this.fireworkTime = util.random(...config.fireworkInterval) | 0;
    }
  }

  // 渲染最后 文字的动作
  renderTitle() {
    this.createCanvas();
    this.createTitleDots();
    if (!this.titleOpt) return;
    const ctx = this.titleOpt.ctx[this.titleOpt.current];
    ctx.clearRect(0, 0, this.width, this.height);
    for (let i in this.titleDots) {
      this.titleDots[i].render(ctx);
    }
    if (--this.titleOpt.time <= 0) {
      this.titleOpt.start = false;
    }
  }
  createCanvas() {
    if (this.titleOpt.start) return;
    ++this.titleOpt.current;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'title');
    canvas.id = this.titleOpt.current;
    canvas.setAttribute('width', config.width);
    canvas.setAttribute('height', config.height);
    document.body.appendChild(canvas);
    this.titleOpt.ctx.push(canvas.getContext('2d'));
  }
  createTitleDots() {
    if (this.titleOpt.start) return;
    if (this.titleWords.length == 0) {
      return this.go(4);
    }
    this.titleDots = [];
    this.titleOpt.start = true;
    this.titleOpt.time = config.titleOpt.e + config.titleOpt.delay;
    config.titleOpt.y += config.titleOpt.distance;

    const dots = this.getDotsPostion(this.titleWords.shift());
    dots.forEach(dot => {
      const option = {
        color: config.titleOpt.color,
        x: dot.x,
        y: dot.y,
        xStart: util.random(0, config.width),
        yStart: util.random(-100, 0),
        size: config.titleOpt.pSize,
        e: config.titleOpt.e
      }
      this.titleDots.push(new TitleParticle(option));
    });
    this.fallType = 'mix';
  }

  end() {
    this.fallType = 'mix';
    this.time % 600 == 0 && this.createDenseFire();
  }

  //获取所有的dots集合。
  getDotsPostion(wordsArr, showFireworks) {
    let words = typeof wordsArr == 'string' ? wordsArr.split('') : wordsArr.shift().split('');
    words = words.filter(item => item !== '\b')
    const length = words.length;
    const size = this.status === 3 ? config.word.size : config.titleOpt.size
    const y = this.status == 3 ? config.word.y : config.titleOpt.y;
    const dotsArr = [];
    words.forEach((item, index) => {
      let x;
      //文字居中
      length % 2 == 0 ? x = config.width / 2 + (index - length / 2) * size + 1 / 2 * size : x = config.width / 2 + (index - Math.floor(length / 2)) * size;
      this.shapeMaker.write({ txt: item, x, y, size, bold: showFireworks });
      const dots = this.shapeMaker.getDots({
        gap: this.status == 3 ? config.word.gap : config.titleOpt.gap
      });
      console.log(dots, 'dots')
      dotsArr.push(...dots);

      const prtOption = {};
      showFireworks && this.fireworks.push(new Firework({ wait: 30, radius: 2, x, yEnd: y, dots, prtOption }));
    });

    return dotsArr;
  }
}

export default Canvas