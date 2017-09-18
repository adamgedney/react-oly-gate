'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VerifyAccount = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _constants = require('../../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerifyAccount = exports.VerifyAccount = function (_Component) {
	_inherits(VerifyAccount, _Component);

	function VerifyAccount(props) {
		_classCallCheck(this, VerifyAccount);

		var _this = _possibleConstructorReturn(this, (VerifyAccount.__proto__ || Object.getPrototypeOf(VerifyAccount)).call(this, props));

		_this.state = {
			errorMessage: '',
			email: _this.props.email
		};

		_this.onEmailChange = _this.onEmailChange.bind(_this);
		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(VerifyAccount, [{
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
			    email = document.querySelectorAll("[name='olyauth.email']")[0].value;

			// Attempt to create the account. Display error meessages if true
			window.Oly.Auth.verifyAccount(_utils2.default.form.parse(e.target)).then(function (res) {
				if (res.hasOwnProperty('Error') && res.Error) {
					self.setState({
						errorMessage: _utils2.default.getMessageFromOptions('onVerifyAcctFail') || res.Error.message
					});
				} else {
					_utils2.default.displaySuccessFailMessage('Success', _utils2.default.getMessageFromOptions('onVerifyAcctSuccess') || 'Your account was verified. Please login. You will be redirected in a second.');

					setTimeout(function () {
						_utils2.default.sendToInterface(_constants.INTERFACE_LOGIN, { email: email });
					}, 2000);
				}
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

			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__forgotPassword', style: _styles2.default.login },
				_react2.default.createElement(
					'h1',
					{ style: parentStyles.h1 },
					_utils2.default.getTitleFromOptions('verifyAccount', 'h1') || 'Verify Your Account'
				),
				_react2.default.createElement(
					'h3',
					{ style: parentStyles.h3 },
					_utils2.default.getTitleFromOptions('verifyAccount', 'h3') || 'We just emailed you a verification code. Copy it and enter it here.'
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
							_utils2.default.getTitleFromOptions('verifyAccount', 'labelEmail') || 'Email',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { name: 'olyauth.email', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('verifyAccount', 'placeholderEmail') || 'Email Address', onChange: this.onEmailChange, value: this.state.email })
					),
					_react2.default.createElement(
						'div',
						{ style: parentStyles.form.inputGroupLast },
						_react2.default.createElement(
							'label',
							{ htmlFor: 'olyauth.code', style: parentStyles.form.label },
							_utils2.default.getTitleFromOptions('verifyAccount', 'labelCode') || 'Verification Code',
							_react2.default.createElement(
								'supr',
								null,
								'*'
							)
						),
						_react2.default.createElement('input', { name: 'olyauth.code', style: parentStyles.form.input, type: 'text', placeholder: _utils2.default.getTitleFromOptions('verifyAccount', 'placeholderCode') || 'Verification Code' })
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
					_react2.default.createElement('input', { style: parentStyles.form.submit, className: 'olyauth__submit', type: 'submit', value: _utils2.default.getTitleFromOptions('verifyAccount', 'submit') || 'Submit' })
				)
			);
		}
	}]);

	return VerifyAccount;
}(_react.Component);