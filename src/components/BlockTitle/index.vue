<template>
  <div class="block-title" :class="icon?'':'primary'">
    <svg-icon :icon="icon" v-if="icon"></svg-icon>
    <span class="title">{{title}}</span>
    <span class="sub-title" v-if="subTitle">{{subTitle}}</span>
    <slot></slot>
  </div>
</template>

<script>
  import SvgIcon from '@/components/SvgIcon'

  export default {
	name: 'block-title',
	components: {SvgIcon},
	props: {
	  icon: {
		type: String,
		default: '',
	  },
	  title: String,
	  subTitle: String,
	},
	data() {
	  return {}
	},
	methods: {},
	computed: {},
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .block-title {
    font-size: 16px;
    line-height: 60px;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .title {
      color: #303133;
      font-weight: 600;
    }

    .sub-title {
      padding-left: 14px;
      font-size: 14px;
      color: #999;
    }

    &.primary {
      position: relative;
      padding-left: 40px;

      &:before {
        content: '';
        position: absolute;
        width: 4px;
        height: 13px;
        top: 24px;
        left: 20px;
        background-color: @activeC;
      }
    }
  }

  @media screen {
    @media (max-width: 768px) {
      .block-title {
      }
    }
  }
</style>
