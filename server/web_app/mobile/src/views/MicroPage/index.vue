<template>
  <div class="micro-page">
    <component
      v-for="com in componentList"
      :is="com.name"
      :data="com.data"
      :key="com.key"
    />
  </div>
</template>

<script>
// import Carousel from './children/Carousel'
// import MicroTitle from './children/MicroTitle'
import { Carousel, MagicCode, MicroTitle } from "./children";

export default {
  name: "MicroPage",
  components: { Carousel, MagicCode, MicroTitle },
  data() {
    return {
      componentList: []
    };
  },
  created() {
    if (window.parent !== window) {
      window.addEventListener(
        "message",
        e => {
          if (e.data.type === "data-change") {
            this.componentList = e.data.data;
          }
        },
        false
      );
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.micro-page {
}
</style>
