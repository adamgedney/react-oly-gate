'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = centralizer;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = [];

function centralizer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	var _state = [].concat(_toConsumableArray(state)),
	    _data = Object.assign({}, action.data);

	switch (action.type) {
		case _constants.LINK_CHANGE:

			// use spread to enforce immutability
			return [].concat(_toConsumableArray(collections.replaceItem(_state, _data, 'id')));
			break;
		default:
			return state;
	}
}