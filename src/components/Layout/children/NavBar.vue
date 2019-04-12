<template>
  <div class="nav-bar" :style="style">
    <div class="tool-bar" :style="toolStyle">
      <div class="left-bar">
        <ToggleBtn/>
        <FreshBtn/>
      </div>
      <div class="right-bar">
        <Avatar v-bind="avatarProps" v-if="avatarProps"/>
        <ThemeBtn/>
        <ExitBtn/>
        <Fullscreen/>
      </div>
    </div>
    <transition name="tool">
      <RouteTags v-show="navShow"/>
    </transition>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import Fullscreen from '@/components/Nav/Fullscreen'
  import FreshBtn from '@/components/Nav/FreshBtn'
  import ToggleBtn from '@/components/Nav/ToggleBtn'
  import ThemeBtn from '@/components/Nav/ThemeBtn'
  import ExitBtn from '@/components/Nav/ExitBtn'
  import RouteTags from '@/components/RouteTags'
  import scroll from '@/utils/wheelEvent'
  import {mapGetters, mapState} from 'vuex'

  export default {
	name: 'NavBar',
	components: {RouteTags, ToggleBtn, ThemeBtn, Avatar, Fullscreen, ExitBtn, FreshBtn},
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
		'theme',
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
	  toolStyle() {
		return {
		  backgroundColor: this.theme.nav.bgColor,
		  color: this.theme.nav.textColor,
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
  @import "../../../styles/variable";

  .nav-bar {
    z-index: 10;
    position: fixed;
    background-color: #fff;
    right: 0;
    top: 0;
    transition: left .3s, height .3s;

    .el-button {
      margin: 0;
    }

    .tool-bar {
      position: relative;
      height: 50px;
      z-index: 1;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;

      .el-button {
        color: inherit;
        padding: 10px;
        font-size: 18px;
        border: 0;
        background-color: transparent;
      }

      .right-bar {
        display: flex;
        align-items: center;
      }
    }


    .tool-enter, .tool-leave-to {
      transform: translateY(-100%);
    }

    .tool-enter-active, .tool-leave-active {
      transition: .3s;
    }
  }
</style>
