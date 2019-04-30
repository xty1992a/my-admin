(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-798aa954"],
  {
    "0f54": function(t, a, e) {},
    2228: function(t, a, e) {},
    "5ada": function(t, a, e) {},
    "5b52": function(t, a, e) {
      "use strict";
      e.r(a);
      var n = function() {
          var t = this,
            a = t.$createElement,
            e = t._self._c || a;
          return e(
            "div",
            { staticClass: "micro-page" },
            t._l(t.componentList, function(t) {
              return e(t.name, {
                key: t.key,
                tag: "component",
                attrs: { data: t.data }
              });
            }),
            1
          );
        },
        i = [],
        r = function() {
          var t = this,
            a = t.$createElement,
            e = t._self._c || a;
          return e(
            "van-swipe",
            {
              staticClass: "carousel",
              attrs: { autoplay: 3e3, "indicator-color": "white" }
            },
            t._l(t.data, function(t) {
              return e("van-swipe-item", { key: t.path }, [
                e("img", { attrs: { src: t.path, alt: "" } })
              ]);
            }),
            1
          );
        },
        c = [],
        o = {
          name: "carousel",
          components: {},
          props: { data: { type: Array } },
          data: function() {
            return {};
          },
          created: function() {},
          methods: {},
          computed: {}
        },
        s = o,
        u = (e("8488"), e("2877")),
        l = Object(u["a"])(s, r, c, !1, null, null, null),
        d = l.exports,
        p = function() {
          var t = this,
            a = t.$createElement,
            e = t._self._c || a;
          return e(
            "ul",
            { staticClass: "magic-code", style: t.wrapStyle },
            t._l(t.data.map, function(a) {
              return e(
                "li",
                { key: a.key, staticClass: "code-item", style: t.getStyle(a) },
                [
                  a.path
                    ? e("img", { attrs: { src: a.path, alt: "" } })
                    : t._e()
                ]
              );
            }),
            0
          );
        },
        f = [],
        h = {
          name: "MagicCode",
          components: {},
          props: { data: { type: Object } },
          data: function() {
            return { ratio: 0.5 };
          },
          created: function() {},
          methods: {
            getStyle: function(t) {
              var a = t.x,
                e = t.y,
                n = t.w,
                i = t.h,
                r = this.wrapRect,
                c = r.w,
                o = r.h;
              return {
                padding: (this.data.gap / 2) * this.ratio + "px",
                top: e * o + "px",
                left: a * c + "px",
                width: n * c + "px",
                height: i * o + "px"
              };
            }
          },
          computed: {
            wrapStyle: function() {
              var t = this.wrapRect,
                a = t.w,
                e = t.h;
              return { height: e + "px", width: a + "px" };
            },
            wrapRect: function() {
              return {
                w: this.data.size * this.data.col * this.ratio,
                h: this.data.size * this.data.row * this.ratio
              };
            }
          }
        },
        m = h,
        w = (e("6b83"), Object(u["a"])(m, p, f, !1, null, null, null)),
        y = w.exports,
        g = function() {
          var t = this,
            a = t.$createElement,
            e = t._self._c || a;
          return e("h3", { staticClass: "micro-title", style: t.style }, [
            t._v(t._s(t.data.text))
          ]);
        },
        v = [],
        b = {
          name: "MicroTitle",
          components: {},
          props: { data: Object },
          data: function() {
            return {};
          },
          created: function() {},
          methods: {},
          computed: {
            style: function() {
              var t = this.data,
                a = t.color,
                e = t.align,
                n = t.size;
              return { color: a, textAlign: e, fontSize: n + "px" };
            }
          }
        },
        x = b,
        _ = (e("bdbf"), Object(u["a"])(x, g, v, !1, null, null, null)),
        k = _.exports,
        C = {
          name: "MicroPage",
          components: { Carousel: d, MagicCode: y, MicroTitle: k },
          data: function() {
            return { componentList: [] };
          },
          created: function() {
            var t = this;
            window.parent !== window &&
              window.addEventListener(
                "message",
                function(a) {
                  "data-change" === a.data.type &&
                    (t.componentList = a.data.data);
                },
                !1
              );
          },
          methods: {},
          computed: {}
        },
        j = C,
        O = (e("adab"), Object(u["a"])(j, n, i, !1, null, null, null));
      a["default"] = O.exports;
    },
    "6b83": function(t, a, e) {
      "use strict";
      var n = e("8f90"),
        i = e.n(n);
      i.a;
    },
    8488: function(t, a, e) {
      "use strict";
      var n = e("5ada"),
        i = e.n(n);
      i.a;
    },
    "8f90": function(t, a, e) {},
    adab: function(t, a, e) {
      "use strict";
      var n = e("0f54"),
        i = e.n(n);
      i.a;
    },
    bdbf: function(t, a, e) {
      "use strict";
      var n = e("2228"),
        i = e.n(n);
      i.a;
    }
  }
]);
//# sourceMappingURL=chunk-798aa954.bc5df518.js.map
