(function(provide, require) {

  var BaseView = require('BaseView'),
      React = require('React'),
      service = require('stories.service');

  var DiscoveryView = BaseView.extend({
    initContainer: function(collection, model) {
      this.collection = collection;
      this.model = model;
      this.content = React.renderComponent(
          DiscoveryComponent({
            getStory: this.getStory,
            getStories: this.getStories,
            displayLink: this.displayLink,
            collection: this.collection,
            model: this.model
          }),
          this.$container[0]
      )
    },
    displayLink: function(link) {
      stories.router.navigate('discovery/' + link)
    },
    getStory: function(id, pass, fail) {
      var story = this.collection.findWhere({_id: id});
      if (story) {
        pass(story);
      } else {
        fail('not found');
      }
    },
    getStories: function(param, pass, fail) {
      var self = this;
      service.getModel('stories', {
        filter: param.filter,
        page: param.page
      }).then(function(response) {
        self.collection.add(response.data);
        pass(response);
      }, function(err) {
        fail(err);
      });
    },
    updateNav: function(filter, page) {
      this.content.updateNav(filter, page);
    },
    trending: function() {
      this.content.showStories();
    },
    fresh: function() {
      this.content.showStories();
    },
    popular: function() {
      this.content.showStories();
    },
    liked: function() {
      this.content.showStories();
    },
    error: function() {
      this.content.showError();
    },
    showDetail: function() {
      this.content.showStory();
    }
  });

  provide('stories.view.DiscoveryView', DiscoveryView);
})(_provide, _require);
