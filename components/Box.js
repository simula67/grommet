'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "box";

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Box).apply(this, arguments));
  }

  _createClass(Box, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onClick) {
        var clickCallback = function () {
          if (this.refs.boxContainer === document.activeElement) {
            this.props.onClick();
          }
        }.bind(this);

        _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
          enter: clickCallback,
          space: clickCallback
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onClick) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
      }
    }
  }, {
    key: '_addPropertyClass',
    value: function _addPropertyClass(classes, prefix, property, classProperty) {
      var choice = this.props[property];
      var propertyPrefix = classProperty || property;
      if (choice) {
        if (typeof choice === 'string') {
          classes.push(prefix + '--' + propertyPrefix + '-' + choice);
        } else if ((typeof choice === 'undefined' ? 'undefined' : _typeof(choice)) === 'object') {
          Object.keys(choice).forEach(function (key) {
            classes.push(prefix + '--' + propertyPrefix + '-' + key + '-' + choice[key]);
          });
        } else {
          classes.push(prefix + '--' + propertyPrefix);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = [CLASS_ROOT];
      var containerClasses = [CLASS_ROOT + "__container"];
      this._addPropertyClass(classes, CLASS_ROOT, 'full');
      this._addPropertyClass(classes, CLASS_ROOT, 'direction');
      this._addPropertyClass(classes, CLASS_ROOT, 'justify');
      this._addPropertyClass(classes, CLASS_ROOT, 'align');
      this._addPropertyClass(classes, CLASS_ROOT, 'alignContent', 'align-content');
      this._addPropertyClass(classes, CLASS_ROOT, 'reverse');
      this._addPropertyClass(classes, CLASS_ROOT, 'responsive');
      this._addPropertyClass(classes, CLASS_ROOT, 'pad');
      this._addPropertyClass(classes, CLASS_ROOT, 'separator');
      this._addPropertyClass(classes, CLASS_ROOT, 'textAlign', 'text-align');
      this._addPropertyClass(classes, CLASS_ROOT, 'wrap');
      if (this.props.hasOwnProperty('flex')) {
        if (this.props.flex) {
          classes.push('flex');
        } else {
          classes.push('no-flex');
        }
      }

      if (this.props.appCentered) {
        this._addPropertyClass(containerClasses, CLASS_ROOT + "__container", 'full');
        if (this.props.colorIndex) {
          containerClasses.push("background-color-index-" + this.props.colorIndex);
        }
        if (this.props.containerClassName) {
          containerClasses.push(this.props.containerClassName);
        }
      } else {
        if (this.props.colorIndex) {
          classes.push("background-color-index-" + this.props.colorIndex);
        }
      }

      var a11yProps = {};
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--clickable");
        if (this.props.focusable) {
          var boxLabel = this.props.a11yTitle || _Intl2.default.getMessage(this.context.intl, 'Box');
          a11yProps.tabIndex = 0;
          a11yProps["aria-label"] = boxLabel;
          a11yProps.role = this.props.role || 'link';
        }
      }

      var skipLinkAnchor = undefined;
      if (this.props.primary) {
        var mainContentLabel = _Intl2.default.getMessage(this.context.intl, 'Main Content');
        skipLinkAnchor = _react2.default.createElement(_SkipLinkAnchor2.default, { label: mainContentLabel });
      }

      if (this.props.className) {
        classes.push(this.props.className);
      }

      var style = {};
      if (this.props.texture && 'string' === typeof this.props.texture) {
        style.backgroundImage = this.props.texture;
      } else if (this.props.backgroundImage) {
        style.background = this.props.backgroundImage + " no-repeat center center";
        style.backgroundSize = "cover";
      }
      var texture = undefined;
      if ('object' === _typeof(this.props.texture)) {
        texture = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__texture" },
          this.props.texture
        );
      }

      var eventRegex = /^on[A-Z].*$/;
      var eventListeners = {};
      Object.keys(this.props).forEach(function (prop) {
        if (eventRegex.test(prop)) {
          eventListeners[prop] = _this2.props[prop];
        }
      });

      if (this.props.appCentered) {
        return _react2.default.createElement(
          'div',
          _extends({ ref: 'boxContainer', className: containerClasses.join(' '),
            style: style, role: this.props.role }, a11yProps, eventListeners),
          skipLinkAnchor,
          _react2.default.createElement(
            this.props.tag,
            { id: this.props.id, className: classes.join(' ') },
            texture,
            this.props.children
          )
        );
      } else {
        return _react2.default.createElement(
          this.props.tag,
          _extends({ ref: 'boxContainer', id: this.props.id,
            className: classes.join(' '), style: style,
            role: this.props.role, tabIndex: this.props.tabIndex }, a11yProps, eventListeners),
          skipLinkAnchor,
          texture,
          this.props.children
        );
      }
    }
  }]);

  return Box;
}(_react.Component);

exports.default = Box;

Box.propTypes = {
  a11yTitle: _react.PropTypes.string,
  align: _react.PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  alignContent: _react.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
  appCentered: _react.PropTypes.bool,
  backgroundImage: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  focusable: _react.PropTypes.bool,
  flex: _react.PropTypes.bool,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  onClick: _react.PropTypes.func,
  justify: _react.PropTypes.oneOf(['start', 'center', 'between', 'end']),
  pad: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['none', 'small', 'medium', 'large']), _react.PropTypes.shape({
    between: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    horizontal: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vertical: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
  })]),
  primary: _react.PropTypes.bool,
  reverse: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  role: _react.PropTypes.string,
  separator: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all', 'none']),
  tag: _react.PropTypes.string,
  textAlign: _react.PropTypes.oneOf(['left', 'center', 'right']),
  texture: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
  wrap: _react.PropTypes.bool
};

Box.contextTypes = {
  intl: _react.PropTypes.object
};

Box.defaultProps = {
  direction: 'column',
  pad: 'none',
  tag: 'div',
  responsive: true,
  focusable: true
};
module.exports = exports['default'];