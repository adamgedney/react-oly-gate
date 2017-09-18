'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.l = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fastMemoize = require('fast-memoize');

var _fastMemoize2 = _interopRequireDefault(_fastMemoize);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = JSON.parse(localStorage.getItem(_constants.OPTIONS_LS_KEY));

// const call = memoize((url,data,key)=>new Promise((resolve,reject)=>{
var _call = function _call(url, data) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return new _bluebird2.default(function (resolve, reject) {
        //Reason :  // Re establish options if needed
        if (!options) {
            options = JSON.parse(localStorage.getItem(_constants.OPTIONS_LS_KEY));
        }

        var debugLogger = options && options.debugMode ? console.log : function () {};

        window.Oly.Session.checkAndOrRenewToken().then(rq);

        // Only allow tokened requests. Non-token requests will be rejected by the API
        function rq(token) {
            var method = 'POST',
                key = opts.key; // For returning the proper graphql request structure
            debugLogger('SDK ARGS', url, key, JSON.stringify(data));

            if (token) {
                (0, _axios2.default)({
                    method: method,
                    url: url,
                    data: JSON.stringify(data) || false,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': token
                    }
                }).then(function (response) {
                    debugLogger('SDK CALL RESPONSE ', key, response);
                    if (response) {
                        if (response.hasOwnProperty('data')) {
                            if (response.data.hasOwnProperty('message') && response.message === 'Identity token has expired') {
                                resolve(response.data.message);
                                return true;
                            } else if (response.data.hasOwnProperty('errorMessage') || response.data.hasOwnProperty('errors')) {
                                resolve({ Error: response.data.errorMessage || response.data.errors, request: data });
                            } else if (response.data.hasOwnProperty('data')) {
                                // Attempt to handle singular and plural version of key
                                if (key && response.data.data.hasOwnProperty(key) || key && response.data.data.hasOwnProperty(key.slice(0, -1))) {
                                    if (response.data.data[key.slice(0, -1)]) {
                                        resolve(response.data.data[key.slice(0, -1)]);
                                    } else {
                                        resolve(response.data.data[key]);
                                    }
                                    return true;
                                } else {
                                    resolve(response.data.data);
                                    return true;
                                }
                            } else {
                                resolve(response.data);
                                return true;
                            }
                        } else {
                            resolve(response);
                            return true;
                        }
                    } else {
                        resolve({ Error: 'sdk call error', request: data });
                    }
                }).catch(function (error) {
                    debugLogger('SDK CALL ERROR **** ', error.toString(), typeof error === 'undefined' ? 'undefined' : _typeof(error), error.Error, url, data, opts);

                    if (error.toString().indexOf('Error: Network Error') > -1) {} else {
                        resolve({ Error: error });
                    }
                });
            } else {
                resolve({ Error: 'Client Token is null. Reauthenticate.' });
            }
        }
    });
};

//USAGE: import utils,{l} from './utils';
var l = exports.l = window.location.hostname === 'localhost' ? console.log : function () {};

exports.default = {
    options: undefined,
    OlyAuthMeta: {
        logo: options ? options.logo : '',
        brandingColor: options ? options.brandingColor : '',
        title: options ? options.title : ''
    },

    call: function call(url, data, opts) {
        return _call(url, data, opts);
    }, // memoized requests

    form: {
        diffPasswords: function diffPasswords(p1, p2) {
            return p1 === p2;
        },
        parse: function parse(form) {
            var $inputs = Array.prototype.slice.call(document.getElementsByTagName('input')); // COnvert to iterable array
            var obj = {};

            $inputs.forEach(function (input) {
                var name = input.getAttribute('name');

                // If it has a name, send it to our object
                if (name) {
                    obj[name.split('.')[1]] = input.value;
                }
            });

            return obj;
        }
    },

    /**
     * Used for user feedback after a form submit
     * Fires the message event to the parent to uinstruct it display the Message component
     * @param message
     * @param subMessage
     */
    displaySuccessFailMessage: function displaySuccessFailMessage(message, subMessage) {
        var event = document.createEvent('Event');

        window.location.href = document.location.origin + '/auth#slug=' + _constants.INTERFACE_MESSAGE;

        event.initEvent('interfaceChange', true, true);
        event.slug = _constants.INTERFACE_MESSAGE;
        event.message = message;
        event.subMessage = subMessage;

        document.dispatchEvent(event);
    },
    handleLinkClick: function handleLinkClick(e) {
        e.preventDefault();
        var $target = e.target,
            link = $target.getAttribute('href');

        /**
         * Set the url & fire an event to be picked up by the parent component to
         * switch the interface according to the link clicked
         * @type {string}
         */
        window.location.href = document.location.origin + link;
        var event = document.createEvent('Event');
        event.initEvent('interfaceChange', true, true);
        event.slug = link.split('#slug=')[1];

        document.dispatchEvent(event);
    },


    /**
     * Change the Gate interface
     * @param slug
     */
    sendToInterface: function sendToInterface(slug, data) {
        /**
         * Set the url & fire an event to be picked up by the parent component to
         * switch the interface according to the link clicked
         * @type {string}
         */
        window.location.href = document.location.origin + '/auth#slug=' + slug;
        var event = document.createEvent('Event');
        event.initEvent('interfaceChange', true, true);
        event.slug = slug;

        if (data) {
            event.d = data;
        }

        document.dispatchEvent(event);
    },
    removeQuotesFromJSONKeys: function removeQuotesFromJSONKeys(str) {
        return str.replace(/\"([^(\")"]+)\":/g, "$1:");
    },
    getMessageFromOptions: function getMessageFromOptions(key) {
        return window.Oly && window.Oly.options && window.Oly.options.messages && window.Oly.options.messages[key] ? window.Oly.options.messages[key] : false;
    },
    getTitleFromOptions: function getTitleFromOptions(rootKey, key) {
        return window.Oly && window.Oly.options && window.Oly.options.titles && window.Oly.options.titles[rootKey] && window.Oly.options.titles[rootKey][key] ? window.Oly.options.titles[rootKey][key] : false;
    }
};