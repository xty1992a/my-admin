<template>
  <el-button class="fresh-btn" @click="freshTag" title="刷新">
    <svg-icon icon="nav_refresh"/>
  </el-button>
</template>

<script>
  export default {
	name: 'FreshBtn',
	props: {
	  value: Boolean,
	  color: {
		type: String,
		default: '#304156',
	  },
	},
	inject: ['reload'],
	components: {},
	data() {
	  return {}
	},
	methods: {
	  freshTag() {
		this.reload && this.reload()
	  },
	},
	computed: {},
	watch: {},
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .fresh-btn {
    &:hover {
      svg {
        display: inline-block;
        animation: rotate .5s linear;
      }
    }
  }

  @keyframes rotate {
    to {
      transform: rotateZ(360deg);
    }
  }

</style>
