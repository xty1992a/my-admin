<template>
  <div class="home">
    <UserBlock/>
    <ul class="list">
      <li class="item" v-for="i in 30">
        <p>this is home page -- {{i}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import {mapState} from 'vuex'
  import UserBlock from './children/UserBlock'

  export default {
	name: 'Home',
	components: {Avatar, UserBlock},
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

    .item {
      padding: 10px;
      font-size: 15px;
    }

  }

</style>
