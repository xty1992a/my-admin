<template>
  <div class="user-block">
    <Avatar :src="userInfo.avatar" :size="100"/>
    <div class="text-panel">
      <h3 class="user-name">{{userInfo.name}}</h3>
      <router-link to="/home/authedit">
        <p class="user-role">{{userInfo.role}}</p>
      </router-link>
      <p class="user-intro">{{userInfo.introduction}}</p>
    </div>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import {mapState} from 'vuex'

  export default {
	name: 'UserBlock',
	components: {Avatar},
	data() {
	  return {}
	},
	created() {
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
  @import "../../../../styles/variable";

  .user-block {
    padding: 20px 30px;
    background-color: #fff;
    .shadow;
    display: flex;

    .avatar {
      flex-shrink: 0;
    }

    .text-panel {
      padding-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .user-name {
        font-size: 24px;
        color: #000;
      }

      p {
        font-size: 17px;
      }

    }
  }

  @media screen {
    @media (max-width: 768px) {
      .user-block {
        padding: 20px 10px;

        .text-panel {
          padding-left: 20px;
        }
      }
    }
  }
</style>
