<template>
  <div class="code-mode-picker">
    <ul class="mode-list">
      <li
        class="mode-item"
        :class="item.value === value ? 'picked' : ''"
        v-for="(item, index) in options"
        @click="pickItem(item)"
      >
        <div class="img">
          <img :src="img[`mode_${index + 1}`]" alt="" />
        </div>
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import img from "@/assets/imgs";

export default {
  name: "code-mode-picker",
  components: {},
  props: {
    value: null,
    options: {
      type: Array
    }
  },
  data() {
    return { img };
  },
  methods: {
    pickItem(item) {
      this.$emit("input", item.value);
    }
  },
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.code-mode-picker {
  width: 270px;

  .mode-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .mode-item {
      cursor: pointer;
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
      padding: 5px;

      &.picked {
        box-shadow: 0 0 1px #2f6dfe;
        color: #2f6dfe;
      }

      .img {
        width: 100%;
        height: 48px;
        margin-bottom: 8px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
