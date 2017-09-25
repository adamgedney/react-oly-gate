'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIController = UIController;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Gate = require('../components/Gate');

var _Centralizer = require('../components/Centralizer');

var _olySdk = require('@olympusat/oly-sdk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = _olySdk.Controllers.UserController;
// import {AppsModel} from '../models/AppsModel';
// import {UserController} from './UserController';
// import {Events} from '../Events';

/**
 * Handles interfacing with UI functionality ie. show/hide gate & centralizer
 */

var AppsModel = _olySdk.Models.AppsModel;
function UIController(options) {
  var _this = this;

  var userController = new UserController(options);
  var appsModel = new AppsModel(options);
  var events = new _olySdk.Events(options);

  /**
  * Centralizer is the user avatar and decentralized app centralizer that get put in the top corner of the user's screen.
  */
  this.showCentralizer = function () {
    _this.hideGate();
    var self = _this,
        wrapper = document.createElement("div"),
        script = document.createElement('script');

    wrapper.id = 'olyauth__centralizer';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.right = '0';

    script.type = 'text/javascript';
    script.src = 'https://use.fontawesome.com/33c67670ff.js'; // Includes fontawesome, a dependency of the Centralizer component

    document.body.appendChild(script);
    document.body.appendChild(wrapper);

    // Get the user before we render anything
    userController.getCurrentUser().then(function (user) {
      return appsModel.listActive().then(function (apps) {
        var $injectElem = document.getElementById('olyauth__centralizer');

        // console.log('SDK USer',user,apps);
        if ($injectElem) {
          _reactDom2.default.render(_react2.default.createElement(_Centralizer.Centralizer, { user: user, apps: apps, options: options }), $injectElem);

          events.onCentralizerShow({ user: user, apps: apps }); //HOOK
        }
      });
    });
  };

  this.hideCentralizer = function () {
    var $injectElem = document.getElementById('olyauth__centralizer');

    if ($injectElem) {
      document.body.removeChild($injectElem);

      events.onCentralizerHide(true); //HOOK
    }
  };

  /**
  * Creates a new element and appends the React component
  */
  this.showGate = function () {
    _this.hideCentralizer();
    var self = _this,
        wrapper = document.createElement("div");

    wrapper.id = 'olyauth__wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.right = '0';
    wrapper.style.bottom = '0';
    wrapper.style.left = '0';

    document.body.appendChild(wrapper);

    var $injectElem = document.getElementById('olyauth__wrapper');
    console.log($injectElem);
    if ($injectElem) {
      _reactDom2.default.render(_react2.default.createElement(_Gate.Gate, { component: { slug: 'login', options: options } }), $injectElem);

      events.onGateShow(true); //HOOK
    }
  };

  this.hideGate = function () {
    var $injectElem = document.getElementById('olyauth__wrapper');

    if ($injectElem) {
      document.body.removeChild($injectElem);

      events.onGateHide(true); //HOOK
    }
  };

  return {
    showCentralizer: this.showCentralizer,
    hideCentralizer: this.hideCentralizer,
    showGate: this.showGate,
    hideGate: this.hideGate
  };
}