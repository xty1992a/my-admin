<template>
  <div class="preview">
    <iframe src="http://localhost:8081" frameborder="0" height="640" width="100%" ref="frame"></iframe>
  </div>
</template>

<script>
  export default {
	name: 'Preview',
	components: {},
	props: {
	  data: Array,
	  cache: Function,
	},
	data() {
	  return {}
	},
	mounted() {
	  this.$refs.frame.onload = () => {
		this.frame = this.$refs.frame.contentWindow || null
	  }
	},
	methods: {},
	computed: {},
	watch: {
	  data: {
		handler(now) {
		  if (!this.frame) return
		  console.log('emit ', now, this.frame)
		  this.frame.postMessage({type: 'data-change', data: now}, '*')
		  this.cache && this.cache([...now])
		  // this.messager.emit('data-change', {data: now, type: 'data-change'})
		}, deep: true,
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .preview {
    //.shadow;
    width: 360px;
    height: 640px;
    overflow: hidden;

    iframe {
      margin-right: -10px;
    }
  }

  .shadow {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 10px;
      right: 10px;
      top: 0;
      left: 0;
    }
  }
</style>
