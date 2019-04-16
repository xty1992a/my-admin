<template>
  <el-dialog :visible.sync="show" class="carousel-editor"
             title="轮播图编辑器"
             @closed="closed"
  >
    <div class="carousel-editor-content" @mousewheel.stop>
      <ul class="img-list">
        <li class="img-item"
            :class="pathList.includes(item.path)?'picked':''"
            @click="pickItem(item)"
            v-for="item in list" :key="item.path">
          <img :src="item.path" alt="">
          <svg-icon icon="add"/>
        </li>
      </ul>
    </div>
    <div class="selector__foot">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
	name: 'CarouselEditor',
	components: {},
	data() {
	  return {
		routes: [],
		show: false,
	  }
	},
	methods: {
	  confirm() {
		this.resolve({
		  success: true,
		  data: JSON.parse(JSON.stringify(this.value)),
		})
		this.show = false
	  },
	  cancel() {
		this.resolve({
		  success: false,
		  data: [],
		})
		this.show = false
	  },
	  pickItem(item) {
		if (this.pathList.includes(item.path)) {
		  this.value = this.value.filter(it => it.path !== item.path)
		}
		else {
		  this.value.push(item)
		}
	  },
	  closed() {
		this.$destroy(true)
	  },
	},
	computed: {
	  pathList() {
		return this.value.map(it => it.path)
	  },
	},
	beforeDestroy() {
	  this.$el && this.$el.remove()
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .carousel-editor {

    .carousel-editor-content {
      height: 500px;
      overflow: auto;

      .img-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        .img-item {
          margin: 10px 0;
          width: 300px;
          height: 187.5px;

          img {
            width: 100%;
            height: 100%;
          }

          svg {
            display: none;
          }
        }

        .picked {
          position: relative;

          svg {
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            top: 0;
            left: 0;
            margin: auto;
            font-size: 50px;
            color: #fff;
          }

          &:before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
    }

    .selector__foot {
      text-align: center;
      padding-top: 20px;
    }
  }

</style>
