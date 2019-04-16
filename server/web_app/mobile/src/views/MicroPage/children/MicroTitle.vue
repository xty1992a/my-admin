<template>
  <h3 class="micro-title" :style="style">{{data.text}}</h3>
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
		let {color, align, size} = this.data
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
    font-weight: normal;
  }
</style>
