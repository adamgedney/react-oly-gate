import React,{Component} from 'react';
import {default as styles} from './styles';
import utils,{l} from '../../../utils';

export class UserDetails extends Component{
	constructor(props){
        super(props);
		this.state = {
			user:{}
		}
	}

	componentWillReceiveProps(){
		this.setState({user:this.props.user});
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
						utils.sendToInterface('verify_account',{email});
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
            {options} = this.props,
			  user = this.state.user,
			  parentStyles = this.props.parentStyles;

		return (
			<div className="olyauth__userDetails" style={styles.olyauth__userDetails}>
				<div className="olyauth__userDetailsInner" style={styles.olyauth__userDetailsInner}></div>
			</div>
		)
	}
}