<template>
  <div class="nav-bar" :style="style">
    <transition name="tool">
      <div class="tool-bar" v-show="navShow">
        <el-button @click="toggleAside" style="padding: 10px;border:0">
          <svg-icon :icon="asideShow?'left_step':'right_step'"/>
        </el-button>
      </div>
    </transition>
    <RouteTags/>
  </div>
</template>

<script>
  import RouteTags from '@/components/RouteTags'
  import scroll from '@/utils/wheelEvent'
  import {mapState, mapGetters} from 'vuex'

  export default {
	name: 'NavBar',
	components: {RouteTags},
	data() {
	  return {}
	},
	created() {
	  scroll.off('wheel', this.wheel)
	  scroll.on('wheel', this.wheel)
	  document.documentElement.removeEventListener('mouseup', this.scrollTopCheck)
	  document.documentElement.addEventListener('mouseup', this.scrollTopCheck)
	},
	methods: {
	  scrollTopCheck(e) {
		// 操作滚动条,检查滚动高度
		// 滚动条部分属于可滚动元素,即,如果鼠标在HTML自身抬起,则一定是在操作滚动条
		if (!e.target || e.target !== document.documentElement) return
		let scrollTop = document.documentElement.scrollTop
		if (scrollTop < this.navHeight) {
		  this.$store.commit('App/TOGGLE_NAV', true)
		}
	  },

	  toggleAside() {
		this.$store.commit('App/TOGGLE_ASIDE')
	  },

	  wheel(down) {
		this.$store.commit('App/TOGGLE_NAV', !down)
	  },
	},
	computed: {
	  ...mapState('App', [
		'navShow',
		'asideShow',
	  ]),
	  ...mapGetters('App', [
		'asideWidth',
		'navHeight',
	  ]),
	  style() {
		return {
		  left: this.asideWidth + 'px',
		  height: this.navHeight + 'px',
		}
	  },
	  toolStyle() {
		return {
		  height: this.navShow ? '50px' : 0,
		}
	  },
	  btnText() {
		return this.asideShow ? '收起' : '展开'
	  },
	},
	beforeDestroy() {
	  scroll.off('wheel', this.wheel)
	  document.documentElement.removeEventListener('mouseup', this.scrollTopCheck)
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .nav-bar {
    z-index: 10;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    right: 0;
    top: 0;
    transition: left .3s, height .3s;

    .tool-bar {
      height: 50px;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    .tool-enter, .tool-leave-to {
      height: 0;
      transform: translateY(-100%);
    }

    .tool-enter-active, .tool-leave-active {
      transition: .3s;
    }
  }
</style>
