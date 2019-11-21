const config = {
  methods: {
    saveTagData(data) {
      if (this.$parent.$options._componentTag !== "Container") return;
      if (!data) return;
      console.log(data, Array.isArray(data));
      this.$store.commit("Router/UPDATE_TAG_CACHE", {
        key: this.$route.fullPath.toLowerCase(),
        data
      });
    }
  }
};

export default config;

export function plugin(Vue) {
  Vue.mixin(config);
}
