'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Blank = function (_Component) {
  _inherits(Blank, _Component);

  function Blank() {
    _classCallCheck(this, Blank);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Blank).apply(this, arguments));
  }

  _createClass(Blank, [{
    key: 'render',
    value: function render() {
      var className = 'status-icon status-icon-blank';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
        // should use the default title value.
        a11yTitle = 'Blank';
      }
      var blankTitleId = 'blank-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': blankTitleId, version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: blankTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        )
      );
    }
  }]);

  return Blank;
}(_react.Component);

exports.default = Blank;
module.exports = exports['default'];