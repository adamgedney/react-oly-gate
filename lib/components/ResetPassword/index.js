'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ResetPassword = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _constants = require('../../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetPassword = exports.ResetPassword = function (_Component) {
	_inherits(ResetPassword, _Component);

	function ResetPassword(props) {
		_classCallCheck(this, ResetPassword);

		var _this = _possibleConstructorReturn(this, (ResetPassword.__proto__ || Object.getPrototypeOf(ResetPassword)).call(this, props));

		_this.state = {
			email: _this.props.email,
			errorMessage: ''
		};

		_this.onSubmit = _this.onSubmit.bind(_this);
		_this.onEmailChange = _this.onEmailChange.bind(_this);
		return _this;
	}

	_createClass(ResetPassword, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({
				email: this.props.email
			});
		}
	}, {
		key: 'onSubmit',
		value: function onSubmit(e) {
			e.preventDefault();
			var self = this,
			    password1 = document.querySelectorAll("[name='olyauth.password']")[0],
			    password2 = document.querySelectorAll("[name='olyauth.password2']")[0],
			    email = document.querySelectorAll("[name='olyauth.email']")[0].value;

			// Kick the user a message if passwords don't match
			if (_utils2.default.form.diffPasswords(password1.value, password2.value)) {

				// Attempt to create the account. Display error meessages if true
				window.Oly.Auth.setNewPassword(_utils2.default.form.parse(e.target)).then(function () {
					var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

					if (res.hasOwnProperty('Error') && res.Error) {
						self.setState({
							errorMessage: _utils2.default.getMessageFromOptions('onSetNewPasswordFail') || res.Error.message
						});
					} else {
						_utils2.default.displaySuccessFailMessage('Success', _utils2.default.getMessageFromOptions('onSetNewPasswordSuccess') || 'Your password was changed.');

						setTimeout(function () {
							_utils2.default.sendToInterface(_constants.INTERFACE_LOGIN, { email: email });
						}, 2500);
					}
				});
			} else {
				password1.style.outline = this.props.parentStyles.color.danger + ' solid thin';
				password2.style.outline = this.props.parentStyles.color.danger + ' solid thin';

				self.setState({
					errorMessage: _utils2.default.getMessageFromOptions('onPasswordsMatchFail') || 'Passwords don\'t match.'
				});
			}
		}

		// Handle if user wants to change the email address for some strange reason

	}, {
		key: 'onEmailChange',
		value: function onEmailChange(e) {
			this.setState({ email: e.target.value });
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this,
			    parentStyles = this.props.parentStyles;

			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__forgotPassword', style: _styles2.default.login },
				_react2.default.createElement(
					'h1',
					{ style: parentStyles.h1 },
					_utils2.default.getTitleFromOptions('resetPassword', 'h1') || 'Reset Your Password'
				),
				_react2.default.createElement(
					'h3',
					{ style: parentStyles.h3 },
					_utils2.default.getTitleFromOptions('resetPassword', 'h3') || 'We just emailed you a verification code. Copy it and enter it here.'
				),
				_react2.default.createElement(
					'form',
					{ style: parentStyles.form.form, onSubmit: this.onSubmit },
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.code', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('resetPassword', 'labelCode') || 'Verification Code',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.code', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('resetPassword', 'placeholderCode') || 'Verification Code' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.email', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('resetPassword', 'labelEmail') || 'Email',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.email', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('resetPassword', 'placeholderEmail') || 'Email Address', onChange: this.onEmailChange, value: this.state.email })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.password', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('resetPassword', 'labelNewPassword') || 'New Password',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.password', style: parentStyles.form.input, type: 'password', placeholder: _utils2.default.getTitleFromOptions('resetPassword', 'placeholderNewPassword') || 'New Password' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroupLast },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.password2', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('resetPassword', 'labelNewPasswordAgain') || 'New Password Again',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.password2', style: parentStyles.form.input, type: 'password', placeholder: _utils2.default.getTitleFromOptions('resetPassword', 'placeholderNewPasswordAgain') || 'New Password Again' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.links },
						_react2.default.createElement(
							'a',
							{ onClick: _utils2.default.handleLinkClick, style: parentStyles.form.link, href: '/auth#slug=' + _constants.INTERFACE_FORGOT_PASS },
							_utils2.default.getTitleFromOptions('common', 'newVerificationCode') || 'Get a new verification code'
						)
					),
					_react2.default.createElement(
						'p',
						{ style: parentStyles.form.footnote },
						_react2.default.createElement(
							'supr',
							null,
							'*'
						),
						_utils2.default.getTitleFromOptions('common', 'required') || 'required'
					),
					_react2.default.createElement(
						'p',
						{ style: parentStyles.form.message, className: 'olyauth__message' },
						this.state.errorMessage
					),
					_react2.default.createElement('input', { style: parentStyles.form.submit, className: 'olyauth__submit', type: 'submit', value: _utils2.default.getTitleFromOptions('resetPassword', 'submit') || 'Submit' })
				)
			);
		}
	}]);

	return ResetPassword;
}(_react.Component);