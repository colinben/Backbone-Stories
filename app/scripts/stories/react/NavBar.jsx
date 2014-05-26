/** @jsx React.DOM */
(function(provide, require) {
  var React = require('React');

  var NavBar = React.createClass({
    render: function() {
      return (
          <nav id="nav">
            <ul>
              <li><a href="/">Discover</a></li>
              <li></li>
              <li><a href="/dashboard">Feed</a></li>
              <li><a href="/datpv">Profile</a></li>
              <li><a href="/teams">Teams</a></li>
              <li><a href="/jobs">Jobs</a></li>
              <li><a href="/settings">Settings</a></li>
              <li><a href="/goodbye">Sign out</a></li>
            </ul>
          </nav>
          )
    }
  });

  provide('NavBar', NavBar);

})(_provide, _require);

