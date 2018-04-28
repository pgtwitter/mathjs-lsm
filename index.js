function lsm(g, y) {
	const qr = math.qr(g);
	const Qt = math.transpose(qr.Q);
	const Rt = math.transpose(qr.R);
	const RtR = math.multiply(Rt, qr.R);
	const RtR_i = math.inv(RtR);
	const RtR_iRt = math.multiply(RtR_i, Rt);
	const RtR_iRtQt = math.multiply(RtR_iRt, Qt);
	const a = math.multiply(RtR_iRtQt, y);
	return math.flatten(a);
}

function residual(coeff, x, y, fn) {
	let sum = 0;
	for (let i = 0; i < x.length; i++) {
		const e = fn(coeff, x[i][0]) - y[i][0];
		sum += Math.sqrt(e * e);
	}
	return sum;
}

//---------------------------------------------------------

function fn(a, x) {
	return a[0] + a[1] * x + a[2] * x * x + a[3] * x * x * x;
}

function d(n, ans, f) {
	const xs = [];
	const g = [];
	const ys = [];
	for (let i = 0; i < n; i++) {
		const x = (Math.random() - 0.5) * 2.0;
		xs.push([x]);
		g.push([1, x, x * x, x * x * x]);
		ys.push([f(ans, x) + 0.1 * (Math.random() - 0.5)]);
	}
	return [g, ys, xs];
}

//---------------------------------------------------------

const ans = [-0.10, 0.40, -0.90, 1.6];
const [g, ys, xs] = d(100, ans, fn)
console.log(g, ys);

const prediction = lsm(g, ys);
console.log('prediction', prediction);

const r = residual(prediction, xs, ys, fn);
console.log('residual', r);
