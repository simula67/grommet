// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'tooltip-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-tooltip';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "tooltip");

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: className, 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'tooltip' },
        React.createElement('rect', { id: '_x2E_svg_139_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('polygon', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '34.5,30 27.5001,30 23.4998,34.5  19.4997,30 13.5,30 13.5,13 34.5,13 \t' }),
        React.createElement('rect', { x: '17.5', y: '20', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '22.5', y: '20', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '27.5', y: '20', fill: '#231F20', width: '3', height: '3' })
      )
    );
  }

});

module.exports = Icon;