const color = {
	overlay : '#333333',
	white: '#fff',
	offWhite : "#efeff1",
	border : '#dedddf',
	text:'#333',
	textSecondary:'#888',
	button: '#5087c0',
	danger : '#c72f2c',
	link : '#5087c0'
};


export default{
	color,
	olyauth__mainMenu : {

	},

	olyauth__mainMenuInner : {

	},
	ul:{
		overflow: 'hidden',
		padding: '0 18px 69px',
		boxSizing: 'border-box',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	li:{
		//border:`1px solid ${color.border}`,
		padding: '9px',
		width: '30%',
		height: '78px',
		float: 'left',
		textAlign: 'center',
		lineHeight: '1',
		margin: '3px',
		boxSizing: 'border-box',
		fontSize: '12px'
	},
	icon:{
		maxWidth: '45px'
	},
	h4:{
		paddingLeft:'18px',
		fontSize: '16px'
	},
	logo:{
		width: '150px',
		margin: '0 auto',
		display: 'block'
	},
	link:{
		textDecoration: 'none',
		color: color.text
	}
}