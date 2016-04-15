'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'control-icon';

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var a11yTitleId = _props.a11yTitleId;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var large = _props.large;
      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var size = _props2.size;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-soa', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'soa', defaultMessage: 'soa' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 25 25.15', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'soa' },
          _react2.default.createElement('rect', { id: '_x2E_svg_223_', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M6,9.15c-1.6545,0-3-1.3458-3-3s1.3455-3,3-3\r s3,1.3458,3,3S7.6545,9.15,6,9.15z M9,6.1501L12,6.15 M10.2426,10.3926L8.1212,8.2714 M6,12.15l-0.0001-3 M3.8786,8.2712\r l-2.1212,2.1214 M0,6.15h3 M1.7574,1.9074l2.1213,2.1213 M6,3.15v-3 M8.1213,4.0287l2.1213-2.1213 M22,11.15c0-1.6542-1.3455-3-3-3\r s-3,1.3458-3,3s1.3455,3,3,3S22,12.8042,22,11.15z M22,11.1501l3-0.0001 M21.1212,13.2714l2.1214,2.1212 M18.9999,14.15l0.0001,3\r M16.8786,13.2712l-2.1212,2.1214 M13,11.15h3 M11,19.15c0-1.6542-1.3455-3-3-3s-3,1.3458-3,3s1.3455,3,3,3S11,20.8042,11,19.15z\r M14,19.15l-3,0.0001 M10.1212,21.2714l2.1214,2.1212 M8,25.15l-0.0001-3 M3.7574,23.3926l2.1212-2.1214 M2,19.15h3\r M5.8787,17.0287l-2.1213-2.1213 M8,16.15v-3 M10.1213,17.0287l2.1213-2.1213 M16.8787,9.0287l-2.1213-2.1213 M19,8.15v-3\r M21.1213,9.0287l2.1213-2.1213' })
        )
      );
    }
  }]);

  return Icon;
}(_react.Component);

exports.default = Icon;
;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'soa-title'
};

Icon.icon = true;

Icon.displayName = 'Soa';
module.exports = exports['default'];