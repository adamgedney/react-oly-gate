import {UIController} from './controllers/UIController';

import { 
  Controllers,
  utils 
} from '@olympusat/oly-sdk';

const {
  GateController,
  UserController,
  SessionController,
  PermissionsController, 
  AuthController,
} = Controllers; 
const pjson = require('../package.json');

/** 
 * Entry point for beginning the Gate behaviors & Auth flows
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
function Gate(options){  
    utils.options = options;

    if(window.Oly){
      // Merge our options into the sdk options
      window.Oly.options = Object.assign({},window.Oly.options,options);

      window.Oly.UI = new UIController(options);
    }
    
    // if(options.debugMode){ 
        console.log(`react-oly-gate | version ${pjson.version}`);
    // }
 
	/** 
	 * Show the gate if the user isn't logged in
	 */
  if (window.Oly && window.Oly.Permissions.loggedIn()) { 
    window.Oly.UI.showCentralizer(); 
  }else{  
        if(options.displayOnAuthPage){
            // Handle displaying as a modal based on login button click here
        }else{
          if(window.Oly){
            window.Oly.UI.showGate();            
          }        
        }
  }
}

export {
  Gate 
};