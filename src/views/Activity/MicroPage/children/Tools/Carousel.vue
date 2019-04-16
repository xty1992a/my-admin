<template>
  <div class="tool-carousel"  >
    <ul class="img-list">
      <DelAble class="img-item" @del="delImg(it)"
               v-for="it in data.data" :key="it.path">
        <li>
          <img :src="it.path" alt="">
        </li>
      </DelAble>
      <li class="img-item add-btn" @click="pickCarousel">
        <svg-icon icon="plus"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import DelAble from '@/components/DelAble'

  const list = [...Array(6)].map((n, i) => ({
	path: `http://localhost:3001/images/goods__${i + 1}.png`,
	url: '',
  }))
  import pickCarousel from '@/service/Micro/CarouselEditor'

  export default {
	name: 'Carousel',
	components: {DelAble},
	props: {
	  data: Object,
	  edit: Function,
	},
	methods: {
	  async pickCarousel() {
		let res = await pickCarousel({
		  value: this.data.data || [],
		  list,
		})
		if (res.success) {
		  this.edit && this.edit({
			...this.data,
			data: res.data,
		  })
		}
		console.log(res)

	  },

	  delImg(item) {
		this.edit && this.edit({
		  ...this.data,
		  data: this.data.data.filter(it => it.path !== item.path),
		})
	  },
	},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .tool-carousel {
    .img-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -4px;

      .img-item {
        width: 120px;
        height: 75px;
        margin: 4px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        border: 1px dashed #e5e5e5;
        cursor: pointer;

        span {
          vertical-align: middle;
          line-height: 1;
        }
      }
    }
  }
</style>
