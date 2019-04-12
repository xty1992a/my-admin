<template>
  <div class="side-bar" :style="style" @wheel.stop @DOMMouseScroll.stop>
    <div class="logo-block" :style="logoStyle">
      <p class="text" v-if="asideShow">设置中心</p>
      <p class="icon" v-else style="padding-left: 5px;">
        <svg-icon icon="menu_activity_creation"/>
      </p>
    </div>
    <RouteSide/>
  </div>
</template>

<script>
  import RouteSide from '@/components/RouteSide'
  import {mapGetters, mapState} from 'vuex'

  export default {
	name: 'SideBar',
	components: {RouteSide},
	computed: {
	  ...mapGetters('App', [
		'asideWidth',
		'theme',
	  ]),
	  ...mapState('App', [
		'asideShow',
	  ]),
	  style() {
		return {
		  width: this.asideWidth + 'px',
		  backgroundColor: this.theme.side.bgColor,
		  color: this.theme.side.textColor,
		}
	  },
	  logoStyle() {
		return {
		  backgroundColor: this.theme.logo.bgColor,
		  color: this.theme.logo.textColor,
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../styles/variable";

  .side-bar {
    z-index: 10;
    transition: width .3s;
    position: fixed;
    width: 300px;
    bottom: 0;
    top: 0;
    left: 0;


    .logo-block {
      text-align: center;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
    }

  }
</style>
