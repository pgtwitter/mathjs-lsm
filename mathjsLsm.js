(function() {
	window.mathjsLsm = {
		lsm: function(g, y) {
			const qr = math.qr(g);
			const Qt = math.transpose(qr.Q);
			const Rt = math.transpose(qr.R);
			const RtR = math.multiply(Rt, qr.R);
			const RtR_i = math.inv(RtR);
			const RtR_iRt = math.multiply(RtR_i, Rt);
			const RtR_iRtQt = math.multiply(RtR_iRt, Qt);
			const a = math.multiply(RtR_iRtQt, y);
			return math.flatten(a);
		},
		lsmL2: function(g, y, lamda = 0.0) {
			const qr = math.qr(g);
			const Qt = math.transpose(qr.Q);
			const Rt = math.transpose(qr.R);
			const RtR = math.multiply(Rt, qr.R);
			const RtR_size = math.size(RtR)
			const I = math.eye(RtR_size[0])._data;
			const LamdaI = math.multiply(lamda, I);
			const RtRaddL = math.add(RtR, LamdaI);
			const RtRaddL_i = math.inv(RtRaddL);
			const RtRaddL_iRt = math.multiply(RtRaddL_i, Rt);
			const RtRaddL_iRtQt = math.multiply(RtRaddL_iRt, Qt);
			const a = math.multiply(RtRaddL_iRtQt, y);
			return math.flatten(a);
		},
		residual: function(coeff, g, y) {
			const pred = math.reshape(math.multiply(g, coeff), [math.size(g)[0], 1]);
			const err = math.add(pred, math.multiply(-1.0, y));
			const sqrt_err = math.flatten(math.multiply(math.transpose(err), err))[0];
			return sqrt_err;
		}
	}
})();
