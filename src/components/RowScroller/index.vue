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
	components: {},
	props: {
	  data: {
		type: Object,
	  },
	  speed: {
		type: Number,
		default: 30,
	  },
	  height: {
		type: Number,
		default: 40,
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
		  console.log('<----向左')
		  this.$el.scrollLeft -= this.speed
		}
		else {
		  this.$el.scrollLeft += this.speed
		  console.log('向右---->')
		}
	  },
	  scrollToElement(el) {
	    console.log(el.offsetLeft)
        this.$el.scrollLeft = el.offsetLeft
      }
	},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .scroll-container {
    overflow-x: auto;
    overflow-y: hidden;

    .row-scroller {
    }
  }
</style>
