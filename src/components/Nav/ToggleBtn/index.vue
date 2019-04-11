<template>
  <el-button @click="toggleAside" :title="asideShow?'收起':'展开'">
    <svg-icon :icon="asideShow?'left_step':'right_step'"/>
  </el-button>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
	name: 'ToggleBtn',
	components: {},
	data() {
	  return {}
	},
	created() {
	},
	methods: {
	  toggleAside() {
		this.$store.commit('App/TOGGLE_ASIDE')
	  },
    },
	computed: {
	  ...mapState('App', [
		'asideShow',
	  ]),
    },
  }
</script>

<style lang="less" rel="stylesheet/less">

  .title {
  }
</style>
