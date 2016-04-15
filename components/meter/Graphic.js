'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _utils.classRoot;

var Graphic = function (_Component) {
  _inherits(Graphic, _Component);

  function Graphic(props) {
    _classCallCheck(this, Graphic);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Graphic).call(this));

    _this.state = _this._stateFromProps(props);

    _this._onEnter = _this._onEnter.bind(_this);
    _this._onRequestForNextLegend = _this._onRequestForNextLegend.bind(_this);
    _this._onRequestForPreviousLegend = _this._onRequestForPreviousLegend.bind(_this);
    return _this;
  }

  _createClass(Graphic, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._keyboardHandlers = {
        left: this._onRequestForPreviousLegend,
        up: this._onRequestForPreviousLegend,
        right: this._onRequestForNextLegend,
        down: this._onRequestForNextLegend,
        enter: this._onEnter,
        space: this._onEnter
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      this.setState(state);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }

    // override

  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      return {};
    }

    // override

  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      return "";
    }
  }, {
    key: '_renderSlice',
    value: function _renderSlice(trackIndex, item, itemIndex, startValue, threshold) {
      var path = void 0;
      if (!item.hidden) {
        var classes = [CLASS_ROOT + '__slice'];
        var activeMeterSlice = void 0;
        if (itemIndex === this.props.activeIndex) {
          activeMeterSlice = 'activeMeterSlice';
          classes.push(CLASS_ROOT + '__slice--active');
        }

        if (item.onClick) {
          classes.push(CLASS_ROOT + "__slice--clickable");
        }

        classes.push('color-index-' + item.colorIndex);

        var commands = this._sliceCommands(trackIndex, item, startValue);

        if (threshold) {
          path = (0, _utils.buildPath)(itemIndex, commands, classes, this.props.onActivate, item.onClick);
        } else {
          var a11yDescId = this.props.a11yDescId + '_' + itemIndex;
          var a11yTitle = item.value + ' ' + (item.label || this.props.units || '');

          path = (0, _utils.buildPath)(itemIndex, commands, classes, this.props.onActivate, item.onClick, a11yDescId, a11yTitle, activeMeterSlice);
        }
      }

      return path;
    }
  }, {
    key: '_renderSlices',
    value: function _renderSlices(series, trackIndex, threshold) {
      var startValue = this.props.min.value;

      var paths = series.map(function (item, itemIndex) {
        var path = this._renderSlice(trackIndex, item, itemIndex, startValue, threshold);
        startValue += item.value;
        return path;
      }, this);

      return paths;
    }
  }, {
    key: '_loadingCommands',
    value: function _loadingCommands() {
      return this._sliceCommands(0, this.props.max, this.props.min.value);
    }
  }, {
    key: '_onRequestForPreviousLegend',
    value: function _onRequestForPreviousLegend(e) {
      e.preventDefault();
      if (document.activeElement === this.refs.meter) {
        var totalValueCount = _reactDom2.default.findDOMNode(this.refs.meterValues).childNodes.length;

        if (this.props.activeIndex - 1 < 0) {
          this.props.onActivate(totalValueCount - 1);
        } else {
          this.props.onActivate(this.props.activeIndex - 1);
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_onRequestForNextLegend',
    value: function _onRequestForNextLegend(e) {
      e.preventDefault();
      if (document.activeElement === this.refs.meter) {
        var totalValueCount = _reactDom2.default.findDOMNode(this.refs.meterValues).childNodes.length;

        if (this.props.activeIndex + 1 >= totalValueCount) {
          this.props.onActivate(0);
        } else {
          this.props.onActivate(this.props.activeIndex + 1);
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      if (document.activeElement === this.refs.meter) {
        if (this.refs.activeMeterSlice) {
          var index = this.refs.activeMeterSlice.getAttribute('data-index');

          //trigger click on active meter slice
          if (this.props.series[index].onClick) {
            this.props.series[index].onClick();
          }
        }
      }
    }
  }, {
    key: '_renderLoading',
    value: function _renderLoading() {
      var classes = [CLASS_ROOT + '__slice'];
      classes.push(CLASS_ROOT + '__slice--loading');
      classes.push("color-index-loading");
      var commands = this._loadingCommands();
      return [_react2.default.createElement('path', { key: 'loading', className: classes.join(' '), d: commands })];
    }
  }, {
    key: '_renderValues',
    value: function _renderValues() {
      var _this2 = this;

      var values = void 0;
      if (this.props.stacked) {
        values = this._renderSlices(this.props.series, 0);
      } else {
        values = this.props.series.map(function (item, index) {
          return _this2._renderSlice(index, item, index, _this2.props.min.value);
        });
      }
      if (values.length === 0) {
        values = this._renderLoading();
      }
      return _react2.default.createElement(
        'g',
        { ref: 'meterValues', className: CLASS_ROOT + '__values' },
        values
      );
    }
  }, {
    key: '_renderTracks',
    value: function _renderTracks() {
      var _this3 = this;

      var trackValue = { value: this.props.max.value, colorIndex: 'unset' };
      var tracks = void 0;
      if (this.props.stacked) {
        tracks = this._renderSlice(0, trackValue, 0, this.props.min.value, true);
      } else {
        tracks = this.props.series.map(function (item, index) {
          return _this3._renderSlice(index, trackValue, index, _this3.props.min.value, true);
        });
      }
      return _react2.default.createElement(
        'g',
        { className: CLASS_ROOT + '__tracks' },
        tracks
      );
    }
  }, {
    key: '_renderThresholds',
    value: function _renderThresholds() {
      var result = void 0;
      var thresholds = this._renderSlices(this.props.thresholds, -0.4, true);
      if (thresholds.length > 0) {
        result = _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__thresholds' },
          thresholds
        );
      }
      return result;
    }
  }, {
    key: '_renderTotal',
    value: function _renderTotal() {
      return this.props.series.map(function (s) {
        return s.value;
      }).reduce(function (prev, curr) {
        return prev + curr;
      }, 0);
    }
  }, {
    key: '_renderTopLayer',
    value: function _renderTopLayer() {
      return null;
    }
  }, {
    key: '_renderInlineLegend',
    value: function _renderInlineLegend() {
      return null;
    }
  }, {
    key: '_renderA11YTitle',
    value: function _renderA11YTitle() {
      var a11yTitle = this.props.a11yTitle;
      if (!a11yTitle) {
        var graphicTitle = _Intl2.default.getMessage(this.context.intl, this.displayName);
        var meterTitle = _Intl2.default.getMessage(this.context.intl, 'Meter');

        a11yTitle = graphicTitle + ' ' + meterTitle;
      }

      return a11yTitle;
    }
  }, {
    key: '_renderA11YDesc',
    value: function _renderA11YDesc() {
      var _this4 = this;

      var a11yDesc = this.props.a11yDesc;
      var units = this.props.units || '';
      if (!a11yDesc) {
        var valueLabel = _Intl2.default.getMessage(this.context.intl, 'Value');
        a11yDesc = ', ' + valueLabel + ': ' + this._renderTotal() + ' ' + units;

        if (this.props.min) {
          var minLabel = _Intl2.default.getMessage(this.context.intl, 'Min');
          a11yDesc += ', ' + minLabel + ': ' + this.props.min.value + ' ' + units;
        }

        if (this.props.max) {
          var maxLabel = _Intl2.default.getMessage(this.context.intl, 'Max');
          a11yDesc += ', ' + maxLabel + ': ' + this.props.max.value + ' ' + units;
        }

        if (this.props.thresholds) {
          (function () {
            var thresholdLabel = _Intl2.default.getMessage(_this4.context.intl, 'Threshold');
            _this4.props.thresholds.forEach(function (threshold) {
              if (threshold.ariaLabel) {
                a11yDesc += ', ' + thresholdLabel + ': ' + threshold.ariaLabel;
              }
            });
          })();
        }
      }

      return a11yDesc;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var tracks = this._renderTracks();
      var values = this._renderValues();
      var thresholds = this._renderThresholds();
      var topLayer = this._renderTopLayer();
      var inlineLegend = this._renderInlineLegend();

      var a11yTitle = this._renderA11YTitle();
      var a11yDesc = this._renderA11YDesc();

      var activeDescendant = this.props.a11yDescId + '_' + (this.props.activeIndex || 0);

      return _react2.default.createElement(
        'svg',
        { ref: 'meter', className: CLASS_ROOT + '__graphic',
          tabIndex: '0', role: this.props.a11yRole,
          width: this.state.viewBoxWidth,
          height: this.state.viewBoxHeight,
          viewBox: "0 0 " + this.state.viewBoxWidth + " " + this.state.viewBoxHeight,
          preserveAspectRatio: 'xMidYMid meet',
          'aria-activedescendant': activeDescendant,
          'aria-labelledby': this.props.a11yTitleId + ' ' + this.props.a11yDescId },
        _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'desc',
          { id: this.props.a11yDescId },
          a11yDesc
        ),
        tracks,
        thresholds,
        values,
        inlineLegend,
        topLayer
      );
    }
  }]);

  return Graphic;
}(_react.Component);

exports.default = Graphic;


Graphic.propTypes = _extends({
  a11yRole: _react.PropTypes.string,
  stacked: _react.PropTypes.bool,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })).isRequired,
  vertical: _react.PropTypes.bool
}, _utils.propTypes);

Graphic.contextTypes = {
  intl: _react.PropTypes.object
};

Graphic.defaultProps = {
  a11yRole: 'img'
};
module.exports = exports['default'];