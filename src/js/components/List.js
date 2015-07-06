// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ListItem = require('./ListItem');
var SpinningIcon = require('./icons/Spinning');
var InfiniteScroll = require('../mixins/InfiniteScroll');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var CLASS_ROOT = "list";

var List = React.createClass({

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    large: React.PropTypes.bool,
    onMore: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    schema: React.PropTypes.arrayOf(React.PropTypes.shape({
      attribute: React.PropTypes.string,
      image: React.PropTypes.bool,
      label: React.PropTypes.string,
      primary: React.PropTypes.bool,
      secondary: React.PropTypes.bool,
      timestamp: React.PropTypes.bool,
      uid: React.PropTypes.bool
    })).isRequired,
    selected: React.PropTypes.oneOfType([
      React.PropTypes.string, // uid
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    small: React.PropTypes.bool
  },

  mixins: [InfiniteScroll, IntlMixin],

  getDefaultProps: function () {
    return {small: false};
  },

  _onClickItem: function (item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  },

  componentDidMount: function () {
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
  },

  componentDidUpdate: function () {
    this.stopListeningForScroll();
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
  },

  componentWillUnmount: function () {
    if (this.props.onMore) {
      this.stopListeningForScroll();
    }
  },

  _renderValue: function (item, scheme) {
    var result;
    if (scheme.image) {
      if (typeof item[scheme.attribute] === 'string') {
        result = <img src={item[scheme.attribute]} alt={scheme.label || 'image'} />;
      } else {
        result = item[scheme.attribute];
      }
    } else if (scheme.timestamp) {
      result = this.getGrommetFormattedDate(item[scheme.attribute]);
    } else {
      result = item[scheme.attribute];
    }
    return result;
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (true || this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (true || this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var items = this.props.data.map(function (item) {
      var uid;
      var image;
      var primary;
      var secondary;
      var selected;

      this.props.schema.forEach(function (scheme) {
        if (scheme.image) {
          image = this._renderValue(item, scheme);
        } else if (scheme.primary) {
          primary = this._renderValue(item, scheme);
        } else if (scheme.secondary) {
          secondary = this._renderValue(item, scheme);
        }
        if (scheme.uid) {
          uid = item[scheme.attribute];
          if (uid === this.props.selected) {
            selected = true;
          }
        }
      }, this);

      return (
        <ListItem key={uid} image={image} label={primary}
          annotation={secondary} selected={selected}
          onClick={this._onClickItem.bind(this, item)} />
      );
    }, this);

    var more = null;
    if (this.props.onMore) {
      classes.push(CLASS_ROOT + "--moreable");
      more = (
        <li ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </li>
      );
    }

    return (
      <ul className={classes.join(' ')}>
        {items}
        {more}
      </ul>
    );
  }

});

module.exports = List;