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
        self.props.displayLink(self.state.filter);
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
    showStories: function() {
      document.body.className = '';
      this.setState({content: ''});
      this.setState({content: <Stories collection={this.props.collection} 
        filter={this.state.filter}
        popupStory={this.popupStory}
        getMoreStories={this.getMoreStories} />})

      this.state.content.setPaginate(this.state.page);
    },
    getMoreStories: function(e) {
      var self = this;
      this.setState({page: this.state.page + 1});
      this.props.getStories({
        page: self.state.page + 1,
        filter: self.state.filter
      }, function(data) {
        var storiesPerPage = 4, // for example
            totalStories = data.total ? data.total : 10; // for example
        if (self.state.page * storiesPerPage >= totalStories) {
          self.state.content.error();
        } else {
          self.state.content.setPaginate(self.state.page);
        }
        self.state.content.addStories(data.data);
      }, function(err) {
        self.state.content.error();
      });
      return false;
    },
    popupStory: function(e) {
      var self = this,
          id = $(e.target).parents('article').attr('id');
      this.props.getStory(id, function(model) {
        self.setState({story: <Story popup={true} model={model} />});
        self.props.displayLink('p-' + id);
        $('.dark-screen').parent().show();
        setTimeout(function() {
          $('html, body').animate({
            scrollTop: $('#x-active-preview-pane').offset().top - 25
          });
        }, 200);
      }, function(err) {
        console.log(err);
      });
      return false;
    },
    showStory: function() {
      document.body.className = 'protip-single';
      this.setState({content: <Story model={this.props.model} />});
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