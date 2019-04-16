<template>
  <div class="micro-title" :style="style">{{data.data.text}}</div>
</template>

<script>
  export default {
	name: 'MicroTitle',
	components: {},
	props: {
	  data: Object,
	},
	data() {
	  return {}
	},
	created() {
	},
	methods: {},
	computed: {
	  style() {
		let {color, align, size} = this.data.data
		return {
		  color,
		  textAlign: align,
		  fontSize: size + 'px',
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .micro-title {
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
