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
	link: '#5087c0',
	icon: '#9c9c9c',
	header: '#fff',
	footer: '#f5f5f5'
},
    button = {
	minWidth: '27px',
	border: '1px solid ' + color.border,
	background: color.white,
	borderRadius: '3px',
	height: '27px',
	display: 'block',
	position: 'relative'
};

exports.default = {
	color: color,
	olyauth__centralizer: {
		position: "absolute",
		zIndex: "9999",
		width: '350px',
		height: 'auto',
		right: '0',
		top: '0'
	},

	olyauth__centralizerInner: {},
	apps: {
		width: '27px',
		height: '27px',
		position: 'absolute',
		right: '51px',
		top: '6px',
		overflow: 'hidden',
		zIndex: '9999',
		paddingTop: '7px'
	},
	entry: {
		width: '27px',
		height: '27px',
		borderRadius: '50%',
		position: 'absolute',
		right: '18px',
		top: '6px',
		overflow: 'hidden',
		zIndex: '9999',
		color: '#fff',
		fontSize: '6px',
		lineHeight: '27px'
	},
	gravatar: {
		textAlign: 'center',
		maxWidth: 'auto',
		height: "100%"
	},
	header: {
		background: color.header,
		padding: '0 9px 9px',
		overflow: 'hidden',
		borderBottom: '1px solid ' + color.border
	},
	headerText: {
		display: 'inline-block'
	},
	headerName: {
		fontSize: '16px',
		marginTop: '3px'
	},
	headerGravatar: {
		display: 'inline-block',
		textAlign: 'right',
		width: '51px',
		height: '51px',
		borderRadius: '50%',
		overflow: 'hidden',
		float: 'right',
		marginTop: '9px'
	},
	headerGravatarImg: {
		textAlign: 'center',
		maxWidth: 'auto',
		height: "100%"
	},
	container: {
		position: 'relative',
		top: '54px',
		right: '12px',
		zIndex: '0',
		background: color.header,
		border: '1px solid ' + color.border,
		borderRadius: '3px',
		boxShadow: '0 0 1em rgba(0,0,0,0.1)'
	},
	appContainer: {
		position: 'relative',
		top: '54px',
		right: '12px',
		zIndex: '0',
		background: color.header,
		border: '1px solid ' + color.border,
		borderRadius: '3px',
		boxShadow: '0 0 1em rgba(0,0,0,0.1)'
	},
	footer: {
		background: color.footer,
		padding: '9px',
		overflow: 'hidden',
		height: '45px'
	},
	button: button,
	buttonIcon: Object.assign({}, button, {
		color: color.icon,
		float: 'left'
	}),
	buttonSignout: Object.assign({}, button, {
		float: 'right'
	}),
	profileAnchor: {
		width: '100px',
		height: '100%',
		position: 'absolute',
		left: '0',
		right: '0',
		top: '0',
		bottom: '0'
	},
	branding: {
		display: 'block',
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
		bottom: '13px'
	},
	logo: {
		width: '90px',
		margin: '0 auto',
		display: 'block',
		filter: 'grayscale(100%)',
		opacity: '0.6'
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
	h4: {
		fontSize: '16px'
	}
};