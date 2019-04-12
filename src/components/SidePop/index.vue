<template>
  <transition :name="position" @after-leave="afterLeave">
    <div class="x-side-pop" v-show="show" @mousewheel.prevent.stop>
      <div class="side-pop__mask" @click="cancel" :style="{backgroundColor: `rgba(0, 0, 0, ${opacity})`}"></div>
      <div :class="['side-pop__wrap','side-pop__'+position]">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
	name: 'x-side-pop',
	props: {
	  position: {
		type: String,
		default: 'left',
	  },
	  show: {
		type: Boolean,
		default: false,
	  },
	  opacity: {
		type: Number,
		default: .4,
	  },
	},
	data() {
	  return {
		scrollbar: {
		  fade: false,
		},
	  }
	},
	methods: {
	  cancel() {
		console.log('cancel')
		this.$emit('cancel')
	  },
	  afterLeave() {
		this.$emit('closed')
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .fill(@bottom: 0,@top: 0) {
    position: fixed !important;
    bottom: @bottom;
    right: 0;
    left: 0;
    top: @top;
  }

  .x-side-pop {
    overflow: hidden;
    position: fixed;
    z-index: 20;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;

    .side-pop__mask {
      .fill;
    }

    .side-pop__wrap {
      position: absolute;
      top: 0;
      bottom: 0;
    }

    .side-pop__left {
      left: 0;
    }

    .side-pop__right {
      right: 0;
    }

    &.left-enter, &.left-leave-to {
      .side-pop__mask {
        opacity: 0;
      }

      .side-pop__wrap {
        transform: translate3d(-100%, 0, 0);
      }
    }

    &.right-enter, &.right-leave-to {
      .side-pop__mask {
        opacity: 0;
      }

      .side-pop__wrap {
        transform: translate3d(100%, 0, 0);
      }
    }
  }

  @d: .3s;
  .left-enter-active, .left-leave-active,
  .right-enter-active, .right-leave-active {
    transition: @d;

    .side-pop__mask {
      transition: opacity @d;
    }

    .side-pop__wrap {
      transition: @d;
    }
  }
</style>
