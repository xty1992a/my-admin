<template>
  <div class="main" :style="style">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
	name: 'Main',
	components: {},
	data() {
	  return {}
	},
	created() {
	},
	methods: {},
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
		  paddingLeft: this.asideWidth + 'px',
		  // paddingTop: this.navHeight + 'px',
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .main {
    padding-top: 90px;
    transition: padding .3s;
  }
</style>
