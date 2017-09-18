import React,{Component} from 'react';
import {default as styles} from './styles';
import headerStyles from './headerStyles';
import {UserDetails} from './UserDetails';
import {MainMenu} from './MainMenu';
import {ProfileUpload} from './ProfileUpload';
// import {Events} from '../../Events';
// import utils,{l}  from '../../utils';
import { Events, utils } from '@olympusat/oly-sdk';

const {
    MAIN_MENU,
    USER_DETAILS,
    PROFILE_UPLOAD
} = utils.constants;

const events = new Events();

export class Centralizer extends Component{
	constructor(props){
        super(props); 
		this.state = {
			interface: MAIN_MENU,
			showContainer : false,
			showAppContainer : false
        }
        
        this.toggleContainer = this.toggleContainer.bind(this);
        this.toggleAppContainer = this.toggleAppContainer.bind(this);
        this.toggleUserDetails = this.toggleUserDetails.bind(this);
        this.toggleProfileUpload = this.toggleProfileUpload.bind(this);
    }
    
//componentWillReceiveProps
	componentWillMount(){
		this.addStyleToHead(headerStyles);
		this.setState({user:this.props.user});
	}

	/**
	 * Handle gratar click to open Container
	 */
	toggleContainer(){
        const showing = !this.state.showContainer;
        this.setState({ showContainer: showing,showAppContainer: false  });

        if(showing){
            events.onCentralizerUserOpen(this.state);//HOOK
        }else{
            events.onCentralizerUserClose(this.state);//HOOK
        }
	}

	/**
	 * Toggles the app container
	 */
	toggleAppContainer(){
        const showing = !this.state.showAppContainer;
        this.setState({ showAppContainer: showing, showContainer:false });

        if(showing){
            events.onCentralizerAppsOpen(this.state);//HOOK
        }else{
            events.onCentralizerAppsClose(this.state);//HOOK 
        }
        
	}

	/**
	 * Toggle the user settings view
	 */
	toggleUserDetails(){
		this.setState({ interface: this.state.interface !== USER_DETAILS ? USER_DETAILS : MAIN_MENU });
	}

	/**
	 * Handle profile upload interface
	 */
	toggleProfileUpload(){
		this.setState({ interface: this.state.interface !== PROFILE_UPLOAD ? PROFILE_UPLOAD : MAIN_MENU });
	}

	signOut(){
		window.Oly.Auth.logout();
	}

	/**
	 * Handles the profile image file upload from the ProfileUpload component
	 * @param e
	 */
	onFileUploadSubmit(e){
		e.preventDefault();
		const self = this,
			  files = document.getElementById('olyauth.file').files;

		//Users.User.uploadProfileImage({email:this.state.user.email,files})
		//	.then(user=>{
		//		l(this.state.user,user);
		//		this.setState({user});
		//		this.toggleProfileUpload();
		//	});
	}

	/**
	 * Make the primary user container
	 * @param Interface
	 * @param user
	 * @returns {XML}
	 */
	makeContainer(Interface,user){
		return (
			<div style={styles.container} className="olyauth__centralizerContainer top_arr">
				<div className="olyauth__centralizerHeader" style={styles.header}>
					<p style={styles.headerText}>
						<span style={styles.headerName} className="bold" title={user.email}>{user.name}</span>
						<br/>
						{user.company || ''}
					</p>
					<div style={styles.headerGravatar} className="olyauth__centralizerHeaderGravatar" onClick={this.toggleUserDetails.bind(this)}>
						<img style={styles.headerGravatarImg} src={user.profile} alt={user.name}/>
					</div>
				</div>
				<div >
					{Interface}
				</div>
				<div className="olyauth__centralizerFooter" style={styles.footer}>
					<button className="fa fa-cog" style={styles.buttonIcon} >
                        <a style={styles.profileAnchor} href={this.props.options.profileSettingsLink}></a>
                    </button>
					<div style={styles.branding} ><img style={styles.logo} src={utils.OlyAuthMeta.logo} alt={utils.OlyAuthMeta.title}/></div>
					<button style={styles.buttonSignout} onClick={this.signOut.bind(this)}>Sign out</button>
				</div>
			</div>
		)
	}

	/**
	 * Makes the app container
	 * @param Interface
	 * @param user
	 * @returns {XML}
	 */
	makeAppContainer(Interface,user){
		return (
			<div style={styles.appContainer} className="olyauth__centralizerAppContainer top_arr">
				<div>
					{Interface}
				</div>
				<div className="olyauth__centralizerFooter" style={styles.footer}>
					<div style={styles.branding} ><img style={styles.logo} src={utils.OlyAuthMeta.logo} alt={utils.OlyAuthMeta.title}/></div>
				</div>
			</div>
		)
	}

	render(){
		const self = this,
            {options} = this.props,
			  user = this.state.user;
		let Container = '',
            AppCentralizer = '',
			AppContainer = '',
			Interface = '';

		user.name = `${user.given_name ? user.given_name : ''} ${user.family_name ? user.family_name : ''}`;

		switch(this.state.interface){
			case PROFILE_UPLOAD:
				Interface = <ProfileUpload parentStyles={styles} user={user} onFileUploadSubmit={this.onFileUploadSubmit.bind(this)}></ProfileUpload>;
				break;
			case USER_DETAILS:
			default:
				Interface = <UserDetails parentStyles={styles} user={user} options={options}> </UserDetails>;
				break;
		}

        // Setting to hide the app icon for apps that don't need it
        if(!options.hideAppCentralizer){
            AppCentralizer = (<div className="olyauth__centralizerAppsIcon" style={styles.apps} onClick={this.toggleAppContainer.bind(this)}></div>);
        }

		/**
		 * Toggle the interface containers
		 */
		if(this.state.showContainer){
			Container = this.makeContainer(Interface,user);
		}

		if(this.state.showAppContainer && !options.hideAppCentralizer){
			AppContainer = this.makeAppContainer(<MainMenu apps={this.props.apps} parentStyles={styles} user={user}> </MainMenu>,user);
		}

		return (
			<div className="olyauth__centralizer" id="olyauthCentralizer" style={styles.olyauth__centralizer}>
				<div className="olyauth__centralizerInner" style={styles.olyauth__centralizerInner}>
					{AppCentralizer}
					<div className="olyauth__centralizerGravatar" style={styles.entry} onClick={this.toggleContainer.bind(this)}>
						<img style={styles.gravatar} src={user.profile} alt={user.name}/>
					</div>
					{Container}
					{AppContainer}
				</div>
			</div>
		)
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
}