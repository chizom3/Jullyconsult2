(function (p, l) {
			function e(b, m, d) {
				b = p.querySelectorAll(b);
				var n = b.length;
				n
					? b.forEach(function (c) {
						function g() {
							d && (--n || d());
						}
						var a = c.cloneNode();
						a.rel = "stylesheet";
						if (c.hasAttribute("href")) {
							if (d || m)
								(a.onload && (a.onloadPrev = a.onload),
									m &&
									((a.mediaPrev = a.media ? a.media : "all"),
										(a.media = "print")),
									(a.onload = function () {
										this.mediaPrev &&
											((this.media = this.mediaPrev),
												(this.mediaPrev = void 0));
										this.onload = this.onloadPrev;
										this.onloadPrev = void 0;
										if (this.onload)
											try {
												this.onload();
											} catch (q) { }
										g();
									}),
									(a.onerror = function () {
										this.onerror = void 0;
										g();
									}));
							c.parentNode.replaceChild(a, c);
						} else (c.parentNode.replaceChild(a, c), g());
					})
					: d && d();
			}
			var h = "";
			if (h.length)
				if (0) {
					var f = function () { };
					seraph_accel_izrbpb.add(function (b) {
						if (f) return ((f = b), !0);
					}, 4);
					l(function () {
						e(h, 1, function () {
							f();
							f = void 0;
						});
					});
				} else
					l(function () {
						e(h, 1);
					});
			var k = 'link[rel="stylesheet/lzl-nc"]';
			k.length &&
				seraph_accel_izrbpb.add(function (b) {
					if (0) return (e(k, !1, b), !0);
					e(k, !1);
				}, 4);
		})(document, setTimeout);
