import React,{Component} from 'react';
import utils,{l} from '../../utils';
import {default as styles} from './styles';
import {
    INTERFACE_VERIFY,
    INTERFACE_LOGIN,
    INTERFACE_FORGOT_PASS
} from '../../utils/constants';

export class CreateAccount extends Component{
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
            password1 = document.querySelectorAll("[name='olyauth.password']")[0],
			password2 = document.querySelectorAll("[name='olyauth.password2']")[0],
			email = document.querySelectorAll("[name='olyauth.email']")[0].value;

		// Kick the user a message if passwords don't match
		if(utils.form.diffPasswords(password1.value,password2.value)){

			// Attempt to create the account. Display error meessages if true
			window.Oly.Auth.createAccount(utils.form.parse(e.target))
				.then(res=>{
					if(res.hasOwnProperty('Error') && res.Error){
						self.setState({
                            errorMessage : utils.getMessageFromOptions('onCreateAccountFail') || res.Error.message
                        });
					}else{
						utils.sendToInterface(INTERFACE_VERIFY,{email});
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

	render(){
		const self = this,
			  parentStyles = this.props.parentStyles;

		return (
			<div className="olyauth__createAccount" style={styles.login}>
				<h1 style={parentStyles.h1}>{utils.getTitleFromOptions('createAccount','h1') || `Create An Account`}</h1>
				<form style={parentStyles.form.form} onSubmit={this.onSubmit}>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.email" style={parentStyles.form.label}>{utils.getTitleFromOptions('createAccount','labelEmail') || `Email`}<supr>*</supr></label>
						<input required name="olyauth.email" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('createAccount','placeholderEmail') || `Email Address`}/>
					</div>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.given_name" style={parentStyles.form.label}>{utils.getTitleFromOptions('createAccount','labelFirstName') || `First Name`}</label>
						<input name="olyauth.given_name" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('createAccount','placeholderFirstName') || `First Name`}/>
					</div>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.family_name" style={parentStyles.form.label}>{utils.getTitleFromOptions('createAccount','placeholderLastName') || `Last Name`}</label>
						<input name="olyauth.family_name" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('createAccount','placeholderLastName') || `Last Name`}/>
					</div>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.password" style={parentStyles.form.label}>{utils.getTitleFromOptions('createAccount','labelPassword') || `Password`}<supr>*</supr></label>
						<input required name="olyauth.password" style={parentStyles.form.input} type="password" placeholder={utils.getTitleFromOptions('createAccount','placeholderPassword') || `Password`}/>
					</div>
					<div style={parentStyles.form.inputGroupLast}>
						<label htmlFor="olyauth.password2" style={parentStyles.form.label}>{utils.getTitleFromOptions('createAccount','labelPasswordAgain') || `PasswordAgain`}<supr>*</supr></label>
						<input required name="olyauth.password2" style={parentStyles.form.input} type="password" placeholder={utils.getTitleFromOptions('createAccount','placeholderPasswordAgain') || `PasswordAgain`}/>
					</div>
					<div style={parentStyles.form.links}>
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_LOGIN}`}>{utils.getTitleFromOptions('common','login') || `login`}</a>
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_FORGOT_PASS}`}>{utils.getTitleFromOptions('common','forgotPassword') || `forgot password?`}</a>
					</div>
					<p style={parentStyles.form.footnote}><supr>*</supr>{utils.getTitleFromOptions('common','required') || `required`}</p>
					<p style={parentStyles.form.message} className="olyauth__message">{this.state.errorMessage}</p>

					<input style={parentStyles.form.submit} className="olyauth__submit" type="submit" value={utils.getTitleFromOptions('createAccount','submit') || `Submit`}/>
				</form>
			</div>
		)
	}
}