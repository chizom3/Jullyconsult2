(function (l, q) {
        function r(b, g, e = !1) {
          const { top: c, left: a, bottom: d, right: f } = g,
            { innerHeight: h, innerWidth: k } = q;
          return (a != f && c != d) ||
            "none" != getComputedStyle(b).getPropertyValue("display")
            ? e
              ? 0 <= c && 0 <= a && d <= h && f <= k
              : !(c > h || 0 > d) && !(a > k || 0 > f)
            : !1;
        }
        function p(b) {
          function g(d, f) {
            function h() {
              for (; k < f.length; ) {
                var m = f[k++],
                  n;
                r(m.e, m.rc) && (n = d(m.e, t));
                if (n) {
                  setTimeout(h, n);
                  break;
                }
              }
            }
            var k = 0;
            h();
          }
          b = {
            "[data-aos]:not(.aos-animate)": function (a) {
              a.classList.add("aos-animate");
            },
          };
          var e = [],
            c;
          for (c in b) {
            var a = { cbElem: b[c], items: [] };
            l.querySelectorAll(c).forEach(function (d) {
              a.items.push({ e: d, rc: d.getBoundingClientRect() });
            });
            e.push(a);
          }
          e.forEach(function (d) {
            g(d.cbElem, d.items);
          });
        }
        var t = {
          GetDurationTime: function (b, g) {
            "string" !== typeof b && (b = "");
            for (var e = b.split(","), c = (b = 0); c < e.length; c++) {
              var a = e[c];
              a =
                -1 !== a.lastIndexOf("ms")
                  ? parseFloat(a)
                  : -1 !== a.lastIndexOf("s")
                    ? 1e3 * parseFloat(a)
                    : parseFloat(a);
              "max" == g && b < a && (b = a);
            }
            return b;
          },
        };
        l.addEventListener("seraph_accel_calcSizes", p, {
          capture: !0,
          passive: !0,
        });
        seraph_accel_izrbpb.add(function () {
          l.removeEventListener("seraph_accel_calcSizes", p, {
            capture: !0,
            passive: !0,
          });
        });
      })(document, window);
