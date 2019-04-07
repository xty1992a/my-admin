<template>
  <img class="avatar" :src="src" :alt="alt" :style="{width: size + 'px', height: size+'px'}"/>
</template>

<script>
  export default {
	name: 'Avatar',
	components: {},
	props: {
	  src: {
		type: String,
		default: '',
	  },
    alt: {
	    type: String,
      default: 'avatar'
    },
	  size: {
		type: Number,
		default: 40,
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

  .avatar {
    overflow: hidden;
    border-radius: 50%;
  }
</style>
