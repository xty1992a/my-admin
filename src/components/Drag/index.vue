<template>
  <div class="drag">
    <slot></slot>
  </div>
</template>

<script>
  import Dragger from '@/utils/drag'

  export default {
	name: 'drag',
	components: {},
	data() {
	  return {
		dragger: null,
	  }
	},
	props: {
	  data: {
		type: Array,
		required: true,
	  },
	},
	created() {
	  this.createDrag()
	},
	methods: {
	  createDrag() {
		setTimeout(() => {
		  let list = this.$slots.default[0].elm
		  if (list) {
			this.dragger = new Dragger(list, {})
			this.dragger.on('drag-over', ({source, target}) => {
			  this.$emit('drag-over', {source, target})
			})
			this.dragger.on('click-over', (payload) => {
			  this.$emit('click-over', payload)
			})
			this.dragger.on('swap-over', (payload) => {
			  this.$emit('click-over', payload)
			})
		  }
		}, 20)
	  },
	},
	watch: {
	  data: {
		handler(now) {
		  setTimeout(() => {
			this.dragger.freshThreshold()
		  }, 320)
		}, deep: true,
	  },
	},
  }
</script>

<style lang="less">

  .drag {
    user-select: none;
    height: 100%;
  }

  .drag-move {
    transition: .3s;
  }
</style>
