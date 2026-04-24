function seraph_accel_cmn_calcSizes(a) {
			var b = a.ownerDocument.body;
			b.style.setProperty(
				"--seraph-accel-client-width",
				"" + a.clientWidth + "px",
			);
			b.style.setProperty(
				"--seraph-accel-client-width-px",
				"" + a.clientWidth,
			);
			b.style.setProperty(
				"--seraph-accel-client-height",
				"" + a.clientHeight + "px",
			);
			b.style.setProperty(
				"--seraph-accel-dvh",
				"" + window.innerHeight + "px",
			);
		}
		(function (a) {
			a.addEventListener(
				"seraph_accel_calcSizes",
				function (b) {
					seraph_accel_cmn_calcSizes(a.documentElement);
				},
				{ capture: !0, passive: !0 },
			);
			seraph_accel_cmn_calcSizes(a.documentElement);
		})(document);
