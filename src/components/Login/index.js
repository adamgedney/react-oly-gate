import React,{Component} from 'react';
// import utils,{l} from '../../utils';
import {default as styles} from './styles';
// import {Storage} from '../../Storage';
import { Storage, utils } from '@olympusat/oly-sdk'; 

const {
    REFERRER_LS_KEY, 
    INTERFACE_FORGOT_PASS,
    INTERFACE_CREATE_ACCOUNT 
} = utils.constants; 

export class Login extends Component{
	constructor(props){
        super(props);
		this.state = {
			errorMessage : '',
			email : this.props.email || ''
        }
        
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e){
		e.preventDefault();
        const self = this,
            storage = new Storage(),
            submitBtn = document.getElementById('olyauth__loader'); 

        submitBtn.classList.remove('olyauth__loader--hidden');
 
		//Attempt to create the account. Display error meessages if true
		window.Oly.Auth.login(utils.form.parse(e.target))
			.then(res=>{
				if(res.hasOwnProperty('Error') && res.Error){
					self.setState({
                        errorMessage : utils.getMessageFromOptions('onLoginFail') || res.Error.message
                    });
				}else{
                    const redirectTo = storage.get(REFERRER_LS_KEY) || window.Oly.options.onLoginRedirectTo || window.location.href;

                    // Cleanup
                    storage.remove(REFERRER_LS_KEY);
                    
                    window.location.href = redirectTo;   
				}
                submitBtn.classList.add('olyauth__loader--hidden');  
			});
	}

	// Handle if user wants to change the email address for some strange reason
	onEmailChange(e){
		this.setState({email:e.target.value});
	}

	render(){
		const self = this,
			  parentStyles = this.props.parentStyles;
console.log('TESTTTTT',utils.getTitleFromOptions('login','h1'));
		return (
			<div className="olyauth__login" style={styles.login}>
				<h1 style={parentStyles.h1}>{utils.getTitleFromOptions('login','h1') || `Login`}</h1>
				<form style={parentStyles.form.form} onSubmit={this.onSubmit} autoComplete="on" >
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.email" style={parentStyles.form.label}>{utils.getTitleFromOptions('login','labelEmail') || `Email`}<supr>*</supr></label>
						<input autoComplete="username" name="olyauth.email" style={parentStyles.form.input} type="text" placeholder={utils.getTitleFromOptions('login','placeholderEmail') || `Email Address`} onChange={this.onEmailChange} value={self.state.email}/>
					</div>
					<div style={parentStyles.form.inputGroup}>
						<label htmlFor="olyauth.password" style={parentStyles.form.label}>{utils.getTitleFromOptions('login','labelPassword') || `Password`}<supr>*</supr></label>
						<input autoComplete="current-password" name="olyauth.password" style={parentStyles.form.input} type="password" placeholder={utils.getTitleFromOptions('login','placeholderPassword') || `Password`}/>
					</div>
					<div style={parentStyles.form.links}>
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_CREATE_ACCOUNT}`}>{utils.getTitleFromOptions('common','createAccount') || `create account`}</a>
						<a onClick={utils.handleLinkClick} style={parentStyles.form.link} href={`/auth#slug=${INTERFACE_FORGOT_PASS}`}>{utils.getTitleFromOptions('common','forgotPassword') || `forgot password?`}</a>
					</div>
					<p style={parentStyles.form.footnote}><supr>*</supr>{utils.getTitleFromOptions('common','required') || `required`}</p>
					<p style={parentStyles.form.message} className="olyauth__message">{this.state.errorMessage}</p>
 
					<button id="olyauth__login__submit" className="olyauth__submit" style={parentStyles.form.submit} type="submit" value="Submit">{utils.getTitleFromOptions('login','submit') || `Submit`}</button>
                    <span id="olyauth__loader" className="loader olyauth__loader olyauth__loader--hidden"></span>
				</form>
			</div>
		)
	}
}