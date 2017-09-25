import utils,{l} from '../../utils';

export default `

    .olyauth *{
        outline: none; 
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
        font-weight: 300;
    }

	.olyauth input[type="submit"]:hover{
		cursor: pointer;
		opacity: 0.7;
	}

	.olyauth input[type="submit"]{
		background: ${utils.OlyAuthMeta.brandingColor} !important
	}

    .olyauth__submit:hover{
        cursor: pointer;
        opacity: 0.7;
    }

	.bold{
		font-weight: 700;
	}
    .olyauth__loader{
        position: absolute;
        bottom: 0;
    }
    .olyauth__loader--hidden{
        display: none;
    }

    .loader,
    .loader:before,
    .loader:after {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation: load7 1.8s infinite ease-in-out;
        animation: load7 1.8s infinite ease-in-out;
    }
    .loader {
        color: #ffffff;
        font-size: 10px;
        margin: 6px 36px;
        position: absolute;
        bottom: 32px;
        text-indent: -9999em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
        content: '';
        position: absolute;
        top: 0;
    }
    .loader:before {
    left: -2.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
    }
    .loader:after {
    left: 2.5em;
    }
    @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
        box-shadow: 0 2.5em 0 0;
    }
    }
    @keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }
    40% { 
        box-shadow: 0 2.5em 0 0;
    }
    }
`