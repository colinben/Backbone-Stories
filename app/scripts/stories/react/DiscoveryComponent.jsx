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
          <div id="discovery">
            <Header />
            <div id="main-content">
              <div id="upvoted-protips"></div>
              <section id="x-protips-grid" className="new-main-content cf">
                <DiscoveryNav />
                <Stories />
              </section>
              {this.state.content}
            </div>
            <Footer />
          </div>
       );
    }
  });

  provide('DiscoveryComponent', DiscoveryComponent);
})(_provide, _require);