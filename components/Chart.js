'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "chart";

var DEFAULT_WIDTH = 384;
var DEFAULT_HEIGHT = 192;
var XAXIS_HEIGHT = 24;
var YAXIS_WIDTH = 12;
var BAR_PADDING = 2;
var MIN_LABEL_WIDTH = 48;
var SPARKLINE_STEP_WIDTH = 6;
var SPARKLINE_BAR_PADDING = 1;
var POINT_RADIUS = 6;

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart(props) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Chart).call(this, props));

    _this._onRequestForNextLegend = _this._onRequestForNextLegend.bind(_this);
    _this._onRequestForPreviousLegend = _this._onRequestForPreviousLegend.bind(_this);
    _this._onMouseOver = _this._onMouseOver.bind(_this);
    _this._onMouseOut = _this._onMouseOut.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);

    _this.state = _this._stateFromProps(props, DEFAULT_WIDTH, DEFAULT_HEIGHT);
    return _this;
  }

  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._onResize();

      //only add listerners if graph is interactive
      if (this.props.legend) {
        this._keyboardHandlers = {
          left: this._onRequestForPreviousLegend,
          up: this._onRequestForPreviousLegend,
          right: this._onRequestForNextLegend,
          down: this._onRequestForNextLegend
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps, this.state.width, this.state.height);
      this.setState(state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._layout();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);

      if (this.props.legend) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: '_onRequestForNextLegend',
    value: function _onRequestForNextLegend(e) {
      e.preventDefault();
      if (document.activeElement === this.refs.chart) {

        var totalBandCount = _reactDom2.default.findDOMNode(this.refs.front).childNodes.length;

        if (this.state.activeXIndex - 1 < 0) {
          this._onMouseOver(totalBandCount - 1);
        } else {
          this._onMouseOver(this.state.activeXIndex - 1);
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_onRequestForPreviousLegend',
    value: function _onRequestForPreviousLegend(e) {
      e.preventDefault();
      if (document.activeElement === this.refs.chart) {

        var totalBandCount = _reactDom2.default.findDOMNode(this.refs.front).childNodes.length;

        if (this.state.activeXIndex + 1 >= totalBandCount) {
          this._onMouseOver(0);
        } else {
          this._onMouseOver(this.state.activeXIndex + 1);
        }

        //stop event propagation
        return true;
      }
    }
  }, {
    key: '_onMouseOver',
    value: function _onMouseOver(xIndex) {
      this.setState({ activeXIndex: xIndex });
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut() {
      this.setState({ activeXIndex: this.state.defaultXIndex });
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }

    // Performs some initial calculations to make subsequent calculations easier.

  }, {
    key: '_bounds',
    value: function _bounds(series, xAxisArg, width, height) {
      // normalize xAxis
      var xAxis = void 0;
      if (xAxisArg) {
        if (xAxisArg.data) {
          xAxis = xAxisArg;
        } else {
          xAxis = {
            data: xAxisArg,
            placement: 'top'
          };
        }
      } else {
        xAxis = { data: [] };
      }

      // analyze series data
      var minX = null;
      var maxX = null;
      var minY = null;
      var maxY = null;

      series.forEach(function (item) {
        item.values.forEach(function (value, xIndex) {
          var x = value[0];
          var y = value[1];

          if (null === minX) {
            minX = x;
            maxX = x;
            minY = y;
            maxY = y;
          } else {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
          if (xIndex >= xAxis.data.length) {
            xAxis.data.push({ value: x, label: '' });
          }
        });
      });

      if (null === minX) {
        minX = 0;
        maxX = 1;
        minY = 0;
        maxY = 100;
      }

      if ('bar' === this.props.type) {
        xAxis.data.forEach(function (obj, xIndex) {
          var sumY = 0;
          series.forEach(function (item) {
            sumY += item.values[xIndex][1];
          });
          maxY = Math.max(maxY, sumY);
        });
      }

      if (this.props.threshold) {
        minY = Math.min(minY, this.props.threshold);
        maxY = Math.max(maxY, this.props.threshold);
      }
      if (this.props.thresholds) {
        this.props.thresholds.forEach(function (obj) {
          maxY = Math.max(maxY, obj.value);
        });
      }
      if (this.props.hasOwnProperty('min')) {
        minY = this.props.min;
      }
      if (this.props.hasOwnProperty('max')) {
        maxY = this.props.max;
      }
      var spanX = maxX - minX;
      var spanY = maxY - minY;

      if (this.props.sparkline) {
        width = spanX * (SPARKLINE_STEP_WIDTH + SPARKLINE_BAR_PADDING);
      }

      var graphWidth = width;
      var graphHeight = height;
      if (this.props.thresholds) {
        graphWidth -= YAXIS_WIDTH;
      }
      if (xAxis.placement) {
        graphHeight -= XAXIS_HEIGHT;
      }
      var graphTop = 'top' === xAxis.placement ? XAXIS_HEIGHT : 0;
      // graphBottom is the bottom graph Y value
      var graphBottom = 'bottom' === xAxis.placement ? height - XAXIS_HEIGHT : height;

      var graphLeft = 0;
      var graphRight = graphWidth;
      if (this.props.points) {
        graphLeft += POINT_RADIUS + 2;
        graphRight -= POINT_RADIUS + 2;
      }

      var scaleX = graphWidth / spanX;
      var xStepWidth = Math.round(graphWidth / (xAxis.data.length - 1));
      if ('bar' === this.props.type) {
        // allow room for bar width for last bar
        scaleX = graphWidth / (spanX + spanX / (xAxis.data.length - 1));
        xStepWidth = Math.round(graphWidth / xAxis.data.length);
      }
      var scaleY = graphHeight / spanY;
      var barPadding = Math.max(BAR_PADDING, Math.round(xStepWidth / 8));
      if (this.props.sparkline) {
        xStepWidth = SPARKLINE_STEP_WIDTH;
        barPadding = SPARKLINE_BAR_PADDING;
      }

      var result = {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        spanX: spanX,
        spanY: spanY,
        scaleX: scaleX,
        scaleY: scaleY,
        graphWidth: graphWidth,
        graphHeight: graphHeight,
        graphTop: graphTop,
        graphBottom: graphBottom,
        graphLeft: graphLeft,
        graphRight: graphRight,
        xStepWidth: xStepWidth,
        barPadding: barPadding,
        xAxis: xAxis
      };

      return result;
    }

    // Aligns the legend with the current position of the cursor, if any.

  }, {
    key: '_alignLegend',
    value: function _alignLegend() {
      if (this.state.activeXIndex >= 0 && this.refs.cursor) {
        var bounds = this.state.bounds;
        var cursorElement = this.refs.cursor;
        var cursorRect = cursorElement.getBoundingClientRect();
        var element = this.refs.chart;
        var rect = element.getBoundingClientRect();
        var legendElement = _reactDom2.default.findDOMNode(this.refs.legend);
        var legendRect = legendElement.getBoundingClientRect();

        var left = cursorRect.left - rect.left - legendRect.width - 1;
        // if the legend would be outside the graphic, orient it to the right.
        if (left < 0) {
          left += legendRect.width + 2;
        }

        legendElement.style.left = '' + left + 'px ';
        legendElement.style.top = '' + bounds.graphTop + 'px ';
      }
    }

    // Adjusts the legend position and set the width, height, and
    // redo the bounds calculations.
    // Called whenever the browser resizes or new properties arrive.

  }, {
    key: '_layout',
    value: function _layout() {
      if (this.props.legend && 'below' !== this.props.legend.position) {
        this._alignLegend();
      }
      var element = this.refs.chart;
      var rect = element.getBoundingClientRect();
      if (rect.width !== this.state.width || rect.height !== this.state.height) {
        var bounds = this._bounds(this.props.series, this.props.xAxis, rect.width, rect.height);
        var width = rect.width;
        if (this.props.sparkline) {
          width = bounds.graphWidth;
        }
        this.setState({
          width: width,
          height: rect.height,
          bounds: bounds
        });
      }
    }

    // Generates state based on the provided props.

  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props, width, height) {
      var bounds = this._bounds(props.series, props.xAxis, width, height);
      var defaultXIndex = -1;
      if (props.series && props.series.length > 0) {
        defaultXIndex = 0;
      }
      if (props.hasOwnProperty('important')) {
        defaultXIndex = props.important;
      }
      var activeXIndex = defaultXIndex;
      if (this.state && this.state.activeXIndex >= 0) {
        activeXIndex = this.state.activeXIndex;
      }
      // normalize size
      var size = props.size || (props.small ? 'small' : props.large ? 'large' : null);
      return {
        bounds: bounds,
        defaultXIndex: defaultXIndex,
        activeXIndex: activeXIndex,
        width: width,
        height: height,
        size: size
      };
    }

    // Translates X value to X coordinate.

  }, {
    key: '_translateX',
    value: function _translateX(x) {
      var bounds = this.state.bounds;
      return Math.max(bounds.graphLeft, Math.min(bounds.graphRight, Math.round((x - bounds.minX) * bounds.scaleX)));
    }

    // Translates Y value to Y coordinate.

  }, {
    key: '_translateY',
    value: function _translateY(y) {
      var bounds = this.state.bounds;
      // leave room for line width since strokes are aligned to the center
      return Math.max(1, bounds.graphBottom - Math.max(1, this._translateHeight(y)));
    }

    // Translates Y value to graph height.

  }, {
    key: '_translateHeight',
    value: function _translateHeight(y) {
      var bounds = this.state.bounds;
      return Math.round((y - bounds.minY) * bounds.scaleY);
    }

    // Translates X and Y values to X and Y coordinates.

  }, {
    key: '_coordinates',
    value: function _coordinates(point) {
      return [this._translateX(point[0]), this._translateY(point[1])];
    }

    // Uses the provided colorIndex or provides one based on the seriesIndex.

  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, seriesIndex) {
      return item.colorIndex || 'graph-' + (seriesIndex + 1);
    }

    // Determines what the appropriate control coordinates are on
    // either side of the coordinate at the specified index.
    // This calculation is a simplified smoothing function that
    // just looks at whether the line through this coordinate is
    // ascending, descending or not. Peaks, valleys, and flats are
    // treated the same.

  }, {
    key: '_controlCoordinates',
    value: function _controlCoordinates(coordinates, index) {
      var current = coordinates[index];
      // Use previous and next coordinates when available, otherwise use
      // the current coordinate for them.
      var previous = current;
      if (index > 0) {
        previous = coordinates[index - 1];
      }
      var next = current;
      if (index < coordinates.length - 1) {
        next = coordinates[index + 1];
      }

      // Put the control X coordinates midway between the coordinates.
      var deltaX = (current[0] - previous[0]) / 2;
      var deltaY = void 0;

      // Start with a flat slope. This works for peaks, valleys, and flats.
      var first = [current[0] - deltaX, current[1]];
      var second = [current[0] + deltaX, current[1]];

      if (previous[1] < current[1] && current[1] < next[1]) {
        // Ascending, use the minimum positive slope.
        deltaY = Math.min((current[1] - previous[1]) / 2, (next[1] - current[1]) / 2);
        first[1] = current[1] - deltaY;
        second[1] = current[1] + deltaY;
      } else if (previous[1] > current[1] && current[1] > next[1]) {
        // Descending, use the minimum negative slope.
        deltaY = Math.min((previous[1] - current[1]) / 2, (current[1] - next[1]) / 2);
        first[1] = current[1] + deltaY;
        second[1] = current[1] - deltaY;
      }
      return [first, second];
    }

    // Converts the series data into paths for line or area types.

  }, {
    key: '_renderLinesOrAreas',
    value: function _renderLinesOrAreas() {
      var bounds = this.state.bounds;
      var values = this.props.series.map(function (item, seriesIndex) {

        // Get all coordinates up front so they are available
        // if we are drawing a smooth chart.
        var coordinates = item.values.map(function (value) {
          return this._coordinates(value);
        }, this);

        var colorIndex = this._itemColorIndex(item, seriesIndex);
        var commands = null;
        var controlCoordinates = null;
        var previousControlCoordinates = null;
        var points = [];

        // Build the commands for this set of coordinates.
        coordinates.forEach(function (coordinate, index) {
          if (this.props.smooth) {
            controlCoordinates = this._controlCoordinates(coordinates, index);
          }
          if (0 === index) {
            commands = "M" + coordinate.join(',');
          } else {
            if (this.props.smooth) {
              // Use the previous right control coordinate and the current
              // left control coordinate. We do this because we calculate
              // the left and right sides for a particular index together,
              // so the path is smooth but the SVG C command needs the
              // right one from the previous index and the left one from
              // the current index.
              commands += " C" + previousControlCoordinates[1].join(',') + " " + controlCoordinates[0].join(',') + " " + coordinate.join(',');
            } else {
              commands += " L" + coordinate.join(',');
            }
          }

          if (this.props.points && !this.props.sparkline) {
            var x = Math.max(POINT_RADIUS + 1, Math.min(bounds.graphWidth - (POINT_RADIUS + 1), coordinate[0]));
            points.push(_react2.default.createElement('circle', { key: index,
              className: CLASS_ROOT + "__values-point color-index-" + colorIndex,
              cx: x, cy: coordinate[1], r: POINT_RADIUS }));
          }

          previousControlCoordinates = controlCoordinates;
        }, this);

        var linePath = void 0;
        if ('line' === this.props.type || this.props.points) {
          var classes = [CLASS_ROOT + "__values-line", "color-index-" + colorIndex];
          linePath = _react2.default.createElement('path', { fill: 'none', className: classes.join(' '), d: commands });
        }

        var areaPath = void 0;
        if ('area' === this.props.type) {
          // For area charts, close the path by drawing down to the bottom
          // and across to the bottom of where we started.
          var close = 'L' + coordinates[coordinates.length - 1][0] + ',' + bounds.graphBottom + 'L' + coordinates[0][0] + ',' + bounds.graphBottom + 'Z';
          var areaCommands = commands + close;
          var _classes = [CLASS_ROOT + "__values-area", "color-index-" + colorIndex];

          areaPath = _react2.default.createElement('path', { stroke: 'none', className: _classes.join(' '), d: areaCommands });
        }

        return _react2.default.createElement(
          'g',
          { key: 'line_group_' + seriesIndex },
          areaPath,
          linePath,
          points
        );
      }, this);

      return values;
    }

    // Converts the series data into rects for bar types.

  }, {
    key: '_renderBars',
    value: function _renderBars() {
      var bounds = this.state.bounds;

      var values = bounds.xAxis.data.map(function (obj, xIndex) {
        var baseY = bounds.minY;
        var stepBars = this.props.series.map(function (item, seriesIndex) {

          var colorIndex = item.colorIndex || 'graph-' + (seriesIndex + 1);
          var value = item.values[xIndex];
          var stepBarHeight = this._translateHeight(value[1]);
          var stepBarBase = this._translateHeight(baseY);
          baseY += value[1];

          var classes = [CLASS_ROOT + "__values-bar", "color-index-" + colorIndex];
          if (!this.props.legend || xIndex === this.state.activeXIndex) {
            classes.push(CLASS_ROOT + "__values-bar--active");
          }

          if ('bottom' === bounds.xAxis.placement) {
            stepBarBase += XAXIS_HEIGHT;
          }

          return _react2.default.createElement('rect', { key: 'bar_rect_' + item.label || seriesIndex,
            className: classes.join(' '),
            x: this._translateX(value[0]) + bounds.barPadding,
            y: this.state.height - (stepBarHeight + stepBarBase),
            width: bounds.xStepWidth - 2 * bounds.barPadding,
            height: stepBarHeight });
        }, this);

        return _react2.default.createElement(
          'g',
          { key: 'bar_' + xIndex },
          stepBars
        );
      }, this);

      return values;
    }

    // Converts the threshold value into a line.

  }, {
    key: '_renderThreshold',
    value: function _renderThreshold() {
      var y = this._translateY(this.props.threshold);
      var commands = 'M0,' + y + 'L' + this.state.width + ',' + y;
      return _react2.default.createElement(
        'g',
        { className: CLASS_ROOT + "__threshold", role: 'presentation' },
        _react2.default.createElement('path', { fill: 'none', d: commands })
      );
    }
  }, {
    key: '_labelPosition',
    value: function _labelPosition(value, bounds) {
      var x = this._translateX(value);
      var startX = x;
      var anchor = void 0;
      if ('line' === this.props.type || 'area' === this.props.type) {
        // Place the text in the middle for line and area type charts.
        anchor = 'middle';
        startX = x - MIN_LABEL_WIDTH / 2;
      }
      if (x <= 0) {
        // This is the first data point, align the text to the left edge.
        x = 0;
        startX = x;
        anchor = 'start';
      }
      if (x >= bounds.graphWidth - MIN_LABEL_WIDTH) {
        // This is the last data point, align the text to the right edge.
        x = bounds.graphWidth;
        startX = x - MIN_LABEL_WIDTH;
        anchor = 'end';
      } else if ('bar' === this.props.type) {
        x += bounds.barPadding;
        startX = x;
      }
      return { x: x, anchor: anchor, startX: startX, endX: startX + MIN_LABEL_WIDTH };
    }
  }, {
    key: '_labelOverlaps',
    value: function _labelOverlaps(pos1, pos2) {
      return pos1 && pos2 && pos1.endX > pos2.startX && pos1.startX < pos2.endX;
    }

    // Converts the xAxis labels into texts.

  }, {
    key: '_renderXAxis',
    value: function _renderXAxis() {
      var bounds = this.state.bounds;
      var labelY = void 0;
      if ('bottom' === bounds.xAxis.placement) {
        labelY = this.state.height - Math.round(XAXIS_HEIGHT * 0.3);
      } else {
        labelY = Math.round(XAXIS_HEIGHT * 0.6);
      }
      var priorPosition = null;
      var activePosition = null;
      if (this.state.activeXIndex >= 0 && bounds.xAxis.data.length > this.state.activeXIndex) {
        activePosition = this._labelPosition(bounds.xAxis.data[this.state.activeXIndex].value, bounds);
      }
      var lastPosition = null;
      if (bounds.xAxis.data.length > 0) {
        lastPosition = this._labelPosition(bounds.xAxis.data[bounds.xAxis.data.length - 1].value, bounds);
      }

      var labels = bounds.xAxis.data.map(function (obj, xIndex) {
        var classes = [CLASS_ROOT + "__xaxis-index"];
        if (xIndex === this.state.activeXIndex) {
          classes.push(CLASS_ROOT + "__xaxis-index--active");
        }
        var position = this._labelPosition(obj.value, bounds);

        // Ensure we don't overlap labels. But, make sure we show the first and
        // last ones.
        if (this._labelOverlaps(position, activePosition) || xIndex !== 0 && xIndex !== bounds.xAxis.data.length - 1 && (this._labelOverlaps(position, priorPosition) || this._labelOverlaps(position, lastPosition))) {
          classes.push(CLASS_ROOT + "__xaxis-index--eclipse");
        } else {
          priorPosition = position;
        }

        return _react2.default.createElement(
          'g',
          { key: 'x_axis_' + xIndex, className: classes.join(' ') },
          _react2.default.createElement(
            'text',
            { x: position.x, y: labelY, role: 'presentation',
              textAnchor: position.anchor, fontSize: 16 },
            obj.label
          )
        );
      }, this);

      return _react2.default.createElement(
        'g',
        { ref: 'xAxis', className: CLASS_ROOT + "__xaxis" },
        labels
      );
    }

    // Vertical bars for thresholds.

  }, {
    key: '_renderYAxis',
    value: function _renderYAxis() {
      var bounds = this.state.bounds;
      var start = bounds.minY;
      var end = void 0;
      var width = Math.max(4, YAXIS_WIDTH / 2);

      var bars = this.props.thresholds.map(function (item, index) {
        var classes = [CLASS_ROOT + "__bar"];
        classes.push("color-index-" + (item.colorIndex || 'graph-' + (index + 1)));
        if (index < this.props.thresholds.length - 1) {
          end = this.props.thresholds[index + 1].value;
        } else {
          end = bounds.maxY;
        }
        var height = this._translateHeight(end - start);
        var y = this._translateY(end);
        start = end;

        return _react2.default.createElement('rect', { key: 'y_rect_' + index,
          className: classes.join(' '),
          x: this.state.width - width,
          y: y,
          width: width,
          height: height });
      }, this);

      return _react2.default.createElement(
        'g',
        { ref: 'yAxis', className: CLASS_ROOT + "__yaxis" },
        bars
      );
    }
  }, {
    key: '_activeSeriesAsString',
    value: function _activeSeriesAsString() {
      var total = 0;
      var seriesText = this._getActiveSeries().map(function (currentSeries) {
        total += currentSeries.value;

        var stringify = [currentSeries.label];

        if (currentSeries.value !== undefined) {
          stringify.push(': ' + currentSeries.value);

          if (currentSeries.units) {
            stringify.push(' ' + currentSeries.units);
          }
        }

        return stringify.join('');
      }).join('; ');

      var totalText = '';
      if (this.props.legend.total) {
        var totalMessage = _Intl2.default.getMessage(this.context.intl, 'Total');
        totalText = totalMessage + ': ' + total + this.props.units || '';
        seriesText += ', ' + totalText;
      }

      return seriesText;
    }

    // Create vertical rects for each X data point.
    // These are used to track the mouse hover.

  }, {
    key: '_renderXBands',
    value: function _renderXBands(layer) {
      var className = CLASS_ROOT + "__" + layer;
      var bounds = this.state.bounds;

      var bands = bounds.xAxis.data.map(function (obj, xIndex) {
        var classes = [className + "-xband"];
        if (xIndex === this.state.activeXIndex) {
          classes.push(className + "-xband--active");
        }

        // For bar charts, the band is left aligned with the bars.
        var x = this._translateX(obj.value);
        if ('line' === this.props.type || 'area' === this.props.type) {
          // For line and area charts, the band is centered.
          x -= bounds.xStepWidth / 2;
        }

        var onMouseOver = void 0;
        var onMouseOut = void 0;
        if ('front' === layer) {
          onMouseOver = this._onMouseOver.bind(this, xIndex);
          onMouseOut = this._onMouseOut.bind(this, xIndex);
        }

        var xBandId = this.props.a11yTitleId + '_x_band_' + xIndex;
        var xBandTitleId = this.props.a11yTitleId + '_x_band_title_' + xIndex;

        var seriesText = this._activeSeriesAsString();

        return _react2.default.createElement(
          'g',
          { key: xBandId, id: xBandId, className: classes.join(' '),
            onMouseOver: onMouseOver, onMouseOut: onMouseOut, role: 'tab',
            'aria-labelledby': xBandTitleId },
          _react2.default.createElement(
            'title',
            { id: xBandTitleId },
            obj.label + ' ' + seriesText
          ),
          _react2.default.createElement('rect', { role: 'presentation', className: className + "-xband-background",
            x: x, y: 0, width: bounds.xStepWidth, height: this.state.height })
        );
      }, this);

      return _react2.default.createElement(
        'g',
        { ref: layer, className: className },
        bands
      );
    }

    // Converts the active X index to a line.

  }, {
    key: '_renderCursor',
    value: function _renderCursor() {
      var bounds = this.state.bounds;
      var value = this.props.series[0].values[this.state.activeXIndex];
      var coordinates = this._coordinates(value);
      if ('bar' === this.props.type) {
        coordinates[0] += this.state.bounds.barPadding;
      }
      // Offset it just a little if it is at an edge.
      var x = Math.max(1, Math.min(coordinates[0], this.state.bounds.graphWidth - 1));
      var line = _react2.default.createElement('line', { fill: 'none', x1: x, y1: bounds.graphTop, x2: x, y2: bounds.graphBottom });

      var points = void 0;
      if (this.props.points) {
        // for area and line charts, include a dot at the intersection
        if ('line' === this.props.type || 'area' === this.props.type) {
          points = this.props.series.map(function (item, seriesIndex) {
            value = item.values[this.state.activeXIndex];
            coordinates = this._coordinates(value);
            var colorIndex = this._itemColorIndex(item, seriesIndex);
            return _react2.default.createElement('circle', { key: seriesIndex,
              className: CLASS_ROOT + "__cursor-point color-index-" + colorIndex,
              cx: x, cy: coordinates[1], r: Math.round(POINT_RADIUS * 1.2) });
          }, this);
        }
      }

      return _react2.default.createElement(
        'g',
        { ref: 'cursor', role: 'presentation', className: CLASS_ROOT + "__cursor" },
        line,
        points
      );
    }
  }, {
    key: '_getActiveSeries',
    value: function _getActiveSeries(addColorIndex) {
      return this.props.series.map(function (item) {
        var datum = {
          value: item.values[this.state.activeXIndex][1],
          units: item.units || this.props.units
        };
        // only show label and swatch if we have more than one series
        if (this.props.series.length > 1) {
          datum.label = item.label;
          if (addColorIndex) {
            datum.colorIndex = item.colorIndex;
          }
        }
        return datum;
      }, this);
    }

    // Builds a Legend appropriate for the currently active X index.

  }, {
    key: '_renderLegend',
    value: function _renderLegend() {
      var activeSeries = this._getActiveSeries(true);
      var classes = [CLASS_ROOT + "__legend", CLASS_ROOT + "__legend--" + (this.props.legend.position || 'overlay')];

      return _react2.default.createElement(_Legend2.default, { ref: 'legend', className: classes.join(' '),
        series: activeSeries,
        total: this.props.legend.total,
        units: this.props.units });
    }
  }, {
    key: '_renderA11YTitle',
    value: function _renderA11YTitle() {
      var a11yTitle = this.props.a11yTitle;
      if (!this.props.a11yTitle) {
        var chartLabel = _Intl2.default.getMessage(this.context.intl, 'Chart');
        var typeLabel = _Intl2.default.getMessage(this.context.intl, this.props.type);
        a11yTitle = typeLabel + ' ' + chartLabel;
      }

      return a11yTitle;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + "--" + this.props.type);
      if (this.state.size) {
        classes.push(CLASS_ROOT + "--" + this.state.size);
      }
      if (this.props.sparkline) {
        classes.push(CLASS_ROOT + "--sparkline");
      }

      var values = [];
      if ('line' === this.props.type || 'area' === this.props.type) {
        values = this._renderLinesOrAreas();
      } else if ('bar' === this.props.type) {
        values = this._renderBars();
      }

      if (values.length === 0) {
        classes.push(CLASS_ROOT + "--loading");
        var valueClasses = [CLASS_ROOT + "__values"];
        valueClasses.push(CLASS_ROOT + "__values--loading");
        valueClasses.push("color-index-loading");
        var commands = "M0," + this.state.height / 2 + " L" + this.state.width + "," + this.state.height / 2;
        values.push(_react2.default.createElement(
          'g',
          { key: 'loading' },
          _react2.default.createElement('path', { stroke: 'none', className: valueClasses.join(' '), d: commands })
        ));
      }

      var threshold = null;
      if (this.props.threshold) {
        threshold = this._renderThreshold();
      }

      var cursor = null;
      var legend = null;
      if (this.props.legend && this.state.activeXIndex >= 0 && this.props.series[0].values.length > 0) {
        cursor = this._renderCursor();
        legend = this._renderLegend();
      }

      var xAxis = null;
      if (this.props.xAxis) {
        xAxis = this._renderXAxis();
      }

      var yAxis = null;
      if (this.props.thresholds) {
        yAxis = this._renderYAxis();
      }

      var frontBands = void 0;
      var activeDescendant = void 0;
      var role = 'img';
      if (this.props.legend) {
        frontBands = this._renderXBands('front');
        activeDescendant = this.props.a11yTitleId + '_x_band_' + this.state.activeXIndex;
        role = 'tablist';
      }

      var a11yTitle = this._renderA11YTitle();
      var a11yTitleNode = void 0;
      if (a11yTitle) {
        a11yTitleNode = _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        );
      }

      var a11yDescNode = void 0;
      if (this.props.a11yDesc) {
        a11yDescNode = _react2.default.createElement(
          'desc',
          { id: this.props.a11yDescId },
          this.props.a11yDesc
        );
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'svg',
          { ref: 'chart', className: CLASS_ROOT + "__graphic",
            viewBox: "0 0 " + this.state.width + " " + this.state.height,
            preserveAspectRatio: 'none', role: role, tabIndex: '0',
            'aria-activedescendant': activeDescendant,
            'aria-labelledby': this.props.a11yTitleId + ' ' + this.props.a11yDescId },
          a11yTitleNode,
          a11yDescNode,
          xAxis,
          yAxis,
          _react2.default.createElement(
            'g',
            { className: CLASS_ROOT + "__values" },
            values
          ),
          frontBands,
          threshold,
          cursor
        ),
        legend
      );
    }
  }]);

  return Chart;
}(_react.Component);

