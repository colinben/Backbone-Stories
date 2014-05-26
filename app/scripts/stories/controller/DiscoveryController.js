/**
 * The dashboard controller for displaying on the dashboard page.
 */

(function(provide, require) {

  var $ = require('jQuery'),
      _ = require('_'),
      Backbone = require('Backbone'),
      service = require('stories.service'),
      StoriesCollection = require('stories.collection.Stories'),
      StoryModel = require('stories.model.Story'),
      BaseController = require('BaseController'),
      DiscoveryView = require('stories.view.DiscoveryView');

  var discoveryView;

  var DiscoveryController = BaseController.extend({

    actions: {
      'p-:id': 'onDetail',
      ':tab(/:filter)(/:page)': 'onTab'
    },

    lazyStart: function(cb) {
      service.ifUserRegistered(function() {
        cb();
      }, function() {
        this.router.navigate('signup/', {trigger: true});
      }.bind(this));
    },

    initialize: function() {
      var $container = $('#container');

      $container.empty();

      discoveryView = new DiscoveryView({
        $container: $container
      });

      this.stories = new StoriesCollection;

    },
    index: function() {
      this.router.dispatch('discovery', {
        action: 'trending',
        trigger: true
      });
    },
    onTab: function(filter, page) {
      if (!discoveryView[filter]) return false;
      page = page ? parseInt(page) : 1;
      filter = filter ? filter : 'trending';

      discoveryView.initContainer(this.stories, null);
      discoveryView.updateNav(filter, page);

      var self = this;

      service.getModel('stories', {
        page: page,
        filter: filter
      }).then(function(response) {
        var storiesPerPage = 4, // for example
            totalStories = response.total ? response.total : 10; // for example
        if (page * storiesPerPage >= totalStories) {
          discoveryView.updateNav(filter, -1);
        }
        self.stories.set(response.data);

        discoveryView[filter]();
      }, function() {
        discoveryView.error();
      });
    },
    onDetail: function(id) {
      var story = this.stories.findWhere({_id: id});
      if (story) {
        discoveryView.initContainer(null, story);
        discoveryView.showDetail(story);
        return true;
      }
      var model = new StoryModel;
      discoveryView.initContainer(null, model);
      service.getModel('story', {
        id: id
      }).then(function(response) {
        model.set(response);//new StoryModel(response, {parse: true})
        discoveryView.showDetail();
      }, function() {
        discoveryView.error();
      });

    }
  });

  provide('stories.controller.DiscoveryController', DiscoveryController);

})(_provide, _require);
