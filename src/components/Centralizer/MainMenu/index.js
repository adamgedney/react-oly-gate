import React,{Component} from 'react';
import {default as styles} from './styles';

export class MainMenu extends Component{
	constructor(props){
        super(props);
		this.state = {
			apps:[]
		}
	}

	render(){
		const self = this,
			  profile = this.props.user,
			  parentStyles = this.props.parentStyles,
				apps = this.props.apps;

		return (
			<div className="olyauth__mainMenu" style={styles.olyauth__mainMenu}>
				<div className="olyauth__mainMenuInner" style={styles.olyauth__mainMenuInner}>
					<ul style={styles.ul}>
						{apps.map(app=>{
							return(
								<li key={app.entityUUID} style={styles.li}>
									<a style={styles.link} href={app.appDomain} >
										<img style={styles.icon} src={app.appLogo}/>
										{app.appName}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		)
	}
}