'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Expand = require('./icons/base/Expand');

var _Expand2 = _interopRequireDefault(_Expand);

var _Play = require('./icons/base/Play');

var _Play2 = _interopRequireDefault(_Play);

var _Pause = require('./icons/base/Pause');

var _Pause2 = _interopRequireDefault(_Pause);

var _Refresh = require('./icons/base/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "video";

var Video = function (_Component) {
  _inherits(Video, _Component);

  function Video() {
    _classCallCheck(this, Video);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Video).call(this));

    _this._onPlaying = _this._onPlaying.bind(_this);
    _this._onPause = _this._onPause.bind(_this);
    _this._onEnded = _this._onEnded.bind(_this);
    _this._onClickControl = _this._onClickControl.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onClickChapter = _this._onClickChapter.bind(_this);
    _this._onFullScreen = _this._onFullScreen.bind(_this);

    _this.state = { playing: false, progress: 0 };
    return _this;
  }

  _createClass(Video, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var video = this.refs.video;
      video.addEventListener('playing', this._onPlaying);
      video.addEventListener('pause', this._onPause);
      video.addEventListener('ended', this._onEnded);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var video = this.refs.video;
      video.removeEventListener('playing', this._onPlaying);
      video.removeEventListener('pause', this._onPause);
      video.removeEventListener('ended', this._onEnded);
    }
  }, {
    key: '_onPlaying',
    value: function _onPlaying() {
      var video = this.refs.video;
      this._progressTimer = setInterval(function () {
        this.setState({ progress: this.state.progress + 0.5 });
      }.bind(this), 500);
      this.setState({ playing: true, progress: video.currentTime, ended: null });
    }
  }, {
    key: '_onPause',
    value: function _onPause() {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
      this.setState({ playing: false });
    }
  }, {
    key: '_onEnded',
    value: function _onEnded() {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
      this.setState({ playing: false, ended: true });
    }
  }, {
    key: '_onClickControl',
    value: function _onClickControl() {
      var video = this.refs.video;
      if (this.state.playing) {
        video.pause();
      } else {
        video.play();
      }
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove() {
      this.setState({ interacting: true });
      clearTimeout(this._moveTimer);
      this._moveTimer = setTimeout(function () {
        this.setState({ interacting: false });
      }.bind(this), 1000);
    }
  }, {
    key: '_onClickChapter',
    value: function _onClickChapter(time) {
      this.refs.video.currentTime = time;
      this.setState({ progress: time });
    }
  }, {
    key: '_onFullScreen',
    value: function _onFullScreen() {
      var video = this.refs.video;

      // check if webkit and mozilla fullscreen is available
      if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else {
        console.warn('Your browser doesn\'t support fullscreen.');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.full) {
        classes.push(CLASS_ROOT + '--full');
      }
      if (this.state.playing) {
        classes.push(CLASS_ROOT + '--playing');
      }
      if (this.state.interacting) {
        classes.push(CLASS_ROOT + '--interacting');
      }
      if (this.props.videoHeader) {
        classes.push(CLASS_ROOT + '--video-header');
      }
      if (this.props.colorIndex) {
        classes.push('background-color-index-' + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var controlIconSize = 'small' === this.props.size ? null : 'large';
      var controlIcon = this.state.playing ? _react2.default.createElement(_Pause2.default, { size: controlIconSize }) : this.state.ended ? _react2.default.createElement(_Refresh2.default, { size: controlIconSize }) : _react2.default.createElement(_Play2.default, { size: controlIconSize });
      var a11yControlButtonMessage = this.state.playing ? 'Pause Video' : this.state.ended ? 'Restart Video' : 'Play Video';
      var a11yControlButtonTitle = _Intl2.default.getMessage(this.context.intl, a11yControlButtonMessage);

      var videoHeader = void 0;
      var videoSummaryJustify = 'between';
      if (this.props.videoHeader) {
        videoHeader = this.props.videoHeader;
      } else if (this.props.allowFullScreen) {
        var a11yExpandButtonTitle = _Intl2.default.getMessage(this.context.intl, 'Toggle Fullscreen');
        // fallback to only displaying full screen icon in header
        // if allowing fullscreen

        videoHeader = _react2.default.createElement(
          _Box2.default,
          { align: 'end', full: 'horizontal' },
          _react2.default.createElement(_Button2.default, { plain: true, onClick: this._onFullScreen,
            icon: _react2.default.createElement(_Expand2.default, null), a11yTitle: a11yExpandButtonTitle })
        );
      } else {
        videoSummaryJustify = 'center';
      }

      var title = void 0;
      if (this.props.title) {
        classes.push(CLASS_ROOT + '--titled');
        title = _react2.default.createElement(
          _Box2.default,
          { align: 'center', justify: 'center', className: CLASS_ROOT + '__title' },
          this.props.title
        );
      }

      var timeline = void 0;
      if (this.props.timeline && this.props.duration) {

        var chapters = this.props.timeline.map(function (chapter, index, chapters) {
          var percent = Math.round(chapter.time / this.props.duration * 100);
          var seconds = chapter.time % 60;
          var time = Math.floor(chapter.time / 60) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          var currentProgress = this.state.progress;
          var nextChapter = chapters[Math.min(chapters.length - 1, index + 1)];

          var timelineClasses = (0, _classnames3.default)(CLASS_ROOT + '__timeline-chapter', _defineProperty({}, CLASS_ROOT + '__timeline-active', currentProgress !== 0 && currentProgress >= chapter.time && currentProgress < nextChapter.time));

          return _react2.default.createElement(
            'div',
            { key: chapter.time, className: timelineClasses,
              style: { left: percent.toString() + '%' },
              onClick: this._onClickChapter.bind(this, chapter.time) },
            _react2.default.createElement(
              'label',
              null,
              chapter.label
            ),
            _react2.default.createElement(
              'time',
              null,
              time
            )
          );
        }, this);

        timeline = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__timeline' },
          chapters
        );
      }

      var progress = void 0;
      if (this.props.duration) {
        var percent = Math.round(this.state.progress / this.props.duration * 100);
        progress = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__progress' },
          _react2.default.createElement('div', { className: CLASS_ROOT + '__progress-meter',
            style: { width: percent.toString() + '%' } })
        );
      }

      var onClickControl = this.props.onClick || this._onClickControl;

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onMouseMove: this._onMouseMove },
        _react2.default.createElement(
          'video',
          { ref: 'video', poster: this.props.poster },
          this.props.children
        ),
        _react2.default.createElement(
          _Box2.default,
          { pad: 'none', align: 'center', justify: videoSummaryJustify, className: CLASS_ROOT + '__summary' },
          videoHeader,
          _react2.default.createElement(
            _Box2.default,
            { pad: 'large', align: 'center', justify: 'center' },
            _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', plain: true,
              primary: true, onClick: onClickControl,
              icon: controlIcon, a11yTitle: a11yControlButtonTitle }),
            title
          ),
          _react2.default.createElement(_Box2.default, null)
        ),
        timeline,
        progress
      );
    }
  }]);

  return Video;
}(_react.Component);

exports.default = Video;


Video.propTypes = {
  colorIndex: _react.PropTypes.string,
  duration: _react.PropTypes.number,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  poster: _react.PropTypes.string,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    time: _react.PropTypes.number
  })),
  title: _react.PropTypes.node,
  videoHeader: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  allowFullScreen: _react.PropTypes.bool
};
module.exports = exports['default'];