<template>
  <div class="home">

    <transition name="enter">
      <div class="user-block" v-if="enter">
        <Avatar :src="userInfo.avatar" :size="60"/>
      </div>
    </transition>
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
        enter: false
      }
    },
    async created() {
      if (this.userInfo) {
        this.enter = true
      }
    },
    methods: {},
    computed: {
      ...mapState('User', [
        'userInfo'
      ])
    },
  }
</script>

<style lang="less" rel="stylesheet/less">

  .home {
    padding: 10px;

    .user-block {
      height: 60px;
    }

    p {
      padding: 10px;
      font-size: 15px;
    }
  }

  .enter-enter, .enter-leave-to {
    height: 300px;

    .avatar {
      transform: scale(5)
    }
  }

  .enter-enter-active, .enter-leave-active {
    transition: .3s;
  }
</style>
