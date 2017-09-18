import React,{Component} from 'react';
import Promise from 'bluebird';
import _ from 'underscore';
import utils,{l} from '../../utils';
import {default as styles} from './styles';
import {
    INTERFACE_LOGIN
} from '../../utils/constants'; 

export class VerifyAccount extends Component{
	constructor(props){
        super(props);
		this.state = {
			errorMessage : '',
			email : this.props.email
        }
        
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(){
		this.setState({
            email : this.props.email
        });
	}

	onSubmit(e){
		e.preventDefault();
        const self = this,
            email = document.querySelectorAll("[name='olyauth.email']")[0].value;

		// Attempt to create the account. Display error meessages if true
		window.Oly.Auth.verifyAccount(utils.form.parse(e.target))
			.then(res=>{
				if(res.hasOwnProperty('Error') && res.Error){
					self.setState({
                        errorMessage : utils.getMessageFromOptions('onVerifyAcctFail') || res.Error.message
                    });
				}else{
					utils.displaySuccessFailMessage('Success', utils.getMessageFromOptions('onVerifyAcctSuccess') || 'Your account was verified. Please login. You will be redirected in a second.');

					setTimeout(function(){
						utils.sendToInterface(INTERFACE_LOGIN,{email});
					},2000);
				}

			});
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
				<h1 style={parentStyles.h1}>{utils.getTitleFromOptions('verifyAccount','h1') || `Verify Your Account`}</h1>
				<h3 style={parentStyles.h3}>{utils.getTitleFromOptions('verifyAccount','h3') || `We just emailed you a verification code. Copy it and enter it here.`}</h3>
				<form style={parentStyles.form.form} onSubmit={this.onSubmit}>
					<div style={parentStyles.form.inputGroupLast}>
						<label htmlFor="olyauth.email" style={parentStyles.form.label}>{utils.getTitleFromOptions('verifyAccount','labelEmail') || `Email`}<supr>*</supr></label>
						<input name="olyauth.email" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('verifyAccount','placeholderEmail') || `Email Address`} onChange={this.onEmailChange} value={this.state.email}/>
					</div>
					<div style={parentStyles.form.inputGroupLast}>
						<label htmlFor="olyauth.code" style={parentStyles.form.label}>{utils.getTitleFromOptions('verifyAccount','labelCode') || `Verification Code`}<supr>*</supr></label>
						<input name="olyauth.code" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('verifyAccount','placeholderCode') || `Verification Code`}/>
					</div>

					<p style={parentStyles.form.footnote}><supr>*</supr>{utils.getTitleFromOptions('common','required') || `required`}</p>
					<p style={parentStyles.form.message} className="olyauth__message">{this.state.errorMessage}</p>

					<input style={parentStyles.form.submit} className="olyauth__submit" type="submit" value={utils.getTitleFromOptions('verifyAccount','submit') || `Submit`}/>
				</form>
			</div>
		)
	}
}