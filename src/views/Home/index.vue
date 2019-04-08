<template>
  <div class="home">

    <p v-for="i in 30">this is home page -- {{i}}</p>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import {mapState} from 'vuex'

  export default {
	name: 'Home',
	components: {Avatar},
	data() {
	  return {
		enter: false,
	  }
	},
	methods: {},
	computed: {
	  ...mapState('User', [
		'userInfo',
	  ]),
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .home {
    padding: 10px;

    .user-block {
      height: 60px;

      .avatar {
      }
    }

    p {
      padding: 10px;
      font-size: 15px;
    }

  }

</style>
