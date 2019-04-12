<template>
  <el-button @click="changeTheme" class="fullscreen" title="换肤">
    <svg-icon icon="nav_skin"/>
  </el-button>
</template>

<script>
  import themeList from '@/config/theme'
  import {mapState, mapGetters} from 'vuex'
  import changeTheme from '@/service/ThemeEditor'

  export default {
	name: 'ThemeBtn',
	components: {},
	data() {
	  return {}
	},
	created() {
	},
	methods: {
	  async changeTheme() {
		changeTheme({
		  value: this.themeType,
		  options: themeList,
		  action: this.commit,
		})
	  },
	  commit(type) {
		console.log('theme change', type)
		this.$store.commit('App/SET_THEME', type)
	  },
	},
	computed: {
	  ...mapState('App', [
		'themeType',
	  ]),
	  ...mapGetters('App', [
		'theme',
	  ]),
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .title {
  }
</style>
