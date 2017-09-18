'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ForgotPassword = undefined;

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

var ForgotPassword = exports.ForgotPassword = function (_Component) {
	_inherits(ForgotPassword, _Component);

	function ForgotPassword(props) {
		_classCallCheck(this, ForgotPassword);

		var _this = _possibleConstructorReturn(this, (ForgotPassword.__proto__ || Object.getPrototypeOf(ForgotPassword)).call(this, props));

		_this.state = {
			errorMessage: ''
		};

		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(ForgotPassword, [{
		key: 'onSubmit',
		value: function onSubmit(e) {
			e.preventDefault();
			var self = this,
			    email = document.querySelectorAll("[name='olyauth.email']")[0].value;

			// Attempt to create the account. Display error meessages if true
			window.Oly.Auth.sendResetPasswordRequest(_utils2.default.form.parse(e.target)).then(function (res) {
				if (res.hasOwnProperty('Error') && res.Error) {
					self.setState({
						errorMessage: _utils2.default.getMessageFromOptions('onResetPasswordRequestFail') || res.Error.message
					});
				} else {
					_utils2.default.sendToInterface(_constants.INTERFACE_RESET_PASS, { email: email });
				}
			});
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
					_utils2.default.getTitleFromOptions('forgotPassword', 'h1') || 'Forgot Your Password?'
				),
				_react2.default.createElement(
					'h3',
					{ style: parentStyles.h3 },
					_utils2.default.getTitleFromOptions('forgotPassword', 'h3') || 'Enter your email address and we\'ll email you a code you can use to reset your password.'
				),
				_react2.default.createElement(
					'form',
					{ style: parentStyles.form.form, onSubmit: this.onSubmit },
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroupLast },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.email', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('forgotPassword', 'labelEmail') || 'Email',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { name: 'olyauth.email', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('forgotPassword', 'placeholderEmail') || 'Email Address' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.links },
						_react2.default.createElement(
							'a',
							{ onClick: _utils2.default.handleLinkClick, style: parentStyles.form.link, href: '/auth#slug=' + _constants.INTERFACE_LOGIN },
							_utils2.default.getTitleFromOptions('common', 'login') || 'login'
						),
						_react2.default.createElement(
							'a',
							{ onClick: _utils2.default.handleLinkClick, style: parentStyles.form.link, href: '/auth#slug=' + _constants.INTERFACE_CREATE_ACCOUNT },
							_utils2.default.getTitleFromOptions('common', 'createAccount') || 'create account'
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
						this.state ? this.state.errorMessage : ''
					),
					_react2.default.createElement('input', { style: parentStyles.form.submit, className: 'olyauth__submit', type: 'submit', value: _utils2.default.getTitleFromOptions('createAccount', 'submit') || 'Submit' })
				)
			);
		}
	}]);

	return ForgotPassword;
}(_react.Component);