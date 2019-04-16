<template>
  <div class="micro-page">
    <component v-for="com in componentList" :is="com.name" :data="com.data" :key="com.key"/>
  </div>
</template>

<script>
  import Carousel from './children/Carousel'
  import MicroTitle from './children/MicroTitle'

  export default {
	name: 'MicroPage',
	components: {Carousel, MicroTitle},
	data() {
	  return {
		componentList: [],
	  }
	},
	created() {
	  if (window.parent !== window) {
		window.addEventListener('message', e => {
		  if (e.data.type === 'data-change') {
			console.log('change', e.data)
			this.componentList = e.data.data
		  }
		}, false);
	  }
	},
	methods: {},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .micro-page {
  }
</style>
