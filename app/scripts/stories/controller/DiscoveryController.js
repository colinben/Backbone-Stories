/**
 * The dashboard controller for displaying on the dashboard page.
 */

(function(provide, require) {

  var $ = require('jQuery'),
      _ = require('_'),
      Backbone = require('Backbone'),
      service = require('stories.service'),
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

      discoveryView.initContainer();
      discoveryView.updateNav(filter, page);

      service.getModel('stories', {
        page: page,
        filter: filter
      }).then(function(data) {
        var storiesPerPage = 4, // for example
            totalStories = data.total ? data.total : 10; // for example
        if (page * storiesPerPage >= totalStories) {
          discoveryView.updateNav(filter, -1);
        }
        discoveryView[filter](data);
      }, function() {
        discoveryView.error();
      });
    },
    onDetail: function(id) {
      discoveryView.initContainer();
      service.getModel('story', {
        id: id
      }).then(function(data) {
        discoveryView.showDetail(data);
      }, function() {
        discoveryView.error();
      });
    }
  });

  provide('stories.controller.DiscoveryController', DiscoveryController);

})(_provide, _require);
