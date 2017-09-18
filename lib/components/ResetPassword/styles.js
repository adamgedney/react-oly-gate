"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	olyauth: {
		width: "100%",
		height: "100%",
		position: "fixed",
		background: "rgba(0,0,0,0.9)",
		zIndex: "9999"
	},

	olyauth__inner: {
		width: "320px",
		height: "50%",
		position: "absolute",
		zIndex: "9999",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		background: "#efeff1",
		borderRadius: "3px",
		header: {
			background: "#fff",
			width: "100%",
			borderTopLeftRadius: "3px",
			borderTopRightRadius: "3px"
		},
		logo: {
			width: "80%",
			margin: "9px 10%",
			display: "inline-block"
		},
		interfaces: {}
	}
};