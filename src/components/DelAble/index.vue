<template>
  <div class="del-able-block" :style="blockStyle">
    <span class="del-able-btn" v-if="!disabled" @click="delHandler">
      <svg-icon icon="delete"/>
    </span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
	name: 'DelAble',
	components: {},
	props: {
	  disabled: Boolean,
	  bgColor: {
		type: String,
		default: '#F5F7FA',
	  },
	  border: {
		type: String,
		default: '#EBEEF5',
	  },
	  radius: {
		type: String,
		default: '4px',
	  },
	},
	data() {
	  return {}
	},
	created() {
	},
	methods: {
	  delHandler() {
		this.$confirm('您确定删除此项吗?')
			.then(() => {
			  this.$emit('del')
			})
			.catch(() => {
			  console.log('放弃删除')
			})
	  },
	},
	computed: {
	  blockStyle() {
		return {
		  background: this.bgColor,
		  border: `1px solid ${this.border}`,
		  borderRadius: this.radius,
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .del-able-block {
    position: relative;

    &:hover {
      .del-able-btn {
        opacity: 1;
      }
    }

    .del-able-btn {
      z-index: 3;
      background-color: #fff;
      border-radius: 50%;
      color: @dangerC;
      position: absolute;
      font-size: 16px;
      right: -.5em;
      top: -.5em;
      opacity: 0;
    }
  }
</style>
