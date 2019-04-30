<template>
  <div class="layer">
    <!--   <li v-for="item in value" :key="item.key">
         <span class="del-btn" @click="delComponent(item)">
           <svg-icon icon="delete"/>
         </span>
         <component
                 :is="item.name"
                 @pick="pickComponent"
                 :class="item.key===currentKey?'active item':'item'"
                 :data="item"/>
       </li>-->

    <DelAble
      v-for="item in value"
      :key="item.key"
      @del="delComponent(item)"
      @click.native="pickComponent(item.key)"
    >
      <component
        :is="item.name"
        :class="item.key === currentKey ? 'active item' : 'item'"
        :data="item"
      />
    </DelAble>
  </div>
</template>

<script>
import Sorter from "@redbuck/sorter";
import DelAble from "@/components/DelAble";
import Carousel from "./Carousel";
import MagicCode from "./MagicCode";
import MicroTitle from "./MicroTitle";

export default {
  name: "Layer",
  components: { Carousel, DelAble, MicroTitle, MagicCode },
  props: {
    value: {
      type: Array
    },
    currentKey: {
      type: String
    }
  },
  data() {
    return {
      dragger: null
    };
  },
  mounted() {
    this.dragger = new Sorter(this.$el, {
      change: false
    });
    this.dragger.on("drag-over", pos => {
      this.dragOver(pos);
      setTimeout(() => {
        this.dragger.freshThreshold();
      }, 20);
    });
  },
  methods: {
    pickComponent(/*{index}*/ key) {
      // let key = this.value[index].key
      this.$emit("pick", key);
    },
    dragOver({ source, target }) {
      if (source === target) return;
      let componentList = [...this.value];
      let temp = componentList.splice(source, 1);
      let start = componentList.splice(0, target);
      componentList = [...start, ...temp, ...componentList];
      this.$emit("input", componentList);
    },
    delComponent(com) {
      this.$emit("input", this.value.filter(it => it.key !== com.key));
    }
  },
  computed: {},
  watch: {
    value() {
      setTimeout(() => {
        console.log("fresh");
        this.dragger.freshThreshold();
      }, 30);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../../../styles/variable";

.layer {
  width: 377px;
  min-height: 667px;
  position: relative;

  .item {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 1px #4169e133;
  }

  .active {
    box-shadow: 0 0 0 1px #4169e1;
    z-index: 2;
  }

  .drag-handler {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 3;
  }
}
</style>
