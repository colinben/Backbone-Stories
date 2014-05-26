(function(provide, require) {

  var BaseView = require('BaseView'),
      React = require('React'),
      IndexComponent;

  var IndexView = BaseView.extend({

    initContainer: function() {
      IndexComponent = require('IndexComponent');

      this.index = React.renderComponent(
          IndexComponent(),
          this.$container[0]
      );
    },

    showWelcome: function(params) {
      this.initContainer();
      this.index.showWelcome();
    },

    showRenew: function(params) {
      this.initContainer();
      this.index.showRenew();
    },

    showTOS: function(params) {
      this.initContainer();
      this.index.showTOS();
    },

    showBacktesting: function(collection, params) {
      this.initContainer();
      this.index.showBacktesting(collection);
    }

  });

  provide('stories.view.IndexView', IndexView);
})(_provide, _require);
