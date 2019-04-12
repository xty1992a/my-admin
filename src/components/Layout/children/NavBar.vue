<template>
  <div class="nav-bar" :style="style">
    <transition name="tool">
      <div class="tool-bar" v-show="navShow">
        <div class="left-bar">
          <ToggleBtn/>
          <FreshBtn/>
        </div>
        <div class="right-bar">
          <Avatar v-bind="avatarProps" v-if="avatarProps"/>
          <ExitBtn/>
          <Fullscreen/>
        </div>
      </div>
    </transition>
    <RouteTags/>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import Fullscreen from '@/components/Nav/Fullscreen'
  import FreshBtn from '@/components/Nav/FreshBtn'
  import ToggleBtn from '@/components/Nav/ToggleBtn'
  import ExitBtn from '@/components/Nav/ExitBtn'
  import RouteTags from '@/components/RouteTags'
  import scroll from '@/utils/wheelEvent'
  import {mapGetters, mapState} from 'vuex'

  export default {
	name: 'NavBar',
	components: {RouteTags, ToggleBtn, Avatar, Fullscreen, ExitBtn, FreshBtn},
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

	  wheel(down) {
		this.$store.commit('App/TOGGLE_NAV', !down)
	  },

	},
	computed: {
	  ...mapState('App', [
		'navShow',
	  ]),
	  ...mapGetters('App', [
		'asideWidth',
		'navHeight',
	  ]),
	  ...mapState('User', [
		'userInfo',
	  ]),
	  style() {
		return {
		  left: this.asideWidth + 'px',
		  height: this.navHeight + 'px',
		}
	  },
	  avatarProps() {
		if (!this.userInfo) return null
		return {
		  size: 30,
		  src: this.userInfo.avatar,
		  title: this.userInfo.name,
		  style: 'margin-right: 10px;',
		}
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

    .el-button {
      margin: 0;
    }

    .tool-bar {
      height: 50px;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;

      .el-button {
        padding: 10px;
        border: 0;
      }

      .right-bar {
        display: flex;
        align-items: center;
      }
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
