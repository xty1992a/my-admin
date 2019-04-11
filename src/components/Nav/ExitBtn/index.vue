<template>
  <el-button @click="logout" title="登出">
    <svg-icon icon="exit"/>
  </el-button>
</template>

<script>
  export default {
	name: 'ExitBtn',
	methods: {
	  async logout() {
		this.$store.dispatch('User/Logout')
		this.$router.push('/Login')
	  },
    },
  }
</script>

<style lang="less" rel="stylesheet/less">

  .title {
  }
</style>
