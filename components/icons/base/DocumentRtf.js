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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-document-rtf', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'document-rtf', defaultMessage: 'document-rtf' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24.4999 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'document-rtf' },
          _react2.default.createElement('rect', { id: '_x2E_svg_280_', x: '0.4999', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '4.9999,9 4.9999,1 18.0001,1 \r 22.9999,5.9999 22.9999,23 3.9999,23 \t' }),
          _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '16.9999,2 16.9999,7 22.9999,7 \t' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15.9999,7' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '1', y1: '13.0004', x2: '1', y2: '20.0004' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M3,17.0004c1.1046,0,2-0.8954,2-2s-0.8954-2-2-2H1\r v4H3z' }),
          _react2.default.createElement('polygon', { points: '4.246,20.0004 1.5437,16.2977 3.7342,16.2977 6.4561,20.0201 \t' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '12.5557', y1: '13', x2: '6.5557', y2: '13' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '9.5557', y1: '12', x2: '9.5557', y2: '20' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '19.5557', y1: '13', x2: '13.5557', y2: '13' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '14.5557', y1: '12', x2: '14.5557', y2: '20' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '18.5557', y1: '17', x2: '13.5557', y2: '17' })
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
  a11yTitleId: 'document-rtf-title'
};

Icon.icon = true;

Icon.displayName = 'DocumentRtf';
module.exports = exports['default'];