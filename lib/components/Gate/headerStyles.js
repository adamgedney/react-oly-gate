'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = '\n\n    .olyauth *{\n        outline: none; \n    }\n\n\t.olyauth input[type="submit"]:hover{\n\t\tcursor: pointer;\n\t\topacity: 0.7;\n\t}\n\n\t.olyauth input[type="submit"]{\n\t\tbackground: ' + _utils2.default.OlyAuthMeta.brandingColor + ' !important\n\t}\n\n    .olyauth__submit:hover{\n        cursor: pointer;\n        opacity: 0.7;\n    }\n\n\t.bold{\n\t\tfont-weight: 700;\n\t}\n    .olyauth__loader{\n        position: absolute;\n        bottom: 0;\n    }\n    .olyauth__loader--hidden{\n        display: none;\n    }\n\n    .loader,\n    .loader:before,\n    .loader:after {\n        border-radius: 50%;\n        width: 12px;\n        height: 12px;\n        -webkit-animation-fill-mode: both;\n        animation-fill-mode: both;\n        -webkit-animation: load7 1.8s infinite ease-in-out;\n        animation: load7 1.8s infinite ease-in-out;\n    }\n    .loader {\n        color: #ffffff;\n        font-size: 10px;\n        margin: 6px 36px;\n        position: absolute;\n        bottom: 32px;\n        text-indent: -9999em;\n        -webkit-transform: translateZ(0);\n        -ms-transform: translateZ(0);\n        transform: translateZ(0);\n        -webkit-animation-delay: -0.16s;\n        animation-delay: -0.16s;\n    }\n    .loader:before,\n    .loader:after {\n        content: \'\';\n        position: absolute;\n        top: 0;\n    }\n    .loader:before {\n    left: -2.5em;\n    -webkit-animation-delay: -0.32s;\n    animation-delay: -0.32s;\n    }\n    .loader:after {\n    left: 2.5em;\n    }\n    @-webkit-keyframes load7 {\n    0%,\n    80%,\n    100% {\n        box-shadow: 0 2.5em 0 -1.3em;\n    }\n    40% {\n        box-shadow: 0 2.5em 0 0;\n    }\n    }\n    @keyframes load7 {\n    0%,\n    80%,\n    100% {\n        box-shadow: 0 2.5em 0 -1.3em;\n    }\n    40% { \n        box-shadow: 0 2.5em 0 0;\n    }\n    }\n';