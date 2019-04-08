<template>
  <div class="layout">
    <NavBar/>
    <SideBar/>
    <Main/>
  </div>
</template>

<script>
  import NavBar from './children/NavBar'
  import SideBar from './children/SideBar'
  import Main from './children/Content'

  export default {
	name: 'Layout',
	components: {NavBar, SideBar, Main},
	data() {
	  return {}
	},
	created() {
	},
	methods: {},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .layout {
  }
</style>
