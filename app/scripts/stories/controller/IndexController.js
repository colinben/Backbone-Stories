/**
 * The index controller for displaying on the index home page.
 */

(function(provide, require) {

  var $ = require('jQuery'),
      _ = require('_'),
      Backbone = require('Backbone'),
      service = require('stories.service'),
      BaseController = require('BaseController'),
      IndexView = require('stories.view.IndexView'),
      MarketOptionCollection = require('stories.collection.MarketOptions');

  var indexView;

  var IndexController = BaseController.extend({

    actions: {
      ':controller(/*params)': 'processControllers'
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

      indexView = new IndexView({
        $container: $container
      });
    },

    index: function() {
      this.router.dispatch('discovery', {trigger: true});
    },

    processControllers: function(controller, params) {
      // if in this function, these controller all not call lazyStart yet.
      this.lazyStart(function() {
        var func = controller.replace('_', '');
        if (func == 'processControllers') return false; // prevent recursive
        if (this[func] && typeof this[func] === 'function') {
          this[func](params);
          return true;
        }
        this.router.onNotFoundController();
        return false;
      }.bind(this));
    },

    renew: function(params) {
      indexView.showRenew(params);
    },

    backtesting: function(params) {
      service.getSavedModels().then(function(models) {
        var collection = new MarketOptionCollection([models.globalOptionModel]);
        indexView.showBacktesting(collection, params);
      }.bind(this));
    }
  });

  provide('stories.controller.IndexController', IndexController);

})(_provide, _require);
