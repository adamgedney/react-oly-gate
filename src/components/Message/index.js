import React,{Component} from 'react';
import {default as styles} from './styles';

export class Message extends Component{
	constructor(props){
        super(props);
		this.state = {
			message : '',
			subMessage : ''
		}
	}

	componentWillReceiveProps(){
        this.setState({
            message:this.props.message,
            subMessage:this.props.subMessage
        });
	}

	render(){
		const self = this,
			  parentStyles = this.props.parentStyles;

		return (
			<div className="olyauth__message" style={styles.message}>
				<h1 style={parentStyles.h1}>{this.state.message}</h1>
				<h3 style={parentStyles.h3}>{this.state.subMessage}</h3>
			</div>
		)
	}
}