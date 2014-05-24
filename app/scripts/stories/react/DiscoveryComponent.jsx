/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React'),
      $ = require('jQuery'),
      utils = require('stories.utils');

  var DiscoveryComponent = React.createClass({

    getInitialState: function() {
      return {story: '', content: '', filter: '', page: 1};
    },
    initUi: function() {
      var self = this;
      $('.dark-screen').on('click', function() {
        $('.dark-screen').parent().hide();
      })
    },
    componentDidMount: function() {
      this.initUi();
    },
    componentDidUpdate: function() {
      this.initUi();
    },
    updateNav: function(filter, page) {
      this.setState({filter: filter, page: page});
    },
    showStories: function(data) {
      document.body.className = '';
      this.setState({content: <Stories data={data} 
        filter={this.state.filter} 
        page={this.state.page}
        showStoryDetail={this.showStoryDetail} />})
    },
    showStoryDetail: function(e) {
      var self = this;
      this.props.getStory($(e.target).parents('article').attr('id'), function(data) {
        self.setState({story: <Story popup={true} data={data} />});
        $('.dark-screen').parent().show();
      }, function(err) {
        console.log(err);
      });
      return false;
    },
    showStory: function(data) {
      document.body.className = 'protip-single';
      this.setState({content: <Story data={data} />});
      return false;
    },
    showError: function() {
      this.setState({content: <div className="inside cf"><div className="alert alert-danger">Data not found</div></div>})
    },
    render: function() {
      var content = this.state.content;
      if (this.state.filter != '') {
        content = <div id="main-content">
                    <div id="upvoted-protips"></div>
                    <section id="x-protips-grid" className="new-main-content cf">
                      <DiscoveryNav filter={this.state.filter} />
                      {this.state.content}
                      {this.state.story}
                    </section>
                  </div>
      }
      return (
          <div id="discovery">
            <Header />
            {content}
            <Footer />
          </div>
       );
    }
  });

  provide('DiscoveryComponent', DiscoveryComponent);
})(_provide, _require);