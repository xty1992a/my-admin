/**
 * Created by TY-xie on 2018/3/29.
 */

//  region 工具函数
class Rect {
  constructor(opt) {
    Object.assign(this, opt)
  }

  get centerX() {
    return this.left + this.width / 2
  }

  get centerY() {
    return this.top + this.height / 2
  }
}

import {prefixStyle} from './dom'

export const helper = {
      isMobile: false,
      // 获得元素相对于父元素的位置
      getPosOfParent(el) {
        let parent = el.parentNode
        let pR = parent.getBoundingClientRect()
        let cR = el.getBoundingClientRect()
        return new Rect({
          width: cR.width,
          height: cR.height,
          top: cR.top - pR.top,
          left: cR.left - pR.left,
          right: cR.right - pR.left,
          bottom: cR.bottom - pR.top,  // 子元素的bottom为距离父元素顶部的距离
          index: el.dataset.hasOwnProperty('index') ? +el.dataset.index : -1
        })
      },
      isCover(rect1, rect2, isY = true) {
        if (isY) {
          let max = Math.max(rect1.centerY, rect2.centerY)
          let min = Math.min(rect1.centerY, rect2.centerY)
          return (max - min) < ((rect1.height + rect2.height) / 2)
        } else {
          let max = Math.max(rect1.centerX, rect2.centerX)
          let min = Math.min(rect1.centerX, rect2.centerX)
          return (max - min) < ((rect1.width + rect2.width) / 2)
        }
      },
      css(el, style) {
        Object.keys(style).forEach(k => {
          let val = style[k]
          if (['transform', 'transition'].includes(k)) {
            k = prefixStyle(k)
          }
          el.style[k] = val
        })
      },
      getParentByClassName(el, className, stop = document.body) {
        if (el.classList.contains(className)) return el
        let parent = el.parentNode
        let target = null
        while (parent) {
          if (parent.classList.contains(className)) {
            target = parent
            parent = null
          } else {
            parent = parent.parentNode
            if (parent === stop) {
              parent = null
            }
          }
        }
        return target
      }
    }
// 检测设备是否是移动端
;(function mobile() {
  try {
    document.createEvent("TouchEvent");
    helper.isMobile = true
  }
  catch (e) {
    helper.isMobile = false
  }
})()

// 默认配置
const initialOption = {
  dir: 'y'
}
// endregion

export default class Dragger {
  children = []
  rectList = []         // 元素的位置数组
  threshold = []        // 元素的槛值,用于确定元素的位置
  targetIndex = 0
  task = {}

  point = null          // 手指/鼠标落点的信息
  drag = null
  dragIndex = -1        // 手指/鼠标落点的索引
  moveDir = ''          // 手指/鼠标移动的方向 向上向左为up,向下向右为down
  moveRect = null

  constructor(el, opt) {
    this.$el = el
    Object.assign(this, opt, initialOption)
    this.$init()
  }

  $init() {
    this.freshThreshold()
    this.listen()
  }

  // 获取元素槛值
  freshThreshold() {
    this.children = Array.from(this.$el.children)
    this.children.forEach((child, index) => {
      child.classList.add('drag-item')
      child.dataset.index = index
    })
    let rectList = this.rectList = this.children.map(child => helper.getPosOfParent(child))
    if (this.dir === 'x') {
      this.threshold = rectList.map(({centerX}) => centerX)
    }
    if (this.dir === 'y') {
      this.threshold = rectList.map(({centerY}) => centerY)
    }
  }

