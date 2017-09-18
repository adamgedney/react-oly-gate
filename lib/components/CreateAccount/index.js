'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CreateAccount = undefined;

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

var CreateAccount = exports.CreateAccount = function (_Component) {
	_inherits(CreateAccount, _Component);

	function CreateAccount(props) {
		_classCallCheck(this, CreateAccount);

		var _this = _possibleConstructorReturn(this, (CreateAccount.__proto__ || Object.getPrototypeOf(CreateAccount)).call(this, props));

		_this.state = {
			errorMessage: ''
		};

		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(CreateAccount, [{
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
				window.Oly.Auth.createAccount(_utils2.default.form.parse(e.target)).then(function (res) {
					if (res.hasOwnProperty('Error') && res.Error) {
						self.setState({
							errorMessage: _utils2.default.getMessageFromOptions('onCreateAccountFail') || res.Error.message
						});
					} else {
						_utils2.default.sendToInterface(_constants.INTERFACE_VERIFY, { email: email });
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
	}, {
		key: 'render',
		value: function render() {
			var self = this,
			    parentStyles = this.props.parentStyles;

			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__createAccount', style: _styles2.default.login },
				_react2.default.createElement(
					'h1',
					{ style: parentStyles.h1 },
					_utils2.default.getTitleFromOptions('createAccount', 'h1') || 'Create An Account'
				),
				_react2.default.createElement(
					'form',
					{ style: parentStyles.form.form, onSubmit: this.onSubmit },
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.email', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('createAccount', 'labelEmail') || 'Email',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.email', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('createAccount', 'placeholderEmail') || 'Email Address' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.given_name', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('createAccount', 'labelFirstName') || 'First Name'
						),
						_react2.default.createElement('input', { name: 'olyauth.given_name', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('createAccount', 'placeholderFirstName') || 'First Name' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.family_name', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('createAccount', 'placeholderLastName') || 'Last Name'
						),
						_react2.default.createElement('input', { name: 'olyauth.family_name', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('createAccount', 'placeholderLastName') || 'Last Name' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroup },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.password', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('createAccount', 'labelPassword') || 'Password',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.password', style: parentStyles.form.input, type: 'password', placeholder: _utils2.default.getTitleFromOptions('createAccount', 'placeholderPassword') || 'Password' })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroupLast },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.password2', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('createAccount', 'labelPasswordAgain') || 'PasswordAgain',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { required: true, name: 'olyauth.password2', style: parentStyles.form.input, type: 'password', placeholder: _utils2.default.getTitleFromOptions('createAccount', 'placeholderPasswordAgain') || 'PasswordAgain' })
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
							{ onClick: _utils2.default.handleLinkClick, style: parentStyles.form.link, href: '/auth#slug=' + _constants.INTERFACE_FORGOT_PASS },
							_utils2.default.getTitleFromOptions('common', 'forgotPassword') || 'forgot password?'
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
					_react2.default.createElement('input', { style: parentStyles.form.submit, className: 'olyauth__submit', type: 'submit', value: _utils2.default.getTitleFromOptions('createAccount', 'submit') || 'Submit' })
				)
			);
		}
	}]);

	return CreateAccount;
}(_react.Component);