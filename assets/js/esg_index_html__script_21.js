(function (q, l, r, N, I, t, G, S, T, O, U, V, W, X) {
  function P() {
    q.seraph_accel_js_lzl_initScrCustom &&
      q.seraph_accel_js_lzl_initScrCustom();
    if (w) {
      var a =
        q[
          (function (f) {
            var c = "";
            f.forEach(function (b) {
              c += String.fromCharCode(b + 3);
            });
            return c;
          })([103, 78, 114, 98, 111, 118])
        ];
      !w.dkhjihyvjed && a ? (w = void 0) : ((w.dkhjihyvjed = !0), w.jydy(a));
    }
  }
  function F(a, f = 0, c) {
    function b() {
      if (!a) return [];
      for (
        var d = [].slice.call(l.querySelectorAll('[type="' + a + '"]')),
          e = 0,
          m = d.length;
        e < m;
        e++
      ) {
        var h = d[e];
        if (
          (h.hasAttribute("defer") &&
            !1 !== h.defer &&
            (!h.hasAttribute("async") || !1 === h.async) &&
            h.hasAttribute("src")) ||
          "module" == h.getAttribute("data-type")
        )
          (d.splice(e, 1), d.push(h), e--, m--);
      }
      return d;
    }
    function k(d = !1) {
      P();
      X || d ? x() : r(x, f);
    }
    function n(d) {
      var e = d.ownerDocument,
        m = (e.seraph_accel_njsujyhmaeex = {
          wdybryijnud: d.nextSibling,
          wyheujyhm:
            e[
              (function (h) {
                var g = "";
                h.forEach(function (u) {
                  g += String.fromCharCode(u + 3);
                });
                return g;
              })([116, 111, 102, 113, 98])
            ],
          wyhedbujyhm:
            e[
              (function (h) {
                var g = "";
                h.forEach(function (u) {
                  g += String.fromCharCode(u + 3);
                });
                return g;
              })([116, 111, 102, 113, 98, 105, 107])
            ],
          ujyhm: function (h) {
            var g = e.createElement("span");
            d.parentNode.insertBefore(
              g,
              this.seraph_accel_njsujyhmaeex.wdybryijnud,
            );
            g.outerHTML = h;
          },
          dbujyhm: function (h) {
            this.write(h + "\n");
          },
        });
      e[
        (function (h) {
          var g = "";
          h.forEach(function (u) {
            g += String.fromCharCode(u + 3);
          });
          return g;
        })([116, 111, 102, 113, 98])
      ] = m.ujyhm;
      e[
        (function (h) {
          var g = "";
          h.forEach(function (u) {
            g += String.fromCharCode(u + 3);
          });
          return g;
        })([116, 111, 102, 113, 98, 105, 107])
      ] = m.dbujyhm;
    }
    function p(d) {
      d = d.ownerDocument;
      var e = d.seraph_accel_njsujyhmaeex;
      e &&
        ((d[
          (function (m) {
            var h = "";
            m.forEach(function (g) {
              h += String.fromCharCode(g + 3);
            });
            return h;
          })([116, 111, 102, 113, 98])
        ] = e.wyheujyhm),
        (d[
          (function (m) {
            var h = "";
            m.forEach(function (g) {
              h += String.fromCharCode(g + 3);
            });
            return h;
          })([116, 111, 102, 113, 98, 105, 107])
        ] = e.wyhedbujyhm),
        delete d.seraph_accel_njsujyhmaeex);
    }
    function x() {
      var d = v.shift();
      if (d)
        if (d.parentNode) {
          var e = l.seraph_accel_usbpb(d.tagName),
            m = d.attributes;
          if (m)
            for (var h = 0; h < m.length; h++) {
              var g = m[h],
                u = g.value;
              g = g.name;
              "type" != g &&
                ("data-type" == g && (g = "type"),
                "data-src" == g && (g = "src"),
                "data-onload" == g && (g = "onload"),
                "data-onerror" == g && (g = "onerror"),
                e.setAttribute(g, u));
            }
          e.textContent = d.textContent;
          m = !e.hasAttribute("async");
          h = e.hasAttribute("src");
          g = e.hasAttribute("nomodule");
          m && n(e);
          if ((h = m && h && !g))
            e.onload = e.onerror = function () {
              e._seraph_accel_loaded ||
                ((e._seraph_accel_loaded = !0), p(e), k());
            };
          d.parentNode.replaceChild(e, d);
          h || (m && p(e), k(!m));
        } else ((v = b()), x());
      else c && c();
    }
    var v = b();
    if (W) {
      var A = l.createDocumentFragment();
      v.forEach(function (d) {
        var e = d ? d.getAttribute("src") : void 0;
        if (e) {
          var m = l.createElement("link");
          m.setAttribute(
            "rel",
            "module" == d.getAttribute("data-type")
              ? "modulepreload"
              : "preload",
          );
          m.setAttribute("as", "IFRAME" == d.tagName ? "document" : "script");
          m.setAttribute("href", e);
          d.hasAttribute("integrity") &&
            m.setAttribute("integrity", d.getAttribute("integrity"));
          d.hasAttribute("crossorigin") &&
            m.setAttribute("crossorigin", d.getAttribute("crossorigin"));
          A.appendChild(m);
        }
      });
      l.head.appendChild(A);
    }
    k();
  }
  function y(a, f, c) {
    var b = l.createEvent("Events");
    b.initEvent(f, !0, !1);
    if (c) for (var k in c) b[k] = c[k];
    a.dispatchEvent(b);
  }
  function H(a, f) {
    function c(k) {
      try {
        Object.defineProperty(l, "readyState", {
          configurable: !0,
          enumerable: !0,
          value: k,
        });
      } catch (n) {}
    }
    function b(k) {
      t
        ? (w && (w.jydyut(), (w = void 0)),
          c("interactive"),
          y(l, "readystatechange"),
          y(l, "DOMContentLoaded"),
          delete l.readyState,
          y(l, "readystatechange"),
          r(function () {
            y(q, "load");
            y(q, "scroll");
            f && f();
            k();
          }))
        : k();
    }
    if (z) {
      if (3 == z) {
        function k() {
          t && c("loading");
          !0 === a
            ? F(t ? N : 0, 10, function () {
                b(function () {
                  2 == z
                    ? ((z = 1),
                      1e6 != G &&
                        r(function () {
                          H(!0);
                        }, G))
                    : F(I);
                });
              })
            : F(t ? N : 0, 0, function () {
                b(function () {
                  F(I);
                });
              });
        }
        function n() {
          for (
            var p, x;
            void 0 !== (p = Object.keys(seraph_accel_izrbpb.a)[0]);
          ) {
            for (; (x = seraph_accel_izrbpb.a[p].shift()); ) if (x(n)) return;
            delete seraph_accel_izrbpb.a[p];
          }
          "scrl" === a && O ? r(k, O) : k();
        }
        n();
      } else 1 == z && F(I);
      !0 === a ? z-- : (z = 0);
    }
  }
  function J(a) {
    return (
      "click" == a ||
      "mouseover" == a ||
      "touchstart" == a ||
      "touchmove" == a ||
      "touchend" == a ||
      "pointerdown" == a ||
      "pointermove" == a ||
      "pointerup" == a
    );
  }
  function K(a) {
    var f = !1;
    "touchstart" == a.type
      ? (B = !1)
      : "pointerdown" == a.type
        ? (C = !1)
        : !1 === B && "touchmove" == a.type
          ? (B = !0)
          : !1 === C && "pointermove" == a.type && (C = !0);
    if (J(a.type)) {
      if (void 0 !== D) {
        f = !0;
        var c = !1,
          b = !1,
          k = !0;
        "click" == a.type
          ? (c = b = !0)
          : "mouseover" == a.type
            ? ((c = !0), (k = !1))
            : "touchmove" == a.type
              ? ((f = !1), B && (b = !0))
              : "touchend" == a.type
                ? B && (b = !0)
                : "pointerdown" == a.type
                  ? (b = !0)
                  : "pointermove" == a.type
                    ? ((f = !1), C && (b = !0))
                    : "pointerup" == a.type && C && (b = !0);
        if (k) {
          function p(v, A, d) {
            return (
              (v = n.getAttribute(d)) &&
              ("*" === v || -1 != v.indexOf("," + A + ","))
            );
          }
          function x(v, A, d) {
            if (!d) return !1;
            for (var e in d)
              if (
                ("*" === e || -1 != e.indexOf("," + A + ",")) &&
                v.matches(d[e])
              )
                return !0;
            return !1;
          }
          for (var n = a.target; n; n = n.parentNode)
            if (n.getAttribute) {
              if (p(n, a.type, "data-lzl-clk-no") || x(n, a.type, V)) f = !1;
              if (p(n, a.type, "data-lzl-clk-nodef")) {
                f = !0;
                b && (a.preventDefault(), a.stopImmediatePropagation());
                break;
              }
            }
        }
        if (f) {
          b = !1;
          if (c)
            for (c = 0; c < D.length; c++)
              if (D[c].type == a.type) {
                b = !0;
                break;
              }
          b || D.push(a);
        }
      }
    } else l.removeEventListener(a.type, K, { passive: !0 });
    "touchend" == a.type ? (B = void 0) : "pointerup" == a.type && (C = void 0);
    void 0 === E
      ? (E = !0)
      : !1 === E &&
        "touchstart" != a.type &&
        "pointerdown" != a.type &&
        H(
          f ||
            ("scroll" != a.type &&
              "wheel" != a.type &&
              "touchmove" != a.type &&
              "pointermove" != a.type)
            ? !1
            : "scrl",
          L,
        );
  }
  function L() {
    r(function () {
      Q.forEach(function (a) {
        l.removeEventListener(
          a,
          K,
          J(a) ? { capture: !0, passive: !1 } : { passive: !0 },
        );
      });
      l.body.classList.remove("seraph-accel-js-lzl-ing");
      y(l, "seraph_accel_jsFinish");
      D.forEach(function (a) {
        function f(k) {
          return k && !k.getAttribute("data-lzl-clk-no");
        }
        function c(k, n, p) {
          (k = k.elementFromPoint(n, p)) &&
            k.shadowRoot &&
            (k = k.shadowRoot.elementFromPoint(n, p));
          return k;
        }
        if ("click" == a.type || "mouseover" == a.type) {
          var b = c(l, a.clientX, a.clientY);
          f(b) &&
            b.dispatchEvent(
              new MouseEvent(a.type, {
                view: a.view,
                bubbles: !0,
                cancelable: !0,
                clientX: a.clientX,
                clientY: a.clientY,
              }),
            );
        } else if (
          "touchstart" == a.type ||
          "touchmove" == a.type ||
          "touchend" == a.type
        )
          ((b = (b =
            a.changedTouches && a.changedTouches.length
              ? a.changedTouches[0]
              : void 0)
            ? c(l, b.clientX, b.clientY)
            : void 0),
            f(b) && b.dispatchEvent(a));
        else if (
          "pointerdown" == a.type ||
          "pointermove" == a.type ||
          "pointerup" == a.type
        )
          ((b = c(l, a.clientX, a.clientY)), f(b) && b.dispatchEvent(a));
      });
      D = void 0;
    }, U);
    r(function () {
      l.body.classList.remove("seraph-accel-js-lzl-ing-ani");
    }, T);
  }
  function R(a) {
    a.currentTarget && a.currentTarget.removeEventListener(a.type, R);
    !0 === E
      ? ((E = !1), H(!1, L))
      : ((E = !1),
        1e6 != t &&
          r(function () {
            H(!0, L);
          }, t));
  }
  function M() {
    r(function () {
      y(l, "seraph_accel_calcSizes");
    }, 0);
  }
  q.location.hash.length && (t && (t = 1), G && (G = 1));
  t &&
    r(function () {
      l.body.classList.add("seraph-accel-js-lzl-ing-ani");
    });
  var Q =
      "scroll wheel mousemove pointermove keydown click touchstart touchmove touchend pointerdown pointerup".split(
        " ",
      ),
    E,
    B,
    C,
    w = S
      ? {
          a: [],
          jydy: function (a) {
            if (a && a.fn && !a.seraph_accel_bpb) {
              this.a.push(a);
              a.seraph_accel_bpb = {
                otquhdv:
                  a.fn[
                    (function (f) {
                      var c = "";
                      f.forEach(function (b) {
                        c += String.fromCharCode(b + 3);
                      });
                      return c;
                    })([111, 98, 94, 97, 118])
                  ],
              };
              if (
                a[
                  (function (f) {
                    var c = "";
                    f.forEach(function (b) {
                      c += String.fromCharCode(b + 3);
                    });
                    return c;
                  })([101, 108, 105, 97, 79, 98, 94, 97, 118])
                ]
              )
                a[
                  (function (f) {
                    var c = "";
                    f.forEach(function (b) {
                      c += String.fromCharCode(b + 3);
                    });
                    return c;
                  })([101, 108, 105, 97, 79, 98, 94, 97, 118])
                ](!0);
              a.fn[
                (function (f) {
                  var c = "";
                  f.forEach(function (b) {
                    c += String.fromCharCode(b + 3);
                  });
                  return c;
                })([111, 98, 94, 97, 118])
              ] = function (f) {
                l.addEventListener("DOMContentLoaded", function (c) {
                  f.bind(l)(a, c);
                });
                return this;
              };
            }
          },
          jydyut: function () {
            for (var a = 0; a < this.a.length; a++) {
              var f = this.a[a];
              f.fn[
                (function (c) {
                  var b = "";
                  c.forEach(function (k) {
                    b += String.fromCharCode(k + 3);
                  });
                  return b;
                })([111, 98, 94, 97, 118])
              ] = f.seraph_accel_bpb.otquhdv;
              delete f.seraph_accel_bpb;
              if (
                f[
                  (function (c) {
                    var b = "";
                    c.forEach(function (k) {
                      b += String.fromCharCode(k + 3);
                    });
                    return b;
                  })([101, 108, 105, 97, 79, 98, 94, 97, 118])
                ]
              )
                f[
                  (function (c) {
                    var b = "";
                    c.forEach(function (k) {
                      b += String.fromCharCode(k + 3);
                    });
                    return b;
                  })([101, 108, 105, 97, 79, 98, 94, 97, 118])
                ](!1);
            }
          },
        }
      : void 0;
  q.seraph_accel_gzjydy = P;
  var z = 3,
    D = [];
  Q.forEach(function (a) {
    l.addEventListener(
      a,
      K,
      J(a) ? { capture: !0, passive: !1 } : { passive: !0 },
    );
  });
  q.addEventListener("load", R);
  q.addEventListener("resize", M, !1);
  l.addEventListener("DOMContentLoaded", M, !1);
  q.addEventListener("load", M);
})(
  window,
  document,
  setTimeout,
  "o/js-lzl",
  "o/js-lzls",
  7500,
  0,
  0,
  1000,
  500,
  250,
  [],
  1,
  0,
);
