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
  var debugLogger = options.debugMode ? console.log : function () {};

  if (window.Oly) {
    // Merge our options into the sdk options
    window.Oly.options = Object.assign({}, window.Oly.options, options);

    window.Oly.UI = new _UIController.UIController(options);
  }

  // if(options.debugMode){ 
  console.log('react-oly-gate | version ' + pjson.version);
  // }

  /** 
   * Show the gate if the user isn't logged in.
    * Defer 1 second to allow time for token refresh to kick in on page refreshes.
    * @todo Move the triggering of show and hide to an event
   */
  var revealGate = function revealGate(options, window) {
    debugLogger('** ROG : revealGate Ran', window.Oly && window.Oly.Permissions.loggedIn(), window.Oly.Permissions.loggedIn(), window.Oly);
    if (window.Oly && window.Oly.Permissions.loggedIn()) {
      debugLogger('** ROG : revealGate Ran showCentralizer');
      window.Oly.UI.showCentralizer();
    } else {
      if (options.displayOnAuthPage) {
        // Handle displaying as a modal based on login button click here
      } else {
        if (window.Oly) {
          debugLogger('** ROG : revealGate Ran showGate');
          window.Oly.UI.showGate();
        }
      }
    }
  };

  debugLogger('** ROG : Gate Initialized : Logged in? -> ', window.Oly.Permissions.loggedIn());
  setTimeout(function () {
    debugLogger('** ROG : Reveal Gate Started after 1 sec. | Logged in? -> ', window.Oly.Permissions.loggedIn());
    revealGate(options, window);
  }, 1000);
}

exports.Gate = Gate;