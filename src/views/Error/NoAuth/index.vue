<template>
  <div class="no-auth">
    <div class="center">
      <img :src="img.no_auth" alt="">
      <p>您没有访问权限</p>
      <Avatar/>
    </div>
  </div>
</template>

<script>
  import img from '@/assets/imgs'

  export default {
	name: 'NoAuth',
	components: {},
	data() {
	  return {img}
	},
	created() {
	},
	methods: {},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .no-auth {
    text-align: center;
    padding-top: 200px;

    .center {
      display: inline-block;
    }
    img {
      width: 200px;
    }
  }
</style>
