(function(provide, require) {

  var BaseView = require('BaseView'),
      React = require('React'),
      service = require('stories.service'),
      DiscoveryComponent;

  var DiscoveryView = BaseView.extend({
    initContainer: function() {
      DiscoveryComponent = require('DiscoveryComponent');
      this.dashboard = React.renderComponent(
          DiscoveryComponent(),
          this.$container[0]
      )
    }

  });

  provide('stories.view.DiscoveryView', DiscoveryView);
})(_provide, _require);
