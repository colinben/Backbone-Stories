/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React'),
      $ = require('jQuery'),
      utils = require('stories.utils');

  var DiscoveryComponent = React.createClass({

    getInitialState: function() {
      return {content: ''};
    },

    render: function() {
      return (
          <div id="index">
            <div id="top-loader">
              <div id="top-loader-inner">
                <div className="top-loader-total"></div>
                <div className="top-loader-current"></div>
              </div>
            </div>
            <div className="header">
            </div>
            <div className="index">
              {this.state.content}
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
       );
    }
  });

  provide('DiscoveryComponent', DiscoveryComponent);
})(_provide, _require);
