(function() {
	function scale(v) {
		return v * 100 + 100;
	}
	window.utils = {
		drawSamples: function(id, xs, ys, style) {
			const ctx = (document.getElementById(id)).getContext('2d');
			ctx.fillStyle = style;
			for (let j = 0; j < xs.length; j++) {
				ctx.beginPath();
				ctx.arc(scale(xs[j][0]), scale(ys[j][0]), 6, 0, Math.PI * 2, false);
				ctx.fill();
			}
		},
		drawFormula: function(id, coeff, func, style) {
			const ctx = (document.getElementById(id)).getContext('2d');
			ctx.strokeStyle = style;
			const dx = 4.0 / 1000;
			let x = -2.0;
			ctx.beginPath();
			ctx.moveTo(scale(x), scale(func(coeff, x)));
			for (; x < 2.0; x += dx)
				ctx.lineTo(scale(x), scale(func(coeff, x)));
			ctx.stroke();
		}
	}
})();
