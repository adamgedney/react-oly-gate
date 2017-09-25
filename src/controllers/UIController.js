/**
 * Handles interfacing with UI functionality ie. show/hide gate & centralizer
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Gate } from '../components/Gate';
import { Centralizer } from '../components/Centralizer';
// import {AppsModel} from '../models/AppsModel';
// import {UserController} from './UserController';
// import {Events} from '../Events';

import {
  Events,
  Controllers,
  Models
} from '@olympusat/oly-sdk';

const { UserController } = Controllers;
const { AppsModel } = Models;

export function UIController(options) {
  const userController = new UserController(options);
  const appsModel = new AppsModel(options);
  const events = new Events(options);

  /**
 * Centralizer is the user avatar and decentralized app centralizer that get put in the top corner of the user's screen.
 */
  this.showCentralizer = () => {
    this.hideGate();
    let self = this,
      wrapper = document.createElement("div"),
      script = document.createElement('script');

    wrapper.id = 'olyauth__centralizer';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.right = '0';

    script.type = 'text/javascript';
    script.src = 'https://use.fontawesome.com/33c67670ff.js';// Includes fontawesome, a dependency of the Centralizer component

    document.body.appendChild(script);
    document.body.appendChild(wrapper);

    // Get the user before we render anything
    userController.getCurrentUser()
      .then(user => {
        return appsModel.listActive()
          .then(apps => {
            const $injectElem = document.getElementById('olyauth__centralizer');

            // console.log('SDK USer',user,apps);
            if ($injectElem) {
              ReactDOM.render(<Centralizer user={user} apps={apps} options={options} />, $injectElem);

              events.onCentralizerShow({ user, apps });//HOOK
            }
          });
      });
  };

  this.hideCentralizer = () => {
    const $injectElem = document.getElementById('olyauth__centralizer');

    if ($injectElem) {
      document.body.removeChild($injectElem);

      events.onCentralizerHide(true);//HOOK
    }
  };

  /**
 * Creates a new element and appends the React component
 */
  this.showGate = () => {
    this.hideCentralizer();
    const self = this,
      wrapper = document.createElement("div");

    wrapper.id = 'olyauth__wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.right = '0';
    wrapper.style.bottom = '0';
    wrapper.style.left = '0';

    document.body.appendChild(wrapper);

    const $injectElem = document.getElementById('olyauth__wrapper');
console.log($injectElem);
    if ($injectElem) {
      ReactDOM.render(<Gate component={{ slug: 'login', options }} />, $injectElem);

      events.onGateShow(true);//HOOK
    }
  }

  this.hideGate = () => {
    const $injectElem = document.getElementById('olyauth__wrapper');

    if ($injectElem) {
      document.body.removeChild($injectElem);

      events.onGateHide(true);//HOOK
    }
  }

  return {
    showCentralizer: this.showCentralizer,
    hideCentralizer: this.hideCentralizer,
    showGate: this.showGate,
    hideGate: this.hideGate
  }
}