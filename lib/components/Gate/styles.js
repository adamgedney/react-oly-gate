'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var color = {
	overlay: '#333333',
	white: '#fff',
	offWhite: "#efeff1",
	border: '#dedddf',
	text: '#333',
	textSecondary: '#888',
	button: '#5087c0',
	danger: '#c72f2c',
	link: '#5087c0'
};

exports.default = {
	color: color,
	olyauth: {
		width: "100%",
		height: "100%",
		position: "fixed",
		background: color.overlay,
		zIndex: "9999",
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	},

	olyauth__inner: {
		width: "320px",
		position: "absolute",
		zIndex: "9999",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		background: color.offWhite,
		borderRadius: "3px",
		boxShadow: '0 0 3px rgba(0,0,0,0.4)',
		header: {
			position: 'relative',
			zIndex: '9999',
			background: color.white,
			width: "100%",
			borderTopLeftRadius: "3px",
			borderTopRightRadius: "3px"
		},
		logo: {
			width: "50%",
			margin: "24px 25%",
			display: "inline-block"
		},
		interfaces: {}
	},
	form: {
		form: {
			padding: '18px 18px 51px'
		},
		inputGroup: {
			marginBottom: '9px'
		},
		inputGroupLast: {
			marginBottom: '0'
		},
		label: {
			display: 'block',
			color: color.text,
			fontSize: '12px'
		},
		input: {
			background: color.white,
			appearance: 'none',
			borderRadius: '3px',
			height: '33px',
			width: '100%',
			borderColor: color.border,
			borderWidth: '0px',
			borderStyle: 'solid',
			color: color.text,
			paddingLeft: '3px'
		},
		submit: {
			width: '100%',
			height: '42px',
			border: 'none',
			background: color.button,
			color: color.white,
			borderBottomLeftRadius: '3px',
			borderBottomRightRadius: '3px',
			//marginTop: '18px',
			position: 'absolute',
			bottom: '-1px',
			left: '0',
			right: '0'
		},
		links: {
			margin: '0'
		},
		link: {
			fontSize: '11px',
			color: color.link,
			display: 'inline-block',
			marginRight: '9px'
		},
		footnote: {
			fontSize: '9px',
			margin: '0',
			textAlign: 'right'
		},
		message: {
			fontSize: '11px',
			margin: '0',
			color: color.danger
		}
	},
	h1: {
		fontSize: '18px',
		margin: '3px 0 0 0',
		lineHeight: '2',
		borderBottom: '1px solid ' + color.border,
		color: color.text,
		textAlign: 'center'
	},
	h3: {
		fontSize: '12px',
		margin: '0',
		padding: '6px 18px 0 18px',
		lineHeight: '1.2',
		color: color.textSecondary,
		textAlign: 'center'
	},
	p: {
		margin: '0',
		color: color.text
	}
};