exports.default = Chart;


Chart.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  a11yDesc: _react.PropTypes.string,
  important: _react.PropTypes.number,
  large: _react.PropTypes.bool,
  legend: _react.PropTypes.shape({
    position: _react.PropTypes.oneOf(['overlay', 'after']),
    total: _react.PropTypes.bool
  }),
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  points: _react.PropTypes.bool,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    values: _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object // Date
    ]))).isRequired,
    units: _react.PropTypes.string,
    colorIndex: _react.PropTypes.string
  })).isRequired,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  small: _react.PropTypes.bool,
  smooth: _react.PropTypes.bool,
  sparkline: _react.PropTypes.bool,
  threshold: _react.PropTypes.number,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })),
  type: _react.PropTypes.oneOf(['line', 'bar', 'area']),
  units: _react.PropTypes.string,
  xAxis: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object // Date
    ]).isRequired,
    label: _react.PropTypes.string.isRequired
  })), _react.PropTypes.shape({
    placement: _react.PropTypes.oneOf(['top', 'bottom']),
    data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.object // Date
      ]).isRequired,
      label: _react.PropTypes.string.isRequired
    }).isRequired)
  })])
};

Chart.contextTypes = {
  intl: _react.PropTypes.object
};

Chart.defaultProps = {
  a11yTitleId: 'chart-title',
  a11yDescId: 'chart-desc',
  min: 0,
  type: 'line'
};
module.exports = exports['default'];