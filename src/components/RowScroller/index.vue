<template>
  <div class="scroll-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
	name: 'RowScroller',
	components: {},
	props: {
	  data() {
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

  .scroll-container {
    overflow: auto;

    .row-scroller {
    }
  }
</style>
