'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ProfileUpload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _utils = require('../../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileUpload = exports.ProfileUpload = function (_Component) {
	_inherits(ProfileUpload, _Component);

	function ProfileUpload(props) {
		_classCallCheck(this, ProfileUpload);

		var _this = _possibleConstructorReturn(this, (ProfileUpload.__proto__ || Object.getPrototypeOf(ProfileUpload)).call(this, props));

		_this.state = {
			user: {},
			filename: '',
			uploadButton: _styles2.default.uploadButton
		};
		return _this;
	}

	_createClass(ProfileUpload, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ user: this.props.user });
		}
	}, {
		key: 'onFileChange',
		value: function onFileChange(e) {
			var filename = document.getElementById('olyauth.file').files[0].name;

			this.setState({ filename: filename, uploadButton: _styles2.default.uploadButtonActive });
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this,
			    user = this.state.user,
			    parentStyles = this.props.parentStyles;

			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__profileUpload', style: _styles2.default.olyauth__profileUpload },
				_react2.default.createElement(
					'div',
					{ className: 'olyauth__profileUploadInner', style: _styles2.default.olyauth__profileUploadInner },
					_react2.default.createElement(
						'h4',
						{ style: _styles2.default.h4 },
						'Upload Image'
					),
					_react2.default.createElement(
						'form',
						{ style: _styles2.default.uploadForm, encType: 'multipart/form-data', onSubmit: this.props.onFileUploadSubmit },
						_react2.default.createElement('input', { id: 'olyauth.file', name: 'olyauth.file', type: 'file', multiple: true, accept: 'image/*', style: _styles2.default.fileInput, onChange: this.onFileChange }),
						_react2.default.createElement(
							'p',
							{ style: _styles2.default.filename },
							this.state.filename
						),
						_react2.default.createElement('input', { style: this.state.uploadButton, type: 'submit', value: 'Upload' })
					)
				)
			);
		}
	}]);

	return ProfileUpload;
}(_react.Component);