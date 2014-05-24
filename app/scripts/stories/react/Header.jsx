/** @jsx React.DOM */
(function(provide, require) {
  var React = require('React');

  var Header = React.createClass({
    render: function() {
      return (
        <header id="masthead">
          <div className="inside-masthead cf">
            <div className="mobile-panel cf">
              <a href="/" className="logo">
                <span>coderwall</span>
              </a>
              <a className="menu-btn"></a>
            </div>
            <a href="https://coderwall.com/team/new-relic" data-action="clicked tee" class="tee-ribbon track"></a>
            <NavBar />
          </div>
        </header>
      )
    }
  });

  provide('Header', Header);

})(_provide, _require);
