<template>
  <div class="main" :style="style">
    <transition name="router" mode="out-in">
      <router-view v-if="visibility"/>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
	name: 'Main',
	data() {
	  return {
		visibility: true,
	  }
	},
	methods: {
	  reload(delay = 20) {
		this.visibility = false
		setTimeout(() => {
		  this.visibility = true
		}, delay)
	  },
	},
	computed: {
	  ...mapState('App', [
		'navShow',
		'asideShow',
	  ]),
	  ...mapGetters('App', [
		'asideWidth',
		'navHeight',
	  ]),
	  style() {
		return {
		  paddingLeft: this.asideWidth + 'px',
		  // paddingTop: this.navHeight + 'px',
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .main {
    position: relative;
    padding-top: 90px;
    transition: padding .3s;
    min-height: 100vh;

    .router-enter, .router-leave-to {
      transform: translate3d(50px, 0, 0);
      opacity: 0;
    }

    .router-enter-active, .router-leave-active {
      overflow: hidden;
      transition: transform .15s ease, opacity .15s ease;
    }
  }
</style>
