import themeMap from "@/config/theme";
import { isMobile } from "@/utils";

const type = parseInt(
  JSON.parse(localStorage.getItem("app_theme_type")) || "0"
);

export default {
  namespaced: true,
  state: {
    asideShow: !isMobile,
    navShow: true,
    themeType: type,
    isMobile
  },
  mutations: {
    CLEAR_STATE: state => {
      state.asideShow = true;
      state.navShow = true;
    },
    SET_THEME: (state, type) => {
      localStorage.setItem("app_theme_type", JSON.stringify(type));
      state.themeType = type;
    },
    TOGGLE_ASIDE: state => (state.asideShow = !state.asideShow),
    TOGGLE_NAV: (state, flag) =>
      (state.navShow = flag === undefined ? !state.navShow : flag)
  },
  actions: {},
  getters: {
    theme: state => themeMap[state.themeType],
    asideWidth: state => (state.asideShow ? 200 : 50),
    navHeight: state => (state.navShow ? 90 : 50)
  }
};
