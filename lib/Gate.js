'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gate = undefined;

var _UIController = require('./controllers/UIController');

var _olySdk = require('@olympusat/oly-sdk');

var GateController = _olySdk.Controllers.GateController,
    UserController = _olySdk.Controllers.UserController,
    SessionController = _olySdk.Controllers.SessionController,
    PermissionsController = _olySdk.Controllers.PermissionsController,
    AuthController = _olySdk.Controllers.AuthController;

var pjson = require('../package.json');

/** 
 * Entry point for beginning the Gate behaviors & Auth flows
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
function Gate(options) {
  _olySdk.utils.options = options;

  if (window.Oly) {
    // Merge our options into the sdk options
    window.Oly.options = Object.assign({}, window.Oly.options, options);

    window.Oly.UI = new _UIController.UIController(options);
  }

  // if(options.debugMode){ 
  console.log('react-oly-gate | version ' + pjson.version);
  // }

  /** 
   * Show the gate if the user isn't logged in
   */
  if (window.Oly && window.Oly.Permissions.loggedIn()) {
    window.Oly.UI.showCentralizer();
  } else {
    if (options.displayOnAuthPage) {
      // Handle displaying as a modal based on login button click here
    } else {
      if (window.Oly) {
        window.Oly.UI.showGate();
      }
    }
  }
}

exports.Gate = Gate;