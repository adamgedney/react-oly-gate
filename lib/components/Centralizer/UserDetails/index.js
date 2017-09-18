'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserDetails = undefined;

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

var UserDetails = exports.UserDetails = function (_Component) {
	_inherits(UserDetails, _Component);

	function UserDetails(props) {
		_classCallCheck(this, UserDetails);

		var _this = _possibleConstructorReturn(this, (UserDetails.__proto__ || Object.getPrototypeOf(UserDetails)).call(this, props));

		_this.state = {
			user: {}
		};
		return _this;
	}

	_createClass(UserDetails, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ user: this.props.user });
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
				window.Oly.Auth.createAccount(_utils2.default.form.parse(e.target)).then(function (res) {
					if (res.hasOwnProperty('Error') && res.Error) {
						self.setState({
							errorMessage: _utils2.default.getMessageFromOptions('onCreateAccountFail') || res.Error.message
						});
					} else {
						_utils2.default.sendToInterface('verify_account', { email: email });
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
			    options = this.props.options,
			    user = this.state.user,
			    parentStyles = this.props.parentStyles;


			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__userDetails', style: _styles2.default.olyauth__userDetails },
				_react2.default.createElement('div', { className: 'olyauth__userDetailsInner', style: _styles2.default.olyauth__userDetailsInner })
			);
		}
	}]);

	return UserDetails;
}(_react.Component);