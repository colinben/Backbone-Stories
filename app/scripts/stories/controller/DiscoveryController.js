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
      ':tab(/:param)': 'onTab'
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
    onTab: function() {
      discoveryView.initContainer();
    }
  });

  provide('stories.controller.DiscoveryController', DiscoveryController);

})(_provide, _require);
