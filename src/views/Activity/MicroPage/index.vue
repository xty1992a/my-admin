<template>
  <div class="micro-page page">
    <Tools @add="addComponent" @edit="editComponent" :current="currentComponent"/>
    <Layer @pick="pickComponent" :currentKey="currentKey" v-model="componentList"/>
    <Preview :data="componentList"/>
  </div>
</template>

<script>
  const copy = o => JSON.parse(JSON.stringify(o))
  import {mapState} from 'vuex'
  import Tools from './children/Tools/index'
  import Preview from './children/Preview'
  import Layer from './children/Layer/index'

  export default {
	name: 'MicroPage',
	components: {Tools, Preview, Layer},
	data() {
	  return {
		componentList: [],
		currentKey: '',
	  }
	},
	created() {
	  if (this.cacheData) {
		this.componentList = copy(this.cacheData.componentList)
		this.currentKey = this.cacheData.currentKey
	  }
	},
	methods: {
	  addComponent(type) {
		let key = this.currentKey = +new Date() + ''
		const com = {name: type, data: null, key}
		switch (type) {
		  case 'Carousel':
			com.data = []
			break
		  case 'MicroTitle':
			com.data = {
			  text: '点击添加标题',
			  color: '#333',
			  align: 'left',
			  size: 14,
			}
			break
		}
		this.componentList.push(com)
	  },

	  editComponent(data) {
		let index = this.componentList.findIndex(it => it.key === data.key)
		if (index !== -1) {
		  this.componentList.splice(index, 1, data)
		}
	  },

	  pickComponent(key) {
		this.currentKey = key
	  },
	},
	computed: {
	  ...mapState('Router', [
		'tagCache',
	  ]),
	  cacheData() {
		if (!this.tagCache.length) return null
		return this.tagCache.find(it => it.key === this.$route.fullPath.toLowerCase()).data
	  },
	  currentComponent() {
		return this.componentList.find(it => it.key === this.currentKey)
	  },
	},
	watch: {
	  componentList() {
		this.saveTagData({
		  componentList: [...this.componentList],
		  currentKey: this.currentKey,
		})
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .micro-page {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    > div {
      border: 1px solid #e5e5e5;
      background-color: #fff;
    }

    .tools {
    }

    .layer {
    }

    .preview {
    }
  }
</style>
