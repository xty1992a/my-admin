<template>
  <div class="tools">
    <h3>添加组件</h3>
    <div class="btn-wrap">
      <el-button @click="addComponent(item.type)" v-for="(item,index) in component" :key="item.type+index"
      >{{item.text}}
      </el-button>
    </div>
    <h3>编辑功能</h3>
    <div class="edit-wrap">
      <component :is="current.name"
                 :key="current.type"
                 :edit="editComponent"
                 :data="current" v-if="current"/>
    </div>
  </div>
</template>

<script>
  import Carousel from './Carousel'
  import MicroTitle from './MicroTitle'

  export default {
	name: 'Tools',
	components: {Carousel, MicroTitle},
	props: {
	  current: Object,
	},
	data() {
	  return {
		component: [
		  {type: 'Carousel', text: '轮播'},
		  {type: 'MicroTitle', text: '标题'},
		],
	  }
	},
	created() {
	},
	methods: {
	  addComponent(type) {
		this.$emit('add', type)
	  },
	  editComponent(data) {
		this.$emit('edit', data)
	  },
	},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .tools {
    width: 400px;
    padding: 10px;

    .btn-wrap {
      min-height: 200px;
    }

    h3 {
      padding: 10px 5px;
    }
  }
</style>
