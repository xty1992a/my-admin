<template>
  <div class="carousel">
    <img :src="(data.data[0]||{}).path" alt="">
  </div>
</template>

<script>
  export default {
	name: 'Carousel',
	props: {
	  data: Object,
	},
	methods: {},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .carousel {
    background-color: #f7f7f7;
    height: 225px;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
