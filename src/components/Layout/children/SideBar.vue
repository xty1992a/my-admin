<template>
  <div class="side-bar" :style="style" @wheel.stop @DOMMouseScroll.stop>
    <RouteSide/>
  </div>
</template>

<script>
  import RouteSide from '@/components/RouteSide'
  import {mapState, mapGetters} from 'vuex'

  export default {
	name: 'SideBar',
	components: {RouteSide},
	data() {
	  return {}
	},
	created() {
	},
	methods: {},
	computed: {
	  ...mapState('App', [
		'asideShow',
	  ]),
	  ...mapGetters('App', [
		'asideWidth',
	  ]),
	  style() {
		return {
		  width: this.asideWidth + 'px',
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .side-bar {
    transition: width .3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f7f7f7;
    position: fixed;
    width: 300px;
    bottom: 0;
    top: 0;
    left: 0;
  }
</style>
