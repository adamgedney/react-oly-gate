import React,{Component} from 'react';
import qp from 'query-parse';
import {default as styles} from './styles';

import {CreateAccount} from '../CreateAccount';
import {ForgotPassword} from '../ForgotPassword';
import {Login} from '../Login';
import {ResetPassword} from '../ResetPassword';
import {VerifyAccount} from '../VerifyAccount';
import {Message} from '../Message';
import headerStyles from './headerStyles';

import {
    INTERFACE_CREATE_ACCOUNT,
    INTERFACE_FORGOT_PASS,
    INTERFACE_RESET_PASS, 
    INTERFACE_LOGIN,
    INTERFACE_VERIFY,
    INTERFACE_MESSAGE, 
} from '../../utils/constants'; 

export class Gate extends Component{
	constructor(props){
        super(props);
		const query = qp.toObject(window.location.hash.substring(1));

		this.state = {
			query,//Url Hash to determine interface to reveal
			slug : query.slug,
			email :''
        }; 
        
        this.onInterfaceChange = this.onInterfaceChange.bind(this);
	}

	componentWillMount(){
		this.addStyleToHead(headerStyles);
	}

	componentDidMount(){
		/**
		 * LIsten for component events requesting to change the internal interface
		 */
		document.addEventListener('interfaceChange', this.onInterfaceChange);
	}

	/**
	 * Switch the interface and rerender component
	 * @param e
	 */
	onInterfaceChange(e){
		switch(e.slug){
			case INTERFACE_MESSAGE:
                this.setState({
                    message:e.message,
                    subMessage: e.subMessage
                });
				break;
			case INTERFACE_LOGIN: 
			case INTERFACE_VERIFY:
			case INTERFACE_RESET_PASS:

				// Used to pass the user email around from one form to the next to speed up account creation, verification, and login
				if(e.hasOwnProperty('d') && e.d.hasOwnProperty('email')){
                    this.setState({email:e.d.email || ''});
				}
				break;
		}

        this.setState({slug:e.slug});
	}

	/**
	 * Takes the contents of the headStyles fn and appends to the head in a style tag
	 */
	addStyleToHead(css){
		var head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
    }
    
	render(){
		const self = this,
			profile = this.props.component.options,
			slug = this.state.slug, 
			backgroundOverride = profile.gateScreenBackgroundImage ? {background:`url(${profile.gateScreenBackgroundImage})`} : (profile.gateScreenBackgroundColor ? {background:profile.gateScreenBackgroundColor} : {}) || {};
		let Interface = '';

		switch(slug){
			case INTERFACE_MESSAGE:
				Interface = <Message parentStyles={styles} message={this.state.message} subMessage={this.state.subMessage}></Message>;
				break;
			case INTERFACE_CREATE_ACCOUNT:
				Interface = <CreateAccount parentStyles={styles} options={this.props.component.options}></CreateAccount>;
				break;
			case INTERFACE_FORGOT_PASS:
				Interface = <ForgotPassword parentStyles={styles} options={this.props.component.options}></ForgotPassword>;
				break;
			case INTERFACE_RESET_PASS:
				Interface = <ResetPassword email={this.state.email} parentStyles={styles} options={this.props.component.options}></ResetPassword>;
				break;
			case INTERFACE_VERIFY:
				Interface = <VerifyAccount email={this.state.email} parentStyles={styles} options={this.props.component.options}></VerifyAccount>;
				break;
			case INTERFACE_LOGIN:
			default:
				Interface = <Login email={this.state.email} parentStyles={styles} options={this.props.component.options}></Login>;
				break;
		}

		return (
			<div className="olyauth" id="olyauth" style={Object.assign(styles.olyauth,backgroundOverride)}>
				<div className="olyauth__inner" style={styles.olyauth__inner}>
					<div style={styles.olyauth__inner.header}>
						<img style={styles.olyauth__inner.logo} src={profile.logo} alt={profile.title}/>
					</div>

					<div style={styles.olyauth__inner.interfaces}>
						{Interface}
					</div>
				</div>
			</div>
		)
	}
} 