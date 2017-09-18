import React,{Component} from 'react';
import utils,{l} from '../../utils';
import {default as styles} from './styles';
import {
    INTERFACE_RESET_PASS,
    INTERFACE_LOGIN,
    INTERFACE_CREATE_ACCOUNT
} from '../../utils/constants'; 

export class ForgotPassword extends Component{
    constructor(props){
        super(props);
		this.state = {
			errorMessage:''
        }
        
        this.onSubmit = this.onSubmit.bind(this);
    }
    
	onSubmit(e){
		e.preventDefault();
        const self = this,
            email = document.querySelectorAll("[name='olyauth.email']")[0].value;

		// Attempt to create the account. Display error meessages if true
		window.Oly.Auth.sendResetPasswordRequest(utils.form.parse(e.target))
			.then(res=>{
				if(res.hasOwnProperty('Error') && res.Error){
					self.setState({
                        errorMessage : utils.getMessageFromOptions('onResetPasswordRequestFail') || res.Error.message
                    });
				}else{
					utils.sendToInterface(INTERFACE_RESET_PASS,{email});
				}
			});
	}

	render(){
		const self = this,
			  parentStyles = this.props.parentStyles;

		return (
			<div className="olyauth__forgotPassword" style={styles.login}>
				<h1 style={parentStyles.h1}>{utils.getTitleFromOptions('forgotPassword','h1') || `Forgot Your Password?`}</h1>
				<h3 style={parentStyles.h3}>{utils.getTitleFromOptions('forgotPassword','h3') || `Enter your email address and we'll email you a code you can use to reset your password.`}</h3>
				<form style={parentStyles.form.form} onSubmit={this.onSubmit}>
					<div style={parentStyles.form.inputGroupLast}>
						<label htmlFor="olyauth.email" style={parentStyles.form.label}>{utils.getTitleFromOptions('forgotPassword','labelEmail') || `Email`}<supr>*</supr></label>
						<input name="olyauth.email" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('forgotPassword','placeholderEmail') || `Email Address`}/>
					</div>
					<div style={parentStyles.form.links}> 
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_LOGIN}`}>{utils.getTitleFromOptions('common','login') || `login`}</a>
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_CREATE_ACCOUNT}`}>{utils.getTitleFromOptions('common','createAccount') || `create account`}</a>
					</div>

					<p style={parentStyles.form.footnote}><supr>*</supr>{utils.getTitleFromOptions('common','required') || `required`}</p>
					<p style={parentStyles.form.message} className="olyauth__message">{this.state ? this.state.errorMessage : ''}</p>

					<input style={parentStyles.form.submit} className="olyauth__submit" type="submit" value={utils.getTitleFromOptions('createAccount','submit') || `Submit`}/>
				</form>
			</div>
		)
	}
}