  // 监听事件
  listen() {
    let events = {
      down: helper.isMobile ? 'touchstart' : 'mousedown',
      move: helper.isMobile ? 'touchmove' : 'mousemove',
      up: helper.isMobile ? 'touchend' : 'mouseup',
    }
    this.$el.addEventListener(events.down, (e) => {
      let target = helper.getParentByClassName(e.target, 'drag-item')
      if (!target) return
      this.moved = false
      this.downTime = new Date().getTime()
      this.dragStart = true
      let {clientX, clientY} = e
      this.drag = target
      helper.css(target, {
        zIndex: 10
      })
      let rect = target.getBoundingClientRect()
      this.targetIndex = this.dragIndex = +target.dataset.index
      this.children.forEach((child, index) => {
        if (index === this.dragIndex) {
          child.classList.add('drag-handler')
        } else if (child.classList.contains('drag-item')) {
          child.classList.add('drag-move')
        }
      })
      this.moveRect = helper.getPosOfParent(this.drag)

      this.point = {
        posX: clientX - rect.left,
        posY: clientY - rect.top,
        startX: clientX,
        startY: clientY,
        moveX: clientX,
        moveY: clientY,
      }
    })
    this.$el.addEventListener(events.move, (e) => {
      e.preventDefault()
      if (!this.dragStart) return
      this.moved = true
      if (helper.isMobile) {
        e = e.touches[0]
      }
      let {clientX, clientY} = e
      let {startX, startY} = this.point
      let deltaY = clientY - startY
      let deltaX = clientX - startX

      this.translate()
      if (this.dir === 'y') {
        this.moveRect.top = this.rectList[this.dragIndex].top + deltaY
        this.moveDir = this.point.moveY > clientY ? 'up' : 'down'
        this.moveLine = this.threshold[this.dragIndex] + deltaY

        helper.css(this.drag, {
          transform: `translate3d(${deltaX}px,${deltaY}px,0)`,
        })
      }
      if (this.dir === 'x') {
        this.moveRect.left = this.rectList[this.dragIndex].top + deltaX
        this.moveDir = this.point.moveX > clientX ? 'up' : 'down'
        this.moveLine = this.threshold[this.dragIndex] + deltaX
        helper.css(this.drag, {
          transform: `translate3d(0,${deltaY}px,0)`,
        })
      }
      this.point.moveX = clientX
      this.point.moveY = clientY
      this.translate()
      return false
    })
    document.addEventListener(events.up, (e) => {
      e.preventDefault()
      if (!this.dragStart) return
      this.dragStart = false
      this.point = null
      if (this.drag) {
        this.drag.classList.remove('drag-handler')
        helper.css(this.drag, {
          transform: 'translate3d(0,0,0)',
          zIndex: 0,
          opacity: 1
        })
      }
      this.children.forEach(it => {
        helper.css(it, {
          transform: `translate3d(0,0,0)`
        })
      })
      let gapTime = new Date().getTime() - this.downTime
      if (this.moved && gapTime > 100) {
        let pos = {
          source: this.dragIndex,
          target: this.targetIndex,
        }
        this.fire('drag-over', pos)
        let targetIndex = this.targetIndex
        setTimeout(() => {
          let rect = this.rectList[targetIndex]
          this.fire('swap-over', {index: this.targetIndex, rect})
        }, 500)
      } else {
        this.fire('click-over', {index: this.dragIndex, rect: this.currentRect})
      }
      this.children.forEach(child => {
        if (child.classList.contains('drag-item')) {
          child.classList.remove('drag-move')
        }
      })
      this.drag = null
      this.moveRect = null
      this.dragIndex = -1
      return false
    })
  }

  translate() {
    let indexList = []
    let rectList = []
    this.targetIndex = 0
    // 鼠标刚刚落下时,判定不明确,临近的兄弟元素会受到影响,标记该元素以便复原
    let near = null
    // 存储位置发生偏移的元素的索引
    // 当向上移动时,数组中第一个成员为需要交换的元素
    // 当向下移动时,数组中最末尾成员为需要交换的元素
    // 原因为,始终按照文档位置依次从上往下偏移元素的位置
    let list = []
    let condition = (r, m) => true
    let dir = 'up'
    if (this.dir === 'y') {
      // 提起组件向上移动
      if (this.currentRect.top > this.moveRect.top) {
        indexList = [...this.rectList].map((e, i) => i).splice(0, this.dragIndex)
        rectList = indexList.map(i => this.rectList[i])
        condition = (r, m) => r.bottom > m.centerY
        dir = 'up'
        near = this.children[this.dragIndex + 1]
      }
      else if (this.currentRect.top < this.moveRect.top) {
        indexList = [...this.rectList].map((e, i) => i).splice(this.dragIndex + 1)
        rectList = indexList.map(i => this.rectList[i])
        condition = (r, m) => r.top < m.top + (m.height / 2)
        dir = 'down'
        near = this.children[this.dragIndex - 1]
      }
      rectList.forEach((r) => {
        if (condition(r, this.moveRect)) {
          list.push(r.index)
          let offset = dir === 'up' ? this.moveRect.height : -this.moveRect.height
          helper.css(this.children[r.index], {
            transform: `translate3d(0, ${offset}px, 0)`
          })
        } else {
          helper.css(this.children[r.index], {
            transform: `translate3d(0,0,0)`
          })
        }
      })
      if (dir === 'up') {
        this.targetIndex = list.length ? list[0] : this.dragIndex
      } else {
        this.targetIndex = list.length ? list[list.length - 1] : this.dragIndex
      }
      if (near) {
        helper.css(near, {
          transform: 'translate3d(0,0,0)'
        })
      }
    }
  }

