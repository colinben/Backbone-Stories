/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React'),
      $ = require('jQuery'),
      utils = require('stories.utils');

  var DiscoveryComponent = React.createClass({

    getInitialState: function() {
      return {content: '', filter: 'trending', page: 1};
    },
    updateNav: function(filter, page) {
      this.setState({filter: filter, page: page});
    },
    showStories: function(data) {
      this.setState({content: <Stories data={data} filter={this.state.filter} page={this.state.page} />})
    },
    showError: function() {
      this.setState({content: <div className="inside cf"><div className="alert alert-danger">Data not found</div></div>})
    },
    render: function() {
      return (
          <div id="discovery">
            <Header />
            <div id="main-content">
              <div id="upvoted-protips"></div>
              <section id="x-protips-grid" className="new-main-content cf">
                <DiscoveryNav filter={this.state.filter} />
                {this.state.content}
              </section>
            </div>
            <Footer />
          </div>
       );
    }
  });

  provide('DiscoveryComponent', DiscoveryComponent);
})(_provide, _require);