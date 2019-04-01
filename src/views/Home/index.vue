<template>
  <div class="home">
    <p v-for="i in 30">this is home page -- {{i}}</p>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
	name: 'Home',
	components: {},
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

  .home {

    p {
      padding: 10px;
      font-size: 15px;
    }
  }
</style>
