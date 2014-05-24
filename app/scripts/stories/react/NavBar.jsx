/** @jsx React.DOM */
(function(provide, require) {
  var React = require('React');
  var appModel = {};
  var NavBar = React.createClass({
    render: function() {
      return (
          <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <a className="navbar-brand" href="#"><img height={90} src="images/logo.png" /></a>
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-top">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div id="navbar-top" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><a href="#dashboard">Dashboard</a></li>
                  <li><a href="#backtesting">Backtesting</a></li>
                  <li><ConnectionStatus /></li>
                </ul>
              </div>
              <div className="col-md-5">

              </div>
          </nav>
          )
    }
  });

  provide('NavBar', NavBar);

})(_provide, _require);

