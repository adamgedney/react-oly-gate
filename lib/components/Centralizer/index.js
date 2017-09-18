'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Centralizer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _headerStyles = require('./headerStyles');

var _headerStyles2 = _interopRequireDefault(_headerStyles);

var _UserDetails = require('./UserDetails');

var _MainMenu = require('./MainMenu');

var _ProfileUpload = require('./ProfileUpload');

var _olySdk = require('@olympusat/oly-sdk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {Events} from '../../Events';
// import utils,{l}  from '../../utils';


var _utils$constants = _olySdk.utils.constants,
    MAIN_MENU = _utils$constants.MAIN_MENU,
    USER_DETAILS = _utils$constants.USER_DETAILS,
    PROFILE_UPLOAD = _utils$constants.PROFILE_UPLOAD;


var events = new _olySdk.Events();

var Centralizer = exports.Centralizer = function (_Component) {
	_inherits(Centralizer, _Component);

	function Centralizer(props) {
		_classCallCheck(this, Centralizer);

		var _this = _possibleConstructorReturn(this, (Centralizer.__proto__ || Object.getPrototypeOf(Centralizer)).call(this, props));

		_this.state = {
			interface: MAIN_MENU,
			showContainer: false,
			showAppContainer: false
		};

		_this.toggleContainer = _this.toggleContainer.bind(_this);
		_this.toggleAppContainer = _this.toggleAppContainer.bind(_this);
		_this.toggleUserDetails = _this.toggleUserDetails.bind(_this);
		_this.toggleProfileUpload = _this.toggleProfileUpload.bind(_this);
		return _this;
	}

	//componentWillReceiveProps


	_createClass(Centralizer, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.addStyleToHead(_headerStyles2.default);
			this.setState({ user: this.props.user });
		}

		/**
   * Handle gratar click to open Container
   */

	}, {
		key: 'toggleContainer',
		value: function toggleContainer() {
			var showing = !this.state.showContainer;
			this.setState({ showContainer: showing, showAppContainer: false });

			if (showing) {
				events.onCentralizerUserOpen(this.state); //HOOK
			} else {
				events.onCentralizerUserClose(this.state); //HOOK
			}
		}

		/**
   * Toggles the app container
   */

	}, {
		key: 'toggleAppContainer',
		value: function toggleAppContainer() {
			var showing = !this.state.showAppContainer;
			this.setState({ showAppContainer: showing, showContainer: false });

			if (showing) {
				events.onCentralizerAppsOpen(this.state); //HOOK
			} else {
				events.onCentralizerAppsClose(this.state); //HOOK 
			}
		}

		/**
   * Toggle the user settings view
   */

	}, {
		key: 'toggleUserDetails',
		value: function toggleUserDetails() {
			this.setState({ interface: this.state.interface !== USER_DETAILS ? USER_DETAILS : MAIN_MENU });
		}

		/**
   * Handle profile upload interface
   */

	}, {
		key: 'toggleProfileUpload',
		value: function toggleProfileUpload() {
			this.setState({ interface: this.state.interface !== PROFILE_UPLOAD ? PROFILE_UPLOAD : MAIN_MENU });
		}
	}, {
		key: 'signOut',
		value: function signOut() {
			window.Oly.Auth.logout();
		}

		/**
   * Handles the profile image file upload from the ProfileUpload component
   * @param e
   */

	}, {
		key: 'onFileUploadSubmit',
		value: function onFileUploadSubmit(e) {
			e.preventDefault();
			var self = this,
			    files = document.getElementById('olyauth.file').files;

			//Users.User.uploadProfileImage({email:this.state.user.email,files})
			//	.then(user=>{
			//		l(this.state.user,user);
			//		this.setState({user});
			//		this.toggleProfileUpload();
			//	});
		}

		/**
   * Make the primary user container
   * @param Interface
   * @param user
   * @returns {XML}
   */

	}, {
		key: 'makeContainer',
		value: function makeContainer(Interface, user) {
			return _react2.default.createElement(
				'div',
				{ style: _styles2.default.container, className: 'olyauth__centralizerContainer top_arr' },
				_react2.default.createElement(
					'div',
					{ className: 'olyauth__centralizerHeader', style: _styles2.default.header },
					_react2.default.createElement(
						'p',
						{ style: _styles2.default.headerText },
						_react2.default.createElement(
							'span',
							{ style: _styles2.default.headerName, className: 'bold', title: user.email },
							user.name
						),
						_react2.default.createElement('br', null),
						user.company || ''
					),
					_react2.default.createElement(
						'div',
						{ style: _styles2.default.headerGravatar, className: 'olyauth__centralizerHeaderGravatar', onClick: this.toggleUserDetails.bind(this) },
						_react2.default.createElement('img', { style: _styles2.default.headerGravatarImg, src: user.profile, alt: user.name })
					)
				),
				_react2.default.createElement(
					'div',
					null,
					Interface
				),
				_react2.default.createElement(
					'div',
					{ className: 'olyauth__centralizerFooter', style: _styles2.default.footer },
					_react2.default.createElement(
						'button',
						{ className: 'fa fa-cog', style: _styles2.default.buttonIcon },
						_react2.default.createElement('a', { style: _styles2.default.profileAnchor, href: this.props.options.profileSettingsLink })
					),
					_react2.default.createElement(
						'div',
						{ style: _styles2.default.branding },
						_react2.default.createElement('img', { style: _styles2.default.logo, src: _olySdk.utils.OlyAuthMeta.logo, alt: _olySdk.utils.OlyAuthMeta.title })
					),
					_react2.default.createElement(
						'button',
						{ style: _styles2.default.buttonSignout, onClick: this.signOut.bind(this) },
						'Sign out'
					)
				)
			);
		}

		/**
   * Makes the app container
   * @param Interface
   * @param user
   * @returns {XML}
   */

	}, {
		key: 'makeAppContainer',
		value: function makeAppContainer(Interface, user) {
			return _react2.default.createElement(
				'div',
				{ style: _styles2.default.appContainer, className: 'olyauth__centralizerAppContainer top_arr' },
				_react2.default.createElement(
					'div',
					null,
					Interface
				),
				_react2.default.createElement(
					'div',
					{ className: 'olyauth__centralizerFooter', style: _styles2.default.footer },
					_react2.default.createElement(
						'div',
						{ style: _styles2.default.branding },
						_react2.default.createElement('img', { style: _styles2.default.logo, src: _olySdk.utils.OlyAuthMeta.logo, alt: _olySdk.utils.OlyAuthMeta.title })
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this,
			    options = this.props.options,
			    user = this.state.user;

			var Container = '',
			    AppCentralizer = '',
			    AppContainer = '',
			    Interface = '';

			user.name = (user.given_name ? user.given_name : '') + ' ' + (user.family_name ? user.family_name : '');

			switch (this.state.interface) {
				case PROFILE_UPLOAD:
					Interface = _react2.default.createElement(_ProfileUpload.ProfileUpload, { parentStyles: _styles2.default, user: user, onFileUploadSubmit: this.onFileUploadSubmit.bind(this) });
					break;
				case USER_DETAILS:
				default:
					Interface = _react2.default.createElement(
						_UserDetails.UserDetails,
						{ parentStyles: _styles2.default, user: user, options: options },
						' '
					);
					break;
			}

			// Setting to hide the app icon for apps that don't need it
			if (!options.hideAppCentralizer) {
				AppCentralizer = _react2.default.createElement('div', { className: 'olyauth__centralizerAppsIcon', style: _styles2.default.apps, onClick: this.toggleAppContainer.bind(this) });
			}

			/**
    * Toggle the interface containers
    */
			if (this.state.showContainer) {
				Container = this.makeContainer(Interface, user);
			}

			if (this.state.showAppContainer && !options.hideAppCentralizer) {
				AppContainer = this.makeAppContainer(_react2.default.createElement(
					_MainMenu.MainMenu,
					{ apps: this.props.apps, parentStyles: _styles2.default, user: user },
					' '
				), user);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'olyauth__centralizer', id: 'olyauthCentralizer', style: _styles2.default.olyauth__centralizer },
				_react2.default.createElement(
					'div',
					{ className: 'olyauth__centralizerInner', style: _styles2.default.olyauth__centralizerInner },
					AppCentralizer,
					_react2.default.createElement(
						'div',
						{ className: 'olyauth__centralizerGravatar', style: _styles2.default.entry, onClick: this.toggleContainer.bind(this) },
						_react2.default.createElement('img', { style: _styles2.default.gravatar, src: user.profile, alt: user.name })
					),
					Container,
					AppContainer
				)
			);
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
	}]);

	return Centralizer;
}(_react.Component);