import React,{Component} from 'react';
import {default as styles} from './styles';
import utils,{l} from '../../../utils';

export class ProfileUpload extends Component{
	constructor(props){
        super(props);
		this.state = {
			user:{},
			filename:'',
			uploadButton:styles.uploadButton
		}
	}

	componentWillReceiveProps(){
		this.setState({user:this.props.user});
	}

	onFileChange(e){
		const filename = document.getElementById('olyauth.file').files[0].name;

		this.setState({filename,uploadButton:styles.uploadButtonActive});
	}

	render(){
		const self = this,
			  user = this.state.user,
			  parentStyles = this.props.parentStyles;

		return (
			<div className="olyauth__profileUpload" style={styles.olyauth__profileUpload}>
				<div className="olyauth__profileUploadInner" style={styles.olyauth__profileUploadInner}>
					<h4 style={styles.h4}>Upload Image</h4>

					<form style={styles.uploadForm} encType="multipart/form-data" onSubmit={this.props.onFileUploadSubmit}>
						<input id="olyauth.file" name="olyauth.file" type="file" multiple accept='image/*' style={styles.fileInput} onChange={this.onFileChange}/>

						<p style={styles.filename}>{this.state.filename}</p>
						<input style={this.state.uploadButton} type="submit" value="Upload"/>
					</form>
				</div>
			</div>
		)
	}
}