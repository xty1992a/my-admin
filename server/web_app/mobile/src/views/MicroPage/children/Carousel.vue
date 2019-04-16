<template>
  <van-swipe :autoplay="3000" indicator-color="white" class="carousel">
    <van-swipe-item v-for="item in data" :key="item.path">
      <img :src="item.path" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  export default {
	name: 'carousel',
	components: {},
	props: {
	  data: {
		type: Array,
	  },
	},
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

  .carousel {
    img {
      width: 100%;
    }
  }
</style>
