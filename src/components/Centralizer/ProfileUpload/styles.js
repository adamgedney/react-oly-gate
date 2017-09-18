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

const uploadButton = {
  width: '114%',
  left: '-7%',
  right: '0px',
  border: 'none',
  background: 'grey',
  color: '#fff',
  position: 'absolute',
  height: '119%',
  display: 'none',
	top: '-3px',
	zIndex: '9999'
};


export default{
	color,
	olyauth__profileUpload:{
		position: 'relative'
	},

	olyauth__profileUploadInner:{
		position: 'relative'
	},

	uploadForm:{
		height: '300px',
		width: '90%',
		margin: '18px 5% 51px',
		border: '3px dashed #9c9c9c',
		borderRadius: '9px',
		position: 'relative'
	},
	fileInput:{
		opacity: '0',
		position: 'absolute',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		width: '100%'
	},
	filename:{
		textAlign: 'center',
		position: 'relative',
		top: '-36px'
	},
	uploadButton,
	uploadButtonActive:Object.assign({},uploadButton,{
		background: color.button,
		display: 'block'
	}),
	h4:{
		textAlign:'center'
	}
}