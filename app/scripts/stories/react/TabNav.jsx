/** @jsx React.DOM */
(function(provide, require) {
  var React = require('React');
  var TabNav = React.createClass({
    render: function() {
      var self = this;
      var items = this.props.items.map(function (menuItem) {
        var menuName = menuItem.name.split("-").join("").toLowerCase();
        var isActive = self.props.current.toUpperCase() === menuName.toUpperCase();
        var className = isActive ? 'active' : '',
            href = '#' + self.props.prefix + '/' + menuName;

        return (
          <li className={className}>
              <a href={href}>{menuItem.name.charAt(0).toUpperCase() + menuItem.name.slice(1)}</a>
          </li>
        );
      }.bind(this));

      if (items) {
        items = <ul className="nav nav-tabs">{items}</ul>
      }
      return (
        <div>{items}</div>
      );
    }
  });

  provide('TabNav', TabNav);

})(_provide, _require);

