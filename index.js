function fn(a, x) {
	return a[0] + a[1] * x + a[2] * x * x + a[3] * x * x * x;
}

function d(n, ans, f) {
	const xs = [];
	const g = [];
	const ys = [];
	for (let i = 0; i < n; i++) {
		const x = (Math.random() - 0.5) * 1.2;
		xs.push([x]);
		g.push([1, x, x * x, x * x * x]);
		ys.push([f(ans, x) + 0.1 * (Math.random() - 0.5)]);
	}
	return [g, ys, xs];
}

const ans = [-0.10, 0.40, -0.90, 1.6];
const [g, ys, xs] = d(50, ans, fn)
console.log(g, ys);

Array.forEach([0.0, 0.1, 1, 2, 3], function(lamda, i) {
	const prediction = lamda == 0 ? mathjsLsm.lsm(g, ys) : mathjsLsm.lsmL2(g, ys, lamda);
	const r = mathjsLsm.residual(prediction, g, ys);
	console.log('lamda', lamda, 'prediction', prediction, 'residual', r);
	utils.drawFormula('c', prediction, fn, 'rgb(0, ' + (255 - i * 61) + ',0)')
});

utils.drawSamples('c', xs, ys, 'rgba(125, 125, 125, 0.3)');
utils.drawFormula('c', ans, fn, 'rgba(255, 0, 0, 0.5)');
