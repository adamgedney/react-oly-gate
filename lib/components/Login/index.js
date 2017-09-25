'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Login = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _olySdk = require('@olympusat/oly-sdk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import utils,{l} from '../../utils';

// import {Storage} from '../../Storage';


var _utils$constants = _olySdk.utils.constants,
    REFERRER_LS_KEY = _utils$constants.REFERRER_LS_KEY,
    INTERFACE_FORGOT_PASS = _utils$constants.INTERFACE_FORGOT_PASS,
    INTERFACE_CREATE_ACCOUNT = _utils$constants.INTERFACE_CREATE_ACCOUNT;

var Login = exports.Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.state = {
			errorMessage: '',
			email: _this.props.email || ''
		};

		_this.onEmailChange = _this.onEmailChange.bind(_this);
		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(Login, [{
		key: 'onSubmit',
		value: function onSubmit(e) {
			e.preventDefault();
			var self = this,
			    storage = new _olySdk.Storage(),
			    submitBtn = document.getElementById('olyauth__loader');

			submitBtn.classList.remove('olyauth__loader--hidden');

			//Attempt to create the account. Display error meessages if true
			window.Oly.Auth.login(_olySdk.utils.form.parse(e.target)).then(function (res) {
				if (res.hasOwnProperty('Error') && res.Error) {
					self.setState({
						errorMessage: _olySdk.utils.getMessageFromOptions('onLoginFail') || res.Error.message
					});
				} else {
					var redirectTo = storage.get(REFERRER_LS_KEY) || window.Oly.options.onLoginRedirectTo || window.location.href;

					// Cleanup
					storage.remove(REFERRER_LS_KEY);

					window.location.href = redirectTo;
				}
				submitBtn.classList.add('olyauth__loader--hidden');
			});
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
			// console.log('TESTTTTT',utils.getTitleFromOptions('login','h1'));
			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__login', style: _styles2.default.login },
				_react2.default.createElement(
					'h1',
					{ style: parentStyles.h1 },
					_olySdk.utils.getTitleFromOptions('login', 'h1') || 'Login'
				),
				_react2.default.createElement(
					'form',
					{ style: parentStyles.form.form, onSubmit: this.onSubmit, autoComplete: 'on' },
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.email', style: parentStyles.form.label },
							_olySdk.utils.getTitleFromOptions('login', 'labelEmail') || 'Email',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { autoComplete: 'username', name: 'olyauth.email', style: parentStyles.form.input, type: 'text', placeholder: _olySdk.utils.getTitleFromOptions('login', 'placeholderEmail') || 'Email Address', onChange: this.onEmailChange, value: self.state.email })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.password', style: parentStyles.form.label },
							_olySdk.utils.getTitleFromOptions('login', 'labelPassword') || 'Password',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { autoComplete: 'current-password', name: 'olyauth.password', style: parentStyles.form.input, type: 'password', placeholder: _olySdk.utils.getTitleFromOptions('login', 'placeholderPassword') || 'Password' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.links },
						_react2.default.createElement(
							'a',
							{ onClick: _olySdk.utils.handleLinkClick, style: parentStyles.form.link, href: '/auth#slug=' + INTERFACE_CREATE_ACCOUNT },
							_olySdk.utils.getTitleFromOptions('common', 'createAccount') || 'create account'
						),
						_react2.default.createElement(
							'a',
							{ onClick: _olySdk.utils.handleLinkClick, style: parentStyles.form.link, href: '/auth#slug=' + INTERFACE_FORGOT_PASS },
							_olySdk.utils.getTitleFromOptions('common', 'forgotPassword') || 'forgot password?'
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
						_olySdk.utils.getTitleFromOptions('common', 'required') || 'required'
					),
					_react2.default.createElement(
						'p',
						{ style: parentStyles.form.message, className: 'olyauth__message' },
						this.state.errorMessage
					),
					_react2.default.createElement(
						'button',
						{ id: 'olyauth__login__submit', className: 'olyauth__submit', style: parentStyles.form.submit, type: 'submit', value: 'Submit' },
						_olySdk.utils.getTitleFromOptions('login', 'submit') || 'Submit'
					),
					_react2.default.createElement('span', { id: 'olyauth__loader', className: 'loader olyauth__loader olyauth__loader--hidden' })
				)
			);
		}
	}]);

	return Login;
}(_react.Component);