import React,{Component} from 'react';
import utils,{l} from '../../utils';
import {default as styles} from './styles';

import {
    INTERFACE_LOGIN, 
    INTERFACE_FORGOT_PASS
} from '../../utils/constants'; 

export class ResetPassword extends Component {
	constructor(props){
        super(props); 
		this.state = {
            email : this.props.email,
            errorMessage : ''
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
	}

	componentWillReceiveProps(){
        this.setState({
            email:this.props.email
        });
	}

	onSubmit(e){
		e.preventDefault();
        const self = this,
            password1 = document.querySelectorAll("[name='olyauth.password']")[0],
            password2 = document.querySelectorAll("[name='olyauth.password2']")[0],
            email = document.querySelectorAll("[name='olyauth.email']")[0].value;

		// Kick the user a message if passwords don't match
		if(utils.form.diffPasswords(password1.value,password2.value)){

			// Attempt to create the account. Display error meessages if true
			window.Oly.Auth.setNewPassword(utils.form.parse(e.target))
				.then((res={})=>{ 
					if(res.hasOwnProperty('Error') && res.Error){
						self.setState({
                            errorMessage : utils.getMessageFromOptions('onSetNewPasswordFail') || res.Error.message
                        });
					}else{
						utils.displaySuccessFailMessage('Success',utils.getMessageFromOptions('onSetNewPasswordSuccess') || 'Your password was changed.');

						setTimeout(function(){
							utils.sendToInterface(INTERFACE_LOGIN,{email});
						},2500);
					}
				});
		}else{
			password1.style.outline = `${this.props.parentStyles.color.danger} solid thin`;
            password2.style.outline = `${this.props.parentStyles.color.danger} solid thin`;
            
            self.setState({
                errorMessage : utils.getMessageFromOptions('onPasswordsMatchFail') || 'Passwords don\'t match.'
            });
		}
	}

	// Handle if user wants to change the email address for some strange reason
	onEmailChange(e){
		this.setState({email:e.target.value});
	}

	render(){
		const self = this,
			  parentStyles = this.props.parentStyles;

		return (
			<div className="olyauth__forgotPassword" style={styles.login}>
				<h1 style={parentStyles.h1}>{utils.getTitleFromOptions('resetPassword','h1') || `Reset Your Password`}</h1>
				<h3 style={parentStyles.h3}>{utils.getTitleFromOptions('resetPassword','h3') || `We just emailed you a verification code. Copy it and enter it here.`}</h3>
				<form style={parentStyles.form.form} onSubmit={this.onSubmit}>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.code" style={parentStyles.form.label}>{utils.getTitleFromOptions('resetPassword','labelCode') || `Verification Code`}<supr>*</supr></label>
						<input required name="olyauth.code" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('resetPassword','placeholderCode') || `Verification Code`}/>
					</div>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.email" style={parentStyles.form.label}>{utils.getTitleFromOptions('resetPassword','labelEmail') || `Email`}<supr>*</supr></label>
						<input required name="olyauth.email" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('resetPassword','placeholderEmail') || `Email Address`} onChange={this.onEmailChange} value={this.state.email}/>
					</div>

					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.password" style={parentStyles.form.label}>{utils.getTitleFromOptions('resetPassword','labelNewPassword') || `New Password`}<supr>*</supr></label>
						<input required name="olyauth.password" style={parentStyles.form.input} type="password" placeholder={utils.getTitleFromOptions('resetPassword','placeholderNewPassword') || `New Password`}/>
					</div>
					<div style={parentStyles.form.inputGroupLast}>
						<label htmlFor="olyauth.password2" style={parentStyles.form.label}>{utils.getTitleFromOptions('resetPassword','labelNewPasswordAgain') || `New Password Again`}<supr>*</supr></label>
						<input required name="olyauth.password2" style={parentStyles.form.input} type="password" placeholder={utils.getTitleFromOptions('resetPassword','placeholderNewPasswordAgain') || `New Password Again`}/>
					</div>
					<div style={parentStyles.form.links}>
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_FORGOT_PASS}`}>{utils.getTitleFromOptions('common','newVerificationCode') || `Get a new verification code`}</a>
					</div>

					<p style={parentStyles.form.footnote}><supr>*</supr>{utils.getTitleFromOptions('common','required') || `required`}</p>
					<p style={parentStyles.form.message} className="olyauth__message">{this.state.errorMessage}</p>

					<input style={parentStyles.form.submit} className="olyauth__submit" type="submit" value={utils.getTitleFromOptions('resetPassword','submit') || `Submit`}/>
				</form>
			</div>
		)
	}
}