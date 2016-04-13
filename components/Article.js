'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _DOM = require('../utils/DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Scroll = require('../utils/Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _Up = require('./icons/base/Up');

var _Up2 = _interopRequireDefault(_Up);

var _Down = require('./icons/base/Down');

var _Down2 = _interopRequireDefault(_Down);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// import CarouselControls from './CarouselControls';

var CLASS_ROOT = 'article';
var DEFAULT_PLAY_INTERVAL = 10000; // 10s

var Article = function (_Component) {
  _inherits(Article, _Component);

  function Article() {
    _classCallCheck(this, Article);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Article).call(this));

    _this._onFocusChange = _this._onFocusChange.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._onWheel = _this._onWheel.bind(_this);
    _this._onTouchStart = _this._onTouchStart.bind(_this);
    _this._onTouchMove = _this._onTouchMove.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._onTogglePlay = _this._onTogglePlay.bind(_this);
    _this._onSelect = _this._onSelect.bind(_this);
    _this._checkControls = _this._checkControls.bind(_this);
    _this._checkPreviousNextControls = _this._checkPreviousNextControls.bind(_this);

    _this.state = {
      activeIndex: 0,
      playing: false
    };
    return _this;
  }

  _createClass(Article, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.scrollStep) {
        this._keys = { up: this._onPrevious, down: this._onNext };
        if ('row' === this.props.direction) {
          this._keys = { left: this._onPrevious, right: this._onNext };
        }
        //keys.space = this._onTogglePlay;
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keys);

        document.addEventListener('wheel', this._onWheel);
        window.addEventListener('resize', this._onResize);

        this._scrollParent = _reactDom2.default.findDOMNode(this.refs.component);

        this._checkControls();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.scrollStep) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keys);
        document.removeEventListener('wheel', this._onWheel);
        window.removeEventListener('resize', this._onResize);
      }
    }
  }, {
    key: '_checkPreviousNextControls',
    value: function _checkPreviousNextControls(currentScroll, nextProp, prevProp) {
      if (currentScroll > 0) {
        var nextStepNode = _reactDom2.default.findDOMNode(this.refs[this.state.activeIndex + 1]);

        var previousStepNode = _reactDom2.default.findDOMNode(this.refs[this.state.activeIndex - 1]);

        if (nextStepNode) {
          var nextStepPosition = nextStepNode.getBoundingClientRect()[nextProp] * (this.state.activeIndex + 1);

          if (currentScroll > nextStepPosition) {
            this.setState({ activeIndex: this.state.activeIndex + 1 });
          }
        }

        if (previousStepNode) {
          var previousStepPosition = previousStepNode.getBoundingClientRect()[prevProp] * this.state.activeIndex;

          if (currentScroll < previousStepPosition) {
            this.setState({ activeIndex: this.state.activeIndex - 1 });
          }
        }
      }
    }
  }, {
    key: '_checkControls',
    value: function _checkControls() {
      if (this.props.direction === 'row') {
        var currentScroll = this.refs.component.refs.boxContainer.scrollLeft;
        this._checkPreviousNextControls(currentScroll, 'left', 'right');
      } else {
        var currentScroll = this.refs.component.refs.boxContainer.scrollTop;
        this._checkPreviousNextControls(currentScroll, 'top', 'bottom');
      }
    }
  }, {
    key: '_ignoreScrolling',
    value: function _ignoreScrolling() {
      var _this2 = this;

      // ignore scroll and wheel events for a while to avoid acceleration artifacts
      this.setState({ ignoreScroll: true });
      clearTimeout(this._ignoreScrollTimer);
      this._ignoreScrollTimer = setTimeout(function () {
        _this2.setState({ ignoreScroll: false });
      }, 1000);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      if (event.target === this._scrollParent) {
        if ('row' === this.props.direction) {
          if (!this.state.ignoreScroll) {
            var activeIndex = this.state.activeIndex;

            var childElement = _reactDom2.default.findDOMNode(this.refs[activeIndex]);
            var rect = childElement.getBoundingClientRect();
            if (rect.left < 0) {
              // scrolling right
              this._onNext();
            } else {
              // scrolling left
              this._onPrevious();
            }
          }
        }
      }
    }
  }, {
    key: '_onWheel',
    value: function _onWheel(event) {
      var _this3 = this;

      if ('row' === this.props.direction) {
        // Horizontal scrolling.
        if (!this.state.ignoreScroll) {
          // Only step if the user isn't scrolling vertically, bias vertically
          if (Math.abs(event.deltaY) < Math.abs(event.deltaX * 2)) {
            event.preventDefault();
            // Constrain scrolling to lock on each section.
            if (event.deltaX > 0) {
              this._onNext();
            } else {
              this._onPrevious();
            }
          }
        } else {
          event.preventDefault();
        }
      } else {
        // Vertical scrolling. Give the user lots of control.
        var delta = event.deltaY;
        if (Math.abs(delta) > 100) {
          // The user is expressing a resolute interest in controlling the
          // scrolling behavior. Stop doing any of our scroll step aligning
          // until he stops expressing such interest.
          clearInterval(this._wheelTimer);
          clearInterval(this._wheelLongTimer);
          this._wheelLongTimer = setTimeout(function () {
            _this3._wheelLongTimer = null;
          }, 2000);
        } else if (!this._wheelLongTimer) {
          if (delta > 10) {
            clearInterval(this._wheelTimer);
            this._wheelTimer = setTimeout(this._onNext, 200);
          } else if (delta < -10) {
            clearInterval(this._wheelTimer);
            this._wheelTimer = setTimeout(this._onPrevious, 200);
          } else {
            clearInterval(this._controlTimer);
            this._controlTimer = setTimeout(this._checkControls, 200);
          }
        }
      }
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(event) {
      var touched = event.changedTouches[0];
      this._touchStartX = touched.clientX;
      this._touchStartY = touched.clientY;
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(event) {
      if (!this.state.ignoreScroll) {
        var touched = event.changedTouches[0];
        var deltaX = touched.clientX - this._touchStartX;
        var deltaY = touched.clientY - this._touchStartY;
        // Only step if the user isn't scrolling vertically, bias vertically
        if (Math.abs(deltaY) < Math.abs(deltaX * 2)) {
          if (deltaX < 0) {
            this._onNext();
          } else {
            this._onPrevious();
          }
        }
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var _this4 = this;

      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(function () {
        _this4._onSelect(_this4.state.activeIndex);
      }, 50);
    }
  }, {
    key: '_onNext',
    value: function _onNext(event, wrap) {
      var _props = this.props;
      var children = _props.children;
      var direction = _props.direction;
      var activeIndex = this.state.activeIndex;

      if (event) {
        this._stop();
        event.preventDefault();
      }
      var childCount = _react2.default.Children.count(children);
      var limit = 'row' === direction ? window.innerWidth : window.innerHeight;
      var advanced = false;
      for (var index = 0; index < childCount; index += 1) {
        var childElement = _reactDom2.default.findDOMNode(this.refs[index]);
        var rect = childElement.getBoundingClientRect();
        var edge = 'row' === direction ? rect.right : rect.bottom;
        if (edge > 0) {
          if (event || wrap || edge <= limit) {
            // This is the first visible child, select the next one
            if (index + 1 !== activeIndex) {
              this._onSelect(Math.min(childCount - 1, index + 1));
            }
            advanced = true;
          }
          break;
        }
      }
      if (wrap && !advanced) {
        this._onSelect(1);
      }
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(event) {
      var _props2 = this.props;
      var children = _props2.children;
      var direction = _props2.direction;
      var activeIndex = this.state.activeIndex;

      if (event) {
        this._stop();
        event.preventDefault();
      }
      var childCount = _react2.default.Children.count(children);
      var limit = 'row' === direction ? window.innerWidth : window.innerHeight;
      for (var index = childCount - 1; index >= 0; index -= 1) {
        var childElement = _reactDom2.default.findDOMNode(this.refs[index]);
        var rect = childElement.getBoundingClientRect();
        var edge = 'row' === direction ? rect.left : rect.top;
        if (edge < limit) {
          if (event || edge >= 0) {
            // This is the first visible child, select the previous one
            if (index - 1 !== activeIndex) {
              this._onSelect(Math.max(0, index - 1));
            }
          }
          break;
        }
      }
    }
  }, {
    key: '_start',
    value: function _start() {
      var _this5 = this;

      this._playTimer = setInterval(function () {
        _this5._onNext(null, true);
      }, DEFAULT_PLAY_INTERVAL);
      this.setState({ playing: true });
    }
  }, {
    key: '_stop',
    value: function _stop() {
      clearInterval(this._playTimer);
      this.setState({ playing: false });
    }
  }, {
    key: '_onTogglePlay',
    value: function _onTogglePlay(event) {
      event.preventDefault();
      if (this.state.playing) {
        this._stop();
      } else {
        this._start();
      }
    }
  }, {
    key: '_onSelect',
    value: function _onSelect(activeIndex) {
      var _this6 = this;

      var childElement = _reactDom2.default.findDOMNode(this.refs[activeIndex]);
      if (childElement) {
        var rect = childElement.getBoundingClientRect();
        if ('row' === this.props.direction) {
          _Scroll2.default.scrollBy(this._scrollParent, 'scrollLeft', rect.left);
        } else {
          _Scroll2.default.scrollBy(this._scrollParent, 'scrollTop', rect.top);
        }

        this.setState({ activeIndex: activeIndex }, function () {
          var items = childElement.getElementsByTagName('*');
          var firstFocusable = _DOM2.default.getBestFirstFocusable(items);
          if (!firstFocusable) {
            _this6.refs['anchor_step_' + activeIndex].focus();
          }

          if (_this6.props.onFocusChange) {
            _this6.props.onFocusChange(activeIndex);
          }
        });

        this._ignoreScrolling();
      }
    }
  }, {
    key: '_onFocusChange',
    value: function _onFocusChange(e) {
      var _this7 = this;

      _react2.default.Children.forEach(this.props.children, function (element, index) {
        var parent = _reactDom2.default.findDOMNode(_this7.refs[index]);
        if (parent && parent.contains(e.target)) {
          _this7._onSelect(index);
          return false;
        }
      });
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var CONTROL_CLASS_PREFIX = CLASS_ROOT + '__control ' + CLASS_ROOT + '__control';
      var childCount = _react2.default.Children.count(this.props.children);
      var controls = [
        // Don't use CarouselControls for now
        // <CarouselControls key="carousel"
        //   className={CONTROL_CLASS_PREFIX + "carousel"}
        //   count={childCount}
        //   direction={this.props.direction}
        //   selected={this.state.activeIndex} onChange={this._onSelect} />
      ];

      var a11yTitle = this.props.a11yTitle || {};
      if ('row' === this.props.direction) {
        if (this.state.activeIndex > 0) {
          controls.push(_react2.default.createElement(_Button2.default, { key: 'previous', plain: true, a11yTitle: a11yTitle.previous,
            className: CONTROL_CLASS_PREFIX + '-left',
            onClick: this._onPrevious, icon: _react2.default.createElement(_LinkPrevious2.default, { size: 'large' }) }));
        }
        if (this.state.activeIndex < childCount - 1) {
          controls.push(_react2.default.createElement(_Button2.default, { key: 'next', plain: true, a11yTitle: a11yTitle.next,
            className: CONTROL_CLASS_PREFIX + '-right',
            onClick: this._onNext, icon: _react2.default.createElement(_LinkNext2.default, { size: 'large' }) }));
        }
      } else {
        if (this.state.activeIndex > 0) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'previous', plain: true, a11yTitle: a11yTitle.previous,
              className: CONTROL_CLASS_PREFIX + '-up',
              onClick: this._onPrevious },
            _react2.default.createElement(_Up2.default, null)
          ));
        }
        if (this.state.activeIndex < childCount - 1) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'next', plain: true, a11yTitle: a11yTitle.next,
              className: CONTROL_CLASS_PREFIX + '-down',
              onClick: this._onNext },
            _react2.default.createElement(_Down2.default, null)
          ));
        }
      }

      return controls;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var other = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));
      if (this.props.scrollStep) {
        classes.push(CLASS_ROOT + '--scroll-step');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var controls = undefined;
      if (this.props.controls) {
        controls = this._renderControls();
      }

      var children = this.props.children;
      if (this.props.scrollStep || this.props.controls) {
        children = _react.Children.map(this.props.children, function (element, index) {
          if (element) {
            var elementClone = _react2.default.cloneElement(element, {
              ref: index
            });
            var elementNode = elementClone;

            // let ariaHidden;
            // if (this.state.activeIndex !== index) {
            //   ariaHidden = 'true';
            // }

            // if (this.props.controls) {
            //   elementNode = (
            //     <div aria-hidden={ariaHidden}>
            //       <a tabIndex='-1' aria-hidden='true'
            //         ref={`anchor_step_${index}`} onFocus={element.props.onFocus} />
            //       {elementClone}
            //     </div>
            //   );
            // }

            return elementNode;
          }
        });
      }

      delete other.a11yTitle;

      return _react2.default.createElement(
        _Box2.default,
        _extends({ ref: 'component', tag: 'article' }, other, {
          className: classes.join(' '), onFocus: this._onFocusChange,
          onScroll: this._onScroll, onTouchStart: this._onTouchStart,
          onTouchMove: this._onTouchMove,
          primary: this.props.primary }),
        children,
        controls
      );
    }
  }]);

  return Article;
}(_react.Component);

exports.default = Article;

Article.propTypes = _extends({
  controls: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
  scrollStep: _react.PropTypes.bool
}, _Box2.default.propTypes, {
  a11yTitle: _react.PropTypes.shape({
    next: _Props2.default.string,
    previous: _Props2.default.string
  }),
  onFocusChange: _react.PropTypes.func
});

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};
module.exports = exports['default'];