<template>
  <div class="micro-page page">
    <Tools
      @add="addComponent"
      @edit="editComponent"
      :current="currentComponent"
    />
    <Layer
      @pick="pickComponent"
      :currentKey="currentKey"
      v-model="componentList"
    />
    <Preview :data="componentList" />
  </div>
</template>

<script>
const copy = o => JSON.parse(JSON.stringify(o));
import { mapState } from "vuex";
import Tools from "./children/Tools/index";
import Preview from "./children/Preview";
import Layer from "./children/Layer/index";

export default {
  name: "MicroPage",
  components: { Tools, Preview, Layer },
  data() {
    return {
      componentList: [],
      currentKey: ""
    };
  },
  created() {
    if (this.cacheData) {
      this.componentList = copy(this.cacheData.componentList);
      this.currentKey = this.cacheData.currentKey;
    } else {
      this.getPageData();
    }
  },
  methods: {
    getPageData() {
      const data = [
        {
          name: "Carousel",
          data: [
            {
              path: "http://pq3cs0ksy.bkt.clouddn.com/images/goods__4.png",
              url: ""
            },
            {
              path: "http://pq3cs0ksy.bkt.clouddn.com/images/goods__6.png",
              url: ""
            }
          ],
          key: "1556593233267"
        },
        {
          name: "MicroTitle",
          data: {
            text: "点击添加标题",
            color: "#333",
            align: "center",
            size: 28
          },
          key: "1556592959919"
        },
        {
          name: "MagicCode",
          data: {
            map: [
              {
                x: 0,
                y: 0,
                h: 1,
                w: 0.5,
                cellID: [0, 1, 4, 5],
                key: "ngj1k83zbu",
                path:
                  "http://pq3cs0ksy.bkt.clouddn.com/Fjjvhfyf2_4mobNHTVKGBD618CIv",
                href: ""
              },
              {
                x: 0.5,
                y: 0,
                h: 0.5,
                w: 0.5,
                cellID: [2, 3],
                key: "2tcmq9n8syo",
                path:
                  "http://pq3cs0ksy.bkt.clouddn.com/Fo4BLZgITSJG0t4Mevedzwyc_oX0",
                href: ""
              },
              {
                x: 0.5,
                y: 0.5,
                h: 0.5,
                w: 0.25,
                cellID: [6],
                key: "owqlur5ysgj",
                path:
                  "http://pq3cs0ksy.bkt.clouddn.com/Fu-qV-mEHIpHuFgdvBW57Dk1uSbA",
                href: ""
              },
              {
                x: 0.75,
                y: 0.5,
                h: 0.5,
                w: 0.25,
                cellID: [7],
                key: "e7gq67jivfv",
                path:
                  "http://pq3cs0ksy.bkt.clouddn.com/FpWlHamS7Rz0H-GGtSnNowdb6R0E",
                href: ""
              }
            ],
            gap: 0,
            row: 2,
            col: 4,
            size: 187.5,
            mode: 5
          },
          key: "1556592623554"
        }
      ];
      this.componentList = data;
      this.currentKey = data[2].key;
    },

    addComponent(type) {
      let key = (this.currentKey = +new Date() + "");
      const com = { name: type, data: null, key };
      switch (type) {
        case "Carousel":
          com.data = [];
          break;
        case "MicroTitle":
          com.data = {
            text: "点击添加标题",
            color: "#333",
            align: "left",
            size: 14
          };
          break;
        case "MagicCode":
          com.data = {
            map: [],
            gap: 5,
            row: 4,
            col: 4,
            size: 187.5,
            mode: 6
          };
          break;
      }
      this.componentList.push(com);
    },

    editComponent(data) {
      let index = this.componentList.findIndex(it => it.key === data.key);
      if (index !== -1) {
        this.componentList.splice(index, 1, data);
      }
    },

    pickComponent(key) {
      this.currentKey = key;
    }
  },
  computed: {
    ...mapState("Router", ["tagCache"]),
    cacheData() {
      if (!this.tagCache.length) return null;
      return this.tagCache.find(
        it => it.key === this.$route.fullPath.toLowerCase()
      ).data;
    },
    currentComponent() {
      return this.componentList.find(it => it.key === this.currentKey);
    }
  },
  watch: {
    componentList() {
      this.saveTagData({
        componentList: [...this.componentList],
        currentKey: this.currentKey
      });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.micro-page {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    border: 1px solid #e5e5e5;
    background-color: #fff;
  }

  .tools {
  }

  .layer {
  }

  .preview {
  }
}
</style>
