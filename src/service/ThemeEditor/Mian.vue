<template>
  <side-pop class="theme-pop" position="right" v-show="show" @cancel="show=false" @closed="closed" :opacity=".2">
    <div class="theme-changer">
      <h3 class="theme-title">配色方案</h3>
      <p class="theme-sub-title">皮肤颜色</p>
      <ul class="skin-list">
        <li class="skin-item" v-for="(theme) in themes"
            :key="theme.id"
            :class="{active:value===theme.id}"
            @click="changeTheme(theme.id)">
          <div class="item-head" :style="{backgroundColor:theme.head}"></div>
          <div class="item-aside" :style="{backgroundColor:theme.aside}">
            <div class="item-logo" :style="{backgroundColor:theme.logo}"></div>
            <div class="item-active" :style="{backgroundColor:theme.active}"></div>
          </div>
        </li>
      </ul>
      <p class="theme-sub-title">主题色</p>
    </div>
  </side-pop>
</template>

<script>
  import SidePop from '../../components/SidePop'

  export default {
	name: 'theme-changer',
	components: {SidePop},
	data() {
	  return {
		show: false,
	  }
	},
	methods: {
	  closed() {
		this.$destroy(true)
	  },
	  confirm() {
		this.resolve && this.resolve(this.value)
	  },
	  changeTheme(id) {
		if (this.action) {
		  this.action(id)
		}
		this.value = id
	  },
	},
	computed: {
	  themes() {
		return this.options.map(it => {
		  return {
			head: it.nav.bgColor,
			logo: it.logo.bgColor,
			aside: it.side.bgColor,
			active: it.side.activeBg,
			id: it.id,
		  }
		})
	  },
	},
	beforeDestroy() {
	  this.$el && this.$el.remove()
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .theme-changer {
    width: 240px;
    height: 100%;
    padding-top: 90px;
    background-clip: content-box;
    background-color: #fff;

    .theme-title {
      line-height: 64px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }

    .theme-sub-title {
      line-height: 45px;
      padding-left: 25px;
    }
  }

</style>

<style lang="less" scoped>
  .skin-list {
    overflow: hidden;
    padding: 20px 15px 20px 20px;

    .skin-item {
      margin-bottom: 10px;
      float: left;
      width: 96px;
      height: 58px;
      background-color: #fff;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      &:nth-child(2n+1) {
        margin-right: 10px;
      }

      &.active {
        &:after {
          border-color: #4fabda;
          transform: scale(1);
        }
      }

      &:hover {
        &:after {
          border-color: #4fabda;
          transform: scale(1);
        }
      }

      .item-head {
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        height: 8px;
      }

      .item-aside {
        position: absolute;
        top: 5px;
        left: 5px;
        height: 48px;
        width: 16px;
      }

      .item-logo {
        height: 8px;
      }

      .item-active {
        height: 8px;
      }

      &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        height: 48px;
        background-color: #F2F3F4;
      }

      &:after {
        transition: transform .15s;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid transparent;
        transform: scale(0.5);
      }
    }
  }

  .picker-wrap {
    padding-left: 20px;
  }
</style>
