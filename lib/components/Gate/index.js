'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Gate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _queryParse = require('query-parse');

var _queryParse2 = _interopRequireDefault(_queryParse);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _CreateAccount = require('../CreateAccount');

var _ForgotPassword = require('../ForgotPassword');

var _Login = require('../Login');

var _ResetPassword = require('../ResetPassword');

var _VerifyAccount = require('../VerifyAccount');

var _Message = require('../Message');

var _headerStyles = require('./headerStyles');

var _headerStyles2 = _interopRequireDefault(_headerStyles);

var _constants = require('../../utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gate = exports.Gate = function (_Component) {
	_inherits(Gate, _Component);

	function Gate(props) {
		_classCallCheck(this, Gate);

		var _this = _possibleConstructorReturn(this, (Gate.__proto__ || Object.getPrototypeOf(Gate)).call(this, props));

		var query = _queryParse2.default.toObject(window.location.hash.substring(1));

		_this.state = {
			query: query, //Url Hash to determine interface to reveal
			slug: query.slug,
			email: ''
		};

		_this.onInterfaceChange = _this.onInterfaceChange.bind(_this);
		return _this;
	}

	_createClass(Gate, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.addStyleToHead(_headerStyles2.default);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			/**
    * LIsten for component events requesting to change the internal interface
    */
			document.addEventListener('interfaceChange', this.onInterfaceChange);
		}

		/**
   * Switch the interface and rerender component
   * @param e
   */

	}, {
		key: 'onInterfaceChange',
		value: function onInterfaceChange(e) {
			switch (e.slug) {
				case _constants.INTERFACE_MESSAGE:
					this.setState({
						message: e.message,
						subMessage: e.subMessage
					});
					break;
				case _constants.INTERFACE_LOGIN:
				case _constants.INTERFACE_VERIFY:
				case _constants.INTERFACE_RESET_PASS:

					// Used to pass the user email around from one form to the next to speed up account creation, verification, and login
					if (e.hasOwnProperty('d') && e.d.hasOwnProperty('email')) {
						this.setState({ email: e.d.email || '' });
					}
					break;
			}

			this.setState({ slug: e.slug });
		}

		/**
   * Takes the contents of the headStyles fn and appends to the head in a style tag
   */

	}, {
		key: 'addStyleToHead',
		value: function addStyleToHead(css) {
			var head = document.head || document.getElementsByTagName('head')[0],
			    style = document.createElement('style');

			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this,
			    profile = this.props.component.options,
			    slug = this.state.slug,
			    backgroundOverride = profile.gateScreenBackgroundImage ? { background: 'url(' + profile.gateScreenBackgroundImage + ')' } : (profile.gateScreenBackgroundColor ? { background: profile.gateScreenBackgroundColor } : {}) || {};
			var Interface = '';

			switch (slug) {
				case _constants.INTERFACE_MESSAGE:
					Interface = _react2.default.createElement(_Message.Message, { parentStyles: _styles2.default, message: this.state.message, subMessage: this.state.subMessage });
					break;
				case _constants.INTERFACE_CREATE_ACCOUNT:
					Interface = _react2.default.createElement(_CreateAccount.CreateAccount, { parentStyles: _styles2.default, options: this.props.component.options });
					break;
				case _constants.INTERFACE_FORGOT_PASS:
					Interface = _react2.default.createElement(_ForgotPassword.ForgotPassword, { parentStyles: _styles2.default, options: this.props.component.options });
					break;
				case _constants.INTERFACE_RESET_PASS:
					Interface = _react2.default.createElement(_ResetPassword.ResetPassword, { email: this.state.email, parentStyles: _styles2.default, options: this.props.component.options });
					break;
				case _constants.INTERFACE_VERIFY:
					Interface = _react2.default.createElement(_VerifyAccount.VerifyAccount, { email: this.state.email, parentStyles: _styles2.default, options: this.props.component.options });
					break;
				case _constants.INTERFACE_LOGIN:
				default:
					Interface = _react2.default.createElement(_Login.Login, { email: this.state.email, parentStyles: _styles2.default, options: this.props.component.options });
					break;
			}

			return _react2.default.createElement(
				'div',
				{ className: 'olyauth', id: 'olyauth', style: Object.assign(_styles2.default.olyauth, backgroundOverride) },
				_react2.default.createElement(
					'div',
					{ className: 'olyauth__inner', style: _styles2.default.olyauth__inner },
					_react2.default.createElement(
						'div',
						{ style: _styles2.default.olyauth__inner.header },
						_react2.default.createElement('img', { style: _styles2.default.olyauth__inner.logo, src: profile.logo, alt: profile.title })
					),
					_react2.default.createElement(
						'div',
						{ style: _styles2.default.olyauth__inner.interfaces },
						Interface
					)
				)
			);
		}
	}]);

	return Gate;
}(_react.Component);