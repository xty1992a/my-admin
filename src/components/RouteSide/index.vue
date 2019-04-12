<template>
  <div class="route-side" :style="{backgroundColor: bgColor}">
    <div class="logo-block">
      <p class="text" v-if="asideShow">设置中心</p>
      <p class="icon" v-else style="padding-left: 5px;">
        <svg-icon icon="menu_activity_creation"/>
      </p>
    </div>
    <el-menu
            :collapse="collapse"
            router
            ref="menu"
            style="border: 0"
            unique-opened
            :default-active="$route.fullPath.toLowerCase()"
            :background-color="bgColor"
            text-color="#fff"
            :collapse-transition="false"
            active-text-color="#ffd04b">
      <SubRoute v-for="route in sideRoutes" :key="route.name" :route="route" :path="route.path"/>
    </el-menu>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import SubRoute from './SubRoute'

  export default {
	name: 'RouteSide',
	components: {SubRoute},
	data() {
	  return {
		collapse: false,
	  }
	},
	computed: {
	  asideShow() {
		return this.$store.state.App.asideShow
	  },
	  ...mapGetters('Router', [
		'sideRoutes',
	  ]),
	  bgColor() {
		return '#545c64'
	  },
	},
	watch: {
	  asideShow(now) {
		if (now) {
		  this.collapse = false
		}
		else {
		  const menu = this.$refs.menu
		  const index = menu.openedMenus[0]
		  menu.close(index)
		  setTimeout(() => {
			this.collapse = true
		  }, 200)
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .route-side {
    min-height: 100%;
    overflow: hidden;
    margin-left: -5px;

    .logo-block {
      text-align: center;
      font-size: 18px;
      color: #fff;
      height: 50px;
      line-height: 50px;
    }

  }
</style>
