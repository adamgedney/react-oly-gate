'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTokenExpirationDate = getTokenExpirationDate;
exports.isTokenExpired = isTokenExpired;

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTokenExpirationDate(token) {
	var decoded = (0, _jwtDecode2.default)(token);
	if (!decoded.exp) {
		return null;
	}

	var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
	date.setUTCSeconds(decoded.exp);
	return date;
}

function isTokenExpired(token) {
	var date = getTokenExpirationDate(token);
	var offsetSeconds = 0;
	if (date === null) {
		return false;
	}
	return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
}