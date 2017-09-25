const options = JSON.parse(localStorage.getItem('olyauth.client')) || {};

export default `

  .olyauth__centralizer{
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    font-weight: 300;
  }
  
	.olyauth__centralizerGravatar:hover,
	.olyauth__centralizer button:hover,
	.olyauth__profileUploadInner input[type="file"]:hover,
	.olyauth__centralizerAppsIcon:hover:after{
		cursor: pointer !important;
		opacity: 0.7;
	}

	.olyauth__mainMenuInner ul li:hover{
		background: #f7f7f7;
		color: #333;
		cursor: pointer;
		border-radius: 3px;
	}

	.olyauth__centralizerHeaderGravatar:hover:after{
		content:"\\f030";
		font-family:FontAwesome;
		color: #fff;
		background: rgba(0,0,0,0.6);
		top: 9px;
		right: 9px;
		width: 51px;
		height: 51px;
		border-radius: 50%;
		text-align: center;
		padding-top: 19px;
		box-sizing: border-box;
		position: absolute;
		cursor:pointer;
	}

	.olyauth__profileUploadInner:after{
		content:"\\f0ee";
		font-family:FontAwesome;
		color: #9c9c9c;
		position: absolute;
		width: 100%;
		height: 100%;
		font-size: 36px;
		border-radius: 0;
		background: none;
		padding-top: 50%;
		box-sizing: border-box;
		pointer-events: none;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		text-align: center;
	}

	.olyauth__centralizerAppsIcon:after{
		content:"\\f00a";
		font-family:FontAwesome;
		color: ${options.centralizerAppsIconColor || '#efefef'}; 
		position: absolute;
		width: 45px;
		height: 45px;
		font-size: 18px;
	}

	.top_arr:after, .top_arr:before {
		bottom: 100%;
		right: 4px;
		border: solid transparent;
		content: " ";
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
	}

	.top_arr:before {
		border-color: rgba(222, 221, 223, 0);
		border-bottom-color: #fff;
		border-width: 13px;
		margin-left: -13px;
	}

	.top_arr:after{
		border-color: rgba(222, 221, 223, 0);
		border-bottom-color: #fff;
		border-width: 13px;
		margin-left: -13px;
	}

	.olyauth__centralizerAppContainer.top_arr:before,
	.olyauth__centralizerAppContainer.top_arr:after{
		right: 43px;
	}


`

