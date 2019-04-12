<template>
  <div class="scroll-container"
       @mousewheel.stop.prevent="wheelHandler"
       @DOMMouseScroll.stop.prevent="wheelHandler">
    <slot></slot>
  </div>
</template>

<script>
  export default {
	name: 'RowScroller',
	props: {
	  speed: {
		type: Number,
		default: 30,
	  },
	},
	data() {
	  return {}
	},
	created() {
	},
	methods: {
	  wheelHandler(e) {
		// firefox使用detail:下3上-3,其他浏览器使用wheelDelta:下-120上120//下滚
		let delta = -e.wheelDelta || e.detail
		if (delta < 0) {
		  this.$el.scrollLeft -= this.speed
		}
		else {
		  this.$el.scrollLeft += this.speed
		}
	  },
	  scrollToElement(el) {
		el = el.$el || el
		let left = el.offsetLeft - this.$el.clientWidth / 2
		this.scrollTo(left + el.clientWidth / 2)
	  },

	  // 目标,步数
	  scrollTo(left, count = 10) {
		let current = this.$el.scrollLeft
		const speed = (left - current) / count

		const step = () => {
		  let target = left - (speed * count--)
		  if (count) {
			this.$el.scrollLeft = target
			requestAnimationFrame(step)
		  }
		}
		step()
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .scroll-container {
    overflow-x: auto;
    overflow-y: hidden;
    /*scroll-behavior: smooth;*/

    .row-scroller {
    }
  }
</style>
