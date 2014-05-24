(function(provide, require) {

  var BaseView = require('BaseView'),
      React = require('React'),
      service = require('stories.service'),
      DiscoveryComponent;

  var DiscoveryView = BaseView.extend({
    initContainer: function() {
      DiscoveryComponent = require('DiscoveryComponent');
      this.content = React.renderComponent(
          DiscoveryComponent({getStory: this.getStory}),
          this.$container[0]
      )
    },
    getStory: function(id, pass, fail) {
      service.getModel('story', {
        id: id
      }).then(function(data) {
        pass(data);
      }, function(err) {
        fail(err);
      }).catch(function(err) {
        console.log(err);
      });
    },
    updateNav: function(filter, page) {
      this.content.updateNav(filter, page);
    },
    trending: function(data) {
      this.content.showStories(data.data);
    },
    fresh: function(data) {
      this.content.showStories(data.data);
    },
    popular: function(data) {
      this.content.showStories(data.data);
    },
    liked: function(data) {
      this.content.showStories(data.data);
    },
    error: function() {
      this.content.showError();
    },
    showDetail: function(data) {
      this.content.showStory(data);
    }
  });

  provide('stories.view.DiscoveryView', DiscoveryView);
})(_provide, _require);
