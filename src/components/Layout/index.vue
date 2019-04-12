<template>
  <div class="layout" :class="`theme__${themeType}`">
    <NavBar/>
    <SideBar/>
    <Container ref="main"/>
  </div>
</template>

<script>
  import NavBar from './children/NavBar'
  import SideBar from './children/SideBar'
  import Container from './children/Container'

  export default {
	name: 'Layout',
	components: {NavBar, SideBar, Container},
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
	computed: {
	  themeType() {
		return this.$store.state.App.themeType
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .layout {
  }
</style>