  on(event, callback) {
    this.task[event] = callback
  }

  fire(event, payload) {
    this.task[event] && this.task[event](payload)
  }

  get currentRect() {
    return this.rectList[this.dragIndex] || null
  }

  down(e) {
  }

  move(e) {
  }

  up(e) {
  }
}

export class Drag {
  events = {
    down: helper.isMobile ? 'touchstart' : 'mousedown',
    move: helper.isMobile ? 'touchmove' : 'mousemove',
    up: helper.isMobile ? 'touchend' : 'mouseup',
  }
  drag = null
  point = {
    startX: 0,
    startY: 0,
    nowX: 0,
    nowY: 0,
    endX: 0,
    endY: 0,
    startTime: 0,
    nowTime: 0,
  }
  regionRect = {
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  }
  task = {}

  constructor(el, opt = {
    drag: '.drag-item',
    x: 0,
    y: 0
  }) {
    this.$el = el
    this.option = opt
    this.drag = el.querySelector(opt.drag)
    this.init()
  }

  init() {
    this.listen()
    this.initDragPosition()
  }

  initDragPosition() {
    let point = this.point
    let option = this.option
    this.deltaX = point.endX = option.x
    this.deltaY = point.endY = option.y
    helper.css(this.drag, {
      position: 'absolute',
      left: option.x + 'px',
      top: option.y + 'px',
      // transform: `translate3d(${option.x}px, ${option.y}px, 0)`
    })
  }

  refreshRegionRect() {
    let parent = this.$el
    let child = this.drag
    let region = this.regionRect
    region.minX = 0
    region.minY = 0
    region.maxX = parent.clientWidth - child.clientWidth
    region.maxY = parent.clientHeight - child.clientHeight
    // region.minX = -child.offsetLeft
    // region.minY = -child.offsetTop
    // region.maxX = parent.clientWidth - child.clientWidth + region.minX
    // region.maxY = parent.clientHeight - child.clientHeight + region.minY
  }

  listen() {
    let el = this.$el
    el.addEventListener(this.events.down, this.down.bind(this))
    el.addEventListener(this.events.move, this.move.bind(this))
    document.body.addEventListener(this.events.up, this.up.bind(this))
  }

  down(e) {
    this.moved = false
    let target = e.target
    let touch = helper.isMobile ? e.touches[0] : e
    if (!helper.getParentByClassName(target, this.option.drag.slice(1))) return
    this.dragStart = true
    e.preventDefault()
    this.drag.classList.add('drag-down')
    this.refreshRegionRect()
    let point = this.point
    point.startTime = new Date().getTime()
    point.startX = touch.clientX
    point.startY = touch.clientY
    this.fire('drag-down')
  }

  move(e) {
    this.moved = true
    if (!this.dragStart) return
    e.preventDefault()
    let touch = helper.isMobile ? e.touches[0] : e
    let point = this.point
    point.nowTime = new Date().getTime()
    point.nowX = touch.clientX
    point.nowY = touch.clientY
    let deltaX = point.nowX - point.startX + point.endX
    let deltaY = point.nowY - point.startY + point.endY
    let {maxY, maxX, minX, minY} = this.regionRect
    deltaX = this.deltaX = Math.max(Math.min(deltaX, maxX), minX)
    deltaY = this.deltaY = Math.max(Math.min(deltaY, maxY), minY)
    helper.css(this.drag, {
      left: deltaX + 'px',
      top: deltaY + 'px',
      // transform: `translate3d(${deltaX}px, ${deltaY}px, 0)`
    })
  }

  up(e) {
    if (!this.dragStart) return
    e.preventDefault()
    this.dragStart = false
    this.drag.classList.remove('drag-down')
    let point = this.point
    point.endX = this.deltaX
    point.endY = this.deltaY
    this.fire('drag-over', {
      x: this.deltaX,
      y: this.deltaY
    })
    if (!this.moved) {
      this.fire('tap')
    }
  }

  on(event, callback) {
    this.task[event] = callback
  }

  fire(event, payload) {
    this.task[event] && this.task[event](payload)
  }

}
