<template>
  <div class="layout-block">
    <block-title v-bind="{icon,title,subTitle}" v-if="title"/>
    <div class="block-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BlockTitle from '../BlockTitle'

  export default {
	name: 'layout-block',
	props: {
	  icon: String,
	  title: String,
	  subTitle: String,
	},
	components: {BlockTitle},
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

  .layout-block {

    .block-content {
      padding: 0 10px;
    }
  }
</style>
