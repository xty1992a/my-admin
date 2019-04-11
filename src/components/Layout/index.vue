<template>
  <div class="layout">
    <NavBar/>
    <SideBar/>
    <Main ref="main"/>
  </div>
</template>

<script>
  import NavBar from './children/NavBar'
  import SideBar from './children/SideBar'
  import Main from './children/Content'

  export default {
	name: 'Layout',
	components: {NavBar, SideBar, Main},
	provide() {
	  return {
		reload: this.reload,
	  }
	},
	methods: {
	  reload(delay) {
		this.$refs.main.reload(delay)
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .layout {
  }
</style>
